// 左侧菜单【更新】

export class ConstLibrary {

  public static readonly menusList = [
    {
      path: "index",
      name: "首页",
      icon: "user",
      meta: {
        title: "首页",
        icon: "icon-ren"
      },
      redirect: "index",
      children: [
        {
          path: "index",
          name: "首页",
          id: "1",
          meta: {
            title: "首页",
            icon: "icon-ren"
          },
          redirect: null,
          children: []
        }
      ]
    },
    
   
    {
      path: "order-management",
      name: "订单管理",
      meta: {
        title: "订单管理",
        icon: ""
      },
      children: [
        {
          path: "my-order-list",
          id: "9",
          name: "订单列表",
          meta: {
            title: "预约订单",
            icon: ""
          }
        },
        {
          path: "order-detail",
          id: "10",
          name: "订单详情",
          meta: {
            title: "挂号订单",
            icon: ""
          }
        },
      ]
    },
    
    {
      path: "/drugInfoManagement",
      name: "药品信息",
      meta: {
        title: "药品信息",
        icon: null
      },
      children: [
        {
          path: "/drugInfo",
          name: "药品信息管理",
          id: "ypxxgl",
          meta: {
            title: "药品信息管理",
            icon: ""
          },
          redirect: "",
          children: []
        },
      ]
    }


  ];


}