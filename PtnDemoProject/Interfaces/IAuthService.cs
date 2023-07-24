using PtnDemoProject.DTO;

namespace PtnDemoProject.Interfaces
{
    public interface IAuthService
    {
        public UserDto Login(UserDto userDto);
        public List<UserDto> GetAllUsers();
        public int? Register(UserDto userDto);
    }
}
