import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import ItemTypes  from './ItemTypes';
import NormalTable from './component/commonTable'
import Line from './component/line'
import Pie from './component/pie'
import Scatter from './component/scatter'
import Bar from './component/bar'
import TextCard from './component/textCard'
import Funnel from './component/funnel'
import Radar from './component/radar'
const style = {
    border: '1px dashed gray',
    padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    backgroundColor: 'white',
    cursor: 'move',
};

const renderComponent = (item,basicConfig,dataConfig) => {
    console.log(item.type, item)
    switch(item.type) {
        case ItemTypes.NORMALTABLE:
            return <NormalTable id={item.id} basicConfig={basicConfig} dataConfig={dataConfig}/>;
        case ItemTypes.TEXTCARD:
            return <TextCard id={item.id} basicConfig={basicConfig} dataConfig={dataConfig}/>; //<div>text</div>
        case ItemTypes.CHART:
            if(item.name === 'line_chart'){
                return <Line id={item.id} basicConfig={basicConfig} dataConfig={dataConfig}/>
            }else if(item.name === 'bar_chart'){
                console.log('bar')
                return <Bar id={item.id} basicConfig={basicConfig} dataConfig={dataConfig}/>
            }else if(item.name === 'scatter_chart'){
                return <Scatter id={item.id} basicConfig={basicConfig} dataConfig={dataConfig}/>
            }else if(item.name === 'funnel_chart') {
                return <Funnel id={item.id} basicConfig={basicConfig} dataConfig={dataConfig} />
            }else if(item.name === 'radar_chart') {
                return <Radar id={item.id} basicConfig={basicConfig} dataConfig={dataConfig} />
            }
        case ItemTypes.PIECHART:
            return <Pie id={item.id} basicConfig={basicConfig} dataConfig={dataConfig}/>
        default:
            return <h1>Hello</h1>
    }
}
export const Card = ({ id, text, moveCard, findCard, type, item, basicConfig, dataConfig }) => {
    const originalIndex = findCard(id).index;
    const [{ isDragging }, drag] = useDrag({
        item: { type: 'card', id, originalIndex, text },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        end: (dropResult, monitor) => {
            const { id: droppedId, originalIndex } = monitor.getItem();
            console.log(droppedId,originalIndex)
            const didDrop = monitor.didDrop();
            if (!didDrop) {
                console.log("!did drop")
                moveCard(droppedId, originalIndex);
            }
        },
    });
    const [, drop] = useDrop({
        accept: 'card',
        // accept: [ItemTypes.TEXTCARD, ItemTypes.CHART, ItemTypes.PIECHART, ItemTypes.NORMALTABLE],
        // canDrop: () => false,
        hover({ id: draggedId }) {
            if (draggedId !== id) {
                console.log('hover',)
                const { index: overIndex } = findCard(id);
                moveCard(draggedId, overIndex);
            }
        },
    });
    const opacity = isDragging ? 0 : 1;
    return (<div key={id} ref={(node) => drag(drop(node))} style={{ ...style, opacity }}>
			{text}
            {/* 临时 */}
            {renderComponent(item,basicConfig,dataConfig)}
            <Pie id='ddd' />
		</div>);
};
