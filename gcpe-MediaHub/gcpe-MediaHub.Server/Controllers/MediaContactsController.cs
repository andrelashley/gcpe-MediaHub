using gcpe_MediaHub.Server.Models;
using gcpe_MediaHub.Server.Models.Repositories;
using gcpe_MediaHub.Server.TestData;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace gcpe_MediaHub.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MediaContactsController : Controller
    {
        private readonly InMemoryDataContext _context;
        private readonly IMediaContactRepository _contactRepository;
        public MediaContactsController(IMediaContactRepository contactRepository)
        {
            _contactRepository = contactRepository;
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet(Name = "GetMediaContacts")]

        public async Task <ActionResult<IEnumerable<MediaContact>>> GetMediaContacts()
        {
            IEnumerable<MediaContact> contacts = await _contactRepository.GetAll();

            return Ok(contacts);
        }
    }
}
