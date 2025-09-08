// GraphQL/Subscription.cs
using HotChocolate;
using HotChocolate.Subscriptions;
using ToDo.Api.Models;

namespace GraphQL;
public class Subscription
{
    [Subscribe, Topic]
    public TaskItem TaskCreated([EventMessage] TaskItem task) => task;

    [Subscribe, Topic]
    public TaskItem TaskUpdated([EventMessage] TaskItem task) => task;
}
