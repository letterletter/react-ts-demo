import React, { useState,useRef,forwardRef,useImperativeHandle } from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import {Drawer,Tabs} from 'antd'
import _ from "lodash";
import update from 'immutability-helper'
import {useSelector, useDispatch, useStore} from 'react-redux'
import * as actionCreators from '../../../redux/actions'
import randomIds from '../../../utils/getUniqId'
import CardWrapper from './cardWrapper'
import BasicConfig from '../basicConfig';
import DataConfig from '../dataConfig'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css';
import '../style.scss'

const {TabPane} = Tabs

const ResponsiveReactGridLayout = WidthProvider(Responsive);

/**
 * This layout demonstrates how to use a grid with a dynamic number of elements.
 */
 function AddRemoveLayout(props,ref){

  const dispatch = useDispatch()
  const cards = useSelector(state=>state.setCards.cardsArr)
  const dragcard = useSelector(state=>state.setCards.dragItem)
  const [counter, setCounter] = useState(0)
  const [visible, setVisible] = useState(false) //抽屉是否显示
  const [clickKey,setClickKey] = useState({})
  const [basicConfig,setBasicConfig] = useState({})
  const [dataConfig,setDataConfig] = useState({})
  const [items, setItems] = useState([])
  const [layout, setLayout] = useState([])
  const [breakpoint, setBreakpoint] = useState(0)
  const [cols, setCols] = useState(0)
  const basicConfigRef = useRef(null);

  useImperativeHandle(ref,()=>({
    items
  }))
  // {
  //   i: i.toString(),
  //   x: i * 20,
  //   y: 0,
  //   w: 20,
  //   h: 10,
  // };

  const createElement = (el,index) => {
    const removeStyle = {
      position: "absolute",
      right: "2px",
      top: 0,
      cursor: "pointer"
    };
    return (
      <div key={el.i} data-grid={el} style={{backgroundColor:'#eee',border:'1px solid #eee'}} onClick={()=>setClickKey(index)}>
        <CardWrapper key={el.i} id={el.id} text={el.label} item={el} basicConfig={el.basicConfig} dataConfig={el.dataConfig}/>
        <DeleteOutlined style={{fontSize:19,position:'absolute',right:45,top:35,cursor:'pointer',color:'#666'}} onClick={(e) => {setVisible(false);setItems(update(items, {$splice: [[index, 1]]}));}}/>
        <EditOutlined style={{fontSize:19,position:'absolute',right:70,top:35,cursor:'pointer',color:'#666'}} onClick={()=>setVisible(v=>!v)}/>
      </div>
    );
  }

  const onDrop = (layout, layoutItem, _event) => {
    /*eslint no-console: 0*/
    // console.log(layout, layoutItem, _event,);
    setItems(v=>{
      v.push({
        i:counter+'',
        id:randomIds.getNextIds(),
        x: layoutItem.x,
        y: layoutItem.y, // puts it at the bottom
        w: 30,
        h: 15,
        isDraggable:true,
        isResizable:true,
        isBounded:true,
        basicConfig:{},
        dataConfig:{},
        ...dragcard
      })
      return [...v]
    })
    console.log(items)
    setCounter(counter+1)
  }

  // We're using the cols coming back from this to calculate where to add new items.
  const onBreakpointChange = (breakpoint, cols) => {
    console.log(breakpoint, cols)
    setBreakpoint(breakpoint)
    setCols(cols)
  }

  const onLayoutChange = (layout) => {
    setItems(item=>{
      item.map((el,index)=>{
          el.w = layout[index].w
          el.h = layout[index].h
          el.x = layout[index].x
          el.y = layout[index].y
          return el
        }
      )
      return [...item]
    })
  }

  const changeConfig = (type,config) => {
    if(type === 'basic'){
      setItems(item=>{
        item[clickKey].basicConfig = config
        return [...item]
      })
    }else{
      setItems(item=>{
        item[clickKey].dataConfig = config
        return [...item]
      })
    }
    console.log(items)
  }
  const resizeBox = (layout,oldItem,newItem,placeholder,e,element) => {
    setItems(item=>{
      let index = item.findIndex(i=>i.i===newItem.i)
      let el = item.splice(index,1)[0]
      // console.log(el)
      el.w = newItem.w
      el.h = newItem.h
      item.push(el)
      // console.log(el,item,newItem)
      return [...item]
    })
  }
  const dragStop = (layout,oldItem,newItem,placeholder,e,element) => {
    setItems(item=>{
      let index = item.findIndex(i=>i.i===newItem.i)
      let el = item.splice(index,1)[0]
      // console.log(el)
      el.x = newItem.x
      el.y = newItem.y
      item.push(el)
      // console.log(el,item,newItem)
      return [...item]
    })
  }

  return (
    <div style={{ width: '100%', height: '750px', }}>
      <ResponsiveReactGridLayout
        onLayoutChange={onLayoutChange}
        onBreakpointChange={onBreakpointChange}
        onDragStop={dragStop}
        className="layout"
        cols= { {lg: 120, md: 100, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={10}
        useCSSTransforms={true}
        isResizable={true}
        isDroppable={true}
        onDrop={onDrop}
        measureBeforeMount={false}
        style={{height:'100%'}} 
        onResize={resizeBox}
        draggableCancel='.noDraggable'
      >
        {
          items.map((el,i)=>createElement(el,i))
        }
      </ResponsiveReactGridLayout>
      <Drawer
        title="组件配置"
        placement="right"
        // closable={false}
        onClose={()=>setVisible(false)}
        visible={visible}
        getContainer={()=>document.getElementById('canvasContainer')}
        style={{marginTop:64}}
        bodyStyle={{overflowY:'auto'}}
        destroyOnClose={true}
        // maskStyle={{opacity:0,animation:'none'}}
        width={300}
        mask={false}
        onClick={e=>e.stopPropagation()}
      >
        <Tabs centered={true} size='small'>
          <TabPane tab="基本信息配置" key="1">
            <BasicConfig ref={basicConfigRef} item={items[clickKey] || {basicConfig:{}}} changeConfig={changeConfig}/>
          </TabPane>
          <TabPane tab="数据源配置" key="2">
            <DataConfig item={items[clickKey] || {dataConfig:{}}} changeConfig={changeConfig}/>
          </TabPane>
        </Tabs>
      </Drawer>
    </div>
  );
}

export default forwardRef(AddRemoveLayout) 