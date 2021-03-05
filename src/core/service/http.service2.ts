
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiLibrary } from '../libs/api-library/api-library';

// 接口参数
interface Options {
    body?: any;
    headers?:
        | HttpHeaders
        | {
            [header: string]: string | string[];
        };
    observe?: 'body' | 'events' | 'response';
    params?:
        | HttpParams
        | {
            [param: string]: string | string[];
        };
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
    reportProgress?: boolean;
    withCredentials?: boolean;
}

@Injectable({
    providedIn: 'root',
})

export class HttpService {
    private host!: string;
    constructor(
        private httpClient: HttpClient,
    ) {
        this.getLocalData(ApiLibrary.configUrl).subscribe((data) => {
            this.host = data.server_url;
        });
    }

  // 对外暴露的 request 函数
  request(method: string, url: string, options?: Options): Observable<any> {
    return new Observable((subscriber) => {
        // 临时处理 url 获取不到问题
        if (url.indexOf('undefined') !== -1) {
            if (this.host === undefined || this.host === null || !this.host) {
                this.getLocalData(ApiLibrary.configUrl).subscribe((data) => {
                    this.host = data.server_url;
                    this.httpClientRequest(method, url.replace('undefined', this.host), options).subscribe(
                        res => {
                            subscriber.next(res);
                            subscriber.complete();
                        },
                        err => {
                            subscriber.error(err);
                        }
                    );
                });
            } else {
              this.httpClientRequest(method, url.replace('undefined', this.host), options).subscribe(
                    res => {
                        subscriber.next(res);
                        subscriber.complete();
                    },
                    err => {
                        subscriber.error(err);
                    }
                );
            }
        } else {
            this.httpClientRequest(method, url, options).subscribe(
                res => {
                    subscriber.next(res);
                    subscriber.complete();
                },
                err => {
                    subscriber.error(err);
                }
            );
        }
    });
}

  // 内部私有方法
  private httpClientRequest(method: string, url: string, options?: Options): Observable<any> {
    return new Observable((subscriber) => {
      this.httpClient.request(method, url, options).subscribe(
        (response) => {
            if (response.code === 'success' || response.msg === 'success' || response.message === 'success') {
                console.log('请求了接口吗', response.data)
                subscriber.next(response.data);
                subscriber.complete();
            } else  {
                subscriber.error(response);
            }
        },
        (reason) => {
            if (reason instanceof HttpErrorResponse) {
                subscriber.error(reason.error.error || reason.error.msg);
                } else {
                    subscriber.error(reason);
                }
            }
        );
    });
  }

  // 读取本地数据 调用此接口
  getLocalData(url: string, option?: any): Observable<any> {
    return this.httpClient.get(url, option);
  }

  /**
   * 分步上传文件
   * 以FormData格式提交参数
   */
  multipartRequest(method: string, url: string, formData: FormData): Observable<any> {
    return new Observable((subscriber) => {
      this.httpClient
        .request<any>(new HttpRequest(method, url, formData))
        .subscribe({
          next: (response: any) => {
            if (response.type === 4) {
              if (response.body.code === 200) {
                subscriber.next(response.body);
                subscriber.complete();
              } else {
                subscriber.error(response.body);
              }
            }
          },
          error: (reason) => {
            subscriber.error(reason.error);
          },
        });
    });
  }
}
