import { RequestService } from 'src/core/service/request/request.service';
import { Component, OnInit } from '@angular/core';
import { PathLibrary } from 'src/core/libs/path-library';
import { RouterService } from "src/core/service/router.service";


@Component({
  selector: 'app-my-order-list',
  templateUrl: './my-order-list.component.html',
  styleUrls: ['./my-order-list.component.less']
})
export class MyOrderListComponent implements OnInit {

  constructor(
    private routerService: RouterService,
    private requestService: RequestService
  ) { }

  ngOnInit(): void {

    this.init();
  }


  private init() {

    

    this.requestService.demoApi()
      .subscribe(
        (res: any) => {
          console.log('res', res)
        },
        (        err: { msg: any; }) => {
          console.log('err', err)

        }
      );

  }

}
