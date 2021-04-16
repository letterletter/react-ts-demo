// home.tsx
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Button } from 'antd';
import { observer, inject, Observer, } from 'mobx-react'
import detailStore from '../../store/detail'
import { computed, makeAutoObservable } from "mobx";

// import './home.less';
type IProps = {
    detailStore: detailStore
    errors?: string,
    amount?:number,
}
@inject('detailStore')
@observer
class Home extends Component<IProps> {
    constructor(props:IProps) {
        super(props)
        this.state={
            count:1,
        }
    }
    private clickHandler = (): void => {
        // const { homeStore } = this.props;
        console.log('ddd')
        const {setName}=this.props.detailStore
        setName("Bob666"+Math.random().toFixed(4))
    }
    componentDidMount() {
        console.log(this.props)
    }
    componentDidUpdate() {
        console.log('update', this.props)
    }

    render() {
        const {detailStore} = this.props
        const ddd = this.props.detailStore
        console.log('hmstore', detailStore)
        return (
            <div className="home">
                <h1 className='home-item'>detail</h1>
                  {this.props.detailStore.name}
                  {JSON.stringify(ddd)}
                {/* <Link to='/detail'>详情</Link>
                <Link to='/login'>登录</Link> */}
                <Button onClick={this.clickHandler} type="primary">改名字</Button>
            </div>
        )
    }
};
export default Home;
