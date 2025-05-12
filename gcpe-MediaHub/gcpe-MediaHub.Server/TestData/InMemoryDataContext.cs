using gcpe_MediaHub.Server.Models;
using System.IO;
using Newtonsoft.Json;

namespace gcpe_MediaHub.Server.TestData
{
    public class InMemoryDataContext
    {
        public List<MediaContact> MediaContacts { get; set; }
        public List<MediaRequest> MediaRequests { get; set; }

        public InMemoryDataContext()
        {
            MediaContacts = new List<MediaContact>();
            MediaRequests = new List<MediaRequest>();
        }

        public void SeedContactData(List<MediaContact> contacts)
        {
            MediaContacts.AddRange(contacts);
        }
        public void SeedRequestData(List<MediaRequest> requests)
        {
            MediaRequests.AddRange(requests);
        }
    }

    public class DataLoader
    {
        public static List<MediaContact> LoadMediaContacts()
        {
            var json = File.ReadAllText("./TestData/MediaContacts.json");
            return JsonConvert.DeserializeObject<List<MediaContact>>(json);
        }
        public static List<MediaRequest> LoadMediaRequests()
        {
            var json = File.ReadAllText("./TestData/MediaRequests.json");
            return JsonConvert.DeserializeObject<List<MediaRequest>>(json);
        }
    }
}
