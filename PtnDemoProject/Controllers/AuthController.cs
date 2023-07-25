
using Microsoft.AspNetCore.Mvc;
using PtnDemoProject.Data;
using PtnDemoProject.DTO;
using PtnDemoProject.Interfaces;
using System.Linq;
using static PtnDemoProject.Enum.AllEnums;

namespace PtnDemoProject.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IAuthService _authService;

        public AuthController(DataContext context, IAuthService authService)
        {
            _context = context;
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

        [Route("allusers")]
        [HttpGet]
        public IActionResult GetAllUsers()
        {
            
            var users = _authService.GetAllUsers();
            return new OkObjectResult(users);

        }


        [Route("register")]
        [HttpPost]
        public IActionResult Register([FromBody] UserDto user)
        {
            int? userId = _authService.Register(user);
            if(userId != null)
            {
                return new OkObjectResult(userId);
            }
            return new OkObjectResult(userId);
        }
    }
}
