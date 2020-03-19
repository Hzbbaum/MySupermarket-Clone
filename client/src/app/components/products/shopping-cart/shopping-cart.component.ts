import {
  OnInit,
  Component,
  ChangeDetectionStrategy,
  ViewChild
} from "@angular/core";
import { StateService } from "src/app/services/state/state.service";
import { CartItem, User } from "src/app/services/state/stateClasses";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { Observable } from "rxjs";
import { UserActionsService } from "src/app/services/user-actions/user-actions.service";
import { log } from 'util';

@Component({
  selector: "app-shopping-cart",
  templateUrl: "./shopping-cart.component.html",
  styleUrls: ["./shopping-cart.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShoppingCartComponent implements OnInit {
  displayedColumns: string[] = [
    "name",
    "price",
    "amount",
    "subtotal",
    "remove"
  ];
  public items: Observable<CartItem[]>;
  public total: Observable<number>;
  public isMinimized:boolean = false

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    public state: StateService,
    public userActions: UserActionsService,
  ) {}

  ngOnInit() {
    this.items = this.state.cartitems$;
    this.total = this.state.total$;
  }

  removeItemFromCart(productId: string) {
    this.userActions.deleteItemFromCart(productId).subscribe(
      res => (this.items = this.state.cartitems$),
      err => console.log(err)
    );
  }
  
  emptyCart() {
    this.userActions.newCart().subscribe(
      res => (this.items = this.state.cartitems$),
      err => console.log(err)
    );
  }
  togglecart(){
    console.log(this.isMinimized);
    
    this.isMinimized = !this.isMinimized
  }
}
