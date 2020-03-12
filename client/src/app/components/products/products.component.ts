import { Component, OnInit } from "@angular/core";
import { ShoppingCartComponent } from "../shopping-cart/shopping-cart.component";
import { Product } from "src/app/services/state/stateClasses";
import { ProductsService } from "src/app/services/products/products.service";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"]
})
export class ProductsComponent implements OnInit {
  public productList: Product[];

  constructor(public productsService: ProductsService) {}

  ngOnInit() {
    this.productsService.getProducts("all").subscribe(
      res => this.productList = res,
      err => console.log(err)
    );
  }
}
