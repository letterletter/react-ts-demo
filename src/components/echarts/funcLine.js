import React ,{Component} from 'react'
import * as echarts from 'echarts/core';
import { LineChart} from 'echarts/charts'
import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    ToolboxComponent,
    DataZoomComponent
} from 'echarts/components';
import {
    CanvasRenderer
} from 'echarts/renderers';

class Line extends Component{
    constructor(props){
        super(props);
        this.state = {
          funcContent: 'Math.sin(x) * Math.cos(x * 2 + 1) * Math.sin(x * 3 + 2) * 50'
        }
    }
    renderLine = () => {
        const {basicConfig, dataConfig,type} = this.props;
        echarts.use(
            [TitleComponent,LegendComponent, GridComponent, LineChart, CanvasRenderer, DataZoomComponent, TooltipComponent, ToolboxComponent]
        );
        // console.log(basicConfig)
        var chartDom = document.getElementById(`${this.props.id}`);
        this.myChart = echarts.init(chartDom);
        var option = {
          animation: false,
          tooltip: {
            trigger: 'axis'
        },
          grid: {
              top: 40,
              left: 50,
              right: 40,
              bottom: 50
          },
          xAxis: {
              name: 'x',
              minorTick: {
                  show: true
              },
              minorSplitLine: {
                  show: true
              }
          },
          yAxis: {
              name: 'y',
              // min: -100,
              // max: 100,
              minorTick: {
                  show: true
              },
              minorSplitLine: {
                  show: true
              },
              min: function (value) {
                console.log('value', value)
                return value.min - 1;
              },
              max: function (value) {
                return value.max + 1;
              }
          },
          dataZoom: [{
              show: true,
              type: 'inside',
              filterMode: 'none',
              xAxisIndex: [0],
              startValue: -20,
              endValue: 20
          }, {
              show: true,
              type: 'inside',
              filterMode: 'none',
              yAxisIndex: [0],
              startValue: -20,
              endValue: 20
          }],
          series: [
              {
                  type: 'line',
                  showSymbol: false,
                  clip: true,
                  data: this.generateData()
              }
          ]
      };
        setTimeout(()=>{
            option && this.myChart.setOption(option);
            console.log(this.myChart)
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
    func(x) {
      x /= 10;
      // return Math.sin(x) * Math.cos(x * 2 + 1) * Math.sin(x * 3 + 2) * 50;
      return eval(`${this.state.funcContent}`)
    }
    
    generateData() {
      let data = [];
      for (let i = -100; i <= 100; i += 0.1) {
          data.push([i, this.func(i)]);
      }
      return data;
    }
    handleFuncChange =(content) => {
      this.setState({
        funcContent: content
      })
      // this.renderLine()
    }
    
    render(){
        return (
        <React.Fragment>
          <input onChange={e => this.handleFuncChange(e.target.value)} />
          <button onClick={this.renderLine}>绘制</button>
        <div style={{width:'50%',height:'400px',position:'relative'}} id={`${this.props.id}`} className='noDraggable'>
            
        </div>
        </React.Fragment>
        )
        
    }
}
export default Line;