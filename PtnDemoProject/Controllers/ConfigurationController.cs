using Microsoft.AspNetCore.Mvc;
using PtnDemoProject.DTO;
using PtnDemoProject.Services;

namespace PtnDemoProject.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ConfigurationController : ControllerBase
    {
        private readonly MongoDBService _mongoService;

        public ConfigurationController(MongoDBService mongoDBService)
        {
            _mongoService = mongoDBService;
        }

        [HttpGet]
        public async Task<IActionResult> GetConfigurations()
        {
            List<ConfigurationDto> configurations = await _mongoService.GetAllConfigurationsAsync();
            return new OkObjectResult(configurations);
        }

        [HttpPost]
        public async Task<IActionResult> CreateConfiguration([FromBody] ConfigurationDto configDto)
        {
            await _mongoService.CreateConfigAsync(configDto);
            return new OkResult();
        }

        [HttpDelete("id")]
        public async Task<IActionResult> DeleteConfiguration(string id)
        {
            await _mongoService.DeleteConfigAsync(id);
            return new OkResult();
        }
    }
}
