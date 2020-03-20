import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./components/home/home.component";
import { ProductsComponent } from "./components/products/products.component";
import { RegisterComponent } from "./components/register/register.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { WelcomeComponent } from "./components/welcome/welcome.component";
import { UserRouteGuardGuard } from "./services/Oauth/user-route-guard.guard";
import { CheckoutComponent } from "./components/checkout/checkout.component";
import { AdminComponent } from './components/admin/admin.component';
import { AdminGuard } from './services/Oauth/admin.guard';
const routes: Routes = [
  { path: "home", component: HomeComponent },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "welcome",
    component: WelcomeComponent,
    canActivate: [UserRouteGuardGuard]
  },
  {
    path: "products/:catagory",
    component: ProductsComponent,
    canActivate: [UserRouteGuardGuard]
  },
  {
    path: "checkout",
    component: CheckoutComponent,
    canActivate: [UserRouteGuardGuard]
  },
  {
    path:"admin",
    component:AdminComponent,
    canActivate:[AdminGuard]
  },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
