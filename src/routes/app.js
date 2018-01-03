import React from 'react';
import PropTypes from 'prop-types';
import pathToRegexp from 'path-to-regexp';
import { connect } from 'dva';
import { BackTop, Layout, Icon } from 'antd';
import { withRouter } from 'dva/router';
import { classnames, config } from '../utils';

import * as component from '../components';
import Error from './error';

const { prefix } = config;
const { Content, Sider } = Layout;

const { Header, SiderBar, Footer, styles, Menus } = component.Layout;

const App = ({
  children, dispatch, app,
  loading, location,
}) => {
  console.log({ app });
  const { user, siderFold, isNavbar, menuPopoverVisible, navOpenKeys, menu, permissions } = app;
  const hasPermission = true;
  const headerProps = {
    dispatch,
    menu,
    user,
    location,
    siderFold,
    isNavbar,
    menuPopoverVisible,
    navOpenKeys,
    switchMenuPopover() {
      dispatch({ type: 'app/switchMenuPopver' });
    },
    logout() {
      dispatch({ type: 'app/logout' });
    },
    switchSider() {
      dispatch({ type: 'app/switchSider' });
    },
    changeOpenKeys(openKeys) {
      dispatch({ type: 'app/handleNavOpenKeys', payload: { navOpenKeys: openKeys } });
    },
  };
  const menusProps = {
    location,
    siderFold,
    navOpenKeys,
    dispatch,
    changeTheme() {
      dispatch({ type: 'app/switchTheme' });
    },
    changeOpenKeys(openKeys) {
      window.localStorage.setItem(`${prefix}navOpenKeys`, JSON.stringify(openKeys));
      dispatch({ type: 'app/handleNavOpenKeys', payload: { navOpenKeys: openKeys } });
    },
  };
  return (
    <Layout>
      {!isNavbar ? <Sider
        style={{ background: '#fff' }}
        trigger={null}
        collapsible
        collapsed={siderFold}
      >
        <div className={styles.logo} />
        {/* <SiderBar location={this.props.location} openKey={openKey} /> */}
        <Menus {...menusProps} />
      </Sider> : ''}
      <Layout>
        <div className={styles.main} id="mainContainer">
          <Header {...headerProps} />
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            <BackTop target={() => document.getElementById('mainContainer')} />
            <div className={styles.container}>
              <div className={styles.content}>
                {hasPermission ? children : <Error />}
              </div>
            </div>
            <Footer />
          </Content>
        </div>
      </Layout>
    </Layout>
  );
};

export default withRouter(connect(({ app }) => ({ app }))(App));

