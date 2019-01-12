import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'postcode'
})
export class PostcodePipe implements PipeTransform {

  transform(value: string, args?: any): string {
    let part1: string = value.toString().slice(0, 2);
    let part2: string = value.toString().slice(2);
    return `${part1}-${part2}`;
  }
}
