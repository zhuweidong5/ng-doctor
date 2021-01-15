// import { Injectable } from '@angular/core';
// import { RequestService } from '@witon/core/service/request/request.service';
// import { Observable, Observer, of, timer, pipe } from 'rxjs';
// import { ajax } from 'rxjs/ajax';
// import { map, catchError, switchMap, mergeMap, take } from 'rxjs/operators';
// import { StorageService } from '@witon/core/system/storage.service';
// import { MessageService } from '@witon/core/service/message.service';
// import { ApiLibrary } from '@witon/core/libs/api-library/api-library';
// import { QryDoctorList } from '@witon/core/object/website/in/in-doctor-list';

// @Injectable({
//   providedIn: 'root'
// })
// export class SharedService {
//   private host: string;
//   // 性别
//   public genders = [
//     { label: '男', value: '1' },
//     { label: '女', value: '2' }
//   ];
//   // 人员类别
//   public personalCategory = [
//     { label: '医生', value: '1' },
//     { label: '药师', value: '2' }
//   ];
//   // 职称
//   public jobTitle = [
//     { value: '1', label: '初级职称' },
//     { value: '2', label: '中级职称' },
//     { value: '3', label: '副高职称' },
//     { value: '4', label: '正高职称' },
//     { value: '5', label: '无' }
//   ];
//   // 省份
//   public dataList = [
//     { value: '1', label: '北京市' },
//     { value: '2', label: '天津市' },
//     { value: '3', label: '上海市' },
//     { value: '4', label: '江苏省' },
//     { value: '5', label: '浙江省' },
//     { value: '6', label: '安徽省' },
//     { value: '7', label: '福建省' },
//     { value: '8', label: '江西省' },
//     { value: '9', label: '湖南省' },
//     { value: '10', label: '山东省' },
//     { value: '11', label: '河南省' },
//     { value: '12', label: '内蒙古自治区' },
//     { value: '13', label: '湖北省' },
//     { value: '14', label: '宁夏回族自治区' },
//     { value: '15', label: '新疆维吾尔自治区' },
//     { value: '16', label: '广东省' },
//     { value: '17', label: '西藏自治区' },
//     { value: '18', label: '海南省' },
//     { value: '19', label: '广西壮族自治区' },
//     { value: '20', label: '河北省' },
//     { value: '21', label: '四川省' },
//     { value: '22', label: '贵州省' },
//     { value: '23', label: '山西省' },
//     { value: '24', label: '重庆市' },
//     { value: '25', label: '云南省' },
//     { value: '26', label: '辽宁省' },
//     { value: '27', label: '陕西省' },
//     { value: '28', label: '吉林省' },
//     { value: '29', label: '甘肃省' },
//     { value: '30', label: '黑龙江省' },
//     { value: '31', label: '青海省' },
//     { value: '32', label: '台湾省' },
//     { value: '33', label: '香港特别行政区' },
//     { value: '34', label: '澳门特别行政区' },
//   ];
//   // 职位
//   public jobPosition = [
//     { value: '1', label: '院长' },
//     { value: '2', label: '院长助理' },
//     { value: '3', label: '副院长' },
//     { value: '4', label: '党委书记' },
//     { value: '5', label: '主任' },
//     { value: '6', label: '副主任' },
//     { value: '7', label: '护士长' },
//     { value: '8', label: '副护士长' },
//     { value: '9', label: '无' }
//   ];
//   // 学术职称
//   public academicTitle = [
//     { value: '1', label: '教授' },
//     { value: '2', label: '副教授' },
//     { value: '3', label: '讲师' },
//     { value: '4', label: '正高' },
//     { value: '5', label: '副高' },
//     { value: '6', label: '助理/师级' },
//     { value: '7', label: '中级' },
//     { value: '8', label: '员/士' },
//     { value: '9', label: '无' }
//   ];
//   public isChange = false;   // 医生模态框是否成功新增或者编辑决定是否刷新列表
//   public clinicTypeList = [
//     { label: '请选择', value: '' },
//     { label: '视频问诊', value: '81' },
//     { label: '语音问诊', value: '85' },
//     { label: '图文问诊', value: '82' }
//   ];    // 问诊类型
//   public departmentList: Array<any> = [];
//   public doctortList: Array<any> = [];
//   nzTotal: any;
//   tableData: any;



//   constructor(private requestService: RequestService, private storageService: StorageService, public msg: MessageService) {
//     this.host = this.requestService.getHost();
//   }

//   /* 封装ajax post请求 */
//   public rxjsAjax(rqeuestUrl: string, data: any) {
//     let time = (Math.random()) * (new Date() as any);
//     const obs$ = ajax({
//       url: `${rqeuestUrl}?v=${time}`,
//       method: 'post',
//       headers: {
//         accessToken: this.storageService.accessAccessToken(),
//         'Content-Type': 'application/json',
//       },
//       body: data
//     }).pipe(map(res => res.response));
//     return obs$;
//   }

