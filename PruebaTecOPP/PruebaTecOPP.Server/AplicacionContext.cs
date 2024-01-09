using Microsoft.EntityFrameworkCore;
using PruebaTecOPP.Server.Models;
using System.Diagnostics.Contracts;

namespace PruebaTecOPP.Server
{

    public class AplicacionContext : DbContext
    {
        public DbSet<Empleado> Empleados { get; set; }
        public DbSet<TipoDocumento> TipoDocumentos { get; set; }
        public DbSet<Pais> Paises { get; set; }
        public DbSet<Area> Areas { get; set; }
        public DbSet<SubArea> SubAreas { get; set; }

        public AplicacionContext(DbContextOptions<AplicacionContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TipoDocumento>(tipoDocumentos =>
            {
                tipoDocumentos.ToTable("TipoDocumento");
                tipoDocumentos.HasKey(t => t.IdTipoDocumento);
                tipoDocumentos.Property(t => t.NombreDocumento);
                tipoDocumentos.Property(t => t.Mascara);
            });

            modelBuilder.Entity<Pais>(pais =>
            {
                pais.ToTable("Pais");
                pais.HasKey(p => p.IdPais);
                pais.Property(p => p.NombrePais);

            });

            modelBuilder.Entity<Area>(pais =>
            {
                pais.ToTable("Area");
                pais.HasKey(p => p.IdArea);
                pais.HasOne(p => p.Pais).WithMany(p => p.Areas).HasForeignKey(p => p.PaisId);
                pais.Property(p => p.NombreArea);

            });

            modelBuilder.Entity<SubArea>(subArea =>
            {
                subArea.ToTable("SubArea");
                subArea.HasKey(s => s.IdSubArea);
                subArea.HasOne(p => p.Area).WithMany(p => p.SubAreas).HasForeignKey(p => p.AreaId);
                subArea.Property(p => p.NombreSubArea);

            });

            modelBuilder.Entity<Empleado>(empleado =>
            {
                empleado.ToTable("Empleado");
                empleado.HasKey(c => c.IdEmpleado);
                empleado.HasOne(c => c.TipoDocumento).WithMany(t => t.Empleados).HasForeignKey(t => t.TipoDocumentoId);
                empleado.HasOne(c => c.SubArea).WithMany(c => c.Empleados).HasForeignKey(t => t.SubAreaId);
                empleado.Property(c => c.Nombre).IsRequired();
                empleado.Property(c => c.Apellido).IsRequired();
                empleado.Property(c => c.FechaContratacion).IsRequired();
                empleado.Property(c => c.NumeroDocumento).IsRequired(false);

            });
        }
    }

}
