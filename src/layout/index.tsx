import React , {Component} from 'react'
import HeaderTop from './header'
import { Layout, Button} from 'antd';
import Sidebar from './funcside'
import './header2.scss'
const { Header, Content, Sider } = Layout;

class Home extends Component {  
//0c3057
  render() {
    return (
      <Layout id="trigger">
        <Header  >
          <HeaderTop />
        </Header>
        <Layout>
        <Sider width={200} trigger={null} className='temside' style={{ backgroundColor: 'rgba(183, 191, 204, 0.28)' ,height:'calc(100vh - 64px)',}}
            >
            <div style={{height:'100%'}}>
              <Sidebar />
            </div>
          </Sider>
            <Content>
            <div >
             {this.props.children}
            </div>
            </Content>
        </Layout>
      </Layout>
    )
  }
}
export default Home;