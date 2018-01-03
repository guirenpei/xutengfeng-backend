import React from 'react';
import { connect } from 'dva';
import styles from './Fasttest.less';

function Fasttest({ count, dispatch }) {
  return (
    <div className={styles.normal}>
      <div className={styles.record}>Highest Record: {count.record}</div>
      <div className={styles.current}>{count.current}</div>
      <div className={styles.button}>
        <button onClick={() => { dispatch({ type: 'test/fasttest/add' }); }}>+</button>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const count = state['test/fasttest'] || {};
  return {
    count,
  };
}

export default connect(mapStateToProps)(Fasttest);
