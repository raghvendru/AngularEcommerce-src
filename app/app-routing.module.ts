import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartCompComponent } from './comp/cart-comp/cart-comp.component';
import { CheckoutCompComponent } from './comp/checkout-comp/checkout-comp.component';
import { LandingComponent } from './comp/landing/landing.component';
import { LoginComponent } from './comp/login/login.component';
import { OrderListComponent } from './comp/order-list/order-list.component';
import { ProductDetailComponent } from './comp/product-detail/product-detail.component';
import { ProductListComponent } from './comp/product-list/product-list.component';

const routes: Routes = [
  { path: "login", component: LoginComponent},
  { path: "productlist", component: ProductListComponent},
  { path: "productdetail", component: ProductDetailComponent},
  { path: "cart", component: CartCompComponent},
  { path: "orderlist", component: OrderListComponent},
  { path: "landing", component: LandingComponent},
  { path: "checkout", component: CheckoutCompComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
