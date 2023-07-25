using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using PtnDemoProject.Data;
using PtnDemoProject.Interfaces;
using PtnDemoProject.Model;
using PtnDemoProject.Services;

var builder = WebApplication.CreateBuilder(args);

IConfiguration _configuration = builder.Configuration;

builder.Services.AddCors(options =>
{
    options.AddPolicy("local",
    builder =>
    {
        builder.WithOrigins("http://localhost:44429")
               .AllowAnyHeader()
               .AllowAnyMethod()
               .SetIsOriginAllowed((x) => true)
               .AllowCredentials();
    });
});

string connStr = _configuration.GetConnectionString("DefaultConnection");

if(!string.IsNullOrEmpty(connStr))
{
    var serverVersion = ServerVersion.AutoDetect(connStr);

    builder.Services.AddDbContextPool<DataContext>(
        options =>
        {
            options.UseMySql(connStr, serverVersion);
        });

}

// Add services to the container.

builder.Services.AddControllersWithViews();
builder.Services.AddTransient<IAuthService, AuthService>();
builder.Services.Configure<MongoDBSettings>(builder.Configuration.GetSection("MongoDB"));
builder.Services.AddSingleton<ConfigurationService>();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Panteon Demo", Version = "v1" });
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = @"JWT Authorization header using the Bearer scheme. \r\n\r\n 
                      Enter 'Bearer' [space] and then your token in the text input below.
                      \r\n\r\nExample: 'Bearer 12345abcdef'",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        BearerFormat = "JWT",
        Scheme = "Bearer"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement()
                  {
                    {
                      new OpenApiSecurityScheme
                      {
                        Reference = new OpenApiReference
                          {
                            Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                          },
                          Scheme = "oauth2",
                          Name = "Bearer",
                          In = ParameterLocation.Header,

                        },
                        new List<string>()
                      }
                    });

});
var app = builder.Build();
app.UseRouting();
app.UseCors("local");
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
}
app.UseSwagger();
app.UseSwaggerUI();

app.UseStaticFiles();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");



app.Run();
