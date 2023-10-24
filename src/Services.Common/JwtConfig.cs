namespace Services.Common
{
    public interface IJwtConfig
    {
        string Key { get; set; }

        string Audience { get; set; }

        string Issuer { get; set; }
    }

    public class JwtConfig : IJwtConfig
    {
        public string Key { get; set; } = string.Empty;

        public string Audience { get; set; } = string.Empty;

        public string Issuer { get; set; } = string.Empty;
    }
}
