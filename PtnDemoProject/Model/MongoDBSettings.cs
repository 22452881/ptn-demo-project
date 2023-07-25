namespace PtnDemoProject.Model
{
    public class MongoDBSettings
    {
        public string ConnectionURI { get; set; } = null!;
        public string DatabaseName { get; set; } = null!;
        public string ConfigurationCollectionName { get; set; } = null!;
        public string BuildingTypeCollectionName { get; set; } = null!;
    }
}
