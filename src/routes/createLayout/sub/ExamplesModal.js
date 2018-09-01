/**
 * Created by GYL on 2018/8/22
 */
import React, {Component} from 'react';
import styles from './filt.less';
import MyIcon from "../../../components/common/MyIcon";

class ExamplesModal extends Component {
  state = {

  };
  componentDidMount(){

  };
  render(){
    let t = this;
    let {} = t.state;
    return(
      <div className={styles.myModal}>
        <div className={styles.modalHeader}>
          <div>模态框</div>
          <div><MyIcon type={'icon-shanchu'} /></div>
        </div>
      </div>
    )
  }
}
export default ExamplesModal;
