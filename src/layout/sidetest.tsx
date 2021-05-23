import React , {Component} from 'react';
import { Menu, Button } from 'antd';
import IconFont from '../font'
import { Link} from 'react-router-dom'
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
  LockOutlined,
  HomeOutlined,
  AppstoreFilled

} from '@ant-design/icons';
import sidemenus from './config'
const { SubMenu } = Menu;

export default class App extends React.Component {
  state = {
    collapsed: false,
  };

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  font = (k:string) => {
    switch(k){
      case '/user-mgt':
        return <IconFont type='iconset' style={{fontSize:17}}/>
      case '/roles-mgt':
        return <LockOutlined style={{fontSize:17}} />
      case '/organmanage':
        return <IconFont type='iconorganization' style={{fontSize:17}}/>
      case '/homepage':
        return <HomeOutlined style={{fontSize:17}}/>
      case '/datamanage':
        return <IconFont type='iconshujuguanli' style={{fontSize:17, color: '#fff'}}/>
      case '/data-pre-preprocess':
        return <IconFont type='iconic_wait' style={{fontSize:17}}/>
      case '/data-process':
        return <IconFont type='iconshujuchuli' style={{fontSize:17}}/>
      case '/intelligence-analysis':
        return <IconFont type='iconfenxi1' style={{fontSize:17}}/>
      case '/datashow':
        return <IconFont type='icontubiaozhuzhuangtu' style={{fontSize:17}}/>
      default:
        return <AppstoreFilled style={{fontSize:17}}/>
    }
  }
  recursion(menus:any) {
    return (
      (menus||[]).map((menu:any, index:number) => {
        if(menu.subs) {
          return (
            <SubMenu key={menu.index} 
              icon={this.font(menu.index)}
              title={menu.title}
            >
              {this.recursion(menu.subs)}
            </SubMenu>
          )
        }else {
          return (
            <Menu.Item key={menu.index} icon={menu.showIcon && this.font(menu.index)} >
              {/* <Link to={menu.parentIdx +menu.index}> */}
                {menu.title}
              {/* </Link> */}
            </Menu.Item>
          )
        }
      })
    )
  }

  render() {
    return (
      <div >
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ overflowY: 'auto', overflowX: 'hidden', color: 'white', borderRight: 0,  fontSize: '16px',borderTop: '1px solid gray'}}
          mode="inline"
          theme="dark"
        >
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            Option 1
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            Option 2
          </Menu.Item>
          <Menu.Item key="3" icon={<ContainerOutlined />}>
            Option 3
          </Menu.Item>
          <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
          {
            this.recursion(sidemenus)
          }
        </Menu>
      </div>
    );
  }
}

