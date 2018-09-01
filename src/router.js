import React from 'react';
import {Router, Route, IndexRoute} from 'dva/router';
// 登录页
import IndexPage from './routes/IndexPage';
import CreateTemp from './routes/createTemp/CreateTemp';
import CreateLayout from "./routes/createLayout/CreateLayout";

function RouterConfig ({history}) {
  return (
    <Router history={history}>
      <Route path="/" component={CreateTemp}> </Route>
      <Route path="createLayout" component={CreateLayout}> </Route>
    </Router>
  );
}

export default RouterConfig;
