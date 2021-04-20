import { Pipe, PipeTransform } from '@angular/core';

/**
 * 从对象数组中匹配指定值的文字,需要结合定义常量转化数组
 * 1：定义
 * 2：定义常量-在const-library.ts
 * 3: 引用-在当前组件：this.postType = ConstLibrary.postType; // 取药方式
 * 4：使用：  <span>{{curOrder.postType | statusToText: postType}}</span>
 */
@Pipe({
  name: 'statusToText'
})
export class StatusToTextPipe implements PipeTransform {

  transform(status: string, dataSource: { value: string, label: string }[]): string {
    let obj = dataSource.find(item => item.value === status);
    return obj ? obj.label : status;
  }

}
