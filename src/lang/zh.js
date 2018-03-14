export default {
  app: {
    // name: 'VCT-管理配置系统'
    name: 'MX的系统'
  },
  route: {
    dashboard: '首页',
    customer: "客户管理",
    account: "客户账户管理",
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
    balanceCurrency: "使用币种",
    status: "状态",
  },
  table: {
    dynamicTips1: '固定表头, 按照表头顺序排序',
    dynamicTips2: '不固定表头, 按照点击顺序排序',
    dragTips1: '默认顺序',
    dragTips2: '拖拽后顺序',
    title: '标题',
    importance: '重要性',
    type: '类型',
    remark: '点评',
    search: '搜索',
    add: '添加',
    export: '导出',
    reviewer: '审核人',
    id: '序号',
    date: '时间',
    author: '作者',
    readings: '阅读数',
    status: '状态',
    actions: '操作',
    edit: '编辑',
    publish: '发布',
    draft: '草稿',
    delete: '删除',
    cancel: '取 消',
    confirm: '确 定'
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
