import React ,{Component} from 'react'
import * as echarts from 'echarts/core';
import { RadarChart} from 'echarts/charts'
import {
    TitleComponent,
    // TooltipComponent,
    GridComponent
} from 'echarts/components';
import {
    CanvasRenderer
} from 'echarts/renderers';
//漏斗图
class RadarCRT extends Component{

    renderRadar = () => {
        var chartDom = document.getElementById(`${this.props.id}`);
        //// 注册必须的组件
        echarts.use(
            [TitleComponent, GridComponent, RadarChart, CanvasRenderer]
        );
        this.myChart = echarts.init(chartDom);
        const {basicConfig} = this.props;
        this.option = {
          title: {
              text: '基础雷达图'
          },
          tooltip: {},
          legend: {
              data: ['预算分配', '实际开销'],
              bottom: 5,
              left: 5,
          },
          radar: {
              // shape: 'circle',
              name: {
                  textStyle: {
                      color: '#72ACD1',
                      // backgroundColor: '#999',
                      borderRadius: 3,
                      padding: [3, 5]
                  }
              },
              indicator: [
                  { name: '销售', max: 6500},
                  { name: '管理', max: 16000},
                  { name: '信息技术', max: 30000},
                  { name: '客服', max: 38000},
                  { name: '研发', max: 52000},
                  { name: '市场', max: 25000}
              ]
          },
          series: [{
              name: '预算 vs 开销',
              type: 'radar',
              // areaStyle: {normal: {}},
              data: [
                  {
                      value: [4300, 10000, 28000, 35000, 50000, 19000],
                      name: '预算分配'
                  },
                  {
                      value: [5000, 14000, 28000, 31000, 42000, 21000],
                      name: '实际开销'
                  }
              ]
          }]
      };

        this.option && this.myChart.setOption(this.option);
    }
    componentDidUpdate(){
        var dom=document.getElementById(`${this.props.id}`)
        this.myChart&&this.myChart.resize({
            width:dom.clientWidth,
            height:dom.clientHeight
        })
        this.renderRadar();
    }

    componentDidMount(){
        this.renderRadar();
    }
    
    render(){
        return (<div style={{height:'100%'}} id={`${this.props.id}`}></div>)
        
    }
}
export default  RadarCRT;