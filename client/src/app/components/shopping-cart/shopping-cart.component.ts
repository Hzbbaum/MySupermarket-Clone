import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { StateService } from "src/app/services/state/state.service";

@Component({
  selector: "app-shopping-cart",
  templateUrl: "./shopping-cart.component.html",
  styleUrls: ["./shopping-cart.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShoppingCartComponent implements OnInit {
  public greeting: string;
  constructor(public state: StateService) {}

  ngOnInit() {
    if (this.state.user.cart.items.length == 0) {
      this.greeting = "welcome to your first purchase";
    }else{
      this.greeting =  "welcome back"
    }
  }
}
