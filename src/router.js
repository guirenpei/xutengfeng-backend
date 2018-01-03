import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect, routerRedux } from 'dva/router';

import dynamic from 'dva/dynamic';
import App from './routes/app';

import IndexPage from './routes/IndexPage';

import Fasttest from './routes/Fasttest.js';

import Users from './routes/Users.js';

import Blog from '../src/components/Blog/Blog';
import BlogEdit from '../src/components/Blog/Edit';
import Life from '../src/components/Gallery/Life';
import GalleryList from '../src/components/Gallery/List';

// function RouterConfig({ history }) {
//   return (
//     <Router history={history}>
//       <Switch>
//         <Route path="/" exact component={IndexPage} />
//         <Route path="/fasttest" component={Fasttest} />
//         <Route path="/users" component={Users} />
//         <Route exact path="/blog" component={Blog} />
//         <Route path="/blog/article/edit/:id" component={BlogEdit} />
//         <Route path="/blog/article/create" component={BlogEdit} />
//         <Route path="/gallery/list" component={GalleryList} />
//         <Route path="/gallery/life" component={Life} />
//         {/* <Route path="/blog/article" component={BlogEdit} /> */}
//       </Switch>
//     </Router>
//   );
// }

// export default RouterConfig;
const { ConnectedRouter } = routerRedux;

const Routers = function ({ history, app }) {
  const error = dynamic({
    app,
    component: () => import('./routes/error'),
  });
  const routes = [
    // {
    //   path: '/dashboard',
    //   // models: () => [import('./models/dashboard')],
    //   component: () => import('./routes/Fasttest'),
    // },
    {
      path: '/crawler/ip',
      component: () => import('./routes/Crawler/IP'),
    },
    {
      path: '/user/settings',
      component: () => import('./routes/User/settings'),
    },
  ];

  return (
    <ConnectedRouter history={history}>
      <App>
        <Switch>
          {/* <Route exact path="/" render={() => (<Redirect to="/dashboard" />)} /> */}
          {
            routes.map(({ path, ...dynamics }, key) => (
              <Route
                key={key}
                exact
                path={path}
                component={dynamic({
                  app,
                  ...dynamics,
                })}
              />
            ))
          }
          <Route component={error} />
        </Switch>
      </App>
    </ConnectedRouter>
  );
};

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
};

export default Routers;

