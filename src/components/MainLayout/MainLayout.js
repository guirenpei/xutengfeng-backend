import React, { Component } from 'react';

import { Layout, Icon } from 'antd';
import styles from './MainLayout.less';

import SiderBar from '../Common/Sider';

const { Header, Sider, Content } = Layout;

class MainLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    let openKey = this.props.location.pathname;
    openKey = (openKey || '').match(/\/([a-z]+)\//) ? openKey.match(/\/([a-z]+)\//)[1] : ['blog'];
    return (
      <Layout className={styles.normal}>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="logo" />
          <SiderBar location={this.props.location} openKey={openKey} />
        </Sider>
        <Layout className={styles.content}>
          <Header style={{ background: '#fff', padding: '0 16px' }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff' }}>
            {this.props.children}
          </Content>
        </Layout>
        {/* <div className={styles.content}>
          <div className={styles.main}>
            {children}
          </div>
        </div> */}
      </Layout>
    );
  }
}

export default MainLayout;
