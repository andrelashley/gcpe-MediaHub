using gcpe_MediaHub.Server.Models;
using gcpe_MediaHub.Server.Models.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace gcpe_MediaHub.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MediaContactsController : ControllerBase
    {
        private readonly IMediaContactRepository _contactRepository;
        public MediaContactsController(IMediaContactRepository contactRepository)
        {
            _contactRepository = contactRepository;
        }

        [HttpGet(Name = "GetMediaContacts")]

        public async Task<IActionResult> GetMediaContacts()
        {
            IEnumerable<MediaContact> contacts = await _contactRepository.GetAll();

            return Ok(contacts);
        }

        [HttpPost(Name = "CreateMediaContact")]
        public async Task<IActionResult> CreateMediaContact([FromBody] string value)
        {
            try
            {

                return Ok();
            }
            catch(Exception ex)
            {
                string x = ex.Message;
                return BadRequest(ex.Message);
            }
        }
    }
}
