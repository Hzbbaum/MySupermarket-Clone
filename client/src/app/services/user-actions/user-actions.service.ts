import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { Product, CartItem } from "../state/stateClasses";
import { StateService } from "../state/state.service";
import { map, tap, catchError } from "rxjs/operators";
import { throwError } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UserActionsService {
  constructor(private http: HttpClient) {}

  addToCart(product: Product, amount: number) {
    console.log(StateService.user);
    
    const body: object = {
      userId: StateService.user.ID,
      itemId: product._id,
      amount: amount
    };
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
      // withCredentials:true
    };
    console.log(body)
    return this.http
      .post<updateCartResponse>(
        "http://localhost:3000/api/users/tocart",
        JSON.stringify(body),
        httpOptions
      )
      .pipe(map(res => res.cart))
      .pipe(
        tap(res => {
          StateService.user.cart = res;
          return res;
        })
      )
      .pipe(catchError(this.handleErrorUpdateCartRequest));
  }
  private handleErrorUpdateCartRequest(error: HttpErrorResponse) {
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
interface updateCartResponse {
  success: boolean;
  cart: CartItem[];
}
