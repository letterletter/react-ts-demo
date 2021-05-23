import React, {Suspense, lazy} from 'react'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Layout from './layout/index'
import stores from './store/index';

const FuncDemo = lazy(() => import('./pages/funcCom/hookdemo'))
const MobXDemo = lazy(() => import('./pages/TestClass/mobdemo'))
const DetailMobx = lazy(() => import('./pages/TestClass/demo2'))
const Login = lazy(() => import('./pages/login'))
const FuncRouter = lazy(() => import('./pages/funcCom/funcrouter'))
const TestJsplumb = lazy(() => import('./pages/jsplumb/chartdemo'))
const AnimationJsplumb = lazy(() => import('./pages/jsplumb/animation'))
const FormDemo1 = lazy(() => import('./components/FormExample'))
const ExcelDemo = lazy(() => import('./pages/exceldemo/demo1.jsx'))
export interface Props { 
  history: any
}
const Routes = () => (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        {/* <Route path="/" exact component={() => <div></div>}></Route> */}
        <Route path="/login" exact component={Login}></Route>
        <Route path="/signin" exact component={() => <div>sign</div>}></Route>
       <Switch>
          <Layout>
            <Route path="/funcdemo" exact component={FuncDemo}></Route>
            <Route path="/funcrouter" exact component={FuncRouter}></Route>
            <Route path='/detaildemo' exact component={() => <DetailMobx detailStore={stores.detailStore} />}></Route>
            <Route path='/mobxdemo' exact component={() => <MobXDemo  homeStore={stores.homeStore} amount={stores.homeStore.amount} />}></Route>
            <Route path='/jsplumbchart' exact component={TestJsplumb}></Route>
            <Route path='/jsplumbanimation' exact component={AnimationJsplumb}></Route>
            <Route path='/formdemo1' exact component={FormDemo1}></Route>
            <Route path='/exceldemo' exact component={ExcelDemo}></Route>
          </Layout>
       </Switch>
     </Suspense>
  </Router>
)

export default Routes