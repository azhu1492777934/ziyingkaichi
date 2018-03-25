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

  terminal_sim: {
    id: "ID",
    tsid: "终端",
    imsi: "IMSI",
    date: "开始时间",
    beatTime: "最后一次心跳时间",
    vCountryCode: "使用国家",
  },

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

  flow_balance: {
    id: "ID",
    tsid: "终端",
    allowFlow: "可用流量",
    validityDate: "有效期",
    note: "说明",
  },

  simpool: {
    id: "ID",
    spid: "卡池编号",
    ip: "代理IP",
    port: "代理端口",
    sumIp: "卡池IP",
    webPort: "卡池端口",
    version: "版本号",
  },

  /**
   * 主卡信息管理
   操作：	修改:	字段名	中文名	可修改/只读
   IMSI	IMSI码	只读
   NUMBER	卡号	可修改（必填）
   ICCID	ICCID	只读
   PIN	PIN码	可修改
   OPERATORCODE	运营商编码	可修改(必填)
   MCNUMBER	短信中心号码	可修改（必填）
   PACKAGEID	流量套餐ID	只读
   OFFPERIOD	账期日	必填（1-31）
   SUSTAINED	账期持结时间，1：表示1个月；6：表示半年	必填（整数，表示一个账期持续几个月，默认是1）
   SIMMEPROTOCOL	协议类型:2G:sim;3G:usim	可修改（必填）
   STATUS	状态	可修改（必填）
   CPSTATUS	卡位状态	只读
   CPID	卡池编号	只读
   CPCHANNELID	卡池通道编号	只读
   COUNTRYCODE	国家编码	可修改（必填）
   PROVINCECODE	省编码	可修改
   EXPIRYDATE	有效期截卡时间	可修改（为空表示不限）
   INSERTDATE	插入时间	只读
   USEDVPN	是否支持VPN	可修改（必填，默认为0，表示不支持）
   VPNIP		可修改
   VPNNAME		可修改
   VPNPASS		可修改
   SoftType	是否是软卡；0：实卡；1：软卡	可修改（必填，默认为0）
   KI	KI，用于软卡	可修改
   OPC	OPC，用于软卡	可修改
   OP	OP，用于软卡	可修改
   APN	上网所使用APN	可修改
   OPENDATE	开卡日期	可修改
   NOTE	备注	可修改
   列表： 卡池IP  卡位  IMSI  ICCID 国家  运营商 套餐  账期  状态  卡位状态
   "cpid
   （关联显示卡池IP）" cpdhannelid IMSI  ICCID countrycode(字典） operatorcode(字典）  packageId(字典) offperiod status  cpstatus
   0：正常；1:停用; 2：指定;3:待激活；4：作废；5：冻结
   卡池状态，0：正常，1:待激活,2:拔出，8:超时
   查询：
   卡池IP（模糊查询）    m_simpool
   IMSI（模糊查询）
   IMSI列表（列表，可以同时查询多个IMSI，以逗号隔开）
   ICCID（模糊查询）
   国家（下拉选择）    m_country
   运营商（下拉选择）   m_operator
   套餐（下拉选择）    m_simPackage
   状态（下拉选择）
   卡位状态（下拉选择）
   插入时间（起始时间和结束时间）
   有效期（起始时间和结束时间）
   账期(下拉列表，1-31）

   批量操作:	添加	(可编辑属性和修改相同，只读项添加时必填）
   修改套餐	packageID,下拉列表，需要重新计算卡组（m_sim_group),并重新刷新缓存，需要重新计算月流量，刷新卡缓存（有接口）
   修改月流量账期	OFFPERIOD、SUSTAINED，需要重新计算月流量，刷新卡缓存（有接口）
   更新卡有效期	EXPIRYDATE，需要刷新卡缓存
   更新APN	APN，需要刷新卡缓存
   更新状态	status,(下拉字典），冻结、作废、未激活的卡移出卡组（m_sim_group),需要刷新卡组和卡缓存（有接口）
   导出卡信息	将查询结果导出成Excel
   */
  simcard: {
    id: "ID",
    imsi: "IMSI码",
    number: "卡号",
    iccid: "ICCID",
    pin: "PIN码",
    operatorCode: "运营商编码",
    mcNumber: "短信中心号码",
    packageId: "流量套餐ID",
    offPeriod: "账期日",
    suStained: "账期持结时间",
    simMeProtocol: "协议类型",
    status: "状态",
    cpStatus: "卡位状态",
    cpId: "卡池编号",
    cpIP: "卡池编号",
    cpChannelId: "卡池通道编号",
    countryCode: "国家编码",
    provinceCode: "省编码",
    expiryDate: "有效期截卡时间",
    insertDate: "插入时间",
    usedVpn: "是否支持VPN",
    vpnIP: "VPNIP",
    vpnName: "VPN名称",
    vpnPass: "VPNPASS",
    softType: "是否是软卡",
    ki: "KI",
    opc: "OPC",
    op: "OP",
    apn: "APN",
    openDate: "开卡日期",
    note: "备注",
  },

  sim_group: {
    id: "ID",
    tsid: "终端",
    allowFlow: "可用流量",
    validityDate: "有效期",
    note: "说明",
  },

  /**
   * 流量套餐管理
   列表： 套餐名 运营商编码 最大本地流量（KB)  最大漫游流量(KB)  优先级 支持的漫游国家 状态
          NAME  operatorcode  maxflow maxroamflow level mccs  status
   0：正常；1:删除
   查询条件  套餐名 (模糊查询）
   运营商编码(模糊查询）
   操作： 修改：允许修改套餐名、运营商编码、优先级、支持的漫游国家、状态、最大本地流量、最大大漫游流量，如果修改最大本地流量或最大漫游流量，需要重新计算该套餐下所有SIM卡的当前月流量。
   删除： 只有没有被主卡使用的套餐才能被删除。
   批量操作： 添加：   套餐名 运营商编码 最大本地流量（KB)  最大漫游流量(KB)  优先级 支持的漫游国家 状态（默认为正常）
   private int id;
   private String name;
   private int operatorCode;
   private  int maxFlow;
   private int maxRoamFlow;
   private int status;
   private String mccs;
   private int level;
   */
  simpackage: {
    id: "ID",
    name: "套餐名",
    operatorCode: "运营商编码",
    maxflow: "最大本地流量（KB)",
    maxroamflow: "最大漫游流量(KB)",
    level: "优先级",
    mccs: "支持的漫游国家",
    status: "状态",
  },

  /**
   * 预置主卡管理
   列表： 终端编号  主卡IMSI  卡指定前状态  预置时间  预置类型
          TSID  IMSI  LastStatus  insertDate  TYPE
   预指定卡类型，0：临时指定一次；1：一直指定
   查询条件  TSID（模糊查询）
   IMSI（模糊查询）
   预置类型（下拉字典）
   操作： 无
   批量操作： 添加: 终端编号、主卡IMSI、预置类型，自动填定卡指定前状态、插入时间和操作人
   需要从指定的主卡（m_simCard)找到当前卡的状态，记录在lastStatus,并将m_simCard的status置为2（指定状态）
   删除：批量删除预置记录，并同时将m_simCard的status置为指定前的状态lastStatus.
   private int id;
   private int tsid;
   private long imsi;
   private int lastStatus;
   private Date insertDate;
   private int operator;
   private int type;
   */
  ready_terminal_sim: {
    id: "ID",
    tsid: "终端编号",
    imsi: "主卡IMSI",
    lastStatus: "卡指定前状态",
    insertDate: "预置时间",
    type: "预置类型",
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
