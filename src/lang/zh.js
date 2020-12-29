export default {
  app: {
    name: 'VCT-管理配置系统'
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
    countryCn:"国家列表名称",
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
    countryCn:"接入MCC国家",
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
    countryCn:"接入MCC国家",
    usedNet: "使用网络策略",
  },

  terminal_sim: {
    id: "ID",
    tsid: "终端",
    imei: "IMEI",
    imsi: "IMSI",
    date: "开机时间",
    beatTime: "最后一次心跳时间",
    vCountryCode: "使用国家",
    dayFlow: "今日流量MB",
    monthFlow: "本月流量MB",
    userGroup:"分组",
    provinceCode:"地区",
    provinceName: "地区",
    provinceCodeEq: '设备所在地'
  },

  terminal_sim_log: {
    id: "ID",
    tsid: "终端",
    imei: "IMEI",
    imsi: "IMSI",
    date: "开机时间",
    dateCn: "开机时间",
    beatTime: "最后一次心跳时间",
    beatTimeCn: "最后一次心跳时间",
    vCountryCode: "使用国家",
    result: "结果",
    insertTime: "插入时间",
  },

  cost_month: {
    tsid: "终端",
    imei: "IMEI",
    startDate: "第一天",
    startDateCn: "第一天",
    endDate: "最后一天",
    endDateCn: "最后一天",
    days: "使用天数",
    duration: "使用时长(小时)",
    flow: "使用流量(GB)",
    userGroup: "分组",
  },

  cost_day: {
    tsid: "终端",
    imei: "IMEI",
    date: "日期",
    dateCn: "日期",
    startDate: "开始日期",
    endDate: "结束日期",
    countryCode: "国家",
    countryCn: "国家",
    duration: "使用时长(小时)",
    flow: "使用流量(GB)",
    userGroup: "分组",
  },

  select_sim: {
    tsid: "终端",
    imei: "IMEI",
    imsi: "IMSI",
    date: "开机时间",
    vCountryCode: "使用国家",
    provinceCode:"所在地区",
    provinceName:"所在地区",
    dayFlow: "今日流量MB",
    monthFlow: "本月流量MB",
    userGroup:"分组",
    resultCodeCn: "选卡结果",
    lac2:"LAC",
  },

  terminal_tsid: {
    num: "序号",
    tsid: "TSID",
    imei: "IMEI",
    imsi: "IMSI",
    time: "时间",
    flowincrement: "流量增量(KB)",
    type: "心跳类型",
    location: "国家",
    resultDesc: "描述",
    signaly: "信号强度",
    signalType: "信号类型",
    userCount: "连接数",
    spid: "卡池号",
    channelId: "通道",
    apn: "APN",
    longitude:"经度",
    latitude:"纬度",
    power:"电量",
    mcc:"mcc",
    mnc:"mnc",
    operatorcn:"运营商",
    operatorcode:"运营商编号",
    spip:"spip",
  },

  flow_month: {
    date: "月份",
    imsi: "IMSI",
    maxFlow: "本地套餐流量(KB)",
    usedFlow: "本地使用(KB)",
    residueFlow: "本地剩余(KB)",
    maxRoamFlow: "漫游套餐流量(KB)",
    usedRoamFlow: "漫游使用(KB)",
    residueRoamFlow: "漫游剩余(KB)",
    accountPeriodStartDate: "账期起始",
    accountPeriodEndDate: "账期结束",
    lastUpDateTime: "更新时间",
  },

  sim_flow_month: {
     cpIP: "卡池IP",
     packageCn: "套餐",
     statusCn: "状态",
     accountPeriodStartDateCn: "账期开始日",
     accountPeriodEndDateCn: "账期结束日",
     operatorName: "运营商",
     operatorCode: "运营商编码",
     imsi: "IMSI",
     iccid: "ICCID",
     status: "状态",
     cpId: "卡池编号",
     packageId: "套餐",
     date: "月份",
     accountPeriodStartDate: "账期开始日",
     accountPeriodEndDate: "账期结束日",
     usedFlow: "使用流量(GB)",
     maxFlow: "套餐流量(GB)",
  },

  sim_flow_day: {
     cpIP:"卡池IP",
     packageCn:"套餐",
     statusCn:"状态",
     dateCn:"日期",
     operatorCodeCn:"运营商",
     operatorCode:"运营商编码",
     imsi:"IMSI",
     iccid:"ICCID",
     status:"状态",
     packageId:"套餐",
     cpId:"卡池编号",
     date:"日期",
     flow:"使用流量(MB)",
    startDate:"开始日期",
    endDate:"结束日期",
  },

  flow_day: {
    id: "ID",
    startDate: "起始日期",
    endDate: "结束日期",
    date: "日期",
    imsi: "IMSI",
    flow: "本地流量(KB)",
    roamFlow: "漫游流量(KB)",
    lastUpDateTime: "最后更新时间",
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
    model:"型号",
    userGroup:"分组",
    ciccid:"ICCID",
    dayspeedlimit:"限速速率(Kbps)",
    maxDayData:"每日限额(KB)",
    androidVersion:"Android版本",
    timedShutoff:"无连接等待",
    monthSpeedlimit:"每月限速速率(Kbps)",
    maxMonthData:"每月限额(GB)",
    ota:"OTA",
    provinceCode: '地区',
    provinceName: '地区',
    networkChoose: '智能选网',
  },

  terminal_group: {
    userGroup: '分组'
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
    imei: "IMEI",
    allowFlow: "可用流量(KB)",
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
    isActive: "状态",
    isActiveCn:"状态",
    noCardCount: "无卡",
    offlineCount:"离线",
    usedCount: "使用中",
    freeCount: "空闲",

  },

  simpool_card: {
    cpId: "卡池",
    cpChannelId: "通道号",
    imsi: "IMSI",
    iccid: "ICCID",
    status: "卡状态",
    cpStatus: "卡位状态",
    statusCn: "卡状态",
    cpStatusCn: "卡位状态",
    channelStatus: "通道状态",
    tsid:"终端",
    date:"选卡时间",
    dateCn:"选卡时间",
    beatTime: "心跳时间",
    beatTimeCn: "心跳时间",
  },



  simcard: {
    id: "ID",
    imsi: "IMSI",
    number: "卡号",
    iccid: "ICCID",
    pin: "PIN码",
    operatorCode: "运营商",
    mcNumber: "短信中心号码",
    packageId: "流量套餐",
    offPeriod: "账期日",
    suStained: "账期持续时间",
    simMeProtocol: "协议类型",
    status: "状态",
    cpStatus: "卡位状态",
    cpId: "卡池",
    cpIP: "卡池IP",
    cpChannelId: "通道号",
    countryCode: "国家",
    provinceCode: "省",
    expiryDate: "有效期",
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
    tempImei: "临时IMEI"
  },

  simcard_log: {
    imsi: "IMSI",
    iccid: "ICCID",
    beforeStatusCn: "故障前状态",
    afterStatusCn: "当前状态",
    type: "故障类型",
    insertTime: "故障时间",
    insertTimeCn: "故障时间",
    describe: "说明"
  },

  sim_group: {
    id: "ID",
    tsid: "终端",
    allowFlow: "可用流量",
    validityDate: "有效期",
    note: "说明",
  },

  simpackage: {
    id: "ID",
    name: "套餐名",
    operatorCode: "运营商",
    maxFlow: "最大本地流量（KB)",
    maxRoamFlow: "最大漫游流量(KB)",
    level: "优先级",
    mccs: "支持国家",
    countryCn:"支持国家名称",
    whiteProvinces:"支持省市",
    blackProvinces:"禁用省市",
    status: "状态",
  },

  ready_terminal_sim: {
    id: "ID",
    tsid: "终端编号",
    imsi: "主卡IMSI",
    lastStatus: "卡指定前状态",
    insertDate: "预置时间",
    type: "预置类型",
  },

  channel_card: {
    id: "ID",
    imsi: "IMSI",
    number: "卡号",
    iccid: "ICCID",
    operatorCode: "运营商编码",
    countryCode: "国家编码",
    countryCn: "国家名称",
    mcNumber: "短信中心号码",
    status: "状态",
  },

  terminal_channel: {
    id: "ID",
    tsid: "TSID",
    imsi: "IMSI",
    status: "状态",
  },

  channel_card_prefer: {
    id: "ID",
    operatorCode: "运营商编码",
    mcc: "MCC",
    countryCn:"接入MCC国家",
    rplmn: "rplmn",
    pplmn: "pplmn",
    fplmn: "fplmn",
  },
  /**
   * 系统管理
   账号管理	tb_auth_user，tb_auth_user_role
   权限管理	tb_auth_role，tb_auth_role_permission，tb_auth_permission
   */
  auth_user: {
    id: "ID",
    name: "登录名",
    phonenumber: "手机号",
    password: "密码",
    describe: "描述",
    newpassword: "新密码",
    reenter: "再次输入",
  },
  auth_role: {
    id: "ID",
    name: "名称",
    code: "编码",
    status: "状态",
    createDate: "创建日期",
  },
  auth_permission: {
    id: "ID",
    text: "接口名",
    parentId: "父级ID",
    parentCn: "父级名称",
    url: "URL",
    orderNum: "排序",
    iconCls: "图标",
    status: "状态",
    isMenu: "是否是菜单",
    funDesc: "接口描述",
    createTime: "创建时间",
  },
  forbid_province: {
    id: "ID",
    provinceCode: "省市编码",
    provinceName: "省市名称",
    mccmncs: "禁用运营商"
  },

  province: {
    id: "ID",
    provinceCode: "省市编码",
    nameCn: "省市名称",
    countryCode: "国家编码",
    sort: "排序",
    abbr: "简称",
    cityCode: "城市编码",
    city: "城市名",
    parentCode: "省编码",
    parentName: "省名称",
    type: "类型",
  },

  lac_province: {
    id: "ID",
    provinceCode: "省市编码",
    nameCn: "省市名称",
    operatorCode: "运营商编码",
    operatorName: "运营商名称",
    lacPref: "LAC"
  },

  errorLog: {
    tips: '请点击右上角bug小图标',
    description: '现在的管理后台基本都是spa的形式了，它增强了用户体验，但同时也会增加页面出问题的可能性，可能一个小小的疏忽就导致整个页面的死锁。好在 Vue 官网提供了一个方法来捕获处理异常，你可以在其中进行错误处理或者异常上报。',
    documentation: '文档介绍',
    username: '请输入正确的用户名',
    passwordLength: '密码不能小于4位',
  },
  theme: {
    change: '换肤',
    documentation: '换肤文档',
    tips: 'Tips: 它区别于 navbar 上的 theme-pick, 是两种不同的换肤方法，各自有不同的应用场景，具体请参考文档。'
  }
}
 