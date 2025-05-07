using gcpe_MediaHub.Server.Models;
using System.IO;
using Newtonsoft.Json;

namespace gcpe_MediaHub.Server.TestData
{
    public class InMemoryDataContext
    {
        public List<MediaContact> MediaContacts { get; set; }

        public InMemoryDataContext()
        {
            MediaContacts = new List<MediaContact>();
        }

        public void SeedData(List<MediaContact> contacts)
        {
            MediaContacts.AddRange(contacts);
        }
    }

    public class DataLoader
    {
        public static List<MediaContact> LoadMediaContacts()
        {
            var json = File.ReadAllText("./TestData/MediaContacts.json");
            return JsonConvert.DeserializeObject<List<MediaContact>>(json);
        }
    }
}
