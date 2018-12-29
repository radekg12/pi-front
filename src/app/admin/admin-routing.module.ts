import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MyAccountComponent} from "./my-account/my-account.component";
import {PersonalInfoComponent} from "./my-account/personal-info/personal-info.component";
import {MyOrdersComponent} from "./my-account/my-orders/my-orders.component";
import {OrderDetailComponent} from "./my-account/order-detail/order-detail.component";
import {CustomersComponent} from "./my-account/customers/customers.component";
import {ProductListComponent} from "./my-account/product-list/product-list.component";
import {ProductDetailsComponent} from "./my-account/product-details/product-details.component";

const routes: Routes = [{
  path: 'account', component: MyAccountComponent,
  children: [
    {
      path: '', redirectTo: 'orders', pathMatch: 'full'
    },
    {
      path: 'personal-info', component: CustomersComponent
    },
    {
      path: 'personal-info/:id', component: PersonalInfoComponent
    },
    {
      path: 'orders', component: MyOrdersComponent
    },
    {
      path: 'orders/:id', component: OrderDetailComponent
    },
    {
      path: 'products', component: ProductListComponent
    },
    {
      path: 'products/:id', component: ProductDetailsComponent
    },
  ]
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
