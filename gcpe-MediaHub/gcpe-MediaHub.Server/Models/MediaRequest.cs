using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace gcpe_MediaHub.Server.Models
{
    public class MediaRequest
    {
        public enum Status
        {
            created,
            draft,
            inProgress,
            done
        }
        public static Dictionary<Status, string> Statuses = new Dictionary<Status, string>()
        {
            {Status.created, "New"},
            {Status.inProgress, "In Progress"},
            {Status.draft, "Draft" },
            {Status.done, "Done" }
        };

        [Key]
        public string Id { get; set; }
        [Required]
        public string? Title { get; set; }[Required]
        public string? RequestType { get; set; }
        public Status status { get; set; } = Status.draft;

        public DateTime? Deadline { get; set; }
 
        public DateTime? RequestedOn { get; set; }

        [Required]
        public int RequestedBy { get; set; }
        [ForeignKey("RequestBy")]
        public virtual MediaContact? Contact { get; set; }

        [Required]
        public String? LeadMinistry { get; set; } // Todo: this should be a foreign relation to an Organization entity
        public String? SharedWith { get; set; } // TODO: this should be a collection of Organization entities.
        public String? Resolution { get; set; } 

        //public MediaRequest(string title, string status, string deadline, int requestedBy) 
        //{ 
        //    Title = title;
        //    if (!Statuses.Values.Contains(status))
        //        throw new Exception($"there is no status with the value \"{status}\"");
        // //   this.status = Statuses.FirstOrDefault(x => x.Value == status).Key;
        //    Deadline = "Today 1:00PM"; // deadline;
        //    RequestedBy = requestedBy;  
        //}
    }
}
