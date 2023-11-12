using System.Security.Cryptography.X509Certificates;

namespace API.DTOs;

public class PhotoDto
{
    public int Id { get; set; }
    public string Url { get; set; }
    public bool isMain { get; set; }
}
