import React, {Suspense, lazy} from 'react';
import './App.css';
import { Link, HashRouter, Route  } from 'react-router-dom'
import { Provider} from 'mobx-react'
import Layout from './layout/index'
import stores from './store/index';
import RouterConfig from './router'
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';

function App() {
  return (
    <div className="App">
      <ConfigProvider locale={zhCN}>  
        <Provider {...stores}>
          {/* <Layout />   */}
          <RouterConfig />
        </Provider>
      </ConfigProvider>
    </div>
  );
}

export default App;
