using gcpe_MediaHub.Server.Models;
using gcpe_MediaHub.Server.Models.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace gcpe_MediaHub.Server.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class MediaOutletsController: ControllerBase
    {
        private readonly IMediaOutletRepository _outletRepository;
        public MediaOutletsController(IMediaOutletRepository outletRepository)
        {
            _outletRepository = outletRepository;
        }

        [HttpGet(Name = "GetMediaOutlets")]
        public async Task<IActionResult> GetMediaOutlets()
        {
            IEnumerable<MediaOutlet> outlets = await _outletRepository.GetAll();

            return Ok(outlets);
        }
    }
}
