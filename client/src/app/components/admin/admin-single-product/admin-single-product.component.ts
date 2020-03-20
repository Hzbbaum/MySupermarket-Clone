import { Component, OnInit, Input, Output } from "@angular/core";
import { Product } from "src/app/services/state/stateClasses";
import { DomSanitizer } from "@angular/platform-browser";
import { EventEmitter } from "@angular/core";

@Component({
  selector: "app-admin-single-product",
  templateUrl: "./admin-single-product.component.html",
  styleUrls: ["./admin-single-product.component.scss"]
})
export class AdminSingleProductComponent implements OnInit {
  @Input() product: Product;
  @Output() selected = new EventEmitter<Product>();
  amount: number = 0;
  constructor(private sanitizer: DomSanitizer) {}
  ngOnInit() {console.log("loaded");
  }

  makeTrustedImage(item) {
    const style = "url(" + item + ")";
    return this.sanitizer.bypassSecurityTrustStyle(style);
  }
  edit() {
    this.selected.emit(this.product);
  }
}
