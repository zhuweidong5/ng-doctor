import { Component, OnInit } from '@angular/core';
import { PathLibrary } from 'src/core/libs/path-library';
import { RouterService } from '../../../../core/service/router.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  constructor(
    private routerService: RouterService,
  ) { }

  ngOnInit(): void {
  }

  // 跳转首页
  goIndex() {
    this.routerService.navigate([PathLibrary.moduleNameOrder, PathLibrary.myOrderList], {}); // 登录成功指定跳转
  }

}
