import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Loan } from './loan';
import { stringify } from '@angular/compiler/src/util';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private loanUrl = 'api/loan';

  constructor(private http: HttpClient) { }

  /** GET loans from the server */
  getLoans(): Observable<Loan[]> {
    return this.http.get<Loan[]>(this.loanUrl)
      .pipe(
        catchError(this.handleError<Loan[]>('getLoans', []))
      );
  }

  /** GET loan by id. Will 404 if id not found */
  getLoan(id: number): Observable<Loan> {
    const url = `${this.loanUrl}/${id}`;
    return this.http.get<Loan>(url).pipe(
      catchError(this.handleError<Loan>(`getLoan id=${id}`))
    );
  }

  /** POST: add a new loan to the server */
  addLoan(loan: Loan): Observable<Loan> {
    return this.http.post<Loan>(this.loanUrl, loan, httpOptions).pipe(
      catchError(this.handleError<Loan>('addLoan'))
    );
  }

  /** DELETE: delete the loan from the server */
  deleteLoan(loan: Loan): Observable<Loan> {
    const url = `${this.loanUrl}/${loan.id}`;

    return this.http.delete<Loan>(url, httpOptions).pipe(
      catchError(this.handleError<Loan>('deleteHero'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
