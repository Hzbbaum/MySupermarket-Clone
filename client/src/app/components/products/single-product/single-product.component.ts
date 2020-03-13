import { Component, OnInit, Input } from "@angular/core";
import { Product } from "src/app/services/state/stateClasses";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-single-product",
  templateUrl: "./single-product.component.html",
  styleUrls: ["./single-product.component.scss"]
})
export class SingleProductComponent implements OnInit {
  @Input() product: Product;
  amount: number = 0;
  private canDecrement: boolean = false;
  constructor(private sanitizer: DomSanitizer) {
    console.log(this.product);
  }

  ngOnInit() {}
  makeTrustedImage(item) {
    const style = "url(" + item + ")";
    return this.sanitizer.bypassSecurityTrustStyle(style);
  }
  increment() {
    this.amount++;
    this.canDecrement = true;
  }
  decrement() {
    this.amount = Math.max(this.amount - 1, 0);
    this.canDecrement = !!this.amount;
  }
}
