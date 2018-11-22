/**
 * Created by GYL on 2018/8/8
 */
import React, {Component} from 'react';
import {Row, Col} from 'antd';

class WarnList extends Component {
  state = {

  };
  componentDidMount(){

  };
  render(){
    let t = this;
    let {} = t.state;
    let { list } = t.props;
    return(
      <div style={{width: '100%'}}>
        <Row style={{background:'#146C99',padding:'9px 0'}}>
          <Col offset={2} span={10} style={{color: '#69FDFF',fontSize: 13}}>可能原因</Col>
          <Col span={12} style={{textAlign:'center',fontSize: 13,color: '#69FDFF'}}>过往次数</Col>
        </Row>
        {
          list.map((item, index) => {
            return(
              <Row key={index} style={{padding:'9px 0',borderBottom:'1px solid #146C99'}}>
                <Col offset={2} span={10} style={{color: '#69FDFF',fontSize: 13}}>{item.text}</Col>
                <Col span={12} style={{textAlign:'center',fontSize: 13,color: '#69FDFF'}}>{item.value}</Col>
              </Row>
            )
          })
        }
      </div>
    )
  }
}
export default WarnList;
