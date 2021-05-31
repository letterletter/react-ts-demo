import React ,{Component} from 'react'
import * as echarts from 'echarts/core';
import { FunnelChart} from 'echarts/charts'
import {
    TitleComponent,
    // TooltipComponent,
    GridComponent
} from 'echarts/components';
import {
    CanvasRenderer
} from 'echarts/renderers';
//漏斗图
class FunnelCRT extends Component{

    renderFunnel = () => {
        var chartDom = document.getElementById(`${this.props.id}`);
        //// 注册必须的组件
        echarts.use(
            [TitleComponent, GridComponent, FunnelChart, CanvasRenderer]
        );
        this.myChart = echarts.init(chartDom);
        const {basicConfig} = this.props;
        this.option = {
            title: {
                text: '漏斗图',
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c}%"
            },
            // toolbox: {
            //     feature: {
            //         dataView: {readOnly: false},
            //         restore: {},
            //         saveAsImage: {}
            //     }
            // },
            legend: {
                data: ['展现','点击','访问','咨询','订单']
            },
        
            series: [
                {
                    name:'漏斗图',
                    type:'funnel',
                    left: '10%',
                    top: 30,
                    //x2: 80,
                    bottom: 10,
                    width: '80%',
                    // height: {totalHeight} - y - y2,
                    min: 0,
                    max: 100,
                    minSize: '0%',
                    maxSize: '100%',
                    sort: 'descending',
                    gap: 2,
                    label: {
                        show: true,
                        position: 'inside'
                    },
                    labelLine: {
                        length: 10,
                        lineStyle: {
                            width: 1,
                            type: 'solid'
                        }
                    },
                    itemStyle: {
                        borderColor: '#fff',
                        borderWidth: 1
                    },
                    emphasis: {
                        label: {
                            fontSize: 20
                        }
                    },
                    data: [
                        {value: 60, name: '访问'},
                        {value: 40, name: '咨询'},
                        {value: 20, name: '订单'},
                        {value: 80, name: '点击'},
                        {value: 100, name: '展现'}
                    ]
                }
            ]
        };
        setTimeout(()=>{
            this.option && this.myChart.setOption(this.option);
            this.myChart.resize({
                width:document.getElementById(`${this.props.id}`).clientWidth   
            })
        })

    }
    componentDidUpdate(){
        var dom=document.getElementById(`${this.props.id}`)
        this.myChart&&this.myChart.resize({
            width:dom.clientWidth,
            height:dom.clientHeight
        })
        this.renderFunnel();
    }

    componentDidMount(){
        this.renderFunnel();
    }
    
    render(){
        return (<div style={{height:250}} id={`${this.props.id}`}></div>)
        
    }
}
export default  FunnelCRT;