using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace PtnDemoProject.Attributes
{
    public class CustomAuthorizeAttribute : TypeFilterAttribute
    {
        public CustomAuthorizeAttribute(params string[] claim) : base(typeof(AuthorizeFilter))
        {
            Arguments = new object[] { claim };
        }

        public class AuthorizeFilter : IAuthorizationFilter
        {
            readonly string[] _claim;

            public AuthorizeFilter(IConfiguration configuration, params string[] claim)
            {
                //Rol yapısı olursa
                _claim = claim;
            }

            public void OnAuthorization(AuthorizationFilterContext context)
            {

                HttpStatusCode status = GetStatusCode(context);

                if (status == HttpStatusCode.Unauthorized)
                {
                    context.Result = new UnauthorizedResult();
                }
                else if (status == HttpStatusCode.Forbidden)
                {
                    context.Result = new ForbidResult();
                }
                else if (status != HttpStatusCode.OK)
                {
                    context.Result = new NotFoundObjectResult(status);
                }

            }

            private HttpStatusCode GetStatusCode(AuthorizationFilterContext context)
            {
                if (context != null)
                {
                    string token = null;

                    context.HttpContext.Request.Headers.TryGetValue("Authorization", out Microsoft.Extensions.Primitives.StringValues bearer);

                    if (bearer.Count > 0 && bearer[0].StartsWith("Bearer "))
                    {
                        token = bearer[0][7..];
                    }

                    if (!string.IsNullOrWhiteSpace(token))
                    {

                        bool isValid = ValidateToken(token);

                            if (isValid)
                            {
                                return HttpStatusCode.OK;
                            }
                            else
                            {
                                return HttpStatusCode.Forbidden;
                            }
                    } 
                    else
                    {
                        return HttpStatusCode.Unauthorized;
                    }
                } 
                else
                {
                    return HttpStatusCode.Unauthorized;
                }
            }

            private bool ValidateToken(string token)
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes("Secret_Key_Signature_Secret_Key_Esra_Panteon"); // Secret key can be changed.
                try
                {
                    tokenHandler.ValidateToken(token, new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(key),
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        ClockSkew = TimeSpan.Zero
                    }, out SecurityToken validatedToken);

                    //Rol eklenirse kullanılablir
                    var jwtToken = (JwtSecurityToken)validatedToken;

                    return true;
                }
                catch
                {
                    return false;
                }
            }
        }
    }
}
