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
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class CartComponent implements OnInit {
  displayedColumns: string[] = [
    "name",
    "price",
    "amount",
    "subtotal",
  ];
  public items: Observable<CartItem[]>;
  public total: Observable<number>;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    public state: StateService,
    public userActions: UserActionsService
  ) {}

  ngOnInit() {
    this.items = this.state.cartitems$;
    this.total = this.state.total$;
  }

}
