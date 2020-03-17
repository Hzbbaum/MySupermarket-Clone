import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams
} from "@angular/common/http";
import { Product, CartItem, User } from "../state/stateClasses";
import { StateService } from "../state/state.service";
import { map, tap, catchError } from "rxjs/operators";
import { throwError } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UserActionsService {
  constructor(private http: HttpClient, private appState: StateService) {}

  addToCart(product: Product, amount: number) {
    const body: object = {
      userId: this.appState.user.ID,
      itemId: product._id,
      amount: amount
    };
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
      // withCredentials:true
    };
    return this.http
      .post<User>(
        "http://localhost:3000/api/users/tocart",
        JSON.stringify(body),
        httpOptions
      )
      .pipe(
        tap(res => {
          this.appState.user = res;
          return res;
        })
      )
      .pipe(catchError(this.handleErrorUpdateCartRequest));
  }

  newCart() {
    const body: object = {
      userId: this.appState.user.ID
    };
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
      // withCredentials:true
    };
    return this.http
      .post<User>(
        "http://localhost:3000/api/users/newcart",
        JSON.stringify(body),
        httpOptions
      )
      .pipe(
        tap(res => {
          console.log(res);
          this.appState.user = res;
          return res;
        })
      )
      .pipe(catchError(this.handleErrorUpdateCartRequest));
  }

  deleteItemFromCart(itemId: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
      // withCredentials:true
    };
    return this.http
      .delete<User>(
        `http://localhost:3000/api/users/removeitem/${this.appState.user.ID}/${itemId}`,
        httpOptions
      )
      .pipe(
        tap(res => {
          console.log(res);
          this.appState.user = res;
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
