using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PruebaTecOPP.Server.Models;

namespace PruebaTecOPP.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TipoDocumentoController : ControllerBase
    {
        private readonly AplicacionContext _context;
        public TipoDocumentoController(AplicacionContext context)
        {
            _context = context;
        }

        // GET: api/Lista
        [HttpGet]
        [Route("Lista")]
        public async Task<ActionResult> Lista()
        {
            List<TipoDocumento> tipoDocumento = await _context.TipoDocumentos.OrderByDescending(c => c.IdTipoDocumento).ToListAsync();
            return tipoDocumento == null ? NotFound() : Ok(tipoDocumento);
        }
    }
}
