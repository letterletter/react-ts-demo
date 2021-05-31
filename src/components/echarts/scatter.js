import React ,{Component} from 'react'
import * as echarts from 'echarts/core';
import { ScatterChart} from 'echarts/charts'
import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
} from 'echarts/components';
import {
    CanvasRenderer
} from 'echarts/renderers';

class Scatter extends Component{

    renderScatter = () => {
        const {basicConfig,dataConfig,type} = this.props;
        console.log(basicConfig)
        echarts.use(
            [TitleComponent,LegendComponent, GridComponent, ScatterChart, CanvasRenderer]
        );
        var chartDom = document.getElementById(`${this.props.id}`);
        this.myChart = echarts.init(chartDom);
        var option = {
            title:{
                text: type === 'home' ? basicConfig.title :'',
                left: 'center'
            },
            legend:{
                orient: basicConfig.legendOrient
            },
            tooltip:{
                trigger:'item',
            },
            dataZoom: [{
                type: 'inside'
            }, {
                type: 'slider',
                showDataShadow: false,
                handleSize: '80%'
            }, {
                type: 'inside',
                orient: 'vertical'
            }, {
                type: 'slider',
                orient: 'vertical',
                showDataShadow: false,
                handleSize: '80%'
            }],
            xAxis: {
                name: basicConfig.xName
            },
            yAxis: {
                name: basicConfig.yName
            },
            series: [{
                symbolSize: 20,
                data: dataConfig.data || [
                    [10.0, 8.04],
                    [8.07, 6.95],
                    [13.0, 7.58],
                    [9.05, 8.81],
                    [11.0, 8.33],
                    [14.0, 7.66],
                    [13.4, 6.81],
                    [10.0, 6.33],
                    [14.0, 8.96],
                    [12.5, 6.82],
                    [9.15, 7.20],
                    [11.5, 7.20],
                    [3.03, 4.23],
                    [12.2, 7.83],
                    [2.02, 4.47],
                    [1.05, 3.33],
                    [4.05, 4.96],
                    [6.03, 7.24],
                    [12.0, 6.26],
                    [12.0, 8.84],
                    [7.08, 5.82],
                    [5.02, 5.68]
                ],
                type: 'scatter',
                symbol:basicConfig.pointShape,
                symbolSize:basicConfig.pointSize || 10,
                itemStyle:{
                    color:basicConfig.pointColor
                }
            }]
        };
        setTimeout(()=>{
            option && this.myChart.setOption(option);
            this.myChart.resize({
                width:document.getElementById(`${this.props.id}`).clientWidth   
            })
        },50)
    }
    componentDidUpdate(){
        var dom=document.getElementById(`${this.props.id}`)
        this.myChart&&this.myChart.resize({
            width:dom.clientWidth,
            height:dom.clientHeight
        })
        this.renderScatter();
    }

    componentDidMount(){
        this.renderScatter();
    }
    shouldComponentUpdate(nextProps, nextState) {  //减少不必要渲染
        // console.log(nextProps,
        //     this.props)
        if(JSON.stringify(nextProps) !== JSON.stringify(this.props)){
            console.log(true)
            return true
        }
        return false
    }
    
    render(){
        return (<div style={{height:'calc(100% - 30px)'}} id={`${this.props.id}`} className='noDraggable'></div>)
        
    }
}
export default Scatter;