import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Table, Popconfirm, Icon, Pagination } from 'antd';
import querystring from 'querystring';

import styles from './List.less';

import { PAGE_SIZE } from '../../constants';
import MainLayout from '../MainLayout/MainLayout';


class GalleryList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  deleteHandler = (id) => {
    console.log(id);
  }

  pageChangeHandler = (page) => {
    // console.log('change-page', page);
    this.props.dispatch(routerRedux.push({
      pathname: '/gallery/list',
      search: querystring.stringify({ page }),
    }));
  }

  render() {
    const columns = [
      { title: '序号', dataIndex: 'id', key: 'id' },
      { title: '标题',
        dataIndex: 'title',
        key: 'title',
        render: (text, record) => {
          return (
            <Link to={`/gallery/life?id=${record.id}`} >{text}</Link>
          );
        },
      },
      { title: '类型', dataIndex: 'type', key: 'type' },
      { title: '分类', dataIndex: 'category', key: 'category' },
      {
        title: '操作',
        dataIndex: '',
        key: 'x',
        render: (text, record) => {
          return (
            <span>
              <Popconfirm title="Confirm to delete?" onConfirm={() => this.deleteHandler(record.id)}>
                <Icon style={{ cursor: 'pointer', color: '#ff1493' }} type="delete" />
              </Popconfirm>
            </span>
          );
        },
      },
    ];
    let dataSource = this.props.list || [];
    dataSource = dataSource.map((image, index) => {
      const pauseData = image;
      pauseData.key = index + 1;
      return pauseData;
    });
    const page = Number(this.props.page || 1);
    const total = Number(this.props.total);
    return (
      <MainLayout location={this.props.location} >
        <Table
          columns={columns}
          /* expandedRowRender={record => <p>{record.content}</p>} */
          dataSource={dataSource}
          pagination={false}
        />
        <Pagination
          showQuickJumper
          className="ant-table-pagination"
          total={total}
          current={page || 1}
          pageSize={PAGE_SIZE}
          onChange={e => this.pageChangeHandler(e)}
        />
      </MainLayout>
    );
  }
}

const mapStateToProps = (state) => {
  const { list, total, page } = state['gallery/image'];
  return ({
    list, total, page,
  });
};

export default connect(mapStateToProps)(GalleryList);
