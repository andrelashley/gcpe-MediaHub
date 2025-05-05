namespace gcpe_MediaHub.Server.Models
{
    public class MediaContact
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public IEnumerable<MediaOutlet> Outlets { get; set; }
        public IEnumerable<MediaRequest>? Requests { get; set; }

        public MediaContact(string firstName, string lastName, string email, string phone, List<MediaOutlet> outlets)
        {
            FirstName = firstName;
            LastName = lastName;
            Email = email;
            Phone = phone;
            Outlets = outlets;
        }
    }
}
