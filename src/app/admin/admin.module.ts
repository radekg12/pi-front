import {LOCALE_ID, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {PersonalInfoComponent} from './my-account/personal-info/personal-info.component';
import {MyOrdersComponent} from './my-account/my-orders/my-orders.component';
import {OrderDetailComponent} from './my-account/order-detail/order-detail.component';
import {MyAccountComponent} from './my-account/my-account.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../material.module';
import {SharedModule} from '../shared/shared.module';
import {CustomersComponent} from './my-account/customers/customers.component';
import {ProductListComponent} from './my-account/product-list/product-list.component';
import {ProductDetailsComponent} from './my-account/product-details/product-details.component';
import {AddProductComponent} from './my-account/add-product/add-product.component';
import {TitleService} from '../services/title.service';

@NgModule({
  declarations: [
    MyOrdersComponent,
    OrderDetailComponent,
    PersonalInfoComponent,
    MyAccountComponent,
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
