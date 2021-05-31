import React, { Component } from 'react'
import {Select, Button} from 'antd'
import Container from './container2'
import HeadArea from './headarea'
// import {setCardsArr, setNum,setTextCardNum} from '../../../redux/actions'
// import { actionCreators } from './store';
import { withRouter ,Prompt} from 'react-router'
import './style.scss'

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
              <Button onClick={this.storeCards}>预览</Button>
            </div>
            {/* 中间的画布 */}
            <div style={{ ...commonStyle}}>
              </div>
            </div>
            {/* 中间的画布 */}
            <div style={{ ...commonStyle,height:'calc(100vh - 135px)',overflowY:'auto'}} id='canvasContainer'>
              <Container ref={this.containerRef}  storeCards={this.storeCards}/>
            </div>

          </div>
    )
  }
}
// const mapProps = dispatch => ({
//   setCardsArr(cards){
//     dispatch(setCardsArr(cards))
//   },
//   setNum(num){
//     dispatch(setNum(num))
//   },
//   setTextCardNum(num){
//     dispatch(setTextCardNum(num))
//   }
// })
// export default connect((state)=>({num:state.setCards.num, textCardNum:state.setCards.textCardNum}), mapProps)(withRouter(Main));

export default Main



