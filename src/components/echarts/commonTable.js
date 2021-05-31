import React from 'react'
import { Table} from 'antd'
//通过react.memo包裹子组件，在props不变的情况下，Testson是不会二次渲染的。
 const TableMemo = React.memo(function (props) {
  const dataSource = [{
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
  },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
    {
      key: '3',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
    {
      key: '4',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
    {
      key: '5',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
    {
      key: '6',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
    {
      key: '7',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
  ];
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  console.log('table props', props)
  const  basicConfig = props.basicConfig
  return (
    <div id={props.id} style={{height:'calc(100% - 30px)'}}>
      {/* pagination={this.state.paginationNo} */}
      <Table
        size="small"
        dataSource={dataSource}
        columns={basicConfig.tableColumn||columns} 
        pagination={{pageSize: basicConfig.pageSize||10, hideOnSinglePage: true}}
        bordered
        style={{  color: '#fff',height:'100%',overflowY:'auto' }}
        rowKey={item => item.key}
        // scroll={{y:'95%'}}
        loading={false}
      />
    </div>
  )
}, (prevProps, nextProps) => {
  if(JSON.stringify(prevProps.basicConfig) !== JSON.stringify(nextProps.basicConfig) || 
  JSON.stringify(prevProps.dataConfig) !== JSON.stringify(nextProps.dataConfig)) return false  //返回false更新
  return true
}
)
//useMemoareEqual返回true才是禁止子组件更新，这一点是跟shouldComponentUpdate恰巧相反的
 export default TableMemo