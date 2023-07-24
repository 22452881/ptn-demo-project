using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using PtnDemoProject.DTO;

namespace PtnDemoProject.Data
{
    public class DataContext : DbContext
    {
        public DbSet<UserDto> Users { get; set; }

        public DataContext(DbContextOptions<DataContext> options)
            : base(options) { }
    }

}