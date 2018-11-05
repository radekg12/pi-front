import {RouterModule, Routes} from "@angular/router";
import {UserComponent} from "./user/user.component";
import {AddUserComponent} from "./user/add-user.component";
import {NgModule} from "@angular/core";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {ProductDetailsComponent} from "./product-details/product-details.component";

const routes: Routes = [
  {path: '', redirectTo: '/users', pathMatch: 'full'},
  {path: 'users', component: UserComponent},
  {path: 'users/:id', component: ProductDetailsComponent},
  {path: 'add', component: AddUserComponent, pathMatch: 'prefix'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      // {enableTracing: true}
    )
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})

export class AppRoutingModule {

}
