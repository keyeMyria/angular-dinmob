import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberToYesNo'
})
export class NumberToYesNoPipe implements PipeTransform {

  transform(value: any, tipo?: string): any {
    if (tipo) {
      
      if (tipo === 'AC') {
        if (value === '1') {
          return 'Aceptar';
        }
        return 'Cancelar';
      }

      if (tipo === 'SN') {
        if (value === '1') {
          return 'Si';
        }
        return 'No';
      }

      if (tipo === 'BM') {
        if (value === '1') {
          return 'Bueno';
        }
        return 'Malo';
      }

      if (tipo === 'TF') {
        if (value === '1') {
          return 'Verdadero';
        }
        return 'Falso';
      }

    }


    if (value === '1') {
      return 'Si';
    }
    return 'No';

  }

}
