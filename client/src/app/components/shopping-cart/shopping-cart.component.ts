import {
  OnInit,
  Component,
  ChangeDetectionStrategy,
  ViewChild
} from "@angular/core";
import { StateService } from "src/app/services/state/state.service";
import { CartItem } from "src/app/services/state/stateClasses";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { Observable } from "rxjs";
import { UserActionsService } from "src/app/services/user-actions/user-actions.service";

@Component({
  selector: "app-shopping-cart",
  templateUrl: "./shopping-cart.component.html",
  styleUrls: ["./shopping-cart.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShoppingCartComponent implements OnInit {
  public greeting: string;
  displayedColumns: string[] = [
    "name",
    "price",
    "amount",
    "subtotal",
    "remove"
  ];
  // public items: cartitemDisplay[] = [];
  public items: Observable<CartItem[]>;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    public state: StateService,
    public userActions: UserActionsService
  ) {}

  ngOnInit() {
    this.items = this.state.cartitems$;
    if (this.state.user.cart.items.length == 0) {
      this.greeting = "welcome to your first purchase";
    } else {
      this.greeting = "welcome back";
    }
  }

  removeItemFromCart(productId: string) {
    console.log(productId);
    this.userActions.deleteItemFromCart(productId).subscribe(
      res=>this.items =this.state.cartitems$,
      err => console.log(err)
    )
  }
}

interface cartitemDisplay {
  _id: string;
  name: string;
  price: number;
  amount: number;
  subtotal: number;
}
