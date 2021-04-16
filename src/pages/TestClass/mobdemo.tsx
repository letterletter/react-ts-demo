// home.tsx
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Button } from 'antd';
import { observer, inject, Observer, } from 'mobx-react'
import homeStore from '../../store/home'
import { computed } from "mobx";

// import './home.less';
type IProps = {
    homeStore: homeStore
    errors?: string,
    amount?:number,
}
@inject('homeStore')
@observer
class Home extends Component<IProps> {
    private clickHandler = (): void => {
        // const { homeStore } = this.props;
        console.log(this.props)
        const {setName, incre}=this.props.homeStore
        setName("Bob666")
        incre()
    }
    componentDidMount() {
        console.log(this.props)
    }
    componentDidUpdate() {
        console.log('update', this.props)
    }
    @computed get total() {
        return this.props.homeStore.total
    }

    render() {
        const {homeStore} = this.props
        console.log('hmstore', homeStore)
        return (
            <div className="home">
                <h1 className='home-item'>Home</h1>
                {/* <Observer>
                    {
                        () => <div>
                        <h2>{this.props.homeStore.name} --- {this.props.homeStore.amount}</h2>
                        <h2>{this.props.homeStore.total} </h2>
                    </div>
                    }
                </Observer> */}
                <div>
                        <h2>{this.props.homeStore.name} --- {this.props.homeStore.amount}</h2>
                        <h2>{homeStore.total} </h2>
                        {this.props.amount}
                </div>
                {/* <Link to='/detail'>详情</Link>
                <Link to='/login'>登录</Link> */}
                <Button onClick={this.clickHandler} type="primary">改名字</Button>
            </div>
        )
    }
};
export default Home;
