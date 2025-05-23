namespace gcpe_MediaHub.Server.Models.Repositories
{
    public interface IMediaOutletRepository
    {
        Task<MediaOutlet?> GetOutletById(int id);
    }
}
