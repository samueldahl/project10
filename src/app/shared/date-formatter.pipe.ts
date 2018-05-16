import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'dateFormatter'
})
export class DateFormatterPipe implements PipeTransform {

  transform(date: Date, time?: boolean): string {

    let dd: any = date.getDate();
    let mm: any = date.getMonth() + 1;
    const yyyy: any = date.getFullYear();

    if (dd < 10) {
      dd = '0' + dd;
    }

    if (mm < 10) {
      mm = '0' + mm;
    }

    return mm + '/' + dd + '/' + yyyy + (time ? ' ' + date.toLocaleTimeString() : '');
  }

}
