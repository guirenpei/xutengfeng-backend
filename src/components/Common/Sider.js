import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Menu, Icon } from 'antd';

// import styles from './Sider.less';

const SubMenu = Menu.SubMenu;
// const MenuItemGroup = Menu.ItemGroup;

class SiderBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rootSubmenuKeys: ['blog', 'gallery'],
      openKeys: [props.openKey],
    };
  }
  onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  }
  handleClick = (e) => {
    const { dispatch } = this.props;
    dispatch(routerRedux.push({
      pathname: e.key,
      // search: queryString.stringify({  }),
    }));
  }
  render() {
    const location = this.props.location;
    return (
      <Menu
        theme="dark"
        selectedKeys={[location.pathname]}
        onClick={this.handleClick}
        defaultSelectedKeys={['/blog']}
        onOpenChange={this.onOpenChange}
        openKeys={this.state.openKeys}
        mode="inline"
      >
        <SubMenu key="blog" title={<span><Icon type="book" /><span>博客</span></span>}>
          <Menu.Item key="/blog">博客概览</Menu.Item>
          <Menu.Item key="/blog/article/create">新增博客</Menu.Item>
          {/* <MenuItemGroup key="g2" title="Item 2">
            <Menu.Item key="3">新增博客</Menu.Item>
            <Menu.Item key="4">查看博客</Menu.Item>
          </MenuItemGroup> */}
        </SubMenu>
        <SubMenu key="gallery" title={<span><Icon type="picture" /><span>图片</span></span>}>
          <Menu.Item key="/gallery/list">图片概览</Menu.Item>
          <Menu.Item key="/gallery/life">图片编辑</Menu.Item>
          {/* <SubMenu key="sub3" title="来源设置">
            <Menu.Item key="7">七牛</Menu.Item>
            <Menu.Item key="8">阿里云</Menu.Item>
          </SubMenu> */}
        </SubMenu>
        <SubMenu key="sub4" title={<span><Icon type="setting" /><span>设置</span></span>}>
          <Menu.Item key="9">个人信息</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
          <Menu.Item key="11">Option 11</Menu.Item>
          <Menu.Item key="12">Option 12</Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}

export default connect()(SiderBar);
