import React, { } from 'react'
import {useDispatch} from 'react-redux'
import ItemTypes from '../ItemTypes'
import  '../style.scss'
import MyIcon from  '../../../font/icon'
import * as actionCreators from '../../../redux/actions'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css';
const list = [
  {
    name: 'text_card',
    label: '文字卡片',
    type: ItemTypes.TEXTCARD,
    icon: <MyIcon className='iconsty' type="icon-kapian" />,
  },
  {
    name: 'normal_table',
    label: '普通表格',
    type: ItemTypes.NORMALTABLE,
    icon: <MyIcon className='iconsty' type="icon-fsux_tubiao_biaoge" />
  },
  {
    name: 'line_chart',
    label: '折线图',
    type: ItemTypes.CHART,
    icon: <MyIcon className='iconsty' type="icon-tubiao1" />
  },
  {
    name: 'pie_chart',
    label: '饼图',
    type: ItemTypes.PIECHART,
    icon: <MyIcon className='iconsty' type="icon-tubiao" />
  },
  {
    name: 'bar_chart',
    label: '柱形图',
    type: ItemTypes.CHART,
    icon: <MyIcon className='iconsty' type="icon-tubiaozhuzhuangtu" />
  },
  {
    name: 'scatter_chart',
    label: '散点图',
    type: ItemTypes.CHART,
    icon: <MyIcon className='iconsty' type="icon-sandiantu" />
  },
  // {
  //   name: 'funnel_chart',
  //   label: '漏斗图',
  //   type: ItemTypes.CHART,
  //   icon: <MyIcon className='iconsty' type="icon-fsux_tubiao_loudoutu" />
  // },
  // {
  //   name: 'radar_chart',
  //   label: '雷达图',
  //   type: ItemTypes.CHART,
  //   icon: <MyIcon className='iconsty' type="icon-leidatu" />
  // },
]
const style={
  border: '1px dashed gray',
    padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    backgroundColor: 'white',
    cursor: 'move',
}
export default function HeadComponentArea() {

  const dispatch = useDispatch()

  const setDragItem = (item) => {
    dispatch(actionCreators.setDragcard(item))
  }
  return (
    <div className='headarea'>
      {
        list.map((item, index) => {
          return (
            <div style={{width: '5em',textAlign:'center', marginLeft: '20px'}} draggable={true} onDragStart={()=>setDragItem(item)}>
              {item.icon}
              <p style={{textAlign: 'center', marginTop: '2px'}}>{item.label}</p>
            </div>
            // <Item key={item.name} name={item.name} icon={item.icon}  label={item.label} type={item.type} /> 
          )
        })
      }
    </div>
  )
}