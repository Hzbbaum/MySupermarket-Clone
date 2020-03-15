import { Component, OnInit, Input } from "@angular/core";
import { Product } from "src/app/services/state/stateClasses";
import { DomSanitizer } from "@angular/platform-browser";
import { UserActionsService } from "src/app/services/user-actions/user-actions.service";
import { StateService } from "../../../services/state/state.service";
@Component({
  selector: "app-single-product",
  templateUrl: "./single-product.component.html",
  styleUrls: ["./single-product.component.scss"]
})
export class SingleProductComponent implements OnInit {
  @Input() product: Product;
  amount: number = 0;
  constructor(
    private sanitizer: DomSanitizer,
    private userService: UserActionsService
  ) {}
  ngOnInit() {}
  makeTrustedImage(item) {
    const style = "url(" + item + ")";
    return this.sanitizer.bypassSecurityTrustStyle(style);
  }
  increment() {
    this.amount++;
  }
  decrement() {
    this.amount = Math.max(this.amount - 1, 0);
  }
  addToCart() {
    this.userService.addToCart(this.product, this.amount).subscribe(
      res => (this.amount = 0),
      err => console.log(err)
    );
  }
}
