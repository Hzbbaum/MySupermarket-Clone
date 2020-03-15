import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";

import { User, iUser, Cart } from "../state/stateClasses";
import { StateService } from "../state/state.service";

import { Observable, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class OauthService {
  constructor(public http: HttpClient, protected state: StateService) {}

  // body is of the form {ID:string, password:string}
  requestLogin(body: object): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
      // withCredentials:true
    };
    return this.http
      .post<loginResponse>(
        "http://localhost:3000/api/oauth/login",
        JSON.stringify(body),
        httpOptions
      )
      .pipe(map(res => res.user))
      .pipe(
        tap(res => {
          this.state.logIn(res);
          return res;
        })
      )
      .pipe(catchError(this.handleErrorLoginRequest));
  }
  private handleErrorLoginRequest(error: HttpErrorResponse) {
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
interface loginResponse {
  success: boolean;
  user: User;
}
