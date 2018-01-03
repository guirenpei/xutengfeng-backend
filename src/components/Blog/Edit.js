import React, { Component } from 'react';
import { connect } from 'dva';

import { Row, Col, Input, DatePicker, Button } from 'antd';
import moment from 'moment';

import styles from './Edit.less';

import MainLayout from '../MainLayout/MainLayout';

const { TextArea } = Input;

class BlogEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      author: '',
      time: Date.now(),
      type: '',
      content: '',
      source: '',
      loading: true,
    };
  }
  componentWillReceiveProps(nextProps) {
    const { article, editLoading } = nextProps;
    console.log('this.props.location-create', this.props.location);
    if (this.props.location.pathname !== '/blog/article/create') {
      this.setState({
        title: article.title,
        author: article.author,
        type: article.type,
        time: article.time,
        content: article.content,
        source: article.source,
        loading: editLoading,
      });
    } else {
      console.log('this.props.location-create', this.props.location);
      this.setState({
        title: '',
        author: '',
        time: Date.now(),
        type: '',
        content: '',
        source: '',
        loading: true,
      });
    }
  }


  onChangeTitle = (e) => {
    this.setState({ title: e.target.value });
  }
  onChangeAuthor = (e) => {
    this.setState({ author: e.target.value });
  }

  onChangeTime = (e) => {
    // console.log('e-time', );
    this.setState({ time: new Date(moment(e).format()) });
  }

  onChangeType = (e) => {
    this.setState({ type: e.target.value });
  }

  onChangeContent = (e) => {
    this.setState({ content: e.target.value });
  }

  onChangeSource = (e) => {
    this.setState({ source: e.target.value });
  }

  onEditArticle = async (id) => {
    const article = {};
    article.id = id;
    article.title = this.state.title;
    // article.author = this.state.author;
    article.type = this.state.type;
    article.time = this.state.time;
    article.content = this.state.content;
    article.source = this.state.source;
    this.setState({ loading: false });
    await this.props.dispatch({
      type: 'blog/article/updateArticle',
      payload: article,
    });
  }

  render() {
    const { title, author, type, time, content, source } = this.state;
    console.log({ title, author, type, time, content, source });
    return (
      <MainLayout location={this.props.location}>
        <div className={styles.edit}>
          <Row className={styles['edit-article']}>
            <Col sm={12}>
              <Row gutter={16} type="flex" justify="space-around" align="middle">
                <Col sm={4}><label htmlFor="title">博客标题:</label></Col>
                <Col sm={16} pull={3}>
                  <Input
                    id="title"
                    value={title}
                    onChange={this.onChangeTitle}
                    ref={node => (this.titleInput = node)}
                  />
                </Col>
              </Row>
            </Col>
            <Col sm={12}>
              <Row gutter={16} type="flex" justify="space-around" align="middle">
                <Col sm={4}><label htmlFor="author">作者:</label></Col>
                <Col sm={16} pull={3}>
                  <Input
                    id="author"
                    value={author}
                    onChange={this.onChangeAuthor}
                    ref={node => (this.authorInput = node)}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className={styles['edit-article']}>
            <Col sm={12}>
              <Row gutter={16} type="flex" justify="space-around" align="middle">
                <Col sm={4}><label htmlFor="type">类型:</label></Col>
                <Col sm={16} pull={3}>
                  <Input
                    id="type"
                    value={type}
                    onChange={this.onChangeType}
                    ref={node => (this.typeInput = node)}
                  />
                </Col>
              </Row>
            </Col>
            <Col sm={12}>
              <Row gutter={16} type="flex" justify="space-around" align="middle">
                <Col sm={4}><label htmlFor="time">时间:</label></Col>
                <Col sm={16} pull={3}>
                  <DatePicker
                    id="time"
                    defaultValue={moment(Date.now())}
                    value={moment(time)}
                    onChange={this.onChangeTime}
                    ref={node => (this.timeInput = node)}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className={styles['edit-article']}>
            <Col sm={12}>
              <Row gutter={16} type="flex" justify="space-around" align="middle">
                <Col sm={4}><label htmlFor="content">内容:</label></Col>
                <Col sm={16} pull={3}>
                  <TextArea
                    id="content"
                    value={content}
                    onChange={this.onChangeContent}
                    placeholder="Autosize height with minimum and maximum number of lines"
                    autosize={{ minRows: 12, maxRows: 20 }}
                  />
                </Col>
              </Row>
            </Col>
            <Col sm={12}>
              <Row gutter={16} type="flex" justify="space-around" align="middle">
                <Col sm={4}><label htmlFor="source">源码:</label></Col>
                <Col sm={16} pull={3}>
                  <TextArea
                    id="source"
                    value={source}
                    onChange={this.onChangeSource}
                    placeholder="Autosize height with minimum and maximum number of lines"
                    autosize={{ minRows: 12, maxRows: 20 }}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Button type="primary" loading={!this.state.loading} onClick={() => this.onEditArticle(this.props.article.id)}>提交</Button>
        </div>
      </MainLayout>
    );
  }
}

const mapStateToProps = (state) => {
  const { article, editLoading } = state['blog/article'];
  return {
    article,
    editLoading,
  };
};

export default connect(mapStateToProps)(BlogEdit);
