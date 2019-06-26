using System.ComponentModel.DataAnnotations;
using FluentValidation;

namespace loans.Models
{
    public class Loan
    {
        [Key]

        public int Id { get; set; }
        public string BorrowerName { get; set; }
        public decimal FundingAmount { get; set; }
        public decimal RepaymentAmount { get; set; }
    }

    public class LoanValidator : AbstractValidator<Loan>
    {
        public LoanValidator()
        {
            RuleFor(x => x.BorrowerName).NotEmpty().WithMessage("BorrowerName cannot be empty.")
                .MaximumLength(999).WithMessage("BorrowerName cannot be more than 999 characters.")
                .MinimumLength(4).WithMessage("BorrowerName cannot be less than 4 characters.");
            RuleFor(x => x.RepaymentAmount).GreaterThan(0).WithMessage("RepaymentAmount must be greater than 0.");
            RuleFor(x => x.FundingAmount).GreaterThan(0).WithMessage("FundingAmount must be greater than 0.");
            RuleFor(x => x.RepaymentAmount - x.FundingAmount).GreaterThan(0).WithMessage("RepaymentAmount must be greater than FundingAmount.");
        }
    }
}