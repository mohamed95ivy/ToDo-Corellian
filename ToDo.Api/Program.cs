using GraphQL;
using Microsoft.EntityFrameworkCore;
using ToDo.Api.Data;
using ToDo.Api.GraphQL;

var builder = WebApplication.CreateBuilder(args);

// --- EF Core (SQLite) ---
builder.Services.AddDbContext<AppDbContext>(o =>
    o.UseSqlite(builder.Configuration.GetConnectionString("Default") ?? "Data Source=/data/todo.db"));

// --- CORS (dev: allow Vite) ---
const string CorsPolicy = "DevCors";
builder.Services.AddCors(o => o.AddPolicy(CorsPolicy, p =>
    p.WithOrigins("http://localhost:5173", "https://localhost:5173", "http://web")
     .AllowAnyHeader().AllowAnyMethod().AllowCredentials()
));

// --- GraphQL ---
builder.Services.AddGraphQLServer()
    .AddQueryType<Query>()
    .AddMutationType<Mutation>()
    .AddSubscriptionType<Subscription>()
    .AddEnumType<TaskStatus>()              // ensure enum is registered
    .BindRuntimeType<Guid, IdType>()        // Guid -> GraphQL ID
    .AddInMemorySubscriptions()
    .AddProjections()
    .AddFiltering()
    .AddSorting()
    .ModifyRequestOptions(o => o.IncludeExceptionDetails = true);  // see validation errors

var app = builder.Build();

// Ensure DB
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();
}

// ----- ORDER MATTERS -----
app.UseRouting();

// DEV “nuclear” CORS shim (handles OPTIONS early & always sets headers)
// Remove for production.
app.Use(async (ctx, next) =>
{
    var origin = ctx.Request.Headers.Origin.ToString();
    if (!string.IsNullOrEmpty(origin) &&
        (origin == "http://localhost:5173" || origin == "https://localhost:5173"))
    {
        ctx.Response.Headers["Access-Control-Allow-Origin"] = origin;
        ctx.Response.Headers["Vary"] = "Origin";
        ctx.Response.Headers["Access-Control-Allow-Credentials"] = "true";
        ctx.Response.Headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization, *";
        ctx.Response.Headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS";
        if (ctx.Request.Method == "OPTIONS")
        {
            ctx.Response.StatusCode = StatusCodes.Status204NoContent;
            return; // short-circuit preflight
        }
    }

    if (ctx.Request.Path.StartsWithSegments("/graphql") && ctx.Request.Method == "POST")
        Console.WriteLine($"GraphQL POST {DateTime.Now:HH:mm:ss}");

    await next();
});

app.UseCors(CorsPolicy);
app.UseWebSockets();

// Map GraphQL and REQUIRE the CORS policy on the endpoint
app.MapGraphQL("/graphql").RequireCors(CorsPolicy);

app.Run();
