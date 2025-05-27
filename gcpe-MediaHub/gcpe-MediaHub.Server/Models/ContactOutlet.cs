using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace gcpe_MediaHub.Server.Models
{
    public class ContactOutlet // association between MediaContact, and a MediaOutlet
    {
        [Key] 
        public int Id { get; set; }

        [Required]
        public int ContactId { get; set; }
        [ForeignKey("ContactId")]
        public MediaContact? Contact { get; set; }

        [Required]
        public int OutletId { get; set; }
        [ForeignKey("OutletId")]
        public MediaOutlet? Outlet { get; set; }

        [Required]
        public string? ContactEmail { get; set; }

        public string? PhonePrimary { get; set; }
        public string? PhoneMobile { get; set; }
        public string? PhoneCallIn { get; set; }
        public bool NoLongerWorksHere { get; set; } = false;
        
        public DateTime? LastRequestDate { get; set; }

        public ContactOutlet(int id, int contactId, int outletId, string contactEmail )
        {
            Id = id;
            ContactId = contactId;
            OutletId = outletId;
            ContactEmail = contactEmail;
        }
    }
}
