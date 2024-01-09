using System.Text.Json.Serialization;

namespace PruebaTecOPP.Server.Models
{
    public class Area
    {
        public Guid IdArea { get; set; }
        public string NombreArea { get; set; }
        public Guid PaisId { get; set; }

        //Un Area tiene un Pais
        public virtual Pais? Pais { get; set; }

        [JsonIgnore]
        //Una Area tiene muchas subAreas
        public virtual ICollection<SubArea>? SubAreas { get; set; }
    }
}
