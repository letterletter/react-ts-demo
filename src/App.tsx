import React from 'react';
import {Hello} from './pages/TestClass/classcom'
import './App.css';
import { Provider} from 'mobx-react'
import Demo from './pages/TestClass/mobdemo'
import Demo2 from './pages/TestClass/demo2'
import stores from './store/index';
import router from './router'
function App() {
  return (
    <div className="App">
      <Provider {...stores}>
      <header className="App-header">  
      {router()}
        {/* <Hello compiler='Typescript' framework='react' /> */}
        {/* <Demo homeStore={stores.homeStore} amount={stores.homeStore.amount} />
        <Demo2 detailStore={stores.detailStore} /> */}
      </header>
      </Provider>
    </div>
  );
}

export default App;
