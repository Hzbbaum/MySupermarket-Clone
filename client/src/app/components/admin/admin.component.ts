import { Component, OnInit } from "@angular/core";
import { Product, Catagorey } from "src/app/services/state/stateClasses";
import { Router, ActivatedRoute } from "@angular/router";
import { ProductsService } from "src/app/services/products/products.service";
import { StateService } from "src/app/services/state/state.service";
import { OauthService } from "src/app/services/Oauth/oauth.service";

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
    public os: OauthService,
    public appState: StateService
  ) {}

  ngOnInit() {
    this.updateProducts();
    this.greeting = `welcome to our store ${
      this.appState && this.appState.user ? this.appState.user.name : ""
    }`;
  }

  updateProducts() {
    this.productsService.getProducts("all").subscribe(
      res => (this.productList = res),
      err => console.log(err)
    );
  }
  productSelected(chosenProduct: Product) {
    this.chosenProduct = chosenProduct;
  }
  logout() {
    this.os.Logout().subscribe(
      res => this.route.navigate(["home"]),
      err => console.log(err)
    );
  }
}
