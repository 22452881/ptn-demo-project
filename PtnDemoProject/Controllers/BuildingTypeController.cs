using Microsoft.AspNetCore.Mvc;
using PtnDemoProject.Attributes;
using PtnDemoProject.DTO;
using PtnDemoProject.Services;

namespace PtnDemoProject.Controllers
{
    [CustomAuthorizeAttribute]
    [ApiController]
    [Route("api/[controller]")]
    public class BuildingTypeController : Controller
    {
        // BuildingType eklenmek vs. istenirse diye yazıldı.
        private readonly ConfigurationService _mongoService;

        public BuildingTypeController(ConfigurationService mongoDBService)
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
        [Route("{*id}")]
        public async Task<IActionResult> DeleteBuildingType(string id)
        {
            await _mongoService.DeleteBuildingTypeAsync(id);
            return new OkResult();
        }
    }
}
