import React, {Suspense, lazy} from 'react'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Layout from './layout/index'

const FuncDemo = lazy(() => import('./pages/funcCom/hookdemo'))
const MobXDemo = lazy(() => import('./pages/TestClass/mobdemo'))
const Login = lazy(() => import('./pages/login'))
export interface Props {
  history: any
}
const Routes = () => (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Route path="/" exact component={() => <div>Home</div>}></Route>
        <Route path="/login" exact component={Login}></Route>
        <Route path="/signin" exact component={() => <div>sign</div>}></Route>
       <Switch>
          <Layout>
            <Route path="/funcdemo" exact component={FuncDemo}></Route>
            <Route path='/mobxdemo' exact component={MobXDemo}></Route>
          </Layout>
       </Switch>
     </Suspense>
  </Router>
)

export default Routes