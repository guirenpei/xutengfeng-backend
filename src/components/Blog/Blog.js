import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Table, Popconfirm, Icon, Pagination } from 'antd';

import moment from 'moment';
import querystring from 'querystring';

import { PAGE_SIZE } from '../../constants';
import MainLayout from '../MainLayout/MainLayout';


// import styles from './Blog.less';

class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  deleteHandler = (id) => {
    console.log(id);
  }

  editHandler = (record) => {
    console.log('record', record);
    this.props.dispatch(routerRedux.push({
      pathname: `/blog/article/edit/${record.id}`,
    }));
  }

  pageChangeHandler = (page) => {
    // console.log('change-page', page);
    this.props.dispatch(routerRedux.push({
      pathname: '/blog',
      search: querystring.stringify({ page }),
    }));
  }

  render() {
    const columns = [
      { title: '作者', dataIndex: 'author', key: 'author' },
      { title: '时间', dataIndex: 'time', key: 'time' },
      { title: '标题', dataIndex: 'title', key: 'title' },
      {
        title: '操作',
        dataIndex: '',
        key: 'x',
        render: (text, record) => {
          return (
            <span>
              <Icon onClick={() => this.editHandler(record)} style={{ cursor: 'pointer', color: '#00008b' }} type="edit" />
              <span className="ant-divider" />
              <Popconfirm title="Confirm to delete?" onConfirm={() => this.deleteHandler(record.id)}>
                <Icon style={{ cursor: 'pointer', color: '#ff1493' }} type="delete" />
              </Popconfirm>
            </span>
          );
        },
      },
    ];
    const dataSource = (this.props.articles || []).map((article, index) => {
      const pauseData = article;
      pauseData.time = moment(pauseData.time).format('YYYY-MM-DD');
      pauseData.key = index + 1;
      pauseData.author = 'guirenpei';
      return pauseData;
    });
    // console.log('dataSource', dataSource);
    return (
      <MainLayout location={this.props.location}>
        <Table
          columns={columns}
          expandedRowRender={record => <p>{record.content}</p>}
          dataSource={dataSource}
          pagination={false}
        />
        <Pagination
          className="ant-table-pagination"
          total={Number(this.props.total)}
          current={Number(this.props.page)}
          pageSize={PAGE_SIZE}
          onChange={e => this.pageChangeHandler(e)}
        />
      </MainLayout>
    );
  }
}
function mapStateToProps(state) {
  // console.log('state.users', state.users);
  const { articles, total, page } = state['blog/article'];
  return {
    articles,
    total,
    page,
  };
}

export default connect(mapStateToProps)(Blog);
