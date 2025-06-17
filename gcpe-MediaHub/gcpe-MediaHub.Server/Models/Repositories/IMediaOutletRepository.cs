namespace gcpe_MediaHub.Server.Models.Repositories
{
    public interface IMediaOutletRepository
    {
        Task<IEnumerable<MediaOutlet> > GetAll();
        Task<MediaOutlet?> GetOutletById(int id);
    }
}
