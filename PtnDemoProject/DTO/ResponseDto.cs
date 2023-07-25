using static PtnDemoProject.Enum.AllEnums;

namespace PtnDemoProject.DTO
{
    public class ResponseDto
    {
        private string StatusMessage { get; set; }
        public object Result { get; set; }
        public bool operationStatus { get; set; }
        public int StatusCode { get; set; }
        public string? JwtToken { get; set; }

        public ResponseStrings ResponseMessage { get; set; }
        public ResponseDto()
        {

        }

        public ResponseDto(ResponseStrings _message, object _result, int statusCode)
        {
            StatusMessage = _message.ToString();
            Result = _result;
            StatusCode = statusCode;
        }

    }
}
