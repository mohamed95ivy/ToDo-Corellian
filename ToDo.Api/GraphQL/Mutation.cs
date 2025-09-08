// GraphQL/Mutation.cs
using HotChocolate.Subscriptions;
using ToDo.Api.Data;
using ToDo.Api.Models;

namespace GraphQL;

public record CreateTaskInput(string Title, string? Description);
public record TaskPayload(TaskItem Task);

public class Mutation
{
    [GraphQLName("createTask")]
    public async Task<TaskPayload> CreateTask(
        CreateTaskInput input,
        [Service] AppDbContext db,
        [Service] ITopicEventSender sender,
        CancellationToken ct)
    {
        var task = new TaskItem
        {
            Id = Guid.NewGuid(),
            Title = input.Title,
            Description = input.Description ?? string.Empty,
            Status = ToDo.Api.Enums.TaskStatus.Pending
        };

        db.Tasks.Add(task);
        await db.SaveChangesAsync(ct);

        await sender.SendAsync(nameof(Subscription.TaskCreated), task, ct);
        return new TaskPayload(task);
    }

    [GraphQLName("updateTaskStatus")]
    public async Task<TaskPayload> UpdateTaskStatus(
        Guid id,
        ToDo.Api.Enums.TaskStatus status,
        [Service] AppDbContext db,
        [Service] ITopicEventSender sender,
        CancellationToken ct)
    {
        var task = await db.Tasks.FindAsync(id);
        if (task is null)
        {
            throw new GraphQLException(
                ErrorBuilder.New()
                    .SetMessage($"Task with id '{id}' not found.")
                    .SetCode("TASK_NOT_FOUND")
                    .Build());
        }

        task.Status = status;
        await db.SaveChangesAsync(ct);

        await sender.SendAsync(nameof(Subscription.TaskUpdated), task, ct);
        return new TaskPayload(task);
    }
}
