import {Pipe, PipeTransform} from '@angular/core';
import {CurrencyPipe} from "@angular/common";

@Pipe({
  name: 'plnCurrency'
})
export class PlnCurrencyPipe implements PipeTransform {

  transform(value: number): string {
    return new CurrencyPipe('pl').transform(value / 100, 'PLN', 'symbol', '1.2-2', 'pl');
  }

}
