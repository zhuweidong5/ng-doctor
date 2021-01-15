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
    private routerService: RouterService
  ) { }

  ngOnInit(): void {
  }

}
