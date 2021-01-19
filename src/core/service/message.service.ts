import { Injectable } from '@angular/core';
import { NzMessageDataOptions, NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private successMessageId: string | undefined;
  private errorMessageId: string | undefined;
  private infoMessageId: string | undefined;

  constructor(
    private nzMessageService: NzMessageService,
  ) {
  }

  success(content: string, options?: NzMessageDataOptions) {
    if (this.successMessageId) {
      this.nzMessageService.remove(this.successMessageId);
    }

    this.successMessageId = this.nzMessageService.success(content, options).messageId;
  }

  error(content: string, options?: NzMessageDataOptions) {
    if (this.errorMessageId) {
      this.nzMessageService.remove(this.errorMessageId);
    }

    this.errorMessageId = this.nzMessageService.error(content, options).messageId;
  }

  info(content: string, options?: NzMessageDataOptions) {
    if (this.infoMessageId) {
      this.nzMessageService.remove(this.infoMessageId);
    }

    this.infoMessageId = this.nzMessageService.info(content, options).messageId;
  }
}
