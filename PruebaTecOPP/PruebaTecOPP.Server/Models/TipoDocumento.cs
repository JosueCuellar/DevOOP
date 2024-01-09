using System.Diagnostics.Contracts;
using System.Text.Json.Serialization;

namespace PruebaTecOPP.Server.Models
{
    public class TipoDocumento
    {
        public Guid IdTipoDocumento { get; set; }
        public string NombreDocumento { get; set; }
        public string Mascara { get; set; }

        [JsonIgnore]
        public virtual ICollection<Empleado>? Empleados { get; set; }
    }
}
