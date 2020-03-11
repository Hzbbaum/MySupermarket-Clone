import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";

import { User, CartItem, Order, iUser } from "../state/stateClasses";
import { StateService } from "../state/state.service";
import {
  HttpErrorHandler,
  HandleError
} from "../httpErrorHandler/http-error-handler.service";

import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class OauthService {
  private handleError: HandleError;
  constructor(
    public http: HttpClient,
    protected state: StateService,
    httpErrorHandler: HttpErrorHandler
  ) {
    this.handleError = httpErrorHandler.createHandleError("OauthService");
  }

  // body is of the form {ID:string, password:string}
  requestLogin(body: object): Observable<User[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
      // withCredentials:true
    };
    return this.http.post<User[]>(
        "http://localhost:3000/api/oauth/login",
        JSON.stringify(body),
        httpOptions
      )
      .pipe(catchError(this.handleError("requestlogin", [])));
  }

  private logUser(user: User) {
    StateService.user = user;
    console.log("The current state of the ");
  }
}
interface succesfulLogin {
  success: boolean;
  user: iUser;
}
