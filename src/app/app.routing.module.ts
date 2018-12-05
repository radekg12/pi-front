import {RouterModule, Routes} from "@angular/router";
import {UserComponent} from "./user/user.component";
import {NgModule} from "@angular/core";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {ProductDetailsComponent} from "./product-details/product-details.component";
import {ShoppingCartComponent} from "./shopping-cart/shopping-cart.component";
import {MyAccountComponent} from "./my-account/my-account.component";
import {AddProductComponent} from "./add-product/add-product.component";
import {ProductListComponent} from "./product-list/product-list.component";
import {PaymentComponent} from "./payment/payment.component";

const routes: Routes = [
  {path: '', redirectTo: '/products', pathMatch: 'full'},
  {path: 'users', component: UserComponent},
  {path: 'products', component: ProductListComponent},
  {path: 'products/:id', component: ProductDetailsComponent},
  {path: 'products/:id', component: ProductDetailsComponent},
  {path: 'cart', component: ShoppingCartComponent},
  {path: 'account', component: MyAccountComponent},
  {path: 'payment', component: PaymentComponent, pathMatch: 'full'},
  {path: 'add', component: AddProductComponent, pathMatch: 'prefix'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      // {enableTracing: true}
    )
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})

export class AppRoutingModule {

}
