import React ,{Component} from 'react'
import * as echarts from 'echarts/core';
import { LineChart} from 'echarts/charts'
import {
  TitleComponent,
  PolarComponent,
  TooltipComponent,
  ToolboxComponent,
  LegendComponent
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
    renderPolar = () => {
        const {basicConfig, dataConfig,type} = this.props;
        echarts.use(
          [TitleComponent, PolarComponent, TooltipComponent, LegendComponent, LineChart, CanvasRenderer]
        );
        // console.log(basicConfig)
        var chartDom = document.getElementById(`${this.props.id}`);
        this.myChart = echarts.init(chartDom);
        var option = {
          title: {
              text: '极坐标双数值轴'
          },
          legend: {
              data: ['line']
          },
          polar: {},
          tooltip: {
              trigger: 'axis',
              axisPointer: {
                  type: 'cross'
              }
          },
          angleAxis: {
              type: 'value',
              startAngle: 0
          },
          radiusAxis: {
          },
          series: [{
              coordinateSystem: 'polar',
              name: 'line',
              type: 'line',
              data: this.generateData()
          }]
      };
        setTimeout(()=>{
            option && this.myChart.setOption(option);
            console.log(this.myChart)
            this.myChart.resize({
                width:document.getElementById(`${this.props.id}`).clientWidth   
            })
        },50)
    }
    renderPolarByFunc = () => {
      const {basicConfig, dataConfig,type} = this.props;
      echarts.use(
        [TitleComponent, PolarComponent, TooltipComponent, LegendComponent, LineChart, CanvasRenderer]
      );
      // console.log(basicConfig)
      var chartDom = document.getElementById('contentdraw');
      this.myChart = echarts.init(chartDom);
      var option = {
        title: {
            text: '极坐标双数值轴'
        },
        legend: {
            data: ['line']
        },
        polar: {},
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        angleAxis: {
            type: 'value',
            startAngle: 0
        },
        radiusAxis: {
        },
        series: [{
            coordinateSystem: 'polar',
            name: 'line',
            type: 'line',
            data: this.generateData2()
        }]
    };
    option && this.myChart.setOption(option);
      // setTimeout(()=>{
      //     option && this.myChart.setOption(option);
      //     console.log(this.myChart)
      //     this.myChart.resize({
      //         width:document.getElementById(`${this.props.id}`).clientWidth   
      //     })
      // },50)
  }
    componentDidUpdate(){
        var dom=document.getElementById(`${this.props.id}`)
        this.myChart&&this.myChart.resize({
            width:dom.clientWidth,
            height:dom.clientHeight
        })
        this.renderPolar();
    }
    componentDidMount(){
        console.log('ddfff')
        this.renderPolar();
        // this.formAjimide()
        // this.formHuabentu()
        // this.formWujiaoxing()
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
      // for (let i = -100; i <= 100; i += 0.1) {
      //     data.push([i, this.func(i)]);
      // }
      for (var i = 0; i <= 100; i++) {
        var theta = i / 100 * 360;
        var r = 5 * (1 + Math.sin(theta / 180 * Math.PI));
        data.push([r, theta]);
      }
      // console.log(data)
      return data;
    }
    generateData2() {
      let data = [];
      for (var i = 0; i <= 100; i++) {
        var theta = i / 100*360 //*2* Math.PI;;
        // var r = 5 * (1 + Math.sin(theta / 180 * Math.PI));
        var r = this.func(theta)
        data.push([r, i]);
      }
      // console.log(data)
      return data;
    }
    handleFuncChange =(content) => {
      this.setState({
        funcContent: content
      })
    }
    formAjimide = () => {
      // 极坐标下绘制阿基米德螺旋，只需使用公式 r = a + b * θ ：
      echarts.use(
        [TitleComponent, PolarComponent, TooltipComponent, LegendComponent, LineChart, CanvasRenderer]
      );
      var myChart = echarts.init(document.getElementById('ajimide'));
			var data = [];
			var max = 300;
			for (var i = 0; i <= max; i++) {
				var angle = Math.ceil(i * ((360 * 6) / max));
				// 根据阿基米德螺旋公式：
				// r = a + b * θ
				var r = angle;
				data.push([r, angle]);
			}

			var option = {
				// toolbox: {
				// 	feature: {
				// 		saveAsImage: {},
				// 	},
				// },
				polar: {},
				angleAxis: {
					type: 'value',
					startAngle: 0,
					min: 0,
					max: 360,
				},
				radiusAxis: {},
				series: [{ showSymbol: false, coordinateSystem: 'polar', type: 'line', data: data }],
			};
			myChart.setOption(option);
    }
    formHuabentu = () => {
      //极坐标下绘制花瓣图，只需实现公式 r = a + b * |sin(c * θ)|：
      echarts.use(
        [TitleComponent, PolarComponent, TooltipComponent, LegendComponent, LineChart, CanvasRenderer]
      );
      var myChart = echarts.init(document.getElementById('huabantu'));

			var data = [];
			for (var i = 0; i <= 360; i++) {
				var x = (i / 360) * Math.PI;
				// 花瓣图公式：
				// r = a + b * |sin(c * θ)|
				var r = 4 + 20 * Math.abs(Math.sin(8 * x));
				data.push([r, i]);
			}

			var option = {
				// toolbox: {
				// 	feature: {
				// 		saveAsImage: {},
				// 	},
				// },
				polar: {},
				angleAxis: { type: 'value', startAngle: 0 },
				radiusAxis: { min: 0 },
				series: [{ showSymbol: false, coordinateSystem: 'polar', type: 'line', data: data }],
			};
			myChart.setOption(option);
    }

    formWujiaoxing = () => {
      echarts.use(
        [TitleComponent, PolarComponent, TooltipComponent, LegendComponent, LineChart, CanvasRenderer, ToolboxComponent]
      );
      var myChart = echarts.init(document.getElementById('wujiaoxing'));

			var option = {
				// toolbox: {
				// 	feature: {
				// 		saveAsImage: {},
				// 	},
				// },
				polar: {},
				angleAxis: {
					type: 'value',
					startAngle: 0,
					min: 0,
					max: 360,
				},
        tooltip: {
          trigger: 'axis',
          axisPointer: {
              type: 'cross'
          }
        },
				radiusAxis: {
					max: 5,
				},
				series: [
					{
						// 指定改序列会被应用在极坐标系上
						coordinateSystem: 'polar',
						type: 'line',
						data: [
							[4, -155],
							[4, -25],
							[4, 135],
							[4, -90],
							[4, 45],
							[4, -155],
						],
					},
				],
			};
			myChart.setOption(option);
    }
    
    render(){
        return (
        <React.Fragment>
          <input onChange={e => this.handleFuncChange(e.target.value)} />
          <button onClick={this.renderPolarByFunc}>绘制</button>
        <div style={{width:'50%',height:'400px',position:'relative'}} id={`${this.props.id}`} className='noDraggable'>
            
        </div>
        {/* <div style={{width:'50%',height:'400px',position:'relative'}} title='' id='ajimide' className='noDraggable'>
            
        </div>
        <div style={{width:'50%',height:'400px',position:'relative'}} title='花瓣图' id='huabantu' className='noDraggable'>
            
        </div>
        <div style={{width:'50%',height:'400px',position:'relative'}} title='五角星' id='wujiaoxing' className='noDraggable'>
            
        </div> */}
        <div style={{width:'50%',height:'400px',position:'relative'}} title='函数绘图' id='contentdraw' className='noDraggable'>
            
        </div>
        </React.Fragment>
        )
        
    }
}
export default Line;