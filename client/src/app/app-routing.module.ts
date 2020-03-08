import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./components/home/home.component";
import { ProductsComponent } from "./components/products/products.component";
import { RegisterComponent } from "./components/register/register.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "products/:catagory", component: ProductsComponent },
  {
    path: "register",
    component: RegisterComponent
  },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
