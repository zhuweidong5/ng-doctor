import { Component, OnInit } from '@angular/core';
import { ConstLibrary } from 'src/core/libs/const-library';
import { PathLibrary } from 'src/core/libs/path-library';
import { RouterService } from "src/core/service/router.service";

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.less']
})
export class FrameComponent implements OnInit {
  public menuList: any;
  public openMap = {};
  private domain!: string;

  constructor(
    private routerService: RouterService
  ) { }

  ngOnInit(): void {
    this.domain = window.location.origin;
    console.log('domain:', this.domain);
    this.qryMenusByCustomerId();
  }

  // 本地左侧菜单获取
  private qryMenusByCustomerId() {
    const menus = ConstLibrary.menusList;
    console.log('菜单：', menus)
    this.menuList = menus;
    this.handleMenusList(menus);
  }

  // 选中设置
  private handleMenusList(menuList: any[]) {
    // let id = this.storageService.accessMenuId(this.hospitalId);
    let id = 11;

    if (!id) {
      this.openMap[0] = true;
      if (menuList[0].children) {
          menuList[0].children[0].selected = true;
      }
      return;
    }

    for (let i = 0, iLen = this.menuList.length; i < iLen; i++) {
      if (this.menuList[i].children) {

        for (let j = 0, jLen = this.menuList[i].children.length; j < jLen; j++) {
          if (id === this.menuList[i].children[j].menuId) {
            this.openMap[i] = true;
            this.menuList[i].children[j].selected = true;
          } else {
            this.menuList[i].children[j].selected = false;
          }
        }

      }

    }
  }

  // 一级菜单跳转
  goToIndex(index: number | string, menu: any) {
    if (menu.children === null || menu.children === undefined) {
      this.menuList.forEach((item: { children: any[]; }) => {
        if (item.children) {
          item.children.forEach(e => {
            e.selected = false;
          });
        }
      });  
      this.routerService.navigate([PathLibrary.moduleNameOrder, PathLibrary.homepage], {}); // 跳转主页
    }
  }

  // 一级菜单折叠
  openHandler(index: string) {
    this.openMap = JSON.parse(JSON.stringify(this.openMap))
    console.log(this.openMap + '------', index);
    for (const key in this.openMap) {
      if (key !== index) {
        this.openMap[key] = false;
      }
    }
  }

  // 二级菜单跳转
  goTo(menu: any, key?: string) {
    if (this.domain.indexOf("localhost") > -1) {
      console.log("测试环境菜单", menu);
      // this.storageService.accessMenuId(this.hospitalId, menu.id);
      if (menu.path === "order-detail") {
        this.routerService.navigate([
          PathLibrary.moduleNameOrder,
          PathLibrary.orderDetail,
        ]);
      } else if (menu.path === "my-order-list") {
        this.routerService.navigate([
          PathLibrary.moduleNameOrder,
          PathLibrary.myOrderList,
        ]);
      } else if (menu.path === "index") {
        this.routerService.navigate([
          PathLibrary.moduleNameOrder,
          PathLibrary.homepage,
        ]); 
      } else if (menu.path === "map") {
        this.routerService.navigate([
          PathLibrary.moduleNameMap,
          PathLibrary.map,
        ]);  
      } else if (menu.path === "eyu") {
        this.routerService.navigate([
          PathLibrary.moduleNameOrder,
          PathLibrary.eyu,
        ]);  
      } else if (menu.path === "kyle") {
        this.routerService.navigate([
          PathLibrary.moduleNameOrder,
          PathLibrary.kyle,
        ]);  
      }
      else {
        alert("请配置路由地址！");
      }
    } else {
      console.log("正式环境菜单", menu);
      // this.storageService.accessMenuId(this.hospitalId, menu.id);
      if (menu.path === "/order-management/order-detail") {
        this.routerService.navigate([
          PathLibrary.moduleNameOrder,
          PathLibrary.orderDetail,
        ]);
      } else {
        this.routerService.goByPath(`${this.domain}/admin/#${menu.path}`);
      }
    }
  }


}
