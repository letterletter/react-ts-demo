import React ,{Component} from 'react'
import * as echarts from 'echarts/core';
import { BarChart} from 'echarts/charts'
import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
} from 'echarts/components';
import {
    CanvasRenderer
} from 'echarts/renderers';

class Bar extends Component{

    renderBar = () => {
        var chartDom = document.getElementById(`${this.props.id}`);
        echarts.use(
            [TitleComponent,LegendComponent, GridComponent, BarChart, CanvasRenderer]
        );
        this.myChart = echarts.init(chartDom);
        const {basicConfig,dataConfig,type} = this.props;
        this.option = {
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
            xAxis: {
                type: 'category',
                data: dataConfig.xdata || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                name: basicConfig.xName
            },
            yAxis: {
                type: 'value',
                name: basicConfig.yName
            },
            series: [{
                data: dataConfig.ydata || [120, 200, 150, 80, 70, 110, 130],
                type: 'bar',
                showBackground: basicConfig.showBackground,
                backgroundStyle: {
                    // color: 'rgba(180, 180, 180, 0.2)'
                    color:basicConfig.backgroundColor || 'rgb(180, 180, 180)',
                    opacity:0.5
                },
                itemStyle:{
                    color:basicConfig.barColor
                },
                barWidth:basicConfig.barWidth
            }]
        };
        setTimeout(()=>{
            this.option && this.myChart.setOption(this.option);
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
        this.renderBar();
    }

    componentDidMount(){
        this.renderBar();
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
export default Bar;