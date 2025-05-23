
using gcpe_MediaHub.Server.Data;
using Microsoft.EntityFrameworkCore;

namespace gcpe_MediaHub.Server.Models.Repositories
{
    public class MediaOutletRepository : IMediaOutletRepository
    {
        private readonly MediaHubContext _context;
        public MediaOutletRepository(MediaHubContext context) 
        {
            _context = context;
        }

        public async Task<MediaOutlet?> GetOutletById(int id)
        {
            return await _context.MediaOutlets.FirstOrDefaultAsync(x => x.Id == id);
        }
    }
}
