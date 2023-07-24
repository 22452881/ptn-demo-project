using Microsoft.EntityFrameworkCore;
using PtnDemoProject.Data;
using PtnDemoProject.DTO;
using PtnDemoProject.Interfaces;

namespace PtnDemoProject.Services
{
    public class AuthService : IAuthService
    {
        private readonly DataContext _context;
        public AuthService(DataContext context)
        {
            _context = context;
        }

        public UserDto Login(UserDto request)
        {
            try
            {
               
                if (request != null)
                {
                    var users = _context.Users.ToList();
                    UserDto? user = _context.Users.FirstOrDefault(u => u.Username == request.Username && u.Password == request.Password);
                    return user;
                }
                return null;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            
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
