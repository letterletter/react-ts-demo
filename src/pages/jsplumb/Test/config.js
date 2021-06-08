const leftConfig = [
  {
    name: '开始节点',
    key: '1',
    open: true,
    children: [
      {
        label: '开始节点',
        key: '11',
        type: 'start',
        icon: 'icon-kaishi'
      },
      {
        label: '数据接入',
        key: '12',
        type: 'data',
        icon: 'icon-shuju'
      },
      {
        label: '接口调用',
        type: 'api',
        icon: 'icon-jiekou'
      }
    ]
  },
  {
    name: '结束节点',
    key: '2',
    open: true,
    children: [
      {
        label: '流程结束',
        type: 'end',
        key: '21',
        icon: 'icon-jieshu1'
      },
      {
        label: '数据清理',
        key: '22',
        type: 'clear',
        icon: 'icon-qingliwuliuliang'
      }
    ]
  }
]

export default leftConfig