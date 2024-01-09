using System.Text.Json.Serialization;

namespace PruebaTecOPP.Server.Models
{
    public class Pais
    {
        public Guid IdPais { get; set; }
        public string NombrePais { get; set; }

        //Un Pais tiene muchas Areas
        [JsonIgnore]
        public virtual ICollection<Area>? Areas { get; set; }
    }
}
