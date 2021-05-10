import React from 'react'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import MobDemo from './pages/TestClass/demo2'
import MobDemo2 from './pages/TestClass/mobdemo'
import FuncDemo from './pages/funcCom/hookdemo'
import Home from './layout/index'
const Routes = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={() => <div>home</div>}></Route>
      <Route path="/login"  exact component={MobDemo}></Route>
      <Route path="/signin" exact component={MobDemo2}></Route>
      <Route path='/functest' exact component={FuncDemo}></Route>
      <Route path="/forgetpwd" component={() => <div>忘记密码</div>}></Route>

    </Switch>
  </Router>
)

export default Routes