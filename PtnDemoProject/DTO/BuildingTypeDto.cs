using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace PtnDemoProject.DTO
{
    public class BuildingTypeDto
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public string Name { get; set; }

    }
}
