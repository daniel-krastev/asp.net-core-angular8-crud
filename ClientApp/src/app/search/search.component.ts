import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';

import { Loan } from '../loan';
import { LoanService } from '../loan.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  loans: Loan[];
  searchForm: FormGroup;
  notFound = false;

  constructor(private loanService: LoanService) { }

  ngOnInit() {
    this.searchForm = new FormGroup({
      searchID: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
    });
    this.clear();
  }

  getLoans(): void {
    this.notFound = false;
    this.loanService.getLoans()
      .subscribe(loans => this.loans = loans);
  }

  getLoan(): void {
    this.loanService.getLoan(this.searchForm.get('searchID').value)
      .subscribe(loan => {
        if (loan !== undefined) {
          this.loans = [loan];
        } else {
          this.loans = [];
          this.notFound = true;
        }
      });
  }

  clear() {
    this.loans = [];
    this.notFound = false;
  }

  delete(loan: Loan): void {
    this.loans = this.loans.filter(lo => lo !== loan);
    this.loanService.deleteLoan(loan).subscribe();
  }

  get searchID() { return this.searchForm.get('searchID'); }
}
