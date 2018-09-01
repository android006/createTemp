/***
 * table组件 定制了表头样式
 */
import React, {Component}from 'react';
import {Table} from 'antd';
import styles from './MyTable.less';
import config from '../../../config';

class MyTable extends Component {

  componentDidMount () {

  }
  // 遮罩点击
  onMask = () => {
    this.props.onMask("Table")
  };
  render () {
    let size = this.props.size || 'middle';
    if (this.props.columns && this.props.columns.length !== 0) {
      for (let i = 0; i < this.props.columns.length; i++) {
        this.props.columns[i].className =
          this.props.columns[i].className ? this.props.columns[i].className + ' wpColumn' : 'wpColumn';
      }
    } else {
      console.log('MyTable: columns 值为 ' + this.props.columns)
    }
    return (
      <div className={styles.myTable}>
        <div className={styles.tableMask} onClick={this.onMask} />
        <Table  {...this.props} size={size}/>
      </div>
    )
  }
}

export default MyTable;
