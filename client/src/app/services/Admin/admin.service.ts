import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { Product } from "../state/stateClasses";
import { catchError, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AdminService {
  constructor(public http: HttpClient) {}
  // the param is the same of which we came from
  createProduct(body: object): Observable<Product[]> {
    console.log(body);

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
      // withCredentials:true
    };
    return this.http
      .post<Product[]>(
        `http://localhost:3000/admin/addproduct`,
        JSON.stringify(body),
        httpOptions
      )
      .pipe(tap(res => console.log(res)))
      .pipe(catchError(this.handleErroradminRequest));
  }

  editProduct(body: object, productId: string): Observable<Product[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
      // withCredentials:true
    };
    return this.http
      .post<Product[]>(
        `http://localhost:3000/admin/edit/${productId}`,
        httpOptions
      )
      .pipe(catchError(this.handleErroradminRequest));
  }

  private handleErroradminRequest(error: HttpErrorResponse) {
    let errormessage = "no idea what went wrong";
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errormessage = error.error.message;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errormessage = error.error.errors;
    }
    // return an observable with a user-facing error message
    return throwError(errormessage);
  }
}
