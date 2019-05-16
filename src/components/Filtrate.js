/**
 * 表格上方筛选条件
 * input 输入框, select 下拉选, rangePicker 时间筛选框
 */
import {Form, Input, Select, Button, DatePicker, TreeSelect, Upload, Icon, message} from 'antd';
import React, {Component} from 'react';
import moment from 'moment';
import config from '../../src/config';
import Util from '../utils/Util';
import styles from './Filtrate.less';

const {RangePicker, MonthPicker} = DatePicker;
const FormItem = Form.Item;

function disabledDate(current) {
  // 当天以后时间禁选,组件传值   disabledDate:true
  return current && current.valueOf() > Date.now();
}

class Filtrate extends Component {
  state = {
    startValue: null,
    endValue: null,
    endOpen: false,
  };

  componentDidMount() {
    let t = this;
    t.setState({
      params: t.props.form.getFieldsValue()
    });
  }

  submit() {
    let t = this;
    // Form 组件参数
    let params = t.props.form.getFieldsValue();
    let {submit} = t.props;
    submit(params);
  }

  // 清空 Form 组件输入的内容
  clearForm() {
    let t = this;
    if (t.props.isMyClear === true) {
      let {myClearBtn} = t.props;
      myClearBtn()
      t.props.form.resetFields();
    } else {
      t.props.form.resetFields();
    }

  }

  // 额外按钮点击事件
  extraBtnClick(btnIndex) {
    let t = this;
    let funNameStr = t.props.extraBtn[btnIndex].funName;
    t.props[funNameStr]();
  }

  selectedChange(fun, nextParams, paramName, value) {
    let t = this;
    let params = {};
    params[paramName] = value;
    if (paramName) {
      t.setState({params}, () => {
        console.log(t.state, 'state')
      });
    }
    if (typeof fun === "function") {
      fun(value);
      if (nextParams)
        t.props.form.setFieldsValue({
          [nextParams]: ''
        })
    }
  }

  // 筛选条件组件change事件
  getChangeValue(value, e) {
    let t = this;
    let params = {};
    params[value] = e.target.value;
    t.setState({params});
  }

  onChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  };

  onStartChange = (value) => {
    this.onChange('startValue', value);
  };

  onEndChange = (value) => {
    this.onChange('endValue', value);
  };
  handleStartOpenChange = (open) => {
    if (!open) {
      this.setState({endOpen: true});
    }
  };

  handleEndOpenChange = (open) => {
    this.setState({endOpen: open});
  };
  disabledStartDate = (startValue) => {
    const endValue = this.state.endValue;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  };

  disabledEndDate = (endValue) => {
    const startValue = this.state.startValue;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  };

  render() {
    let t = this;
    let {items} = t.props;
    let extraBtn = t.props.extraBtn || [];
    let {getFieldDecorator} = t.props.form;
    const formItemLayout = {
      labelCol: {span: 8},
      wrapperCol: {span: 14},
    };
    // 是否显示清空按钮 默认显示
    let clearBtnShow = true;
    if (t.props.clearBtn === 'hide') {
      clearBtnShow = false;
    };


    return (
      <div className={styles.base}>
        <Form layout="inline" key="myForm">
          {
            items.map((item, index) => {
              if (item.type === 'input') {
                return (<FormItem label={item.label} key={index}>
                  {
                    getFieldDecorator(item.paramName, {
                      initialValue: item.initialValue ? item.initialValue : '',
                      rules: item.rules || null
                    })(
                      <Input onChange={t.getChangeValue.bind(t, item.paramName)} size={config.size}
                             placeholder={item.placeholder}/>
                    )
                  }
                </FormItem>)
              } else if (item.type === 'select') {
                return (<FormItem label={item.label} key={index}>
                  {
                    getFieldDecorator(item.paramName, {
                      initialValue: item.initialValue ? item.initialValue : (item.options[0] ? Util.numToString(item.options[0].value) : item.options[0]),
                    })(
                      <Select
                        size={config.size}
                        showSearch
                        mode={item.mode}
                        style={item.style ? {width: '200px'} : {}}
                        optionFilterProp="children"
                        dropdownMatchSelectWidth={t.props.dropdownMatchSelectWidth}
                        onChange={t.selectedChange.bind(t, item.selectChange, item.nextParamName || false, item.paramName)}
                      >
                        {
                          item.options.map(option => {
                            return (
                              <Select.Option key={option.value}
                                             value={Util.numToString(option.value)}
                              >
                                {option.text}
                              </Select.Option>

                            )
                          })
                        }
                      </Select>
                    )
                  }
                </FormItem>)
              } else if (item.type === 'rangePicker') {

                let disabled = item.disabledDate ? disabledDate : null;

                return (<FormItem className={styles.dateTimePicker} label={item.label}
                                  key={index}>
                  {
                    getFieldDecorator(item.paramName, {
                      initialValue: [moment().add(-1, 'months'), moment()]
                    })(
                      <RangePicker
                        showTime={item.showTime}
                        format={item.format}
                        size={config.size} disabledDate={disabled}>
                      </RangePicker>
                    )
                  }
                </FormItem>)
              } else if (item.type === 'datePicker') {
                let disabled = item.disabledDate ? disabledDate : null;
                return (<FormItem className={styles.datePicker} label={item.label}
                                  key={index}>
                  {
                    getFieldDecorator(item.paramName, {
                      initialValue: item.initialValue ? item.initialValue : moment()
                    })(
                      <DatePicker size={config.size} disabledDate={disabled}/>
                    )
                  }
                </FormItem>)
              } else if (item.type === 'monthPicker') {
                return (<FormItem label={item.label}
                                  key={index}>
                  {
                    getFieldDecorator(item.paramName, {
                      initialValue: item.initialValue ? item.initialValue : moment()
                    })(
                      <MonthPicker
                        size={config.size}
                        onChange={t.selectedChange.bind(t, item.selectChange)}
                      />
                    )
                  }
                </FormItem>)
              } else if (item.type === 'treeSelect') {
                return (<FormItem className={styles.myTreeSelect} label={item.label} key={index}>
                  {
                    getFieldDecorator(item.paramName, {
                      initialValue: item.initialValue || null
                    })(
                      <TreeSelect
                        style={{width: 300}}
                        dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                        treeData={item.treeData}
                        placeholder="请选择"
                        onSelect={item.onSelect}
                      />
                    )
                  }
                </FormItem>)
              } else if (item.type === 'monthRang') {
                return (
                  <FormItem label={item.label}
                            key={index}>
                    {
                      getFieldDecorator(item.paramName, {
                        initialValue: item.initialValue || moment().add(-1, 'months')
                      })(
                        <MonthPicker
                          allowClear={false}
                          format="YYYY-MM"
                          disabledDate={this.disabledStartDate}
                          value={this.state.startValue}
                          onChange={this.onStartChange.bind(this)}
                          onOpenChange={this.handleStartOpenChange.bind(this)}
                          size={config.size}>
                        </MonthPicker>
                      )
                    }
                    {
                      getFieldDecorator(item.paramName2, {
                        initialValue: item.initialValue || moment()
                      })(
                        <MonthPicker
                          format="YYYY-MM"
                          disabledDate={this.disabledEndDate}
                          onChange={this.onEndChange.bind(this)}
                          open={this.state.endOpen}
                          value={this.state.endValue}
                          onOpenChange={this.handleEndOpenChange.bind(this)}
                          size={config.size}>
                        </MonthPicker>
                      )
                    }
                  </FormItem>
                )
              } else if (item.type === 'selectMultiple') {
                return (<FormItem label={item.label} key={index}>
                  {
                    getFieldDecorator(item.paramName, {
                      initialValue: [],
                    })(
                      <Select
                        size={config.size}
                        showSearch
                        mode="multiple"

                        optionFilterProp="children"
                      >
                        {
                          item.options.map(option => {
                            return (
                              <Select.Option key={option.value}
                                             value={Util.numToString(option.value)}
                              >
                                {option.text}
                              </Select.Option>

                            )
                          })
                        }
                      </Select>
                    )
                  }
                </FormItem>)
              }

            })
          }
          <FormItem>
            {
              t.props.submit &&
              <Button size={config.size}
                      style={{marginLeft: -10}}
                      type="primary"
                      onClick={t.submit.bind(t)}
                      className={styles.button}
              >
                查询
              </Button>
            }

            {
              clearBtnShow &&
              <Button size={config.size}
                      style={{marginLeft: 20}}
                      type="primary"
                      className={styles.button}
                      onClick={t.clearForm.bind(t)}
              >
                重置
              </Button>
            }
          </FormItem>
          {
            extraBtn.map((btn, btnIndex) => {
              return (
                <FormItem key={btnIndex}>
                  <Button size={config.size}
                          type="primary"
                          onClick={t.extraBtnClick.bind(t, btnIndex, btn.funName)}
                  >
                    {btn.name}
                  </Button>
                </FormItem>
              )
            })
          }
          {
            t.props.children
          }
        </Form>
      </div>
    )
  }
}

export default Form.create()(Filtrate);
