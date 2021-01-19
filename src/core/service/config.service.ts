// 配置服务
import {Injectable} from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { ApiLibrary } from '../libs/api-library/api-library';
import { RequestService } from './request/request.service';
import { HttpService } from './http.service2';
@Injectable()
export class ConfigService {

  static apiUser: string; // 获取用户总数信息
  static apiResult: string; // 获取检查结果统计
  static apiCheck: string; // 获取检查结果统计

  private static serverURL: string; // 服务器地址
  private static groupID: string; // 组织ID

  private static apiUserPattern = '/ehealth2/stat/{$groupID}/user.json'; // 获取用户总数
  private static apiResultPattern = '/ehealth2/stat/{$groupID}/dd.json'; // 获取检查结果统计
  private static apiCheckPattern = '/ehealth2/stat/{$groupID}/dc.json'; // 获取检查结果统计

  private serverURL!: string;
  private serverURLOutsideSubscriberList!: Array<Subscriber<string>>;
  private hospitalUrlMapValue!: string;
  private domain: string;


  constructor(
    private requestService: RequestService,
    private httpService: HttpService,
    // private messageService : MessageService
  ) {
    this.domain = window.location.origin;
  }


  // 初始化，系统启动时被调用
  init() {
    ConfigService.serverURL = 'http://jkb.witontek.com';
    ConfigService.groupID = '3450';
    ConfigService.apiUser =  (ConfigService.serverURL + ConfigService.apiUserPattern).replace('{$groupID}', ConfigService.groupID);
    ConfigService.apiResult = (ConfigService.serverURL + ConfigService.apiResultPattern).replace('{$groupID}', ConfigService.groupID);
    ConfigService.apiCheck = (ConfigService.serverURL + ConfigService.apiCheckPattern).replace('{$groupID}', ConfigService.groupID);

    this.getConfigJson();
  }


  // witon  数据大屏
  // 获取监听，获取服务器地址
  getServerURL(): Observable<string> {
    return new Observable(
      subscriber => {
        this.serverURLOutsideSubscriberList.push(subscriber);

        if (this.serverURL != null) {
          this.returnServerURL();
        }
      }
    );
  }

  accessHospitalUrlMapValue(value?: string) {
    if (value) {
      this.hospitalUrlMapValue = value;
    }

    return this.hospitalUrlMapValue;
  }

  // 读配置文件
  private getConfigJson(): void {
    this.httpService.getLocalData(ApiLibrary.configUrl)
      .subscribe(
        data => {
          this.getServerURLSuc(data.server_url);
        }
      );
  }

  // public getHospitalConfigAllJson(): Observable<boolean> {
  //   return new Observable(subscriber => {
  //     this.requestService.readLocalJSON(this.urlMap)
  //     .subscribe(
  //       value => {
  //         if (this.domain in value) {
  //           this.accessHospitalUrlMapValue(value[this.domain]);
  //           subscriber.next(true);
  //           subscriber.complete();
  //         } else {
  //           subscriber.next(false);
  //           this.messageService.error(`域名${this.domain}配置错误`);
  //         }
  //       },
  //       reason => {
  //         subscriber.next(false);
  //         this.messageService.error(JSON.stringify(reason));
  //       }
  //     );
  //   });
  // }

  private getServerURLSuc(serverURL: string): void {
    this.requestService.setURL(serverURL);
    this.serverURL = serverURL;
    this.returnServerURL();
  }

  private returnServerURL(): void {
    if (this.serverURLOutsideSubscriberList) {
      while (this.serverURLOutsideSubscriberList.length > 0) {
        // const serverURLOutsideSubscriber: Subscriber<string> = this.serverURLOutsideSubscriberList.pop();
        const serverURLOutsideSubscriber: any = this.serverURLOutsideSubscriberList.pop();
        serverURLOutsideSubscriber.next(this.serverURL);
      }
    }
  }

}
