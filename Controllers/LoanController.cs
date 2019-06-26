using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using loans.Models;

namespace LoansAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoanController : ControllerBase
    {
        private readonly LoanContext _context;
        public LoanController(LoanContext ctx)
        {
            _context = ctx;

            if (_context.Loans.Count() == 0)
            {
                _context.Loans.Add(new Loan() { BorrowerName = "James", FundingAmount = 10000, RepaymentAmount = 11200 });
                _context.Loans.Add(new Loan() { BorrowerName = "Bill", FundingAmount = 1500, RepaymentAmount = 1600 });
                _context.Loans.Add(new Loan() { BorrowerName = "Johan", FundingAmount = 20000, RepaymentAmount = 22000 });
                _context.Loans.Add(new Loan() { BorrowerName = "Cris", FundingAmount = 600, RepaymentAmount = 690 });
                _context.SaveChanges();
            }
        }

        // GET: api/loan
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Loan>>> GetLoans()
        {
            return await _context.Loans.ToListAsync();
        }

        // GET: api/loan/21
        [HttpGet("{id}")]
        public async Task<ActionResult<Loan>> GetLoan(int id)
        {
            var loan = await _context.Loans.FindAsync(id);

            if (loan == null)
            {
                return NotFound();
            }

            return loan;
        }

        // POST: api/loan
        [HttpPost]
        public async Task<ActionResult<Loan>> PostLoan(Loan loan)
        {
            _context.Loans.Add(loan);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetLoan), new { id = loan.Id }, loan);
        }

        // DELETE: api/loan/211
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLoan(int id)
        {
            var loan = await _context.Loans.FindAsync(id);

            if (loan == null)
            {
                return NotFound();
            }

            _context.Loans.Remove(loan);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}