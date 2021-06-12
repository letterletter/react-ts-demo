import React ,{Component} from 'react'
import * as echarts from 'echarts/core';
import { LineChart, BarChart} from 'echarts/charts'
import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    ToolboxComponent,
    DataZoomComponent,
    DatasetComponent
} from 'echarts/components';
import {
    CanvasRenderer
} from 'echarts/renderers';

class Line extends Component{
    constructor(props){
        super(props);
    }
    renderLine = () => {
        const {basicConfig, dataConfig,type, DsetAndSeries} = this.props;
        const { dataset, series} = DsetAndSeries
        console.log(DsetAndSeries)
        echarts.use(
            [TitleComponent,LegendComponent, GridComponent, LineChart, CanvasRenderer, DataZoomComponent, TooltipComponent, ToolboxComponent, BarChart,
                DatasetComponent]
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
            
            dataset: dataset,
            xAxis: {
                type: 'category',
                // data: dataConfig.xdata || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                // name: basicConfig.xName
            },
            yAxis: {},
            dataZoom: [
                {
                    type: 'slider',
                    show: true,
                    xAxisIndex: [0],
                    start: 1,
                    end: 35
                },
            ],
            series: series,
            // series: [
            //     {type: 'line'},
            //     {type: 'line'},
            //     {type: 'line'}
            // ]
        };
        var option2 = {
            dataset: {
                source: [
                    ['score', 'amount', 'product'],
                    [89.3, 58212, 'Matcha Latte'],
                    [57.1, 78254, 'Milk Tea'],
                    [74.4, 41032, 'Cheese Cocoa'],
                    [50.1, 12755, 'Cheese Brownie'],
                    [89.7, 20145, 'Matcha Cocoa'],
                    [68.1, 79146, 'Tea'],
                    [19.6, 91852, 'Orange Juice'],
                    [10.6, 101852, 'Lemon Juice'],
                    [32.7, 20112, 'Walnut Brownie']
                ]
            },
            xAxis: {},
            yAxis: {type: 'category'},
            series: [
                {
                    type: 'bar',
                    encode: {
                        // 将 "amount" 列映射到 X 轴。
                        x: 'amount',
                        // 将 "product" 列映射到 Y 轴。
                        y: 'product'
                    }
                }
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
        console.log('ddfff')
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
        return (<div style={{width:'100%',height:'400px',position:'relative'}} id={`${this.props.id}`} className='noDraggable'>
            
        </div>)
        
    }
}
export default Line;