import React, { Component } from 'react'
import QueueAnim from 'rc-queue-anim';

const style = {
  position: 'absolute',
  fontSize:'14px',
  zIndex: '2',
  color:'#fa4c4b'
};

export default class Dot extends Component {

  render() {
    const { left, top,} = this.props;
    const text = this.props.text ? parseFloat(this.props.text).toFixed(1) + '°' : '';

    return (
      <QueueAnim>
        <div key="demo1" style={{ ...style, left,top,}}>
          {text}
        </div>
      </QueueAnim>
    )
  }
}
