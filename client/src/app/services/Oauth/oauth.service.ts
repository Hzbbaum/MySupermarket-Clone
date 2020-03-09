import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
@Injectable({
  providedIn: "root"
})
export class OauthService {
  constructor(public http: HttpClient) {}

  // body is of the form {ID:string, password:string}
  requestLogin(body: { ID: String; password: String }) {
    const httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
    // withCredentials:true
  }
    return this.http.post(
      "http://localhost:3000/api/oauth/login",
      JSON.stringify(body),
      httpOptions
    );
  }
}
