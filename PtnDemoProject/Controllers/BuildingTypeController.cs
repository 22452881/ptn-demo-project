using Microsoft.AspNetCore.Mvc;
using PtnDemoProject.DTO;
using PtnDemoProject.Services;

namespace PtnDemoProject.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BuildingTypeController : Controller
    {
        private readonly MongoDBService _mongoService;

        public BuildingTypeController(MongoDBService mongoDBService)
        {
            _mongoService = mongoDBService;
        }

        [HttpGet]
        public async Task<IActionResult> GetBuildings()
        {
            List<BuildingTypeDto> buildings = await _mongoService.GetAllBuildingTypesAsync();
            return new OkObjectResult(buildings);
        }

        [HttpPost]
        public async Task<IActionResult> CreateBuildingType([FromBody] BuildingTypeDto buildingTypeDto)
        {
            await _mongoService.CreateBuildingTypeAsync(buildingTypeDto);
            return new OkResult();
        }

        [HttpDelete("id")]
        public async Task<IActionResult> DeleteBuildingType(string id)
        {
            await _mongoService.DeleteBuildingTypeAsync(id);
            return new OkResult();
        }
    }
}
