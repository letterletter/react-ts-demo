export default [
  {
    index: '/homepage',
    title: '首页',
  },
  {
    index: 'usermanage',
    title: '用户管理',
    fchildindex: '/user-mgt',
    subs: [
      {index: '/user-mgt', title: '用户信息管理'},
      {index: '/roles-mgt', title: '权限信息管理'},
    ]
  },
  {
    index: '/organmanage',
    title: '组织体系管理',
    fchildindex: '/organization-mgt',
    subs: [
      {index: '/organization-mgt', title: '组织管理'},
      {index: '/workspace-mgt', title: '工区管理'},
      {index: '/data-source-mgt', title: '数据源管理'},
    ]
  },
  {
    index: '/datamanage',
    title: '数据管理',
    fchildindex: '/data-set-mgt',
    subs: [
      {index: '/data-set-mgt', title: '数据集管理'},
      {index: '/data-maintenance', title: '数据维护'},
      {index: '/data-opt-log', title: '数据操作日志'},
    ]
  },
  {
    index: '/data-pre-preprocess',
    title: '数据预处理',
    showIcon: true
  },
  {
    index: '/data-process',
    title: '数据处理',
    showIcon: true
  },
  {
    index: '/intelligence-analysis',
    title: '智能分析',
    showIcon: true

  },
  {
    index: '/datashow',
    title: '数据展示',
    subs: [
      {index: '/data-search', title: '数据查询'},
      {index: '/report-mgt', title: '报表管理'},
    ]
  },

]