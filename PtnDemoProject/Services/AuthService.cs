using Microsoft.IdentityModel.Tokens;
using PtnDemoProject.Data;
using PtnDemoProject.DTO;
using PtnDemoProject.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using static PtnDemoProject.Enum.AllEnums;

namespace PtnDemoProject.Services
{
    public class AuthService : IAuthService
    {
        private readonly DataContext _context;
        public AuthService(DataContext context)
        {
            _context = context;
        }

        public UserDto Login(UserDto request, ResponseDto responseDto)
        {
            try
            {
                if (request != null)
                {
                    UserDto? user = _context.Users.FirstOrDefault(u => u.Username == request.Username && u.Password == request.Password);
                    if(user != null)
                    {
                        string JwtToken = PrepareToken(user);
                        responseDto.Result = user;
                        responseDto.JwtToken = JwtToken;
                    }
                    return user;
                }
                return null;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            
        }

        private string PrepareToken(UserDto user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("Secret_Key_Signature_Secret_Key_Esra_Panteon"); // Secret key can be changed.
            ClaimsIdentity claimsIdentity = new ClaimsIdentity();
            claimsIdentity.AddClaim(new Claim("Userid", user.Id.ToString()));
            claimsIdentity.AddClaim(new Claim("Username", user.Username));

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = claimsIdentity,
                Expires = DateTime.Now.AddHours(ConstantValues.TokenExpirationHour),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenToWrite = tokenHandler.WriteToken(token);

            return tokenToWrite;
        }

        public List<UserDto> GetAllUsers()
        {
            try
            {
               return _context.Users.ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int? Register(UserDto user)
        {
            try
            {
                if(user != null && user.Email != null)
                {
                    var existingUser = _context.Users.FirstOrDefault(u => u.Username == user.Username || u.Email == user.Email);
                    if (existingUser == null)
                    {
                        _context.Users.Add(user);
                        _context.SaveChanges();
                        return user.Id;
                        
                    } 
                    else
                    {
                        return -1;
                    }

                }

                return null;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
    }
}
