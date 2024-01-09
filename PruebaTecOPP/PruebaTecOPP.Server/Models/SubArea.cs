using System.Diagnostics.Contracts;
using System.Text.Json.Serialization;

namespace PruebaTecOPP.Server.Models
{
    public class SubArea
    {
        public Guid IdSubArea { get; set; }
        public string NombreSubArea { get; set; }
        public Guid AreaId { get; set; }

        //Una sub area tiene un area
        public virtual Area? Area { get; set; }

        //Unaa sub area tiene muchos empleados
        [JsonIgnore]
        public virtual ICollection<Empleado>? Empleados { get; set; }
    }
}
