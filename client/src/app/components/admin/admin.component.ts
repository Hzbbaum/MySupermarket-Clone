import { Component, OnInit } from "@angular/core";
import { Product, Catagorey } from "src/app/services/state/stateClasses";
import { Router, ActivatedRoute } from "@angular/router";
import { ProductsService } from "src/app/services/products/products.service";
import { StateService } from "src/app/services/state/state.service";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"]
})
export class AdminComponent implements OnInit {
  public productList: Product[];
  public greeting: string;
  public currentCategory: string = "all";
  public catagories: Catagorey[] = [];
  public chosenProduct: Product = {
    _id: "",
    name: "",
    price: 0,
    image_url: "",
    category: ""
  };
  constructor(
    public route: Router,
    private activatedRoute: ActivatedRoute,
    public productsService: ProductsService,
    public appState: StateService
  ) {}

  ngOnInit() {
    console.log("loaded");
    
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
  productSelected(chosenProduct: Product) {
    this.chosenProduct = chosenProduct;
  }
}
