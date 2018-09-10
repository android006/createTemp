/**
 * Created by GYL on 2018/8/22
 */
import React, {Component} from 'react';
import {connect} from 'dva';
import moment from 'moment';
import QueueAnim from 'rc-queue-anim';
import {Form, Row, Col, Select, Input, message, Tabs, Checkbox,DatePicker,Radio,Button } from 'antd';
import styles from './filt.less';
import MyIcon from "../../../components/common/MyIcon";
const FormItem = Form.Item;
const { TextArea } = Input;

class MyFormItem extends Component {
  state = {

  };
  componentDidMount(){

  };
  // 输入框
  onInputChange = (index,e) => {
    let value = e.target.value;
    this.props.onInputChange(value,index)
  };
  // 下拉选点击
  onSelChange = (index,val)=>{
    this.props.onSelChange(val,index)
  };
  render(){
    let t = this;
    let {itemLists} = t.props;
    let {getFieldDecorator} = this.props.form;
    return(
      <Form className={styles.myForm}>
        <Row gutter={12}>
          <QueueAnim className="demo-content" duration={500}>
            {
              itemLists.map((item, index) => {
                return(
                  [<Col key={'t'+index} span={24}>
                    <div className={styles['wp-tab']}>
                      <h1>条件{index+1}</h1>
                      {
                        t.props.delShow?<div className={styles.close} onClick={this.props.onDelete.bind(t,index)}><MyIcon type={'icon-x'}/></div>:null
                      }
                    </div>
                  </Col>,
                    <Col key={'i'+index} span={24}>
                      <div className={styles.item}>
                        <span className={styles.label}>名称</span>
                        <Input size="small" value={item.label} onChange={t.onInputChange.bind(t,index)}/>
                      </div>
                    </Col>,
                    <Col key={'s'+index} span={24}>
                      <div className={styles.item}>
                        <span className={styles.label}>类别</span>
                        <Select size="small" value={item.type} showSearch onChange={t.onSelChange.bind(t,index)}>
                          <Select.Option value={'input'}>输入框</Select.Option>
                          <Select.Option value={'select'}>下拉选</Select.Option>
                          <Select.Option value={'datePicker'}>时间框</Select.Option>
                          <Select.Option value={'rangePicker'}>日期框</Select.Option>
                        </Select>
                      </div>
                    </Col>]
                )
              })
            }
          </QueueAnim>
        </Row>
      </Form>
    )
  }
}
function mapStateToProps(state) {
  return {};
}
export default connect(mapStateToProps)(Form.create()(MyFormItem));
