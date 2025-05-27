namespace gcpe_MediaHub.Server.Models.Repositories
{
    public interface IMediaOutletRepository
    {
        IEnumerable<MediaOutlet> GetAll();
        Task<MediaOutlet?> GetOutletById(int id);
    }
}
