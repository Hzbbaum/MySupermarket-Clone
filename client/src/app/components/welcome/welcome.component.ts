import { Component, OnInit } from "@angular/core";
import { StateService } from "src/app/services/state/state.service";
import { Router } from "@angular/router";
import { UserActionsService } from "src/app/services/user-actions/user-actions.service";

@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.scss"]
})
export class WelcomeComponent implements OnInit {
  public loggedIn: boolean = false;
  public hasShoppedBefore: boolean = false;
  public hasOpenCart: boolean = false;
  constructor(
    private state: StateService,
    public route: Router,
    public userActions: UserActionsService
  ) {}

  ngOnInit() {
    this.state.isloggedin$.subscribe(res => console.log(res));
    this.hasOpenCart = !!this.state.user.cart.items.length;
    this.hasShoppedBefore = !!this.state.user.orderHistory.length;
  }
  continueCart() {
    this.route.navigate(["/products/all"]);
  }
  newCart() {
    this.userActions.newCart();
    this.route.navigate(["/products/all"]);
  }
}
