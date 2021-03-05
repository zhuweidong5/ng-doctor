import { Component, OnInit } from '@angular/core';
// import { MessageService } from 'src/core/service/message.service';
import { RequestService } from 'src/core/service/request/request.service';

@Component({
  selector: 'app-kyle',
  templateUrl: './kyle.component.html',
  styleUrls: ['./kyle.component.less']
})
export class KyleComponent implements OnInit {
  listOfData: any;
  constructor(
    private requestService: RequestService,
    // private messageService: MessageService
  ) { }

  ngOnInit(): void {
    // this.listOfData = [
    //     {
    //       key: '1',
    //       name: 'John Brown',
    //       age: 32,
    //       address: 'New York No. 1 Lake Park'
    //     },
    //     {
    //       key: '2',
    //       name: 'Jim Green',
    //       age: 42,
    //       address: 'London No. 1 Lake Park'
    //     },
    //     {
    //       key: '3',
    //       name: 'Joe Black',
    //       age: 32,
    //       address: 'Sidney No. 1 Lake Park'
    //     }
    // ]

    this.qryList();
  }

  // 获取list
  qryList() {
    this.requestService.qryList().subscribe(
        (res: any) => {
          console.log('res', res)
          this.listOfData = res;
        },
        ( err: { msg: any; }) => {
          console.log('err', err)
        }
      );
  }

  // 查看详情
  detail(data: any) {
    this.requestService.qryDetail(data.id).subscribe({
      next: res => {
        console.log(res)
      },
      error: reason => {
        // this.messageService.error(reason);
      }
    });
  }
 

}
