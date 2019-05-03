import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MyAccountComponent} from './my-account/my-account.component';

import {MyOrdersComponent} from './my-account/my-orders/my-orders.component';
import {OrderDetailComponent} from './my-account/order-detail/order-detail.component';
import {CustomersComponent} from './my-account/customers/customers.component';
import {ProductListComponent} from './my-account/product-list/product-list.component';
import {ProductDetailsComponent} from './my-account/product-details/product-details.component';
import {AddProductComponent} from './my-account/add-product/add-product.component';
import {PersonalInfoComponent} from './my-account/personal-info/personal-info.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'account', pathMatch: 'full'
  },
  {
    path: 'account', component: MyAccountComponent, data: {title: 'Panel administracyjny'},
    children: [
      {
        path: '', redirectTo: 'orders', pathMatch: 'full'
      },
      {
        path: 'personal-info', component: CustomersComponent, data: {title: 'Klienci'}
      },
      {
        path: 'personal-info/:id', component: PersonalInfoComponent
      },
      {
        path: 'orders', component: MyOrdersComponent, data: {title: 'Zamówienia'}
      },
      {
        path: 'orders/:id', component: OrderDetailComponent
      },
      {
        path: 'products', component: ProductListComponent, data: {title: 'Produkty'}
      },
      {
        path: 'products/new', component: AddProductComponent, data: {title: 'Dodaj nowy produkt'}
      },
      {
        path: 'products/:id', component: ProductDetailsComponent
      },
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
