import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateToIso'
})
export class DateToIsoPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    
    let date= value.replace(" ","T");
    //console.log("pipe", date);
    return date;
  }

}
