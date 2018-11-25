import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {UserComponent} from './user/user.component';
import {AddUserComponent} from './user/add-user.component';
import {FormsModule} from "@angular/forms";
import {AppRoutingModule} from "./app.routing.module";
import {HttpClientModule} from "@angular/common/http";
import {UserService} from "./user/user.service";
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
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production})
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
