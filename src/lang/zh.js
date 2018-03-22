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
    id: "ID",
    operatorCode: "运营商编码",
    operatorCodeCn: "运营商名称",
    packageId: "套餐ID",
    packageCn: "套餐名",
    mcc: "MCC",
    usedNet: "使用网络策略",
  },

  // 活跃终端
  // 列表字段：	终端	IMSI	开始时间	最后一次心跳时间	使用国家
  //           TSID	IMSI	DATE	BEATTIME	Vcountrycode
  // 查询条件:	终端(模糊查询）
	// 	运营商编码，下拉选择（m_operator表），主要用来查询IMSI（m_terminal_sim关联m_simcard).
  //   IMSI(模糊查询）
	// 	使用国家，下接选择（m_country表）
	// 操作:	释放主卡，删除m_terminal_sim该条记录，并将SIM_GROUP卡组缓存的该卡状态置为空闲（有接口实现）
	// 批量操作：	释放主卡
//   private int id;
// private long imsi;
// private int tsid;
// private String mcc;
// private String groupKey;
// private Date beatTime;
// private Date date ;
// private long ecardImsi;
// private int ecardDuration;
// private String runVersion;
// private int vCountryCode;
  terminal_sim: {
    id: "ID",
    tsid: "终端",
    imsi: "IMSI",
    date: "开始时间",
    beatTime: "最后一次心跳时间",
    vCountryCode: "使用国家",
  },

  // 终端信息管理
  // 列表：	编号	SSID	密码	MAC	批次	版本	状态	IMEI	上传日志
  //       TSID	SSID	WIFIPASSWORD	MAC	batch	sversion	status	IMEI	UPLOG
  //       0：不上传；1：上传
  //       "0:正常；
  //       1：未初始化；
  //       2：停用；
  //       3：注销"
  //  查询条件：	终端编号（模糊查询）
	// 	SSID（模糊查询）
	// 	批次（精确匹配）
	// 	状态（下拉列表）
	// 操作:	停用： 将状态置为2
  // 多选操作：	状态修改：	能够批量修改设备状态，包括：正常、未初始化、停用、注销
//   private int id ;
// private int tsid; //终端编号，IMEI后8位
// private String mac; //MAC
// private String model; //终端型号
// private String batch; //生产批次
// private String sversion; //软件版本
// private String key;  //密钥，用于终端的通讯加密
// private int status; //状态，0:正常；1：未初始化；2：停用；3：注销
// private int upLog=0; //是否上传日志，0：不上传，1：上传
// private String imei;
// private String activated; //是否已经激活：0：未激活；1：已激活
// private int homeLocation; //设备归属国家编码
// private String ssid;
// private String wifiPassword;
// private String licFix; //密钥后缀
// private int usedVPN; //是否使用VPN
// private int usedSoft; //是否使用软卡
// private int departmentId; //代理商分组ID，默认为0
// private String meid; //CDMA终端的MEID号，等同于IMEI
  terminal: {
    id: "ID",
    tsid: "编号",
    ssid: "SSID",
    wifiPassword: "密码",
    mac: "MAC",
    batch: "批次",
    sversion: "版本",
    status: "状态",
    imei: "IMEI",
    upLog: "上传日志",
  },

  // 终端升级管理
  // 列表：	版本说明 	源版本号	目标版本号	目标版本路径	升级方式	状态	终端列表
  //       describe	oVersion	tVersion	downUrl	type	status	terminalList
  //       状态，0：有效;1：无效
  //       升级方式，0：升级所有设备；1：根据终端列表升级
  // 查询条件	源版本号（精确匹配）
	// 	      目标版本号（精确匹配）
	// 操作：	停用
  //       删除
  // 批量操作：	添加：新创建一条版本升级记录，包括describe,oVersion,tVersion,downUrl,status,type,terminalList)
  //         （添加时需要判断重，不允许源版本和目标版要都相同）						terminalList与type关联，只有type=1时才能填写
//   private int id ;
// private String describe ;
// private String oversion ;
// private String tversion ;
// private String downUrl ;
// private Integer status ;
// private Integer type ;
// private String terminalList ;
// private String operatorMan ;
// private Date operatorTime ;
  terminal_version: {
    id: "ID",
    describe: "版本说明",
    oVersion: "源版本号",
    tVersion: "目标版本号",
    downUrl: "目标版本路径",
    type: "升级方式",
    status: "状态",
    terminalList: "终端列表",
  },


  // 终端流量管理
  // 列表：	终端	可用流量	有效期	说明
  //       TSID	AllowFlow	ValidityDate	NOTE
  // 查询条件：	TSID（模糊匹配）
	// 操作：	修改：可以修改可用流量、有效期和说明三个属性
  // 批量操作： 	添加: 创建一条流量账户记录，包括TSID、AllowFlow、ValidityDate、NOTE
	// 		      （需要判重，一个TSID只有一条记录）
	// 	        修改：可以批量修改可用流量、有效期、说明三个字段中的任意一个或多个属性）
//   private int id;
// private int tsid;
// private long allowFlow;
// private Date validityDate;
// private String note;
  flow_balance: {
    id: "ID",
    tsid: "终端",
    allowFlow: "可用流量",
    validityDate: "有效期",
    note: "说明",
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
