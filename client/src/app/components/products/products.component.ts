import { Component, OnInit } from "@angular/core";
import { Product } from "src/app/services/state/stateClasses";
import { ProductsService } from "src/app/services/products/products.service";
import { StateService } from "src/app/services/state/state.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"]
})
export class ProductsComponent implements OnInit {
  public productList: Product[];
  private state: StateService;
  public greeting: string;

  constructor(
    public route: Router,
    public productsService: ProductsService,
    public appState: StateService
  ) {}

  ngOnInit() {
    this.productsService.getProducts("all").subscribe(
      res => (this.productList = res),
      err => console.log(err)
    );
    this.greeting = `welcome to our store ${this.appState.user.name}`;
  }
  logout() {
    this.appState.logOut();
    this.route.navigate(["/home"]);
  }
}
