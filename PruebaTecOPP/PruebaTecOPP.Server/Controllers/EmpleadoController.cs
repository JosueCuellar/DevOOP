using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PruebaTecOPP.Server.Models;
using System.Diagnostics.Contracts;

namespace PruebaTecOPP.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmpleadoController : ControllerBase
    {
        private readonly AplicacionContext _context;

        public EmpleadoController(AplicacionContext context)
        {
            _context = context;
        }

        //------Los endpoints se encargan de la busqueda dinamica
        [HttpGet]
        [Route("ListaNombreAndDocumento/{page:int}/{nombre}/{documento}")]
        public async Task<ActionResult> ListaNombreDocumento(int? page, string nombre, string documento)
        {
            int pageSize = 2;
            int pageNumber = page ?? 1;
            List<Empleado> empleados = new List<Empleado>();
            empleados = await _context.Empleados
                .Where(c => c.Nombre.Contains(nombre) && c.NumeroDocumento.Contains(documento))
                .Include(c => c.SubArea)
                                       .Include(c => c.SubArea.Area)
                                       .Include(c => c.SubArea.Area.Pais)
                                       .Include(c => c.TipoDocumento)
                .OrderByDescending(c => c.IdEmpleado).ToListAsync();
            if (empleados == null)
            {
                return NotFound();
            }
            else
            {
                int count = empleados.Count;
                int pages = (int)Math.Ceiling(count / (double)pageSize); ;

                var results = new
                {
                    info = new
                    {
                        count = count,
                        pages = pages,
                    },
                    results = empleados.Skip((pageNumber - 1) * pageSize).Take(pageSize)
                };

                return Ok(results);
            }
        }

        [HttpGet]
        [Route("ListaNombre/{page:int}/{nombre}")]
        public async Task<ActionResult> ListaNombre(int? page, string nombre)
        {
            int pageSize = 2; // Define tu límite de elementos por página
            int pageNumber = page ?? 1;
            List<Empleado> empleados = new List<Empleado>();
            empleados = await _context.Empleados
                .Where(c => c.Nombre.Contains(nombre))
                .Include(c => c.SubArea)
                                       .Include(c => c.SubArea.Area)
                                       .Include(c => c.SubArea.Area.Pais)
                                       .Include(c => c.TipoDocumento)
                .OrderByDescending(c => c.IdEmpleado).ToListAsync();

            if (empleados == null)
            {
                return NotFound();
            }
            else
            {
                int count = empleados.Count;
                int pages = (int)Math.Ceiling(count / (double)pageSize);
                var results = new
                {
                    info = new
                    {
                        count = count,
                        pages = pages,
                    },
                    results = empleados.Skip((pageNumber - 1) * pageSize).Take(pageSize)
                };

                return Ok(results);
            }
        }

        [HttpGet]
        [Route("ListaDocumento/{page:int}/{documento}")]
        public async Task<ActionResult> ListaDocumento(int? page, string documento)
        {
            int pageSize = 2; // Define tu límite de elementos por página
            int pageNumber = page ?? 1;
            List<Empleado> empleados = new List<Empleado>();
            empleados = await _context.Empleados
                                            .Where(c => c.NumeroDocumento.Contains(documento))
                                            .Include(c => c.SubArea)
                                               .Include(c => c.SubArea.Area)
                                               .Include(c => c.SubArea.Area.Pais)
                                               .Include(c => c.TipoDocumento)
                                            .OrderByDescending(c => c.IdEmpleado).ToListAsync();

            if (empleados == null)
            {
                return NotFound();
            }
            else
            {
                int count = empleados.Count;
                int pages = (int)Math.Ceiling(count / (double)pageSize);
                var results = new
                {
                    info = new
                    {
                        count = count,
                        pages = pages,

                    },
                    results = empleados.Skip((pageNumber - 1) * pageSize).Take(pageSize)
                };

                return Ok(results);
            }
        }

        [HttpGet]
        [Route("ListaAll/{page:int}")]
        public async Task<ActionResult> ListaAll(int? page)
        {
            int pageSize = 2; // Define tu límite de elementos por página
            int pageNumber = page ?? 1;
            List<Empleado> empleados = new List<Empleado>();
            empleados = await _context.Empleados
                                       .Include(c => c.SubArea)
                                       .Include(c => c.SubArea.Area)
                                       .Include(c => c.SubArea.Area.Pais)
                                       .Include(c => c.TipoDocumento)
                                       .OrderByDescending(c => c.IdEmpleado)
                                       .ToListAsync();
            if (empleados == null)
            {
                return NotFound();
            }
            else
            {
                int count = empleados.Count;
                int pages = (int)Math.Ceiling(count / (double)pageSize);


                var results = new
                {
                    info = new
                    {
                        count = count,
                        pages = pages,
                    },
                    results = empleados.Skip((pageNumber - 1) * pageSize).Take(pageSize)
                };

                return Ok(results);
            }
        }

        //-----------------------------------------------------------



        [HttpPost]
        [Route("Guardar")]
        public async Task<ActionResult> Guardar([FromBody] Empleado request)
        {
            await _context.Empleados.AddAsync(request);
            await _context.SaveChangesAsync();
            return Ok();
        }


        [HttpPut]
        [Route("Editar")]
        public async Task<ActionResult> Editar([FromBody] Empleado request)
        {
            _context.Empleados.Update(request);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete]
        [Route("Eliminar/{id:Guid}")]
        public async Task<ActionResult> Eliminar(Guid id)
        {
            Empleado empleado = _context.Empleados.Find(id);
            _context.Empleados.Remove(empleado);
            await _context.SaveChangesAsync();

            return Ok();
        }

    }
}
