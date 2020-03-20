import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatStepperModule } from "@angular/material/stepper";
import { MatSelectModule } from "@angular/material/select";
import { MatDialogModule } from "@angular/material/dialog";

import { HomeComponent } from "./components/home/home.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { ProductsComponent } from "./components/products/products.component";
import { RegisterComponent } from "./components/register/register.component";
import { WelcomeComponent } from "./components/welcome/welcome.component";
import { ShoppingCartComponent } from "./components/products/shopping-cart/shopping-cart.component";
import { SingleProductComponent } from "./components/products/single-product/single-product.component";
import { CheckoutComponent } from "./components/checkout/checkout.component";
import { CartComponent } from "./components/checkout/cart/cart.component";
import { PaymentFormComponent } from "./components/checkout/payment-form/payment-form.component";
import { HighlightsearchPipe } from "./components/checkout/cart/highlightsearch.pipe";
import { MatNativeDateModule } from "@angular/material/core";
import { DeliveryDialogComponent } from "./components/checkout/payment-form/delivery-dialog/delivery-dialog.component";
import { AdminComponent } from './components/admin/admin.component';
import { AdminSingleProductComponent } from './components/admin/admin-single-product/admin-single-product.component';
import { EditorComponent } from './components/admin/editor/editor.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    ProductsComponent,
    PageNotFoundComponent,
    WelcomeComponent,
    ShoppingCartComponent,
    SingleProductComponent,
    CheckoutComponent,
    CartComponent,
    PaymentFormComponent,
    HighlightsearchPipe,
    DeliveryDialogComponent,
    AdminComponent,
    AdminSingleProductComponent,
    EditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatStepperModule,
    MatSelectModule,
    MatDialogModule
  ],
  entryComponents: [DeliveryDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
