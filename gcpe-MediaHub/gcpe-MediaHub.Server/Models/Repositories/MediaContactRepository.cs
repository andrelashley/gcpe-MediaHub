
using gcpe_MediaHub.Server.Data;
using gcpe_MediaHub.Server.TestData;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;

namespace gcpe_MediaHub.Server.Models.Repositories
{
    public class MediaContactRepository : IMediaContactRepository
    {
        private readonly MediaHubContext _context;
        public MediaContactRepository(MediaHubContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<MediaContact>> GetAll()
        {
            IEnumerable<MediaContact> contacts = await _context.MediaContacts
              //  .Include(x => x.Outlets)
               // .Include(x => x.Requests)
                .ToListAsync();
            return contacts;       
        }
    }
}
