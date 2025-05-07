namespace gcpe_MediaHub.Server.Models.Repositories
{
    public interface IMedacContactRepository
    {
        IEnumerable<MediaContact> GetAll();
    }
}
