/**API 接口 */

export class ApiLibrary {
    public static readonly configUrl = 'assets/config/config-info.json'; // 服务器配置url

    // public static readonly localMenu = 'assets/data/menu-data.json';       // 本地菜单列表
    // public static readonly configUrl = 'assets/config/config-info.json';   // 服务器配置url

    public static readonly login = 'auth/login';      // 登录


    public static readonly demoApi = 'list/product';      // 测试接口
    public static readonly qryList = 'list';      // 普通的list
    public static readonly qryPage = 'page';      // 分页的list  /page/:status/:page
    public static readonly qryDetail = 'detail';      // 分页的详情  


}