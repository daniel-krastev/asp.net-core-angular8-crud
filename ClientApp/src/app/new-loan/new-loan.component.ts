import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

import { Loan } from '../loan';
import { LoanService } from '../loan.service';

/** The funding amount should be less than the repayment amount */
export const amountValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const funding = control.get('fund');
  const repayment = control.get('rep');

  return funding && repayment && funding.value < repayment.value ? null : { opositeAmount: true };
};

@Component({
  selector: 'app-new-loan',
  templateUrl: './new-loan.component.html',
  styleUrls: ['./new-loan.component.scss']
})
export class NewLoanComponent implements OnInit {
  addForm: FormGroup;
  sent = false;

  constructor(private loanService: LoanService) { }

  ngOnInit() {
    this.addForm = new FormGroup({
      borrName: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(999)]),
      fund: new FormControl('', [Validators.required, Validators.min(0.01)]),
      rep: new FormControl('', [Validators.required, Validators.min(0.01)]),
    }, { validators: amountValidator });
    this.sent = false;
  }

  add(): void {
    this.sent = false;
    const loan = {
      borrowerName: this.addForm.get('borrName').value,
      fundingAmount: this.addForm.get('fund').value,
      repaymentAmount: this.addForm.get('rep').value,
    };
    this.loanService.addLoan(loan as Loan).subscribe(lo => this.sent = true);
  }

  get borrName() { return this.addForm.get('borrName'); }

  get fund() { return this.addForm.get('fund'); }

  get rep() { return this.addForm.get('rep'); }
}
