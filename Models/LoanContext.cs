using Microsoft.EntityFrameworkCore;

namespace loans.Models
{
    public class LoanContext : DbContext
    {
        public LoanContext(DbContextOptions<LoanContext> options)
            : base(options)
        {
        }
        public DbSet<Loan> Loans { get; set; }
    }
}