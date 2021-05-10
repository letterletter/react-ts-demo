import React , {Component} from 'react'
import HeaderTop from './header'
import { Layout} from 'antd';

import './header2.scss'
const { Header, Content } = Layout;

class Home extends Component {
  state = {
    collapsed: false,
    selectKey: ['index'],
  };

  
//0c3057
  render() {
    return (
      <Layout id="trigger">
        <Header  >
          <HeaderTop />
        </Header>
        <Layout>
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