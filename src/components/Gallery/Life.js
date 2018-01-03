import React, { Component } from 'react';
import { connect } from 'dva';

import { Row, Col, Input, DatePicker, Button } from 'antd';
import moment from 'moment';
import lodash from 'lodash';

import styles from './Life.less';

//  导入基础布局
import MainLayout from '../MainLayout/MainLayout';

const { chunk } = lodash;

class Life extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    console.log('life-props', this.props);
    const photos = this.props.images;
    return (
      <MainLayout location={this.props.location}>
        <div className={styles.life}>
          {chunk(photos, 4).map((c, ci) => (
            <Row type="flex" key={ci}>
              {c.map((e, ei) => (
                <Col
                  key={ei}
                  span={6}
                  className={styles['life-photo-cell']}
                  style={{ backgroundImage: `url(${e.qiniu})` }}
                />
              ))}
            </Row>
          ))}
        </div>
      </MainLayout>
    );
  }
}

const mapStateToProps = (state) => {
  const { images } = state['gallery/image'];
  return {
    images,
  };
};

export default connect(mapStateToProps)(Life);
