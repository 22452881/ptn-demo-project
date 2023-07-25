
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PtnDemoProject.Attributes;
using PtnDemoProject.DTO;
using PtnDemoProject.Services;

namespace PtnDemoProject.Controllers
{
    [CustomAuthorizeAttribute]
    [ApiController]
    [Route("api/[controller]")]
    public class ConfigurationController : ControllerBase
    {
        private readonly ConfigurationService _mongoService;

        public ConfigurationController(ConfigurationService mongoDBService)
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
        [Route("{*id}")]
        public async Task<IActionResult> DeleteConfiguration(string id)
        {
            await _mongoService.DeleteConfigAsync(id);
            return new OkResult();
        }
    }
}
