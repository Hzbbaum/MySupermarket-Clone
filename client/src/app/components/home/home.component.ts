import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { OauthService } from "src/app/services/Oauth/oauth.service";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  public loginForm: FormGroup;
  public loginRequest() {
    this.services.requestLogin(this.loginForm.value).subscribe(
      res=> console.log(res),
      err => console.log(err)
      
      
    )
    console.log("login requested");
  }

  constructor(public services: OauthService, public fb: FormBuilder) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      ID: [0, [Validators.minLength(9), Validators.maxLength(9)]],
      password: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(30)]]
    });
  }
}
