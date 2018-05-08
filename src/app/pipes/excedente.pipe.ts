import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'excedente'
})
export class ExcedentePipe implements PipeTransform {

  transform(salida: any, consumido: any, cantidad: any): any {
    let res = null;
    let valor = ((salida + Number(consumido)) - cantidad);
    if (salida && valor > 0.99) {
      res = valor; //(salida + Number(consumido)) - cantidad;
    }

    return res;
  }

}
