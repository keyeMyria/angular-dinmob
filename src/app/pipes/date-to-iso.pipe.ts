import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateToIso'
})
export class DateToIsoPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return new Date(value).toISOString();
  }

}
