import React from 'react'
import { Card} from 'antd'
import { Link} from 'react-router-dom'
import './base.scss'

const  TextCatdDemo  = React.memo( function(props) {
  // console.log('textCard props', props)
  const  {basicConfig, dataConfig} = props
  // !basicConfig.name && (basicConfig.name = '数据集管理')
  const templateData={}
  return (
    <div id={props.id} className='testcard' style={{height:'calc(100% - 30px)'}}>
      <Card  bordered={true} title={basicConfig.name || '数据集管理'} headStyle={{fontSize: '20px',}} bodyStyle={{color: '#007cdb'}}
          actions={[
          <div className='linkname' style={{backgroundColor: `${basicConfig.color}`, margin: '0 0', lineHeight: '37px'}}>
            <Link to={basicConfig.link} style={{color: 'black', fontWeight: '700px',}} >
            {`${basicConfig.linkTitle}`}
            </Link>
          </div>
        ]}
        >
        <div className="cardBody">
          <div className="total">{dataConfig[basicConfig.datakey] || templateData[basicConfig.datakey]}</div>
        </div>
      </Card>
    </div>
  )
}, (prevProps, nextProps) => {
  if(JSON.stringify(prevProps.basicConfig) !== JSON.stringify(nextProps.basicConfig) || 
  JSON.stringify(prevProps.dataConfig) !== JSON.stringify(nextProps.dataConfig)) return false  //返回false更新
  return true
})

export default TextCatdDemo