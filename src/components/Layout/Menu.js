import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon } from 'antd';
import { routerRedux } from 'dva/router';
import pathToRegexp from 'path-to-regexp';

import { arrayToTree, queryArray } from '../../utils';

const SubMenu = Menu.SubMenu;

const Menus = ({ siderFold, navOpenKeys, changeOpenKeys, location, dispatch }) => {
  const openKeys = navOpenKeys;
  const rootSubmenuKeys = ['crawler', 'user'];
  const onOpenChange = (openedKeys) => {
    const latestOpenKey = openedKeys.find(key => navOpenKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      changeOpenKeys(openedKeys);
    } else {
      changeOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  const handleClick = (e) => {
    dispatch(routerRedux.push({
      pathname: e.key,
    }));
  };
  return (
    <Menu
      mode="inline"
      selectedKeys={[location.pathname]}
      onClick={handleClick}
      openKeys={openKeys}
      onOpenChange={onOpenChange}
    >
      <SubMenu key="crawler" title={<span><Icon type="mail" /><span>爬虫管理</span></span>}>
        <Menu.Item key="/crawler/ip">IP管理</Menu.Item>
      </SubMenu>
      <SubMenu key="user" title={<span><Icon type="setting" /><span>用户管理</span></span>}>
        <Menu.Item key="/user/settings">设置</Menu.Item>
      </SubMenu>
    </Menu>
  );
};

export default Menus;
