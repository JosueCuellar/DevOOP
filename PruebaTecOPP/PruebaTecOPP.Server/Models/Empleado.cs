namespace PruebaTecOPP.Server.Models
{
    public class Empleado
    {
        public Guid IdEmpleado { get; set; }
        public Guid SubAreaId { get; set; }
        public Guid TipoDocumentoId { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public DateTime FechaContratacion { get; set; }
        public string NumeroDocumento { get; set; }

        public virtual TipoDocumento? TipoDocumento { get; set; }
        public virtual SubArea? SubArea { get; set; }

    }
}
