import React ,{Component} from 'react'
import * as echarts from 'echarts/core';
import { PieChart} from 'echarts/charts'
import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
} from 'echarts/components';
import {
    CanvasRenderer
} from 'echarts/renderers';

class Pie extends Component{

    renderPie = () => {
        const {basicConfig,dataConfig,type} = this.props;
        echarts.use(
            [TitleComponent,LegendComponent, GridComponent, PieChart, CanvasRenderer]
        );
        // console.log(dataConfig)
        var chartDom = document.getElementById(`${this.props.id}`);
        this.myChart = echarts.init(chartDom);
        let defaultData = [
            {value: 1048, name: '搜索引擎'},
            {value: 735, name: '直接访问'},
            {value: 580, name: '邮件营销'},
            {value: 484, name: '联盟广告'},
            {value: 300, name: '视频广告'}
        ]
        var option = {
            title:{
                text: type === 'home' ? basicConfig.title: '',
                left: 'center'
            },
            legend:{
                orient: basicConfig.legendOrient,
                left: basicConfig.legendOrient === 'horizontal' ? 'center' : 'left',
                top:basicConfig.legendOrient === 'horizontal' ? 0 : 'auto'
            },
            tooltip: {
                trigger: 'item'
            },
            // legend: {
            //     orient: 'horizontal',
            //     left: 'left',
            // },
            series: [
                {
                    name: dataConfig.name || '访问来源',
                    type: 'pie',
                    radius: basicConfig.pieStyle === 'doughnut' ? ['40%', '60%'] : basicConfig.pieStyle === 'nightingale' ? '90%' : '50%',
                    roseType: basicConfig.pieStyle === 'nightingale' ? 'area' : '',
                    emphasis: basicConfig.pieStyle === 'doughnut' ? {
                        label: {
                            show: true,
                            fontSize: '20',
                            fontWeight: 'bold'
                        }
                    } : {},
                    data: dataConfig.data || defaultData,
                    label: basicConfig.pieStyle === 'doughnut' ? {
                        show: false,
                        position: 'center'
                    } : {
                        show:true,
                        position:'outside',

                    },
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
        console.log('ddd pie',this.props.id)
        var dom=document.getElementById(`${this.props.id}`)
        this.myChart&&this.myChart.resize({
            width:dom.clientWidth,
            height:dom.clientHeight
        })
        this.renderPie();
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
    componentDidMount(){
        this.renderPie();
    }
    
    render(){
        return (<div style={{width:'100%',height:'calc(100% - 30px)'}} id={`${this.props.id}`} className='noDraggable'></div>)
        
    }
}
export default Pie;