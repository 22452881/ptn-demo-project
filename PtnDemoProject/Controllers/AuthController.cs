
using Microsoft.AspNetCore.Mvc;
using PtnDemoProject.Data;
using PtnDemoProject.DTO;
using PtnDemoProject.Interfaces;

namespace PtnDemoProject.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(DataContext context, IAuthService authService)
        {
            _authService = authService;
        }

        [Route("login")]
        [HttpPost]
        public IActionResult Login([FromBody] UserDto request)
        {
            ResponseDto response = new();
            UserDto user = _authService.Login(request, response);
            if(user != null)
            {
                return new OkObjectResult(response);
            } 
            
            return Unauthorized();
            
            
        }


        [Route("register")]
        [HttpPost]
        public IActionResult Register([FromBody] UserDto user)
        {
            int? userId = _authService.Register(user);
            if(userId == null)
            {
                return new BadRequestResult();
                
            }
            else if(userId == -1)
            {
                return new ConflictResult();
            } 
            else
            {
                return new OkObjectResult(userId);
            }
        }
    }
}
