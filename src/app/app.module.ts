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

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    AddUserComponent,
    PageNotFoundComponent,
    ProductCardComponent,
    MenuComponent,
    ProductDetailsComponent,
    ButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
