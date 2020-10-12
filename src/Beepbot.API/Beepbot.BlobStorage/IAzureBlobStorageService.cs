using System.Threading.Tasks;

using Beepbot.BlobStorage.Dtos;

namespace Beepbot.BlobStorage
{
    public interface IAzureBlobStorageService
    {
        string GenerateSASToken();
        string GenerateSASTokenForContainer(string containerName);
        Task<string> UploadAudioFileForGuild(AudioFileDto audio);
    }
}