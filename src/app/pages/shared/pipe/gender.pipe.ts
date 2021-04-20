import { Pipe, PipeTransform } from '@angular/core';

/**
 *  性别
 */
@Pipe({
  name: 'genderStr'
})
export class GenderPipe implements PipeTransform {
  transform(value: string): string {
    let str = '';
    switch (value) {
      case '0':
        str = '未知';
        break;
      case '1':
        str = '男';
        break;
      case '2':
        str = '女';
        break;
      case '9':
        str = '--';
        break;
      default:
        str = '未知';
    }
    return str;
  }
}


/**
 *  处方类型 prescriptionClass：1-中药才处方,2-西药处方
 */
 @Pipe({
  name: 'prescriptionClass'
})
export class PrescriptionClass implements PipeTransform {
  transform(value: string): string {
    let str = '';
    switch (value) {
      case '1':
        str = '中药才处方';
        break;
      case '2':
        str = '西药处方';
        break;
      default:
        str = '';
    }
    return str;
  }
}
