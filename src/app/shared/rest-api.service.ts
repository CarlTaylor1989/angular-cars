import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { Cars } from './cars';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  apiURL = 'https://itg-prd-recruit.appspot.com/api';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json'
    })
  }

  getCars(): Observable<Cars[]> {
    return this.http.get<Cars[]>(`${this.apiURL}/vehicles/`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getCar(id: string): Observable<Cars> {
    return this.http.get<Cars>(`${this.apiURL}/vehicle/${id}`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  handleError(error: any = {}) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
