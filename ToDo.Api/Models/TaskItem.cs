using ToDo.Api.Enums;

namespace ToDo.Api.Models
{
    public class TaskItem
    {
        [ID]
        public Guid Id { get; set; } 
        public string Title { get; set; }
        public string Description { get; set; }
        public Enums.TaskStatus Status { get; set; }
    }
}
