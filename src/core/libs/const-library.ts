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
          name: "多人会诊",
          meta: {
            title: "多人会诊",
            icon: ""
          }
        },
      ]
    },
    
    {
      path: "plan-management",
      name: "地图信息",
      meta: {
        title: "地图信息",
        icon: null
      },
      children: [
        {
          path: "map",
          name: "地图",
          id: "ypxxgl",
          meta: {
            title: "地图",
            icon: ""
          },
          redirect: "",
          children: []
        },
      ]
    },
    {
      path: "system-management",
      name: "系统配置",
      meta: {
        title: "系统配置",
        icon: null
      },
      children: [
        {
          path: "eyu",
          name: "天使的鳄鱼",
          id: "eyu",
          meta: {
            title: "天使的鳄鱼",
            icon: ""
          },
          redirect: "",
          children: []
        },
        {
          path: "kyle",
          name: "凯尔",
          id: "kyle",
          meta: {
            title: "凯尔",
            icon: ""
          },
          redirect: "",
          children: []
        },
      ]
    }


  ];


}