//   /* 下载excel post请求 */
//   public exportExcel(code: string, data: any) {
//     let time = (Math.random()) * (new Date() as any);
//     let requestUrl = '';
//     let method = 'post';
//     let fileName = '';
//     if (code === 'appointment-order') {
//       fileName = '预约信息';
//       requestUrl = this.host + ApiLibrary.exportRegisterOrderListExcel;
//     } else if (code === 'department-list') {
//       fileName = '科室列表';
//       requestUrl = this.host + ApiLibrary.departmentExcel;
//     } else if (code === 'doctor-list') {
//       fileName = '医生列表';
//       requestUrl = this.host + ApiLibrary.doctorExcel;
//     } else if (code === 'registered-order') {
//       fileName = '挂号信息';
//       requestUrl = this.host + ApiLibrary.deriveResult;
//     } else if (code === 'inquiry-record') {
//       fileName = '诊疗记录信息';
//       requestUrl = this.host + ApiLibrary.exprotInquiryRecordExcel;
//     } else if (code === 'prescription-order') {
//       fileName = '处方订单信息';
//       requestUrl = this.host + ApiLibrary.prescriptionOrderExport;
//     } else if (code === 'black-list') {
//       fileName = '黑名单信息';
//       requestUrl = this.host + ApiLibrary.deriveExcel;
//     } else if (code === 'patient-list') {
//       fileName = '就诊人信息';
//       requestUrl = this.host + ApiLibrary.patientExcel;
//     } else if (code === 'data-consulting') {
//       fileName = '图文问诊按医生统计咨询量';
//       requestUrl = this.host + ApiLibrary.imgExport;
//     } else if (code === 'drug-info') {
//       fileName = '药品信息列表';
//       requestUrl = this.host + ApiLibrary.drugExport;
//     } else if (code === 'deptDiag-config') {
//       method = 'get';
//       fileName = '科室诊断配置列表';
//       requestUrl = `${this.host}${ApiLibrary.deptDiagConfigExport}${data.hospitalId}`;
//     } else if (code === 'registered-record') {
//       fileName = '退费管理';
//       requestUrl = this.host + ApiLibrary.registeredRecord;
//     } else if (code === 'prescribe-drug-list') {
//       fileName = '药剂科统计列表';
//       requestUrl = this.host + ApiLibrary.qryPrescribeDrugExport;
//     } else if (code === 'export-user-security-log') {
//       fileName = '登录日志列表';
//       requestUrl = this.host + ApiLibrary.exportUserSecurityLog;
//     } else if (code === 'user-advice-list') {
//       fileName = '留言中心列表';
//       requestUrl = this.host + ApiLibrary.exportUserAdvice;
//     } else if (code === 'workload-export') {
//       fileName = '工作量统计报表导出';
//       requestUrl = this.host + ApiLibrary.workloadExport;
//     }

//     ajax({
//       url: `${requestUrl}?v=${time}`,
//       method,
//       headers: {
//         accessToken: this.storageService.accessAccessToken(),
//         'Content-Type': 'application/json',
//       },
//       responseType: 'blob',
//       body: data
//     }).pipe(map(res => res)).subscribe(value => {
//       const link = document.createElement('a');
//       // 指定生成的文件名
//       link.download = fileName;
//       let blob = new Blob([value.response], { type: "application/vnd.ms-excel" });
//       link.href = URL.createObjectURL(blob);
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     }, err => {
//       this.msg.error(err.msg);
//     });
//   }

//   // 科室
//   public selectFullDept(doctorDepartmentId?: Array<string>) {
//     this.requestService.selectFullDept().subscribe(value => {
//       this.departmentList = [];
//       let list = [{
//         departmentId: "",
//         departmentName: "请选择"
//       }];
//       this.departmentList = [...list, ...value];
      
//       console.log(11111111111111111);

//       // 过滤医生对应的科室信息
//       this.doctorBelongDepatient(this.departmentList);
//     }, err => {
//       this.msg.error(err.msg);
//     });
//   }

//   // 医生
//   public selectDocorList() {
//     let cruData = {
//       departmentId: "",
//       hospitalId: this.storageService.accessHospitalId()
//     };
//     this.requestService.selectDocorList(cruData).subscribe(value => {
//       this.doctortList = [];
//       let list = [{
//         doctorId: "",
//         doctorName: "请选择"
//       }];
//       this.doctortList = [...list, ...value];
//     }, err => {
//       this.msg.error(err.msg);
//     });
//   }

//   // 根据医生所属科室 过滤科室信息 departmentListId 所属科室id  科室列表 departmentList
//   doctorBelongDepatient(departmentList: Array<any>) {

//     // 先获取医生信息
//     this.getDoctorInfo().pipe(
//       map((res: any) => {

//         if (res && res.deptId) {
//         let departmentListId = res.deptId.split(',');
//         let departmentId = departmentListId;
//         let list: Array<{}> = departmentList.filter((item) => {
//                 return departmentId.includes(item.departmentId); 
//           });
//         return list;
    
//         } else {
//           return departmentList;
//         }
//       })
//     ).subscribe(
//       list => {
//         this.departmentList = list;
//       }
//     );
     


//   }


//   // 查询医生信息
//   getDoctorInfo(): Observable<Array<{}>> {
//     return new Observable(
//       subscribe => {
//         // 获取当前登录的用户信息
//         let doctorInfo = this.storageService.accessDoctorInfo();
//         this.requestService.doctorUser({ customerId: doctorInfo.customerId })
//         .subscribe(value => {
//           subscribe.next(value);
//           subscribe.complete();
//         }, err => {
//           this.msg.error(err.msg);
//         });


//       }
//     );

//   }

// }
