import React , {Component} from 'react'
import HeaderTop from './header'
import { Layout, Menu, Button} from 'antd';
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons';
import './header2.scss'
import SiderBar from './sidetest'
const { Header, Content, Sider } = Layout;
const { SubMenu} = Menu
class Home extends Component {
  state = {
    collapsed: false,
    selectKey: ['index'],
    toggleCollapsed: false
  };
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  
//0c3057
  render() {
    return (
      <Layout id="trigger">
        <Header  >
          <HeaderTop />
        </Header>
        <Layout  style={{height:'calc(100vh - 64px)'}} >
          <Sider width={200} style={{ height:'calc(100vh - 64px)',}}
            collapsible collapsed={this.state.collapsed}
          >
            <div style={{height:'100%'}}>
              <div className='header-callapse'>
                <Button type="primary" onClick={this.toggleCollapsed} style={{marginTop: '3px'}} size='small'>
                  {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
                </Button>
              </div>
              <SiderBar />
            </div>
          </Sider>
            <Content >
            <div style={{overflowY: 'scroll', overflowX: 'hidden', height: '100%'}} >
             {this.props.children}
            </div>
            </Content>
        </Layout>
      </Layout>
    )
  }
}
export default Home;