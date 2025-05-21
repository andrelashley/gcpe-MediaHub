using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace gcpe_MediaHub.Server.Models
{
    public class MediaOutlet
    {
        [Key]
        public int Id { get; set; }
        [BindRequired]
        public string Name { get; set; }
        [BindRequired]
        public string Email { get; set; }
        [BindRequired]
        public string PrimaryPhone { get; set; }
        [BindRequired]
        public string NewsDeskPhone { get; set; }
        [BindRequired]
        public IEnumerable<string> MediaTypes { get; set; }
        //[Required]
        //public IEnumerable<string> Languages { get; set; }
        [BindRequired]
        public string Language { get; set; }
        public string? LanguageShortName { get; set; }
        [BindRequired]
        public bool IsMajorMedia { get; set; }
        [BindRequired]
        public string? WebsiteURL { get; set; }
        public string? SocialMediaXURL { get; set; }
        public string? SocialMediaInstagramURL { get; set; }
        public string? Address { get; set; }
        public string? Location { get; set; }


        //public MediaOutlet(string name, string email, string phone, List<string> mediaTypes, List<string> languages) 
        //{
        //    Name = name;
        //    Email = email;
        //    Phone = phone;
        //    MediaTypes = mediaTypes;
        //    Languages = languages;
        //}


    }
}
