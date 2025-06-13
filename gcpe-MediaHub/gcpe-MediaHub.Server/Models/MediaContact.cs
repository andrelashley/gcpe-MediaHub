using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.CodeAnalysis;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace gcpe_MediaHub.Server.Models
{
    public class MediaContact
    {
        [Key]
        public int Id { get; set; }
        [BindRequired]
        public string? FirstName { get; set; }
        [BindRequired]
        public string? LastName { get; set; }
        [BindRequired]
        public bool IsPressGallery { get; set; }
        public string? JobTitle { get; set; }
        [BindRequired]
        public string? Email { get; set; }
        [BindRequired]
        public string? Phone { get; set; }
        public string? MobilePhone { get; set; }
        public string? CallInPhone { get; set; }
        public string? SocialMediaXURL { get; set; }
        public string? SocialMediaInstagramURL { get; set; }
        [BindRequired]
        public string? Location { get; set; }
 
        public string? OutletName { get; set; }
  
        public virtual ICollection<OutletAssociation>? Outlets { get; set; }
        public virtual ICollection<MediaRequest>? Requests { get; set; }

        public DateTime? LastActive { get; set; }

    }
}
