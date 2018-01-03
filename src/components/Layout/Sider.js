import React from 'react';
import { Layout } from 'antd';
import Menus from './Menu';
import styles from './Layout.less';

const { Sider } = Layout;

function SiderBar({ siderFold, location, navOpenKeys, changeOpenKeys }) {
  const menusProps = {
    siderFold,
    location,
    navOpenKeys,
    changeOpenKeys,
  };
  return (
    <Sider
      style={{ background: '#fff' }}
      trigger={null}
      collapsible
    >
      <div className={styles.logo} />
      {/* <SiderBar location={this.props.location} openKey={openKey} /> */}
      <Menus {...menusProps} />
    </Sider>
  );
}

export default SiderBar;
