import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './comp/login/login.component';
import { LandingComponent } from './comp/landing/landing.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductListComponent } from './comp/product-list/product-list.component';
import { ProductDetailComponent } from './comp/product-detail/product-detail.component';
import { CartCompComponent } from './comp/cart-comp/cart-comp.component';
import { CheckoutCompComponent } from './comp/checkout-comp/checkout-comp.component';
import { OrderListComponent } from './comp/order-list/order-list.component';
import { ReturnCompComponent } from './comp/return-comp/return-comp.component';
import { ReturnListComponent } from './comp/return-list/return-list.component';
import { SimilarComponent } from './comp/similar/similar.component';
import { SubCategoryComponent } from './comp/sub-category/sub-category.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LandingComponent,
    ProductListComponent,
    ProductDetailComponent,
    CartCompComponent,
    CheckoutCompComponent,
    OrderListComponent,
    ReturnCompComponent,
    ReturnListComponent,
    SimilarComponent,
    SubCategoryComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
