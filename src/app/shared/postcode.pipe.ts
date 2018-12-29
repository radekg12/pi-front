import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'postcode'
})
export class PostcodePipe implements PipeTransform {

  transform(value: string, args?: any): string {
    console.log(`value: ${value}`);
    let part1: string = value.toString().slice(0, 2);
    let part2: string = value.toString().slice(2);
    let postcode = `${part1}-${part2}`;
    console.log(`postcode: ${postcode}`);
    return postcode;
  }

}
