using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using PtnDemoProject.DTO;
using PtnDemoProject.Model;

namespace PtnDemoProject.Services
{
    public class MongoDBService
    {
        private readonly IMongoCollection<ConfigurationDto> _configurationCollection;
        private readonly IMongoCollection<BuildingTypeDto> _buildingTypeCollection;

        public MongoDBService(IOptions<MongoDBSettings> mongoDBSettings)
        {
            MongoClient client = new (mongoDBSettings.Value.ConnectionURI);
            IMongoDatabase database = client.GetDatabase(mongoDBSettings.Value.DatabaseName);
            _configurationCollection = database.GetCollection<ConfigurationDto>(mongoDBSettings.Value.ConfigurationCollectionName);
            _buildingTypeCollection = database.GetCollection<BuildingTypeDto>(mongoDBSettings.Value.BuildingTypeCollectionName);
        }

        public async Task<List<ConfigurationDto>> GetAllConfigurationsAsync() {
            try
            {
                return await _configurationCollection.Find(new BsonDocument()).ToListAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task CreateConfigAsync(ConfigurationDto config) {
            try
            {
                await _configurationCollection.InsertOneAsync(config);
                return;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            
        }

        public async Task DeleteConfigAsync(string id) {
            try
            {
                FilterDefinition<ConfigurationDto> filter = Builders<ConfigurationDto>.Filter.Eq("Id", id);
                await _configurationCollection.DeleteOneAsync(filter);
                return;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<BuildingTypeDto>> GetAllBuildingTypesAsync()
        {
            try
            {
                return await _buildingTypeCollection.Find(new BsonDocument()).ToListAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task CreateBuildingTypeAsync(BuildingTypeDto buildingType)
        {
            try
            {
                await _buildingTypeCollection.InsertOneAsync(buildingType);
                return;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task DeleteBuildingTypeAsync(string id)
        {
            try
            {
                FilterDefinition<BuildingTypeDto> filter = Builders<BuildingTypeDto>.Filter.Eq("Id", id);
                await _buildingTypeCollection.DeleteOneAsync(filter);
                return;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
