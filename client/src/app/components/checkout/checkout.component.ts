import { Component, OnInit } from "@angular/core";
import { StateService } from "src/app/services/state/state.service";
import { Router } from "@angular/router";
import { OauthService } from "src/app/services/Oauth/oauth.service";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.scss"]
})
export class CheckoutComponent implements OnInit {
  constructor(public os: OauthService, public route: Router) {}

  ngOnInit() {}
  logout() {
    this.os.Logout().subscribe(
      res => this.route.navigate(["/home"]),
      err => console.log(err)
    );
  }
}
