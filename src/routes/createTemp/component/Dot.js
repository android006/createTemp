import React, { Component } from 'react'
import QueueAnim from 'rc-queue-anim';

const style = {
  width: '1vw',
  height: '2vh',
  boxShadow:'0 0 5px rgba(147,190,212,1)',
  borderRadius: '50%',
  position: 'absolute',
  zIndex: '2',
};

export default class Dot extends Component {

  render() {
    const { left, top, local } = this.props;
    const run = this.props.run || '';
    const text = this.props.text || '';
    const background = this.props.background ? this.props.background: '#678da4';
    const color = background;

    return (
      <QueueAnim>
        <div key="demo1" style={{ ...style, left,top,background}}>
          {text}
          {
            run &&
            <div style={{marginLeft:'1.5vw',fontSize:'0.8vw',color,width:'120px'}}>{run}</div>
          }
          {
            local &&
            <div style={{marginLeft:'1.5vw',marginTop:'0.2vh',color:'#444',width:'100px'}}>本地</div>
          }
        </div>

      </QueueAnim>
    )
  }
}
