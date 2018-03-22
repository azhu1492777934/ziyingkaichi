export default {
  app: {
    // name: 'VCT-管理配置系统'
    name: 'MX的系统'
  },
  route: {
    dashboard: '首页',
    customer: "客户管理",
    balance: "客户账户管理",
    order: "客户行程订单",
    price: "价格管理",
    flowPackage: "流量套餐管理",
    masterCard: "预置主卡管理",
    viceCard: "副卡信息管理",
    viceCardConfig: "副卡配置管理",
    viceCardPLMN: "副卡PLMN配置",
  },
  navbar: {
    home: '主页',
    logOut: '退出登录',
    dashboard: '首页',
    github: '项目地址',
    screenfull: '全屏',
    theme: '换肤'
  },
  login: {
    title: '系统登录',
    logIn: '登录',
    username: '账号',
    password: '密码',
    any: '随便填',
    thirdparty: '第三方登录',
    thirdpartyTips: '本地不能模拟，请结合自己业务进行模拟！！！'
  },
  customer: {
    id: "ID",
    phoneNumber: "手机号",
    name: "名字",
    realName: "显示名",
    email: "邮箱",
    countryCode: "所属国家",
    currency: "使用币种",
    status: "状态",
  },
  balance: {
    id: "ID",
    tsid: "tsid",
    date: "更新时间",
    balance: "余额",
    presenter: "赠送余额",
    currency: "币种",
    customerId: "客户ID",
    customerPhoneNumber: "客户手机号",
    customerRealName: "客户名",
  },
  country_price: {
    id: "ID",
    countryCode: "国家",
    customerId: "客户ID",
    customerRealName: "客户名",
    currency: "币种",
    price: "日价格",
    maxData: "最大流量(KB)",
    speedLimit: "超额限速(KBPS)",
    describe: "说明"
  },
  order: {
    id: "ID",
    identifier: "订单编号",
    customerID: "客户ID",
    customerRealName: "客户名",
    tsCount: "设备数量",
    type: "订单类型",
    countryCode: "国家列表",
    beginDate: "行程开始时间",
    endDate: "行程结束时间",
    total: "总价",
    currency: "币种",
    status: "状态",
  },
  orderTrip: {
    orderID: "订单ID",
    tsid: "设备号",
    countryCode: "国家编码",
    tripDate: "日期",
    price: "单价",
    customerID: "客户ID",
    maxData: "最大流量",
    speedLimit: "超额限速",
    status: "状态",
  },

  country: {
    id: "ID",
    countryCode: "国家编码",
    countryName: "国家名",
    continentCode: "所属洲",
    timeZone: "时区",
    nameCn: "中文名",
    longItude: "经度",
    latItude: "纬度",
    status: "状态",
  },

  operator: {
    id: "ID",
    operatorCode: "运营商编号",
    operatorNameEn: "名称",
    operatorNameCn: "中文名称",
    countryCode: "所属国家",
    mcc: "MCC",
    mnc: "MNC",
    apn: "APN",
    level: "优先级",
    status: "状态",
    groupSize: "分组系数",
  },

  country_operator: {
    id: "ID",
    roamCountryCode: "国家编码",
    roamCountryCodeCn: "国家名称",
    operatorCode: "运营商编码",
    operatorCodeCn: "运营商名称",
    level: "优先级",
    status: "状态",
  },

  operator_prefer: {
    id: "ID",
    operatorCode: "运营商编码",
    operatorCodeCn: "运营商名称",
    roamMcc: "接入MCC",
    pPlmn: "PPLMN",
    fPlmn: "FPLMN",
  },

  used_net: {
//     接入网络配置
//     列表：	运营商编码	套餐ID	套餐名	MCC	使用网络策略
// operatorcode	packageId		MCC	usedNet
// 字典表
// 查询条件	运营商编码（模糊查询）
// 	操作	修改： 套餐ID、MCC、使用网络策略
// 删除
// 批量操作	添加： 运营商编码、套餐ID、MCC、使有网络
//     private int id ;
// private int operatorCode;
// private int packageId;
// private String mcc;
// private int usedNet;
    id: "ID",
    operatorCode: "运营商编码",
    operatorCodeCn: "运营商名称",
    packageId: "套餐ID",
    packageCn: "套餐名",
    mcc: "MCC",
    usedNet: "使用网络策略",
  },

  errorLog: {
    tips: '请点击右上角bug小图标',
    description: '现在的管理后台基本都是spa的形式了，它增强了用户体验，但同时也会增加页面出问题的可能性，可能一个小小的疏忽就导致整个页面的死锁。好在 Vue 官网提供了一个方法来捕获处理异常，你可以在其中进行错误处理或者异常上报。',
    documentation: '文档介绍',
    username: '请输入正确的用户名',
    passwordLength: '密码不能小于5位',
  },
  theme: {
    change: '换肤',
    documentation: '换肤文档',
    tips: 'Tips: 它区别于 navbar 上的 theme-pick, 是两种不同的换肤方法，各自有不同的应用场景，具体请参考文档。'
  }
}
