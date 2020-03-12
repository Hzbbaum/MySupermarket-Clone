import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";

import { Product, iproduct } from "../state/stateClasses";
import { StateService } from "../state/state.service";

import { Observable, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
@Injectable({
  providedIn: "root"
})
export class ProductsService {
  constructor(public http:HttpClient) {}
  // the param is the same of which we came from
  getProducts(category: string): Observable<Product[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
      // withCredentials:true
    };
    return this.http
      .get<Product[]>(
        `http://localhost:3000/api/products/${category}`,
        httpOptions
      )
      .pipe(catchError(this.handleErrorGetProductsRequest));
  }

  private handleErrorGetProductsRequest(error: HttpErrorResponse) {
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
// interface getProductsRespone {
//   products: iproduct[];
// }