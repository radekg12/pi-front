import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app.routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ProductCardComponent} from './product-card/product-card.component';
import {MenuComponent} from './menu/menu.component';
import {ProductDetailsComponent} from './product-details/product-details.component';
import {ShoppingCartComponent} from './shopping-cart/shopping-cart.component';
import {MyAccountComponent} from './my-account/my-account.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductService} from './services/product.service';
import {registerLocaleData} from '@angular/common';
import localePl from '@angular/common/locales/pl';
import {PaymentComponent} from './payment/payment.component';
import {OrderSummaryComponent} from './order-summary/order-summary.component';
import {PersonalInfoComponent} from './my-account/personal-info/personal-info.component';
import {MyOrdersComponent} from './my-account/my-orders/my-orders.component';
import {OrderDetailComponent} from './my-account/order-detail/order-detail.component';
import {SupportComponent} from './support/support.component';
import {SharedModule} from './shared/shared.module';
import {HomePageComponent} from './home-page/home-page.component';
import {LoginComponent} from './login/login.component';
import {JwtAuthorizationInterceptor} from './jwt-authorization.interceptor';
import {EnrollmentComponent} from './enrollment/enrollment.component';
import {SlickCarouselModule} from 'ngx-slick-carousel';
import {MySlickCarouselComponent} from './my-slick-carousel/my-slick-carousel.component';
import {AgmCoreModule} from '@agm/core';
import {ShopLocationsComponent} from './shop-localistaions/shop-locations.component';
import {AgmSnazzyInfoWindowModule} from '@agm/snazzy-info-window';
import {AgmJsMarkerClustererModule} from '@agm/js-marker-clusterer';


registerLocaleData(localePl, 'pl');

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    ProductCardComponent,
    MenuComponent,
    ProductDetailsComponent,
    ShoppingCartComponent,
    MyAccountComponent,
    ProductListComponent,
    PaymentComponent,
    OrderSummaryComponent,
    PersonalInfoComponent,
    MyOrdersComponent,
    OrderDetailComponent,
    SupportComponent,
    HomePageComponent,
    LoginComponent,
    EnrollmentComponent,
    MySlickCarouselComponent,
    ShopLocationsComponent
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
    SharedModule,
    SlickCarouselModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCRo1Oz_U0C3M_B1acALqd-KIliufSb2FQ'
    }),
    AgmSnazzyInfoWindowModule,
    AgmJsMarkerClustererModule
  ],
  providers: [
    ProductService,
    {provide: LOCALE_ID, useValue: 'pl'},
    {provide: HTTP_INTERCEPTORS, useClass: JwtAuthorizationInterceptor, multi: true},
  ],
  bootstrap: [AppComponent],
  exports: [ShopLocationsComponent]
})
export class AppModule {
}
