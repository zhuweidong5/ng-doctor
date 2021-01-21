import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiLibrary } from '../../libs/api-library/api-library';
import { HttpService } from '../http.service2';

@Injectable({
    providedIn: 'root'
})
export class RequestService {
    private host!: string;
    constructor(
      private httpService: HttpService,
    ) {
    }

    // 设置域名
    setURL(url: string) {
      this.host = url;
    }

    // 获取域名
    getHost(): string {
      return this.host;
    }

    /**
     * 读取本地配置数据（建议后续优先使用该方法）
     * @param url url地址
     * @param option 配置项
     */
    readLocalJSON(url: string, option?: any): Observable<any> {
        return this.httpService.getLocalData(url, option);
    }

    /*********************************** 获取数据 ************************************/
    /**
     * 获取地图数据
     */
    // getMapDataList(): Observable<any> {
    //     return this.httpService.request('get', this.host + ApiLibrary.aaa, {
    //         body: ''
    //     });
    // }

   
    
    /**
     * 测试接口
     */
    demoApi(): Observable<any> {
        return this.httpService.request('get', this.host + ApiLibrary.demoApi);
    }
}
