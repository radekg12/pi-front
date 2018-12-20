import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {UserComponent} from './user/user.component';
import {AddUserComponent} from './user/add-user.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppRoutingModule} from "./app.routing.module";
import {HttpClientModule} from "@angular/common/http";
import {UserService} from "./services/user.service";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MaterialModule} from './material.module';
import {FlexLayoutModule} from "@angular/flex-layout";
import {ProductCardComponent} from './product-card/product-card.component';
import {MenuComponent} from './menu/menu.component';
import {ProductDetailsComponent} from './product-details/product-details.component';
import {ButtonComponent} from './button/button.component';
import {ShoppingCartComponent} from './shopping-cart/shopping-cart.component';
import {MyAccountComponent} from './my-account/my-account.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {AddProductComponent} from './add-product/add-product.component';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductService} from "./services/product.service";
import {registerLocaleData} from "@angular/common";
import localePl from '@angular/common/locales/pl';
import {PlnCurrencyPipe} from "./pln-currency.pipe";
import {PaymentComponent} from './payment/payment.component';
import {OrderSummaryComponent} from './order-summary/order-summary.component';
import {PersonalInfoComponent} from './my-account/personal-info/personal-info.component';
import {MyOrdersComponent} from './my-account/my-orders/my-orders.component';
import {OrderDetailComponent} from './my-account/order-detail/order-detail.component';

registerLocaleData(localePl, 'pl');

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    AddUserComponent,
    PageNotFoundComponent,
    ProductCardComponent,
    MenuComponent,
    ProductDetailsComponent,
    ButtonComponent,
    ShoppingCartComponent,
    MyAccountComponent,
    AddProductComponent,
    ProductListComponent,
    PlnCurrencyPipe,
    PaymentComponent,
    OrderSummaryComponent,
    PersonalInfoComponent,
    MyOrdersComponent,
    OrderDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production})
  ],
  providers: [
    UserService,
    ProductService,
    {provide: LOCALE_ID, useValue: 'pl'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
