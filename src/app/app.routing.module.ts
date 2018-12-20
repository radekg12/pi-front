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
import {OrderSummaryComponent} from "./order-summary/order-summary.component";
import {PersonalInfoComponent} from "./my-account/personal-info/personal-info.component";
import {MyOrdersComponent} from "./my-account/my-orders/my-orders.component";
import {OrderDetailComponent} from "./my-account/order-detail/order-detail.component";

const routes: Routes = [
  {path: '', redirectTo: '/products', pathMatch: 'full'},
  {path: 'users', component: UserComponent},
  {path: 'products', component: ProductListComponent},
  {path: 'products/:subcategoryId', component: ProductListComponent},
  {path: 'products/detail/:id', component: ProductDetailsComponent},
  {path: 'cart', component: ShoppingCartComponent},
  {
    path: 'account', component: MyAccountComponent, children: [{
      path: 'personal-info', component: PersonalInfoComponent
    }, {
      path: 'orders', component: MyOrdersComponent
    }, {
      path: 'orders/:id', component: OrderDetailComponent
    }]
  },
  {path: 'payment', component: PaymentComponent},
  {path: 'order-summary', component: OrderSummaryComponent},
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
