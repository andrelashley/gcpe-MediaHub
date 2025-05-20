namespace gcpe_MediaHub.Server.Models.Repositories
{
    public interface IMediaContactRepository
    {
        Task <IEnumerable<MediaContact>> GetAll();
    }
}
