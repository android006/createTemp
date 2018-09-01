import React, { Component } from 'react'
import QueueAnim from 'rc-queue-anim';

const style = {
  height: '2.3vh',
  lineHeight:'2.3vh',
  fontSize:'0.7vw',
  textAlign: 'center',
  position: 'absolute',
  color:'#444',
  zIndex: '99',
  fontWeight:'600'
};

class Block extends Component {

  render() {
    const { left,top ,unit,text} = this.props;
    let color = '#FFF';

    return (
      <QueueAnim>
        <div key="demo1" style={{ ...style, left,top,color}}>
          {text}
        </div>
      </QueueAnim>
    )
  }
}
export default Block;
