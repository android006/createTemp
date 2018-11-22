import React, { Component } from 'react'
import QueueAnim from 'rc-queue-anim';
import styles from './sub.less';
import MyIcon from "../../../components/common/MyIcon";

const style = {
  height: '2.3vh',
  lineHeight:'2.3vh',
  fontSize:'0.7vw',
  textAlign: 'center',
  position: 'absolute',
  color:'#444',
  zIndex: '99',
  fontWeight:'600',
  cursor:'pointer',
  background:'rgba(0,0,0,.3)',
  padding:'0 2px'
};

class Block extends Component {

  onTempItem = (id) => {
    this.props.onTempItem(id)
  };
  render() {
    let t = this;
    const { left, top, type, text, color, id,isAlarm, isAlarmAct, name } = this.props;
    let textColor = isAlarm?"#ff0c00":'#FFF';
    return (
      <QueueAnim>
        <div className={isAlarm?styles.isAlarmAct:null} title={`${name?name+': ':''}${type}`} key="demo1" style={{ ...style, left,top,color:textColor}} onClick={t.onTempItem.bind(t,type)}>
          {
            isAlarm &&
            <MyIcon type={'icon-baojing1'} style={{fontSize:18}}/>
          }
          {text}
        </div>
      </QueueAnim>
    )
  }
}
export default Block;
