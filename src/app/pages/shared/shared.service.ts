import { Injectable } from '@angular/core';
// import { RequestService } from '@witon/core/service/request/request.service';
import { Observable, Observer, of, timer, pipe } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, catchError, switchMap, mergeMap, take } from 'rxjs/operators';
import { ApiLibrary } from 'src/core/libs/api-library/api-library';
import { MessageService } from 'src/core/service/message.service';
import { RequestService } from 'src/core/service/request/request.service';
import { StorageService } from 'src/core/service/storage.service';
// import { StorageService } from '@witon/core/system/storage.service';
// import { MessageService } from '@witon/core/service/message.service';
// import { ApiLibrary } from '@witon/core/libs/api-library/api-library';
// import { QryDoctorList } from '@witon/core/object/website/in/in-doctor-list';


/**
 * excel 的导出操作
 * 
 * 
 * 
 */

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private host: string;

  constructor(
    private requestService: RequestService, 
    private storageService: StorageService, 
    public msg: MessageService
    ) {
    this.host = this.requestService.getHost();
  }

  /* 封装ajax post请求 */
  public rxjsAjax(rqeuestUrl: string, data: any) {
    let time = (Math.random()) * (new Date() as any);
    const obs$ = ajax({
      url: `${rqeuestUrl}?v=${time}`,
      method: 'post',
      headers: {
        accessToken: this.storageService.accessAccessToken(),
        'Content-Type': 'application/json',
      },
      body: data
    }).pipe(map(res => res.response));
    return obs$;
  }

  /* 下载excel post请求 */
  public exportExcel(code: string, data: any) {
    let time = (Math.random()) * (new Date() as any);
    let requestUrl = '';
    let method = 'post';
    let fileName = '';
    if (code === 'appointment-order') {
      fileName = '预约信息';
      requestUrl = this.host + ApiLibrary.daochu;
    } else if (code === 'department-list') {
      fileName = '科室列表';
      method = 'get';
      requestUrl = this.host + ApiLibrary.daochu + this.storageService.accessHospitalId();
    } else if (code === 'doctor-list') {
      fileName = '医生列表';
      method = 'get';
      requestUrl = this.host + ApiLibrary.daochu + '/' + this.storageService.accessHospitalId();
    } else if (code === 'registered-order') {
      fileName = '挂号信息';
      requestUrl = this.host + ApiLibrary.daochu;
    } else if (code === 'inquiry-record') {
      fileName = '诊疗记录信息';
      requestUrl = this.host + ApiLibrary.daochu;
    }

    ajax({
      url: `${requestUrl}?v=${time}`,
      method,
      headers: {
        accessToken: this.storageService.accessAccessToken(),
        'Content-Type': 'application/json',
      },
      responseType: 'blob',
      body: data
    }).pipe(map(res => res)).subscribe(value => {
      const link = document.createElement('a');
      // 指定生成的文件名
      link.download = fileName;
      let blob = new Blob([value.response], { type: "application/vnd.ms-excel" });
      link.href = URL.createObjectURL(blob);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, err => {
      this.msg.error(err.msg);
    });
  }



 
 




}
