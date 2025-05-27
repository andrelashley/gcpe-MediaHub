
using gcpe_MediaHub.Server.Data;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace gcpe_MediaHub.Server.Models.Repositories
{
    public class MediaContactRepository : IMediaContactRepository
    {
        private readonly MediaHubContext _context;
        private readonly IMediaOutletRepository _mediaOutletRepository;
        public MediaContactRepository(MediaHubContext context, 
            IMediaOutletRepository mediaOutletRepository)
        {
            _context = context;
            _mediaOutletRepository = mediaOutletRepository;
        }

        public async Task<IEnumerable<MediaContact>> GetAll()
        {
            try
            {

                IEnumerable<MediaContact> contacts = await _context.MediaContacts
                    .Include(x => x.Outlets).ThenInclude(y => y.Outlet)  /*No clue why this isn't working */
                    .Include(x => x.Requests)
                .ToListAsync();
                /*well, this sucks */
                foreach (MediaContact contact in contacts)
                {
                    contact.Outlets = _context.ContactOutlets.Where(x => x.ContactId == contact.Id).ToList();
                    //booooo! 
                    foreach (ContactOutlet contactOutlet in contact.Outlets)
                    {
                        contactOutlet.Outlet = await _mediaOutletRepository.GetOutletById(contactOutlet.OutletId);
                    }
                }
                return contacts;
            }
            catch (Exception ex)
            {
                string x = ex.Message;
                return null;
            }
        }
    }
}
