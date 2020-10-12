using System;
using System.Threading.Tasks;

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;

using Azure;
using Azure.Storage;
using Azure.Storage.Blobs;
using Azure.Storage.Sas;

using Beepbot.BlobStorage.Dtos;
using Beepbot.Domain.Options;
using Microsoft.Azure.Storage;

namespace Beepbot.BlobStorage
{
    public class AzureBlobStorageService : IAzureBlobStorageService
    {
        private readonly AzureBlobStorageOptions options;
        private readonly IConfiguration configuration;

        public AzureBlobStorageService(IConfiguration configuration, IOptions<AzureBlobStorageOptions> options)
        {
            this.options = options.Value;
            this.configuration = configuration;
        }

        public string GenerateSASToken()
        {
            CloudStorageAccount storageAccount = CloudStorageAccount.Parse(configuration.GetConnectionString("AzureBlobStorage"));

            var policy = new SharedAccessAccountPolicy
            {
                SharedAccessExpiryTime = DateTimeOffset.UtcNow.AddMinutes(5),
                Permissions = SharedAccessAccountPermissions.Read
            };

            return storageAccount.GetSharedAccessSignature(policy);
        }

        public string GenerateSASTokenForContainer(string containerName)
        {
            BlobSasBuilder builder = new BlobSasBuilder()
            {
                BlobContainerName = containerName,
                Resource = "c", // "c" = container, "b" = blob
                StartsOn = DateTimeOffset.UtcNow,
                ExpiresOn = DateTimeOffset.UtcNow.AddHours(3)
            };

            builder.SetPermissions(BlobContainerSasPermissions.Read);

            var creds = new StorageSharedKeyCredential(options.AccountName, options.Key);

            return builder.ToSasQueryParameters(creds).ToString();
        }

        public async Task<string> UploadAudioFileForGuild(AudioFileDto audio)
        {
            var connectionString = configuration.GetConnectionString("AzureBlobStorage");

            var blobServiceClient = new BlobServiceClient(connectionString);

            BlobContainerClient blobContainerClient;

            try
            {
                // Create container for guild
                blobContainerClient = await blobServiceClient.CreateBlobContainerAsync(audio.GuildId);
            }
            catch (RequestFailedException)
            {
                // Container exists
                blobContainerClient = blobServiceClient.GetBlobContainerClient(audio.GuildId);
            }

            // Ensure unique name
            var randomPrefix = Guid.NewGuid();

            var blobName = $"soundboard/{randomPrefix}_{audio.Name}";

            var url =  blobContainerClient.Uri.ToString() + "/" + blobName;
                
            await blobContainerClient.UploadBlobAsync(blobName, audio.FileStream);

            return url;
        }
    }
}