import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unmaskNumber'
})
export class UnmaskNumberPipe implements PipeTransform {

  transform(value: string, args?: any): any {

    //aplicamos una expresion regular para sustituir las apariciones de las comas
    //por un string vacío
    // 1,000,000.00 => 1000000.00

    if (value) {
      return value.replace(/,/g, "");
    }
    return 0;



  }


}
