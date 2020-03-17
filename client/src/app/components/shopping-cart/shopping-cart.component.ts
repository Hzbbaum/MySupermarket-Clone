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
import { Observable } from 'rxjs';

@Component({
  selector: "app-shopping-cart",
  templateUrl: "./shopping-cart.component.html",
  styleUrls: ["./shopping-cart.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShoppingCartComponent implements OnInit {
  public greeting: string;
  displayedColumns: string[] = ["name", "price", "amount", "subtotal"];
  // public items: cartitemDisplay[] = [];
  public items:Observable<CartItem[]>

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(public state: StateService) {}

  ngOnInit() {
    this.items = this.state.cartitems$
    if (this.state.user.cart.items.length == 0) {
      this.greeting = "welcome to your first purchase";
    } else {
      this.greeting = "welcome back";
    }
  }
}

interface cartitemDisplay {
  _id: string;
  name: string;
  price: number;
  amount: number;
  subtotal: number;
}
