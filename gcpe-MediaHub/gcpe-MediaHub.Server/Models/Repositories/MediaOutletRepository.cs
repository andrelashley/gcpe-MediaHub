
using gcpe_MediaHub.Server.Data;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace gcpe_MediaHub.Server.Models.Repositories
{
    public class MediaOutletRepository : IMediaOutletRepository
    {
        private readonly MediaHubContext _context;
        public MediaOutletRepository(MediaHubContext context) 
        {
            _context = context;
        }

        public IEnumerable<MediaOutlet> GetAll()
        {
            return _context.MediaOutlets;
        }

        public async Task<MediaOutlet?> GetOutletById(int id)
        {
            return await _context.MediaOutlets.FirstOrDefaultAsync(x => x.Id == id);
        }
    }
}
