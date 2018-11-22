/**
 * Created by GYL on 2018/7/12
 */
import React, {Component} from 'react';
import moment from 'moment';
import {Row,Col,Form, Input, Select, Button, DatePicker, Upload, message,Icon,Spin} from 'antd';
import MyModal from '../../../components/common/MyModal';
import echarts from 'echarts';
import modalStyles from '../../../components/common/Mymodal.less';
import request from '../../../utils/request';
import styles from './sub.less';
const FormItem = Form.Item;
const Option = Select.Option;

const { RangePicker } = DatePicker;

let option = {
  color: ['#3C8FFF'],
  tooltip: {
    trigger: 'axis',
    axisLine: {
      lineStyle: {
        color: '#FEFEFE'
      }
    }
  },
  dataZoom: [
    {   // 这个dataZoom组件，默认控制x轴。
      type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
      start: 0,      // 左边在 10% 的位置。
      end: 100         // 右边在 60% 的位置。
    },
    {   // 这个dataZoom组件，也控制x轴。
      type: 'inside', // 这个 dataZoom 组件是 inside 型 dataZoom 组件
      start: 0,      // 左边在 10% 的位置。
      end: 100         // 右边在 60% 的位置。
    }
  ],
  xAxis: [
    {
      type: 'category',
      data: [],
      axisLine:{
        lineStyle:{
          color:'#8E8E8E',
          width:2,//这里是为了突出显示加上的
        }
      }
    }
  ],
  yAxis: {
    type: 'value',
    scale:true,
    name: '',
    axisLabel: {
      formatter: '{value}'
    },
    axisLine:{
      lineStyle:{
        color:'#8E8E8E',
        width:2,//这里是为了突出显示加上的
      }
    }
  },
  series: [
    {
      name:'',
      type:'line',
      smooth: false,
      data:[],
    }
  ]
};

class HistoryModal extends Component {
  state = {
    selectVal:[moment(),moment().subtract(1,'days')],
    timeLeft:0,
    spinning:false,
    current:0,
    timeList:[
      {
        start:moment().format("YYYY.MM.DD HH:mm"),
        end:moment().subtract(5,'m').format("YYYY.MM.DD HH:mm"),
      }
    ]
  };

  componentDidMount () {
    let t = this;
    let chart = echarts.init(document.getElementById('lineChart'));
    chart.setOption(option);
    if (this.props.modalParams && this.props.modalParams.showCode){
      this.onSearch()
    }
  };
  // 查询
  onSearch = () => {
    let { selectVal } = this.state;
    let params = {
      projectCode:this.props.modalParams.projectCode,
      showCode:this.props.modalParams.showCode,
      startTime:moment(moment(selectVal[0]).format("YYYY.MM.DD HH:mm")).diff(0),
      endTime:moment(moment(selectVal[1]).format("YYYY.MM.DD HH:mm")).diff(0)
    };
    this.getChart(params);
  };
  // 获得历史曲线
  getChart =(params) => {
    this.setState({
      spinning:true
    });
    params.attribute = 2;
    request({url: '/wcsSis/realTimeShow/getHistoryDataList',method:'GET',params}).then(data =>{
      if (data.rc === 0){
        let chartDate = [];
        let chartData = [];
        if (data.ret && data.ret.length > 0){
          data.ret.map(item => {
            let time = new Date(item.createTime);
            let yy = time.getFullYear();      // 年
            let mm = time.getMonth() + 1;     // 月
            let dd = time.getDate();          // 日
            let hh = time.getHours();         // 时
            let ii = time.getMinutes();
            let ss = time.getSeconds();        // 秒
            chartDate.push(yy + '-' + mm + '-' + dd + ' ' + hh + ':' + ii + ':' + ss);
            // chartDate.push(item.createTime?moment(item.createTime).format('YYYY-MM-DD HH:ss') : '');
            chartData.push(item.originalValue ? item.originalValue : '');
          })
        }else {
          message.warn("暂未查询到该测点历史数据！")
        }
        let echartData = echarts.init(document.getElementById('lineChart')).getOption();
        echartData.xAxis[0].data = chartDate;
        echartData.series[0].data = chartData;
        echartData.series[0].name = params.showCode;
        echarts.init(document.getElementById('lineChart')).setOption(echartData)
      }else {
        message.error(data.err)
      }
      this.setState({
        spinning:false
      });
    });
  };
  // 下拉选时间选择
  handleChange = (val) => {
    console.log("val:",val);
    this.setState({
      selectVal:val,
    },() => {
      this.onSearch();
    });
  };
  // 时间向后
  onLeft = () => {
    let { current, timeLeft, timeList, selectVal } = this.state;
    if (timeList && current === (timeList.length - 1)){
      let type = 'm';
      if (selectVal === 1){
        type = 'd'
      }
      let start = timeList[current].end;
      let end = moment(start).subtract(selectVal,type).format("YYYY.MM.DD HH:mm");
      timeList.push({
        start,
        end
      })
    }
    this.setState({
      timeLeft:timeLeft - 300,
      current:current + 1
    },() => {
      this.onSearch();
    });
  };
  // 时间向前
  onRight = () => {
    let { current, timeLeft, timeList } = this.state;
    this.setState({
      timeLeft:timeLeft + 300,
      current:current - 1
    },() => {
      this.onSearch();
    });
  };
  render () {
    let t = this;
    let { timeList, selectVal, timeLeft, current,spinning } = this.state;
    const list = [
      {text: '5分钟', value: 5},
      {text: '10分钟', value: 10},
      {text: '30分钟', value: 30},
      {text: '1小时', value: 60},
      {text: '1天', value: 1},
    ];
    return (
      <MyModal
        {...t.props}
        width={800}
        className={modalStyles.jlModal}
      >
        <div>
          <Row style={{marginTop:10}}>
            <Col span={12} style={{textAlign:'center'}}>时间：
              <RangePicker showTime={true}  value={selectVal} style={{ width: 220 }} onChange={t.handleChange} />
            </Col>
            {/*<Col span={12} style={{display:'flex',height:32,alignItems:'center'}}>*/}
              {/*<Button shape="circle" icon="left" style={{width:26,height:26}} onClick={t.onLeft} />*/}
              {/*<div className={styles.timeWp}>*/}
                {/*<div className={styles.timeContent} style={{width:timeList.length>0?timeList.length * 300:'100%',left:timeLeft}}>*/}
                  {/*{*/}
                    {/*timeList && timeList.length > 0 &&*/}
                    {/*timeList.map((item, index) => {*/}
                      {/*return(*/}
                        {/*<div key={index} className={styles.timeItem}>*/}
                          {/*<span >{item.start}</span>*/}
                          {/*<span style={{margin:'0 6px'}}>~</span>*/}
                          {/*<span >{item.end}</span>*/}
                        {/*</div>*/}
                      {/*)*/}
                    {/*})*/}
                  {/*}*/}
                {/*</div>*/}

              {/*</div>*/}
              {/*<Button shape="circle" icon="right" style={{width:26,height:26}} onClick={t.onRight} disabled={!current}/>*/}
            {/*</Col>*/}
          </Row>
          <Spin spinning={spinning}>
            <div id="lineChart" className={styles.chart} />
          </Spin>

        </div>

      </MyModal>
    )
  }
}
export default HistoryModal;
