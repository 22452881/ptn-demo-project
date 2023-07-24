using Microsoft.IdentityModel.Tokens;
using Microsoft.VisualBasic;
using PtnDemoProject.Data;
using PtnDemoProject.Interfaces;
using PtnDemoProject.Model;
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

        public User Login(User request)
        {
            try
            {
               
                if (request != null)
                {
                    var users = _context.Users.ToList();
                    User? user = _context.Users.FirstOrDefault(u => u.Username == request.Username && u.Password == request.Password);
                    if(user != null)
                    {
                        request.JwtToken = PrepareToken(user);
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

        private string PrepareToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("Signature_Secret_Key"); // Secret key can be changed.
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

        public List<User> GetAllUsers()
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

        public int? Register(User user)
        {
            try
            {
                //Object dololuğu ve mail doğruluğu kontrol edilecek
                if(user != null && user.Email != null)
                {
                    _context.Users.Add(user);
                    _context.SaveChanges();
                    return user.Id;
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
