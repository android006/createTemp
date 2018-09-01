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
  onInptChange = () => {};
  // 下拉选点击
  onSelChange = ()=>{};
  // 渲染节点
  renderItems = (itemNum) => {
    let t = this;
    let res = [];
    let {getFieldDecorator} = this.props.form;
    for(let index = 0; index < itemNum; index++) {
      res.push(
        [<Col key={'t'+index} span={24}>
          <div className={styles['wp-tab']}>
            <h1>条件{index+1}</h1>
            {
              t.props.delShow?<div className={styles.closs}><MyIcon type={'icon-x'}/></div>:null
            }
          </div>
        </Col>,
          <Col key={'i'+index} span={24}>
            <FormItem labelCol={{span: 6}} wrapperCol={{span: 18}} colon={false}  label={'名称'}>
              {
                getFieldDecorator('input'+index, {})(
                  <Input size="small" onChange={t.onInptChange}/>
                )
              }
            </FormItem>
          </Col>,
          <Col key={'s'+index} span={24}>
            <FormItem labelCol={{span: 6}} wrapperCol={{span: 18}} colon={false} label={'类别'}>
              {
                getFieldDecorator('select'+index, {})(
                  <Select size="small" showSearch onChange={t.onSelChange}>
                    <Select.Option value={'input'}>输入框</Select.Option>
                    <Select.Option value={'select'}>下拉选</Select.Option>
                    <Select.Option value={'datePicker'}>时间框</Select.Option>
                    <Select.Option value={'rangePicker'}>日期框</Select.Option>
                  </Select>
                )
              }
            </FormItem>
          </Col>]
      )
    }
    return res
  };
  render(){
    let t = this;
    let {itemNum} = t.props;
    return(
      <Form className={styles.myForm}>
        <Row gutter={12}>
          <QueueAnim className="demo-content" duration={500}>
            {this.renderItems(itemNum)}
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
