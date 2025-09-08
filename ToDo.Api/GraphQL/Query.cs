using Microsoft.EntityFrameworkCore;
using ToDo.Api.Data;
using ToDo.Api.Models;


namespace ToDo.Api.GraphQL
{
    public class Query
    {
        [UseProjection]
        [UseFiltering]
        [UseSorting]
        public IQueryable<TaskItem> GetAllTasks([Service] AppDbContext db) =>
        db.Tasks.AsNoTracking();
    }
}
