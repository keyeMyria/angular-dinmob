import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberToYesNo'
})
export class NumberToYesNoPipe implements PipeTransform {

  transform(value: any, tipo?: string): any {
    if (tipo) {

      if (tipo === 'AC') {
        if (value === '1') {
          return 'Activo';
        }
        return 'Cancelado';
      }

      if (tipo === 'VAL') {
        if (value === '1') {
          return 'Validado';
        }
        return 'No Validado';
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

      if (tipo === 'RI') {
        if (value === '1') {
          return 'I';//irregular
        }
        return 'R';//regular
      }

    }


    if (value === '1') {
      return 'Si';
    }
    return 'No';

  }

}
