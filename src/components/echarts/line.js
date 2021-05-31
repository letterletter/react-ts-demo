import React ,{Component} from 'react'
import * as echarts from 'echarts/core';
import { LineChart} from 'echarts/charts'
import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    DataZoomComponent
} from 'echarts/components';
import {
    CanvasRenderer
} from 'echarts/renderers';

class Line extends Component{
    constructor(props){
        super(props);
    }
    renderLine = () => {
        const {basicConfig, dataConfig,type} = this.props;
        echarts.use(
            [TitleComponent,LegendComponent, GridComponent, LineChart, CanvasRenderer, DataZoomComponent]
        );
        // console.log(basicConfig)
        var chartDom = document.getElementById(`${this.props.id}`);
        this.myChart = echarts.init(chartDom);
        var option = {
            title:{
                text: type === 'home' ? basicConfig.title : '',
                left: 'center'
            },
            legend:{
                orient: basicConfig.legendOrient
            },
            tooltip: {
                trigger: 'axis'
            },
            toolbox: {
                show: true,
                feature: {
                    dataView: {
                        readOnly: false,
                        title: basicConfig.title,
                    },
                }
            },
            xAxis: {
                type: 'category',
                data: dataConfig.xdata || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                name: basicConfig.xName
            },
            yAxis: {
                type: 'value',
                name: basicConfig.yName
            },
            dataZoom: [
                {
                    type: 'slider',
                    show: true,
                    xAxisIndex: [0],
                    start: 1,
                    end: 35
                },
            ],
            series: [{
                data: dataConfig.ydata || [150, 230, 224, 218, 135, 147, 260],
                type: 'line',
                smooth: basicConfig.lineStyle,
                lineStyle:{
                    color:basicConfig.lineColor,
                    width:basicConfig.lineWidth || 2,
                    type:basicConfig.lineType
                },
                areaStyle: basicConfig.showArea && {
                    color:basicConfig.areaColor
                }
            },
            // {
            //     data: [100, 130, 124, 318, 105, 187, 160],
            //     type: 'line',
            //     smooth: basicConfig.lineStyle,
            //     lineStyle:{
            //         color:basicConfig.lineColor,
            //         width:basicConfig.lineWidth || 2,
            //         type:basicConfig.lineType
            //     },
            // }
        ]
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
        this.renderLine();
    }
    componentDidMount(){
        this.renderLine();
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
        return (<div style={{width:'100%',height:'calc(100% - 30px)',position:'relative'}} id={`${this.props.id}`} className='noDraggable'></div>)
        
    }
}
export default Line;