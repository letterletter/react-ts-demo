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
const JsPlumbFlowChart = lazy(() => import('./pages/jsplumb/flowChart'))
const JsPlumbDynamicAnchor = lazy(() => import('./pages/jsplumb/dynamicAnchor'))
const FormDemo1 = lazy(() => import('./components/FormExample'))
const ExcelDemo = lazy(() => import('./pages/exceldemo/demo1.jsx'))
const ExcelDemo2 = lazy(() => import('./pages/exceldemo/demo2.jsx'))
const TableDemo = lazy(() => import('./pages/exceldemo/table'))
const GridDemo = lazy(() => import('./pages/testDrag/index2'))
const Dustbin = lazy(() => import('./test/testDnd/index'))
const JsPlumbWithDrag = lazy(() => import('./pages/jsplumb/Test/main'))

const dndAnyDrag = lazy(() => import('./pages/dndExample/index'))
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
            <Route path='/dynamicanchor' exact component={JsPlumbDynamicAnchor}></Route>

            <Route path='/flowchart' exact component={JsPlumbFlowChart}></Route>
            <Route path='/formdemo1' exact component={FormDemo1}></Route>
            <Route path='/exceldemo' exact component={ExcelDemo}></Route>
            <Route path='/exceldemo2' exact component={ExcelDemo2}></Route>
            <Route  path='/tabledemo' exact component={TableDemo}></Route>
            <Route path='/griddemo' exact component={GridDemo}></Route>
            <Route path='/jsplumbmain' exact component={JsPlumbWithDrag}></Route>
            <Route path='/dustbin' exact component={Dustbin}></Route>
            <Route path='/dragany' exact component={dndAnyDrag}></Route>
          </Layout>
       </Switch>
     </Suspense>
  </Router>
)

export default Routes