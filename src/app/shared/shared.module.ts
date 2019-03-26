import {LOCALE_ID, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlnCurrencyPipe} from './pln-currency.pipe';
import {PostcodePipe} from './postcode.pipe';
import {ButtonComponent} from './button/button.component';
import {MyCurrencyFormatterDirective} from './my-currency-formatter.directive';

@NgModule({
  declarations: [
    PlnCurrencyPipe,
    PostcodePipe,
    MyCurrencyFormatterDirective,
    ButtonComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PlnCurrencyPipe,
    PostcodePipe,
    MyCurrencyFormatterDirective,
    ButtonComponent
  ],

  providers: [
    {provide: LOCALE_ID, useValue: 'pl'},
    PlnCurrencyPipe
  ]
})
export class SharedModule {
}
