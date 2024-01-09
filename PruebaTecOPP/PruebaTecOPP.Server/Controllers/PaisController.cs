using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PruebaTecOPP.Server.Models;

namespace PruebaTecOPP.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaisController : ControllerBase
    {

        private readonly AplicacionContext _context;
        public PaisController(AplicacionContext context)
        {
            _context = context;
        }

        // GET: api/Lista
        [HttpGet]
        [Route("Lista")]
        public async Task<ActionResult> Lista()
        {
            List<Pais> pais = await _context.Paises
                .OrderByDescending(c => c.IdPais).ToListAsync();
            //return await _context.Contactos.ToListAsync();

            return pais == null ? NotFound() : Ok(pais);

        }

        // GET: api/ListaAreas
        [HttpGet]
        [Route("ListaAreas/{id:Guid}")]
        public async Task<ActionResult> ListaAreas(Guid id)
        {
            List<Area> area = await _context.Areas
                .Where(c => c.PaisId == id)
                .OrderByDescending(c => c.IdArea).ToListAsync();
            //return await _context.Contactos.ToListAsync();
            return area == null ? NotFound() : Ok(area);

        }

        // GET: api/ListaSubAreas
        [HttpGet]
        [Route("ListaSubAreas/{id:Guid}")]
        public async Task<ActionResult> ListaSubAreas(Guid id)
        {
            List<SubArea> subArea = await _context.SubAreas
                .Where(c => c.AreaId == id)
                .OrderByDescending(c => c.IdSubArea).ToListAsync();
            //return await _context.Contactos.ToListAsync();
            return subArea == null ? NotFound() : Ok(subArea);

        }
    }

}
