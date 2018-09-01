/**
 * Created by wadeforever on 2017/5/25.
 */
import React, {Component} from 'react';

export default class MyIcon extends Component {
  render () {
    let t = this;
    let {type, text, style, onClick, className, fontStyle} = t.props;
    return (
      <i onClick={onClick} className={`iconfont ${className} ` + type} style={style}>
        <span style={fontStyle}>{text}</span>
      </i>
    )
  }
}
