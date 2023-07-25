using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace PtnDemoProject.DTO
{
    public class ConfigurationDto
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public string BuildingTypeId { get; set; }
        public string? BuildingType { get; set; }
        public double BuildingCost { get; set; }
        public int ConstructionTime { get; set; }

    }
}
