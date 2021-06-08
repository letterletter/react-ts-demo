import React, { useState, useRef, useImperativeHandle, forwardRef, useEffect} from 'react';
import { useDrop } from 'react-dnd';
import { message, Modal, Button, Row, Col, Drawer, Tabs } from 'antd'
import update from 'immutability-helper'
import {Card} from './Card'
import ItemTypes from './ItemTypes';
import './style.scss'
import randomIds from '../../utils/getUniqId'
import BasicConfig from './basicConfig';
import DataConfig from './dataConfig'
import {useSelector} from 'react-redux'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const { confirm } = Modal;
const { TabPane } = Tabs;

const Container = forwardRef((
  props,
  ref,
) => {
  const handleClear = () => {
    console.log('handle clear')
  }
  useImperativeHandle(ref, () => ({
    handleClear,
    changeTextNum,
    stepOrder: [],
    cards,
    stepOrder: [1,2,3,4]
  }))
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: [ItemTypes.TEXTCARD, ItemTypes.NORMALTABLE, ItemTypes.PIECHART, ItemTypes.CHART, 'chart'],
    drop: (item) => f(item),
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })
  const cardsArr = useSelector(state => state.setCards.cardsArr)
  const num = useSelector(state => state.setCards.num)
  const textCardNum = useSelector(state => state.setCards.textCardNum)
  const [cardConfig, setshowConfig] = useState(false)

  const [cards, setCards] = useState(cardsArr) //拽过来的组件名字
  const [visible, setVisible] = useState(false) //抽屉是否显示
  const [clickItem,setClickItem] = useState({})
  const [basicConfig,setBasicConfig] = useState({})
  const [dataConfig,setDataConfig] = useState({})
  const [currentConfig,setCurrentConfig] = useState({})
  const f = (item) => {
    if(item.type === ItemTypes.TEXTCARD) {
      let arr = []
      for(let i=0; i< props.textCardNum;i++) {
        let id = randomIds.getNextIds()
        arr.push({...item, id})
      }
      setCards(update(cards, { $push: arr})) //往cards加item

    }else {
          item.id = randomIds.getNextIds()
          console.log('drop container',item)
          setCards(update(cards, { $push: [item]})) //往cards加item
          console.log(cards)
    }
    // item.id = randomIds.getNextIds()
    // console.log('drop container',item)
    // setCards(update(cards, { $push: [item]})) //往cards加item
    // console.log(cards)
  }
  //{$splice: array of arrays}， array 中第一个元素代表下标，第二个元素代表需要删除的个数，第三个元素代表需要插入到 initialArray 中的的元素

  const moveCard = (id, atIndex) => {
    const { card, index } = findCard(id);
    // console.log('move', id, atIndex, card, index)
    console.log(index, atIndex)
    setCards(update(cards, {
      $splice: [
        [index, 1],  //从index位置删去1个
        [atIndex, 0, card],
      ],
    }));
  };
  const findCard = (id) => {
    const card = cards.filter((c) => `${c.id}` === id)[0];
    return {
      card,
      index: cards.indexOf(card),
    };
  };




  const handleRemove = (name) => {
    console.log('remove', name)
  }
  const changeTextNum = (preTextCardNum, curNum) => {
    let addTextCard = curNum-preTextCardNum


  }
  const clickCard = (item,e)=>{
    console.log('e', e,e.target.tagName, item)
    if(e.target.tagName === 'CANVAS') {  //e.target.tagName是canvas，表明是点击的是echarts图
      console.log('ddd')
      return ;
    }
    setClickItem(item);
    

    basicConfigRef.current && basicConfigRef.current.clear();
    // console.log(basicConfigRef)
    e.stopPropagation();
  }


  const renderCards = () => {
    const {num} = props;
    var row = cards.length===0 ? [] : new Array(Math.ceil(cards.length/num));
    var col=new Array(num);
    for(let i=0;i<col.length;i++){
        col[i]=1
    }
    for(let i=0;i<row.length;i++){
        row[i]=1
    }
    return row.map((d,index) => {
        return(
        <Row key={`${index}`} gutter={10,10} style={{boxSizing:'border-box'}}>
            {
              col.map((t,i) => {
                const cardIndex=index*num+i;
                if(cardIndex+1>cards.length){
                  return null;
                }else{
                    cards[cardIndex].basicConfig = basicConfig[cards[cardIndex].id] ? basicConfig[cards[cardIndex].id] : {}
                  return(
                    <Col span={Math.floor(24/num)} key={cards[cardIndex].id} style={{border: '1px solid red',position:'relative',zIndex:1}} onClick={(e) => clickCard(cards[cardIndex],e)}>
                      <Card key={cards[cardIndex].id} id={cards[cardIndex].id} text={cards[cardIndex].label} type={cards[cardIndex].type} moveCard={moveCard} 
                      findCard={findCard} item={cards[cardIndex]} basicConfig={cards[cardIndex].basicConfig} />
                      {/* <Item name={item.name} label={item.label} imgURL={item.imgURL}
                        imageName={item.imageName} func={() => handleClick(item)}
                      /> */}
                      <DeleteOutlined style={{fontSize:19,position:'absolute',right:45,top:35,cursor:'pointer',color:'#666'}} onClick={(e) => {setCards(update(cards, {$splice: [[cardIndex, 1]]}));e.stopPropagation()}}/>
                      
                      {/* <div style={{height:30,width:30,backgroundColor:'black',position:'absolute',right:20,top:30,zIndex:5}} onClick={e=>e.stopPropagation()}></div> */}
                    </Col>)

                }
              })
            } 
        </Row>
    )})
  }

  const renderCards2 = () => {
    // const {num, textCardNum} = props;
    let commonSpan = Math.floor(24/num)
    const textCardSpan = Math.floor(24/textCardNum)
    return (
      <Row gutter={10,10}>
        {
          cards.map((item, cardIndex) => {
            item.basicConfig = basicConfig[item.id] ? basicConfig[item.id]:{}
            item.dataConfig = dataConfig[item.id] ? dataConfig[item.id]:{}
            let spanval = item.type === ItemTypes.TEXTCARD ? textCardSpan: commonSpan
            return (
              <Col span={spanval} key={item.id} style={{border: '1px solid red',position:'relative',zIndex:1}} onClick={(e) => clickCard(item,e)}>
                <Card key={item.id} id={item.id} text={item.label} type={item.type} moveCard={moveCard} 
                findCard={findCard} item={item} basicConfig={item.basicConfig} dataConfig={item.dataConfig}/>
                <DeleteOutlined style={{fontSize:19,position:'absolute',right:45,top:35,cursor:'pointer',color:'#666'}} onClick={(e) => {setCards(update(cards, {$splice: [[cardIndex, 1]]}));e.stopPropagation()}}/>
                <EditOutlined style={{fontSize:19,position:'absolute',right:70,top:35,cursor:'pointer',color:'#666'}} onClick={()=>setVisible(v=>!v)}/>
              </Col>
            )
          })
        }
      </Row>
    )   
  }
  const changeConfig = (type,item) => {
    if(type==='basic'){
      setBasicConfig(cfg => {
        cfg[clickItem.id] = item;
        return cfg;
      })
    }else{
      setDataConfig(dcf=>{
        dcf[clickItem.id] = item
        return dcf
      })
    }
    console.log('change config', item)
    setCurrentConfig(item)
  }

  const basicConfigRef = useRef(null);
  // useEffect(() => {
  //   renderCards();
  // },[currentConfig]);
  
  const logCards = () => {
    console.log('cards', cards)
  }

  return (
    <div {...props} ref={drop}
      style={{ width: '100%', height: '750px' }} onClick={() => {setVisible(false);}}>
      
        <div style={{width: '100%', borderBottom: '1px solid rgb(212, 212, 212)', height: '23px' }}>
          <div style={{ fontSize: '16px' }}>画布</div>
        </div>
        <div style={{padding: '10px 10px'}}>
        {
          renderCards2()
        }
      </div>
      <Drawer
        title="组件配置"
        placement="right"
        // closable={false}
        onClose={()=>setVisible(false)}
        visible={visible}
        // maskStyle={{opacity:0,animation:'none'}}
        width={300}
        mask={false}
        onClick={e=>e.stopPropagation()}
      >
        <Tabs>
          <TabPane tab="基本信息配置" key="1">
            <BasicConfig ref={basicConfigRef} item={clickItem} changeConfig={changeConfig}/>
          </TabPane>
          <TabPane tab="数据源配置" key="2">
            <DataConfig item={clickItem} changeConfig={changeConfig}/>
          </TabPane>
        </Tabs>
      </Drawer>
    </div>
  );
})

export default Container;





