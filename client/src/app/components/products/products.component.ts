import { Component, OnInit } from "@angular/core";
import { Product, Catagorey } from "src/app/services/state/stateClasses";
import { ProductsService } from "src/app/services/products/products.service";
import { StateService } from "src/app/services/state/state.service";
import { Router, ActivatedRoute } from "@angular/router";
@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"]
})
export class ProductsComponent implements OnInit {
  public productList: Product[];
  public greeting: string;
  public currentCategory: string = "all";
  public catagories: Catagorey[] = [];

  constructor(
    public route: Router,
    private activatedRoute: ActivatedRoute,
    public productsService: ProductsService,
    public appState: StateService
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.currentCategory = params.get("catagory");
      this.updateProducts();
    });
    this.updateCatagories();
    this.greeting = `welcome to our store ${
      this.appState && this.appState.user ? this.appState.user.name : ""
    }`;
  }

  updateCatagories() {
    this.productsService.getCatagories().subscribe(
      res => {
        return (this.catagories = [{ name: "all", _id: "all" }, ...res]);
      },
      err => console.log(err)
    );
  }

  updateProducts() {
    this.productsService.getProducts(this.currentCategory).subscribe(
      res => (this.productList = res),
      err => console.log(err)
    );
  }

  logout() {
    this.appState.logOut();
    this.route.navigate(["/home"]);
  }
}
