using Google.Apis.Util;
using System.Reflection;

namespace PtnDemoProject.Enum
{
    public class AllEnums
    {
        public static class ConstantValues
        {
            public const int TokenExpirationHour = 1;
        }
        public enum ResponseStrings
        {
            // TODO ktolga: Localization için düzenlenmeli bu kısım
            Successful = 0,
            AddedSuccesfully= 1,
            UpdatedSuccessfully = 2,
            DeletedSuccessfully = 3,
            FetchedSuccessfully = 4,
            InsertFailed = 5,
            UpdateFailed = 6,
            DeleteFailed = 7,
            Unauthorize = 8,

        }

    }
}
