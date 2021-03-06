import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {ProductDetailsComponent} from './product-details/product-details.component';
import {ShoppingCartComponent} from './shopping-cart/shopping-cart.component';
import {MyAccountComponent} from './my-account/my-account.component';
import {ProductListComponent} from './product-list/product-list.component';
import {PaymentComponent} from './payment/payment.component';
import {OrderSummaryComponent} from './order-summary/order-summary.component';
import {PersonalInfoComponent} from './my-account/personal-info/personal-info.component';
import {MyOrdersComponent} from './my-account/my-orders/my-orders.component';
import {OrderDetailComponent} from './my-account/order-detail/order-detail.component';
import {SupportComponent} from './support/support.component';
import {HomePageComponent} from './home-page/home-page.component';
import {AuthGuard} from './guards/auth.guard';
import {Role} from './models/role.model';
import {LoginComponent} from './login/login.component';
import {EnrollmentComponent} from './enrollment/enrollment.component';
import {TitleService} from './services/title.service';
import {ShopLocationsComponent} from './shop-localistaions/shop-locations.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomePageComponent},
  {path: 'login', component: LoginComponent, data: {title: 'Logowanie'}},
  {path: 'sign-up', component: EnrollmentComponent, data: {title: 'Rejestracja'}},
  {path: 'products', component: ProductListComponent, data: {title: ' Produkty', animation: 'ProductListPage'}},
  {path: 'products/:subcategoryId', component: ProductListComponent, data: {animation: 'ProductListPage'}},
  {path: 'products/category/:categoryId', component: ProductListComponent, data: {animation: 'ProductListPage'}},
  {path: 'products/:id/details', component: ProductDetailsComponent, data: {animation: 'ProductDetailsPage'}},
  {
    path: 'cart', component: ShoppingCartComponent, canActivate: [AuthGuard],
    data: {roles: [Role.User], title: 'Koszyk'}
  },
  {
    path: 'account', component: MyAccountComponent, canActivate: [AuthGuard],
    data: {roles: [Role.User], title: 'Moje konto'},
    children: [
      {path: '', redirectTo: 'personal-info', pathMatch: 'full'},
      {path: 'personal-info', component: PersonalInfoComponent, data: {title: 'Dane osobowe'}},
      {path: 'orders', component: MyOrdersComponent, data: {title: 'Zamówienia'}},
      {path: 'orders/:id', component: OrderDetailComponent}
    ]
  },
  {
    path: 'payment', component: PaymentComponent, canActivate: [AuthGuard],
    data: {roles: [Role.User], title: 'Składanie zamówienia'}
  },
  {
    path: 'order-summary', component: OrderSummaryComponent, canActivate: [AuthGuard],
    data: {roles: [Role.User], title: 'Podsumowanie'}
  },
  {
    path: 'support', component: SupportComponent, canActivate: [AuthGuard],
    data: {roles: [Role.User], title: 'Wsparcie'}
  },
  {
    path: 'shops', component: ShopLocationsComponent,
    data: {title: 'Nasze sklepy'}
  },
  {
    path: 'admin', loadChildren: './admin/admin.module#AdminModule', canActivate: [AuthGuard],
    data: {roles: [Role.Admin, Role.Worker], title: 'Panel administracyjny'}
  },
  {path: '**', component: PageNotFoundComponent, data: {title: 'Hurtpol - 404'}}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: [],
  providers: [TitleService]
})

export class AppRoutingModule {
}
