import React , {Component, useState, useEffect} from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { Menu, MenuProps, } from 'antd';
import { MenuNode} from 'antd/lib/menu/index.d.ts'
import { LockOutlined} from '@ant-design/icons'
import truemenu  from './config'
import {
  AppstoreFilled,
  HomeOutlined
} from '@ant-design/icons';
import IconFont from '../font'
import './header2.scss'
const {SubMenu } = Menu;
interface Prop_types extends RouteComponentProps {

}
interface state_Props {
  mode: string,
  theme: string,
  trueSidebar: Array<any>
}
const Sidebar: React.FC<Prop_types> = props => {
  const [totalObj, setTotalObj] = useState({
    mode: 'inline',
    theme: 'light' ,
    trueSidebar: truemenu,
  })
  const font = (k:string) => {
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
  useEffect(() => {
    let obj:any = totalObj
    obj.trueSidebar = truemenu
    setTotalObj(obj)
  },[])
  const recursion = (menus: Array<any>) => {
    return (
      (menus||[]).map((menu, index) => {
        if(menu.subs) {
          return (
            <SubMenu key={menu.index} 
              title={<span>
                {font(menu.index)}
                <span>{menu.title}</span>
              </span>}
            >
              {recursion(menu.subs)}
            </SubMenu>
          )
        }else {
          return (
            <Menu.Item key={menu.index} icon={menu.showIcon && font(menu.index)} style={{background: 'transparent'}}>
              <Link to={menu.parentIdx +menu.index}>
                {menu.title}
              </Link>
            </Menu.Item>
          )
        }
      })
    )
  }
  return (
    <Menu
        className='sidemenu'
        style={{ overflowY: 'auto', overflowX: 'hidden', color: 'black', borderRight: 0,  fontSize: '16px',backgroundColor: 'transparent', borderTop: '1px solid gray'}}
        // defaultSelectedKeys={[pathname.slice(pathname.lastIndexOf('/'))]}
        mode={totalObj.mode}
        theme={totalObj.theme}
      >
        {
          recursion(totalObj.trueSidebar)
        }
      </Menu> 
  )
}
// export default Sidebar
export default withRouter(Sidebar)