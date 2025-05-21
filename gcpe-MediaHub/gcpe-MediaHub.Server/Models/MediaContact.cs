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
  
        public virtual IEnumerable<ContactOutlet>? Outlets { get; set; }
        public virtual ICollection<MediaRequest>? Requests { get; set; }

        //[ForeignKey ("Id")]
        //public virtual IEnumerable<ContactOutlet> Outlets { get; set; }
        //   public IEnumerable<MediaRequest>? Requests { get; set; }
        //   public string[]? Requests { get; set; } // TODO: should ultimately be a collection, not a string
        public DateTime? LastActive { get; set; }

    }
}
