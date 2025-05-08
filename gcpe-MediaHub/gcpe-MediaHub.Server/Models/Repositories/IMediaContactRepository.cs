namespace gcpe_MediaHub.Server.Models.Repositories
{
    public interface IMediaContactRepository
    {
        IEnumerable<MediaContact> GetAll();
    }
}
