import React, { Component } from 'react'
import {Select, Button} from 'antd'
import Container from './container2'
import HeadArea from './headarea'
import {setCardsArr, setNum,setTextCardNum} from '../../../redux/actions'
// import { actionCreators } from './store';
import { withRouter ,Prompt} from 'react-router'
import {connect} from 'react-redux'
import '../style.scss'

const {Option} = Select
const commonStyle = {
   margin: 0, display: 'block', 
   
  //  border: '1px solid yellow'
}

class Main extends Component {
  constructor(props) {
    super(props);
    this.containerRef = React.createRef()  
    console.log('dsds') 
    this.state={
      num:2,
      textCardNum: 2
    }
  }

  test = () => {
    console.log(this.containerRef)
    this.containerRef.current.handleClear()
    console.log(this.containerRef.current.stepOrder)
  }

  changeNum = num => {
    this.props.setNum(num);
  }


  storeCards = () => {
    console.log(this.containerRef.current.items)
    
    
    this.props.setCardsArr(this.containerRef.current.items)
    this.props.history.push('/homepagePreview');
  }

  changeTextCardNum = num => {  //改变textCard数量
    console.log(this.state.textCardNum)
    // this.containerRef.current.changeTextNum(this.state.textCardNum, num)
    this.props.setTextCardNum(num);
  }

  componentWillUnmount() {
    // this.props.clearState()
  }
  render() {
    const {num, textCardNum} = this.props;
    return (
          <div >
          {/* <Prompt message="离开信息会丢失" when={true}  /> */}
            <div style={{ padding: '10px 0px 0px 0px',  borderBottom: '1px solid gray',backgroundColor: '#fff', display: 'flex' }}>
              <HeadArea />
              <div className='rightselect'>
              {/* 整体布局(一行几列):<Select defaultValue={num} style={{width: 80, }} placeholder="选择整体布局一行几列"  onChange={this.changeNum}>
                <Option value={1}>1</Option>
                <Option value={2}>2</Option>
                <Option value={3}>3</Option>
                <Option value={4}>4</Option>
                <Option value={6}>6</Option>
              </Select> */}
              <Button onClick={this.storeCards}>预览</Button>
            </div>
            {/* 中间的画布 */}
            <div style={{ ...commonStyle}}>
              {/* 文字卡片个数:<Select defaultValue={textCardNum} style={{width: 80, }}   onChange={this.changeTextCardNum}>
                <Option value={2}>2</Option>
                <Option value={4}>4</Option>
                <Option value={6}>6</Option> 
              </Select> */}
              {/* <Button onClick={this.test}>test</Button> */}
              </div>
            </div>
            {/* 中间的画布 */}
            <div style={{ ...commonStyle,height:'calc(100vh - 135px)',overflowY:'auto'}} id='canvasContainer'>
              <Container ref={this.containerRef} textCardNum={textCardNum}  num={num} storeCards={this.storeCards}/>
            </div>

          </div>
    )
  }
}
const mapProps = dispatch => ({
  setCardsArr(cards){
    dispatch(setCardsArr(cards))
  },
  setNum(num){
    dispatch(setNum(num))
  },
  setTextCardNum(num){
    dispatch(setTextCardNum(num))
  }
})
export default connect((state)=>({num:state.setCards.num, textCardNum:state.setCards.textCardNum}), mapProps)(withRouter(Main));

// const mapState = (state) => {
//   const {taskId, hasInput, hasOutput, taskType, hasSetClock} = state.createTaskReducer;
//   return {
//     taskId, hasInput, hasOutput, taskType, hasSetClock
//   }
// }

// const mapDispatch = (dispatch) => {
//   return {
//     commitTask(requestData) {
//       dispatch(actionCreators.commitTask(requestData))
//     },Z
//     clearState() {
//       dispatch(actionCreators.clearState())
//     }
//   }
// }
// export default withRouter(connect(mapState, mapDispatch)(Main))

