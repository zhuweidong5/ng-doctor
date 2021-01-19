// import { Subscription, of, throwError } from 'rxjs';
// import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
// import { Observable } from 'rxjs';
// import { ConfigService } from '../service/config.service';
// import { RequestService } from './../service/request/request.service';
// import { MessageService } from '../service/message.service';
// import { mergeMap, catchError } from 'rxjs/operators';
// import { HospitalConfigService } from '../service/hospital-config.service';
// import { PathLibrary } from '../libs/path-library';
// /**
//  * 登录守卫
//  * 根据域名获取对应hospital-url-map.json文件中匹配的医院信息
//  */
// @Injectable({
//   providedIn: 'root'
// })
// export class LoginGuardGuard implements CanActivate {
//   private urlMap = 'assets/hospital/hospital-url-map.json';
//   private domain: string;
//   private urlMapSubscription: Subscription;

//   constructor(
//     private requestService: RequestService,
//     private configService: ConfigService,
//     private hospitalConfigService: HospitalConfigService,
//     private messageService: MessageService,
//   ) {
//     this.domain = window.location.origin;
//   }
//   canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//     return this.setHospitalInfomation();
//   }

//   private setHospitalInfomation(): Observable<boolean> {
//     // 0. 先读取hospital-url-map.json根据域名获取医院id
//     return this.requestService.readLocalJSON(this.urlMap).pipe(
//         mergeMap(value => {
//           if (this.domain in value) {
//             this.configService.accessHospitalUrlMapValue(value[this.domain]);
//             // 1. 然后根据医院id读取医院相关定制化配置
//             return this.hospitalConfigService.readPrescriptionConfigJSON(`${PathLibrary.hospitalConfigJson}/${this.configService.accessHospitalUrlMapValue()}.json`);
//           } else {
//             this.messageService.error(`域名${this.domain}配置错误`);
//             return throwError(`域名${this.domain}配置错误`);
//           }
//         }),
//         catchError((reason) => {
//           console.error(reason);
//           return of(false);
//         })
//       );

//   }
// }
