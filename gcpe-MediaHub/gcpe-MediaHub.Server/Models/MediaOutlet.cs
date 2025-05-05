using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace gcpe_MediaHub.Server.Models
{
    public class MediaOutlet
    {
        [Key]
        int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Phone { get; set; }
        [Required]
        public IEnumerable<string> MediaTypes { get; set; }
        [Required]
        public IEnumerable<string> Languages { get; set; }

        public MediaOutlet(string name, string email, string phone, List<string> mediaTypes, List<string> languages) 
        {
            Name = name;
            Email = email;
            Phone = phone;
            MediaTypes = mediaTypes;
            Languages = languages;
        }


    }
}
