import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon, Popover } from 'antd';
import classnames from 'classnames';
import Menus from './Menu';
import styles from './Header.less';

const SubMenu = Menu.SubMenu;

function Header({ user,
  siderFold, switchSider,
  isNavbar, switchMenuPopover,
  logout,
  menuPopoverVisible,
  location,
  menu,
  navOpenKeys,
  changeOpenKeys,
  dispatch,
}) {
  const handleClickMenu = e => e.key === 'logout' && logout();
  const menusProps = {
    menu,
    dispatch,
    siderFold: false,
    darkTheme: false,
    isNavbar,
    handleClickNavMenu: switchMenuPopover,
    location,
    navOpenKeys,
    changeOpenKeys,
  };
  return (
    <div className={styles.header}>
      {isNavbar
        ? <Popover
          placement="bottomLeft"
          onVisibleChange={switchMenuPopover}
          visible={menuPopoverVisible}
          overlayClassName={styles.popovermenu}
          trigger="click"
          content={<Menus {...menusProps} />}
        >
          <div className={styles.button}>
            <Icon type="bars" />
          </div>
        </Popover>
        : <div
          className={styles.button}
          onClick={switchSider}
        >
          <Icon type={classnames({ 'menu-unfold': siderFold, 'menu-fold': !siderFold })} />
        </div>}
      <div className={styles.rightWarpper}>
        <div className={styles.button}>
          <Icon type="mail" />
        </div>
        <Menu mode="horizontal" onClick={handleClickMenu}>
          <SubMenu
            style={{
              float: 'right',
            }}
            title={<span>
              <Icon type="user" />
              {(user && user.username) || '徐腾峰'}
            </span>}
          >
            <Menu.Item key="logout">
              Sign out
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    </div>
  );
}

export default Header;
