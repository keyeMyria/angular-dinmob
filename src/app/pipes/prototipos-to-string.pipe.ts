import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prototiposToString'
})
export class PrototiposToStringPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let strValue= "";
    
    if (!value) {
      return strValue;      
    }

    for (let i = 0; i < value.length; i++) {

      strValue += value[i].nombre;

      if (i < value.length-1) {
        strValue += ", ";
      }

    }

    return strValue;

  }

}
