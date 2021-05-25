import React, { Component } from 'react';
import { Menu, Dropdown, } from 'antd';
import './header2.scss';
import { CaretDownFilled, NotificationOutlined } from '@ant-design/icons'
import { Link, withRouter } from 'react-router-dom';
import { createFromIconfontCN } from '@ant-design/icons';
import logo from '../assets/logo2.png'
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2368147_82px5n552zr.js',
});
export interface HeaderInterface {
  current: string,
  visible: boolean,
  count: number,
  signinAskList: Object[]
}
class Header extends Component<{}, HeaderInterface> {
  state = {
    current: '',
    visible: false,
    count: 0,
    signinAskList: []
  }


  componentDidMount() {
  }


  handleMenuClick = (e:any) => {
    console.log('click', e.key)
    if (e.key === '0') {

    }
    if (e.key === "1") {
    }
    //退出
    if (e.key === "2") {
      localStorage.clear()
    }
  }

  showCheckList = () => {
    this.setState({
      visible: !this.state.visible
    })
  }
  render() {
    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="1">
          <span>首页定制
          </span>
        </Menu.Item>
        <Menu.Item key="2">
          <span>退出</span>
        </Menu.Item>
      </Menu>
    );
    const { current, visible, count, signinAskList } = this.state;
    return (
      <div className="header1" >
        <div className="logo"  style={{ cursor: 'pointer', }} >
          <img alt='' src={process.env.PUBLIC_URL+'logo1.png'} width="44" height='44' style={{ marginLeft: '10px', marginRight: '10px' }} />
          监测数据处理平台
        </div>
        <div className='header-middle'>
        </div>
        <div className="header-right">
          <div className="header-user-con">
            {window.location.hash !== '#/homepagePreview' ? 
              <div style={{ cursor: 'pointer', fontSize: '19px', verticalAlign: 'middle', }}>
                {/* <IconFont type="icon-yonghu" style={{ fontSize: '36px', marginRight: '10px', verticalAlign: 'middle' }} /> */}
                <Dropdown overlay={menu} arrow={true} trigger={['click']}>
                  <span className='namespan'>{'ddd'}<CaretDownFilled /></span>
                </Dropdown>
              </div> : 
              <div>
              </div>
            }
          </div>
        </div>
      </div >
    )
  }

}

export default Header