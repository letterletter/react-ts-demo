import React from 'react';
import ItemTypes  from './ItemTypes';
import NormalTable from '../../components/echarts/commonTable'
import Line from '../../components/echarts/line'
import Pie from '../../components/echarts/pie'
import Scatter from '../../components/echarts/scatter'
import Bar from '../../components/echarts/bar'
import TextCard from '../../components/echarts/textCard'
import Funnel from '../../components/echarts/funnel'
import Radar from '../../components/echarts/radar'
const style = {
    border: '1px dashed gray',
    padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    backgroundColor: 'white',
    cursor: 'move',
    height:'100%'
};

const renderComponent = (item,basicConfig,dataConfig) => {
    switch(item.type) {
        case ItemTypes.NORMALTABLE:
            return <NormalTable id={item.id} basicConfig={basicConfig} dataConfig={dataConfig} w={item.w} h={item.h} type='home'/>;
        case ItemTypes.TEXTCARD:
            return <TextCard id={item.id} basicConfig={basicConfig} dataConfig={dataConfig} w={item.w} h={item.h} type='home'/>; //<div>text</div>
        case ItemTypes.CHART:
            if(item.name === 'line_chart'){
                return <Line id={item.id} basicConfig={basicConfig} dataConfig={dataConfig} w={item.w} h={item.h} type='home'/>
            }else if(item.name === 'bar_chart'){
                return <Bar id={item.id} basicConfig={basicConfig} dataConfig={dataConfig} w={item.w} h={item.h} type='home'/>
            }else if(item.name === 'scatter_chart'){
                return <Scatter id={item.id} basicConfig={basicConfig} dataConfig={dataConfig} w={item.w} h={item.h} type='home'/>
            }else if(item.name === 'funnel_chart') {
                return <Funnel id={item.id} basicConfig={basicConfig} dataConfig={dataConfig} w={item.w} h={item.h} type='home' />
            }else if(item.name === 'radar_chart') {
                return <Radar id={item.id} basicConfig={basicConfig} dataConfig={dataConfig} w={item.w} h={item.h} type='home' />
            }
        case ItemTypes.PIECHART:
            return <Pie id={item.id} basicConfig={basicConfig} dataConfig={dataConfig} w={item.w} h={item.h} type='home'/>
        default:
            return <h1>Hello</h1>
    }
}
 const Card = ({ id, text, type, item, basicConfig, dataConfig }) => {

    // console.log(id)
    return (<div key={id} style={{ ...style }}>
			{text}
            {/* 临时 */}
            {renderComponent(item,basicConfig,dataConfig)}
		</div>);
};
export default Card
