// 左侧菜单【更新】

export class ConstLibrary {
  // 路由
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


  // 取药方式
  public static readonly postType = [
    { label: "院内自取", value: "1" },
    { label: "快递配送", value: "2" }
  ];


  // 性别
  public genders = [
    { label: '男', value: '1' },
    { label: '女', value: '2' }
  ];
  // 人员类别
  public personalCategory = [
    { label: '医生', value: '1' },
    { label: '药师', value: '2' }
  ];
 
  // 省份
  public dataList = [
    { value: '1', label: '北京市' },
    { value: '2', label: '天津市' },
    { value: '3', label: '上海市' },
    { value: '4', label: '江苏省' },
    { value: '5', label: '浙江省' },
    { value: '6', label: '安徽省' },
    { value: '7', label: '福建省' },
    { value: '8', label: '江西省' },
    { value: '9', label: '湖南省' },
    { value: '10', label: '山东省' },
    { value: '11', label: '河南省' },
    { value: '12', label: '内蒙古自治区' },
    { value: '13', label: '湖北省' },
    { value: '14', label: '宁夏回族自治区' },
    { value: '15', label: '新疆维吾尔自治区' },
    { value: '16', label: '广东省' },
    { value: '17', label: '西藏自治区' },
    { value: '18', label: '海南省' },
    { value: '19', label: '广西壮族自治区' },
    { value: '20', label: '河北省' },
    { value: '21', label: '四川省' },
    { value: '22', label: '贵州省' },
    { value: '23', label: '山西省' },
    { value: '24', label: '重庆市' },
    { value: '25', label: '云南省' },
    { value: '26', label: '辽宁省' },
    { value: '27', label: '陕西省' },
    { value: '28', label: '吉林省' },
    { value: '29', label: '甘肃省' },
    { value: '30', label: '黑龙江省' },
    { value: '31', label: '青海省' },
    { value: '32', label: '台湾省' },
    { value: '33', label: '香港特别行政区' },
    { value: '34', label: '澳门特别行政区' },
  ];


}