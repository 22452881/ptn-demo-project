
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
            UserDto user = _authService.Login(request);
           
            if(user != null)
            {
                return Ok("Harun Esrayı Sevmiyor");
            } else
            {
                return Unauthorized();
            }
            
        }

        [Route("allusers")]
        [HttpGet]
        public IActionResult GetAllUsers()
        {
            
            var users = _authService.GetAllUsers();
            return new OkObjectResult((ResponseStrings.FetchedSuccessfully, users, true, 200));
        }


        [Route("register")]
        [HttpPost]
        public IActionResult Register([FromBody] UserDto user)
        {
            int? userId = _authService.Register(user);
            if(userId != null)
            {
                return new OkObjectResult((ResponseStrings.AddedSuccesfully, user.Id, true, 200));
            }
            return new OkObjectResult((ResponseStrings.InsertFailed, user.Id, true, 400));
        }
    }
}
