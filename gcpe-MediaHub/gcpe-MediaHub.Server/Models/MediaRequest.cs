using System.ComponentModel.DataAnnotations;

namespace gcpe_MediaHub.Server.Models
{
    public class MediaRequest
    {
        public enum Status
        {
            draft,
            inProgress,
            done
        }
        public static Dictionary<Status, string> Statuses = new Dictionary<Status, string>()
        {
            {Status.inProgress, "In Progress"},
            {Status.draft, "Draft" },
            {Status.done, "Done" }
        };

        [Key]
        public int Id { get; set; }
        [Required]
        public string? Title { get; set; }
        public Status status { get; set; } = Status.draft;
        [Required]
        public DateTime? Deadline { get; set; }
        [Required]
        public MediaContact RequestedBy { get; set; }

        public MediaRequest(string title, string status, DateTime deadline, MediaContact requestedBy) 
        { 
            Title = title;
            if (!Statuses.Values.Contains(status))
                throw new Exception($"there is no status with the value \"{status}\"");
            this.status = Statuses.FirstOrDefault(x => x.Value == status).Key;
            Deadline = deadline;
            RequestedBy = requestedBy;  
        }
    }
}
