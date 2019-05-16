/**
 * Created by GYL on  Description: 测试
 */
import React, { Component, PropTypes } from 'react';
class Test extends Component {
  static propTypes = {
    name: PropTypes.string,
    age: PropTypes.number.isRequired
  }

  static defaultProps = {
    name: 'gao',
    list: []
  }

  render(){
    let t = this;
    let { name, age } = t.props;
    return(
     <div>
       {name}
       {age}
      </div>
    )
  }
}
export default Test;
