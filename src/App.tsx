import React from 'react';
import {Hello} from './pages/TestClass/classcom'
import './App.css';
import { Provider} from 'mobx-react'

import stores from './store/index';
import router from './router'
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';

function App() {
  return (
    <div className="App">
      <ConfigProvider locale={zhCN}>  
      <Provider {...stores}>
      {router()}
        {/* <Hello compiler='Typescript' framework='react' /> */}
        {/* <Demo homeStore={stores.homeStore} amount={stores.homeStore.amount} />
        <Demo2 detailStore={stores.detailStore} /> */}
      </Provider>
      </ConfigProvider>
    </div>
  );
}

export default App;
