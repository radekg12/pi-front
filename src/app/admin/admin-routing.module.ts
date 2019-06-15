import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccountComponent} from './administration-panel/account.component';

import {OrdersComponent} from './administration-panel/orders/orders.component';
import {OrderDetailsComponent} from './administration-panel/order-details/order-details.component';
import {CustomersComponent} from './administration-panel/customers/customers.component';
import {ProductListComponent} from './administration-panel/product-list/product-list.component';
import {ProductDetailsComponent} from './administration-panel/product-details/product-details.component';
import {AddProductComponent} from './administration-panel/add-product/add-product.component';
import {CustomerDetailsComponent} from './administration-panel/customer-details/customer-details.component';
import {AuthGuard} from '../guards/auth.guard';
import {Role} from '../models/role.model';

const routes: Routes = [
  {
    path: '', redirectTo: 'account', pathMatch: 'full'
  },
  {
    path: 'account', component: AccountComponent, data: {title: 'Panel administracyjny'},
    children: [
      {
        path: '', redirectTo: 'orders', pathMatch: 'full'
      },
      {
        path: 'personal-info', component: CustomersComponent,
        canActivate: [AuthGuard],
        data: {roles: [Role.User], title: 'Klienci'}
      },
      {
        path: 'personal-info/:id', component: CustomerDetailsComponent, canActivate: [AuthGuard],
        data: {roles: [Role.User], title: 'Klienci - szczegóły'}
      },
      {
        path: 'orders', component: OrdersComponent, data: {title: 'Zamówienia'}
      },
      {
        path: 'orders/:id', component: OrderDetailsComponent
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
