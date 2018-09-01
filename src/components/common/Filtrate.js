/**
 * 表格上方筛选条件
 * input 输入框, select 下拉选, rangePicker 时间筛选框
 */
import {Form, Input, Select, Button, DatePicker, Cascader,Dropdown, Upload, Menu, message,} from 'antd';
import React, {Component} from 'react';
import MyIcon from './MyIcon';
import moment from 'moment';
import config from '../../../config';
import Util from '../../utils/Util';
import styles from './Filtrate.less';
const {RangePicker, MonthPicker} = DatePicker;
const FormItem = Form.Item;

function disabledDate (current) {
  // 当天以后时间禁选,组件传值   disabledDate:true
  return current && current.valueOf() > Date.now();
}

class Filtrate extends Component {
  state = {
    startValue: null,
    endValue: null,
    endOpen: false,
    checkBtnItems: this.props.checkBtnConfig ? this.props.checkBtnConfig.items : []
  };

  componentDidMount () {
    let t = this;
    t.setState({
      params: t.props.form.getFieldsValue()
    });
  }

  submit () {
    let t = this;
    // Form 组件参数
    let params = t.props.form.getFieldsValue();
    let {submit} = t.props;
    submit(params);
  }

  // 清空 Form 组件输入的内容
  clearForm () {
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
  extraBtnClick (btnIndex) {
    let t = this;
    let funNameStr = t.props.extraBtn[btnIndex].funName;
    t.props[funNameStr]();
  }

  selectedChange (fun, nextParams, paramName, value) {
    let t = this;
    let params = {};
    params[paramName] = value;
    if (paramName) {
      t.setState({params});
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
  getChangeValue (value, e) {
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

  // 设置修改默认时间
  setRangerTime = (paramName, date) => this.props.form.setFieldsValue({[paramName]: date});
  // 遮罩点击
  onMask = () => {
    this.props.onMask("Filtrate")
  };
  render () {
    let t = this;
    let {items} = t.props;
    let {checkBtnItems} = this.state;
    let extraBtn = t.props.extraBtn || [];
    let {getFieldDecorator} = t.props.form;
    let url = t.props.importBtnUrl;
    // 是否显示清空按钮 默认显示
    let clearBtnShow = true;
    if (t.props.clearBtn === 'hide') {
      clearBtnShow = false;
    }
    const uploadProps = {
      name: 'file',
      data:t.props.importData,
      action: url,
      showUploadList: false,
      accept: '.xls, .xlsx',
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} 上传成功`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} 上传失败`);
        }
      },
      onSuccess(info) {
        console.log(info, "onSuccess");
        if (info.rc !== 0) {
          message.error(info.err);
        } else {
          message.success('文件上传成功');
          t.props.uploadSuccess(info.ret);
        }
      }
    };
    const menuImport = (
      <Menu>
        <Menu.Item key="0" style={{textAlign: 'center'}}>
          <Upload {...uploadProps}>
            <span>导入</span>
          </Upload>
        </Menu.Item>
        {t.props.templateBtnShow &&
        <Menu.Item key="1">
          {
            t.props.templateBtnShow &&
            <span>
              <span className={styles.exportLine}> </span>
              <span><a href={t.props.templateUrl}
                       style={{color: '#6b6b6b'}}>下载模板</a>
              </span>
            </span>
          }
        </Menu.Item>}
      </Menu>
    );
    return (
      <div className={styles.base} style={this.props.style}>
        <div className={styles.fliMask} onClick={t.onMask}/>
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
                             placeholder={item.placeholder || '请输入'}/>
                    )
                  }
                </FormItem>)
              } else if (item.type === 'Cascader') {
                return (<FormItem label={item.label} key={index}>
                  {
                    getFieldDecorator(item.paramName, {
                      initialValue: item.initialValue ? item.initialValue : '',
                      rules: item.rules || []
                    })(
                      <Cascader
                        size={config.size}
                        changeOnSelect={item.changeOnSelect}
                        options={item.options}
                        placeholder="请选择"
                      />
                    )}
                </FormItem>)
              } else if (item.type === 'select') {
                return (<FormItem label={item.label} key={index}>
                  {
                    getFieldDecorator(item.paramName, {
                    })(
                      <Select
                        placeholder={item.placeholder || '请选择'}
                        disabled={item.disabled}
                        size={config.size}
                        showSearch
                        mode={item.mode}
                        style={item.style ? {width: '150px'} : {}}
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

                return (<FormItem className={styles.dateTimePicker} label={item.label} colon={item.colon} key={index}>
                  {
                    getFieldDecorator(item.paramName, {
                      initialValue: item.initialValue ? item.initialValue : null
                    })(
                      <RangePicker
                        disabled={item.disabled}
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
                                  key={index} colon={item.colon}>
                  {
                    getFieldDecorator(item.paramName, {
                      initialValue: item.initialValue ? item.initialValue : ( item.initialValue!==null ?moment():null),
                      rules:item.rules||[]
                    })(
                      <DatePicker onChange={item.onDateChange}  placeholder={item.placeholder || '请选择'} size={config.size} disabledDate={disabled}/>
                    )
                  }
                </FormItem>)
              }else if (item.type === 'dateRange') {
                return (
                  <FormItem label={item.label}
                            key={index}>
                    {
                      getFieldDecorator(item.paramName, {
                        initialValue: item.initialValue || moment().add(-1, 'months')
                      })(
                        <DatePicker
                          format="YYYY-MM-DD HH:mm:ss"
                          disabledDate={this.disabledStartDate}
                          value={this.state.startValue}
                          onChange={this.onStartChange.bind(this)}
                          onOpenChange={this.handleStartOpenChange.bind(this)}
                          size={config.size}>
                        </DatePicker>
                      )
                    }
                    {
                      getFieldDecorator(item.paramName2, {
                        initialValue: item.initialValue || moment()
                      })(
                        <DatePicker
                          format="YYYY-MM-DD HH:mm:ss"
                          disabledDate={this.disabledEndDate}
                          onChange={this.onEndChange.bind(this)}
                          open={this.state.endOpen}
                          value={this.state.endValue}
                          onOpenChange={this.handleEndOpenChange.bind(this)}
                          size={config.size}>
                        </DatePicker>
                      )
                    }
                  </FormItem>
                )
              } else if (item.type === 'monthPicker') {
                return (<FormItem label={item.label}  colon={item.colon} key={index}>
                  {
                    getFieldDecorator(item.paramName, {
                      initialValue: item.initialValue ? item.initialValue : ( item.initialValue!==null ?moment():null)
                    })(
                      <MonthPicker
                        className={styles.monthPicker}
                        size={config.size}
                        onChange={t.selectedChange.bind(t, item.selectChange)}
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
            {
              t.props.importBtnUrl && t.props.importBtnShow &&
              <Dropdown overlay={menuImport} trigger={['click']} disabled={t.props.upDisabled}>
                <span style={{cursor:'pointer'}}>
                  <MyIcon className={styles.baseFont} style={{color:'#6D85EE',paddingRight:4}} type="icon-daoru"/>
                  <span >导入</span>
                </span>
              </Dropdown>
            }
          </FormItem>
          {
            extraBtn.map((btn, btnIndex) => {
              return (
                <FormItem key={btnIndex}>
                  <Button size={config.size}
                          className={styles.button}
                          type="primary"
                          onClick={t.extraBtnClick.bind(t, btnIndex, btn.funName)}
                  >
                    {btn.name}
                  </Button>
                </FormItem>
              )
            })
          }
          <div>
          </div>
        </Form>
      </div>
    )
  }
}

export default  Form.create()(Filtrate);
