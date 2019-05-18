import {LOCALE_ID, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {PersonalInfoComponent} from './administration-panel/personal-info/personal-info.component';
import {OrdersComponent} from './administration-panel/my-orders/orders.component';
import {OrderDetailComponent} from './administration-panel/order-detail/order-detail.component';
import {AccountComponent} from './administration-panel/account.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../material.module';
import {SharedModule} from '../shared/shared.module';
import {CustomersComponent} from './administration-panel/customers/customers.component';
import {ProductListComponent} from './administration-panel/product-list/product-list.component';
import {ProductDetailsComponent} from './administration-panel/product-details/product-details.component';
import {AddProductComponent} from './administration-panel/add-product/add-product.component';
import {TitleService} from '../services/title.service';

@NgModule({
  declarations: [
    OrdersComponent,
    OrderDetailComponent,
    PersonalInfoComponent,
    AccountComponent,
    CustomersComponent,
    ProductListComponent,
    ProductDetailsComponent,
    AddProductComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'pl'},
    TitleService
  ],
})
export class AdminModule {
}
