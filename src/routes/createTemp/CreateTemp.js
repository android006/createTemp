/**
 * Created by GYL on 2018/7/6
 */
import React, {Component} from 'react';
import {Link} from 'dva/router';
import {message, notification, Input, InputNumber, Upload, Button, Icon} from 'antd';
import styles from './createTemp.less';
import MyTable from "../../components/MyTable";
import Filtrate from "../../components/Filtrate";
import Container from "../../components/Container";
import MyIcon from "../../components/MyIcon";
import LXTempData from './component/LXTempData';
import NTHTempData from './component/NTHTempData';
import AJTempData from './component/AJTempData';
import STTempData from './component/STTempData';
import TZTempData from './component/TZTempData';
import JLTempData from './component/JLTempData';
import LSTempData from './component/LSTempData';
import HBTempData from './component/HBTempData';
import DQTempData from './component/DQTempData';
import JZTempData from './component/JZTempData';
import ZSTempData from './component/ZSTempData';
import NRTempData from './component/NRTempData';
import TreeData from './component/treeData';

// 是否为开发
const dev = false;

const treeData = [];
TreeData.treeData.map((item, index) => {
  item.disabled = true;
  item.key = index;
  item.children.map((subItem, subIndex) => {
    subItem.disabled = true;
    subItem.key = index + '_' + subIndex;
    subItem.value = index + '_' + subItem.value;
    subItem.children.map((subbItem, subbIndex) => {
      subbItem.key = index + '_' + subIndex + '_' + subbIndex;
      subbItem.value = index + '_' + subIndex + '_' + subbItem.value;
      subbItem.parentKey = item.value
    })
  });
  treeData.push({...item})
});
// 容器 储存组态图所需的点位信息及组态图
let allData = {
  NH01: {
    Data: [],
    BG: [],
  },
  LX01: {
    Data: [],
    BG: [],
  },
  ST01: {
    Data: [],
    BG: [],
  },
  AJ01: {
    Data: [],
    BG: [],
  },
  TZ01: {
    Data: [],
    BG: [],
  },
  JL01: {
    Data: [],
    BG: [],
  },
  LS01: {
    Data: [],
    BG: [],
  },
  HB01: {
    Data: [],
    BG: [],
  },
  DQ01: {
    Data: [],
    BG: [],
  },
  JZ01: {
    Data: [],
    BG: [],
  },
  ZS01: {
    Data: [],
    BG: [],
  },
  NR01: {
    Data: [],
    BG: [],
  },
};
// 将配置好的点位信息放置相应的容器中
for (let key in LXTempData) {
  allData.LX01.BG.push(LXTempData[key].BG);
  allData.LX01.Data.push(LXTempData[key].data);
}
for (let key in NTHTempData) {
  allData.NH01.BG.push(NTHTempData[key].BG);
  allData.NH01.Data.push(NTHTempData[key].data);
}
for (let key in STTempData) {
  allData.ST01.BG.push(STTempData[key].BG);
  allData.ST01.Data.push(STTempData[key].data);
}
for (let key in AJTempData) {
  allData.AJ01.BG.push(AJTempData[key].BG);
  allData.AJ01.Data.push(AJTempData[key].data);
}
for (let key in TZTempData) {
  allData.TZ01.BG.push(TZTempData[key].BG);
  allData.TZ01.Data.push(TZTempData[key].data);
}
for (let key in JLTempData) {
  allData.JL01.BG.push(JLTempData[key].BG);
  allData.JL01.Data.push(JLTempData[key].data);
}
for (let key in LSTempData) {
  allData.LS01.BG.push(LSTempData[key].BG);
  allData.LS01.Data.push(LSTempData[key].data);
}
for (let key in HBTempData) {
  allData.HB01.BG.push(HBTempData[key].BG);
  allData.HB01.Data.push(HBTempData[key].data);
}
for (let key in DQTempData) {
  allData.DQ01.BG.push(DQTempData[key].BG);
  allData.DQ01.Data.push(DQTempData[key].data);
}
for (let key in JZTempData) {
  allData.JZ01.BG.push(JZTempData[key].BG);
  allData.JZ01.Data.push(JZTempData[key].data);
}
for (let key in ZSTempData) {
  allData.ZS01.BG.push(ZSTempData[key].BG);
  allData.ZS01.Data.push(ZSTempData[key].data);
}
for (let key in NRTempData) {
  allData.NR01.BG.push(NRTempData[key].BG);
  allData.NR01.Data.push(NRTempData[key].data);
}
const EditableCell = ({type, value, onChange}) => (
  <div>
    {
      type === 'Input' &&
      <Input value={value} onChange={e => onChange(e.target.value)}/>
    }
    {
      type === 'InputNumber' &&
      <InputNumber
        style={{width: '100%'}}
        min={0}
        max={100}
        step={0.1}
        formatter={value => `${value}%`}
        value={value}
        onChange={value => onChange(value)}
      />
    }

  </div>
);
let num = 0;

class CreateTemp extends Component {
  state = {
    dataSource: [],
    type: '0', // 0为圆点 1为数据
    bgImg: allData.ZS01.BG[0]
  };

  componentDidMount() {
    let t = this;
    // let dataSource = [{"left":"8.2%","top":"6.7%","type":""},{"left":"8.2%","top":"9.2%","type":"TC040501"},{"left":"8.2%","top":"11.5%","type":"AI010202"},{"left":"1.6%","top":"25.2%","type":""},{"left":"1.6%","top":"27.5%","type":"AI090102"},{"left":"1.6%","top":"29.6%","type":"RT040206"},{"left":"7.4%","top":"25.3%","type":""},{"left":"7.4%","top":"27.5%","type":"AI090103"},{"left":"7.4%","top":"29.7%","type":"RT040207"},{"left":"2.5%","top":"52.0%","type":"AI010301"},{"left":"2.5%","top":"54.5%","type":"AI010302"},{"left":"2.5%","top":"57.1%","type":"TC040705"},{"left":"8.3%","top":"52.0%","type":"AI020301"},{"left":"8.3%","top":"54.5%","type":"AI020302"},{"left":"8.3%","top":"57%","type":"AI020207"},{"left":"13.8%","top":"52.6%","type":"AI030301"},{"left":"2.0%","top":"70.8%","type":"AI190101"},{"left":"8.7%","top":"70.8%","type":"AI190201"},{"left":"1.6%","top":"79.9%","type":"AI130302"},{"left":"6.2%","top":"79.7%","type":"AI140302"},{"left":"12.1%","top":"80.1%","type":"AI130304"},{"left":"5.9%","top":"85.6%","type":"AI160101"},{"left":"11.4%","top":"85.3%","type":"AI160102"},{"left":"32.2%","top":"11.3%","type":"TC100401"},{"left":"27.7%","top":"24.3%","type":"RT040406"},{"left":"27.7%","top":"27.1%","type":"AI010207"},{"left":"21.4%","top":"33.5%","type":""},{"left":"25.5%","top":"33.3%","type":"TC040502"},{"left":"30.6%","top":"33.4%","type":"AI010204"},{"left":"22.2%","top":"38.4%","type":"TC040503"},{"left":"29.8%","top":"38.0%","type":"AI010301"},{"left":"28.0%","top":"43.7%","type":"RT100101"},{"left":"28.1%","top":"46.1%","type":"RT100102"},{"left":"28.0%","top":"48.3%","type":"RT100103"},{"left":"28.1%","top":"50.8%","type":"RT100104"},{"left":"28.0%","top":"53.3%","type":"RT100201"},{"left":"28.1%","top":"55.5%","type":"RT100202"},{"left":"28.1%","top":"57.7%","type":"RT100203"},{"left":"28.1%","top":"60.1%","type":"RT100204"},{"left":"17.9%","top":"66.8%","type":"AI130301"},{"left":"23.4%","top":"66.9%","type":"AI140301"},{"left":"17.7%","top":"71.2%","type":"AI130306"},{"left":"23.4%","top":"71.3%","type":"AI140304"},{"left":"17.7%","top":"74.3%","type":"AI160106"},{"left":"23.4%","top":"74.2%","type":"AI160103"},{"left":"30.0%","top":"72.5%","type":"AI020101"},{"left":"29.9%","top":"74.7%","type":"AI020201"},{"left":"29.7%","top":"80.7%","type":"RT040404"},{"left":"29.7%","top":"83.1%","type":"AI020104"},{"left":"37.5%","top":"81.9%","type":"RT040304"},{"left":"38%","top":"16.4%","type":"AI080106"},{"left":"38.0%","top":"18.6%","type":"AI080107"},{"left":"38%","top":"20.6%","type":"AI080207"},{"left":"38%","top":"22.7%","type":"AI080307"},{"left":"49.2%","top":"18.8%","type":"RT100105"},{"left":"49.3%","top":"21.4%","type":"RT100205"},{"left":"45.0%","top":"24.3%","type":"RT100106"},{"left":"49.2%","top":"24.0%","type":"RT100305"},{"left":"49.4%","top":"27.2%","type":"RT100206"},{"left":"49.3%","top":"29.2%","type":"AI080201"},{"left":"54.6%","top":"24.5%","type":"AI010203"},{"left":"54.7%","top":"26.4%","type":"TC100402"},{"left":"60.5%","top":"24.1%","type":"TC100403"},{"left":"60.5%","top":"26.5%","type":"TC100404"},{"left":"65.5%","top":"24.1%","type":"RT100301"},{"left":"65.6%","top":"26.6%","type":"AI010303"},{"left":"86.2%","top":"3.2%","type":"AI080103"},{"left":"86.7%","top":"11.3%","type":"AI080101"},{"left":"70.9%","top":"14.7%","type":"AI080105"},{"left":"70.6%","top":"19.1%","type":"RT100303"},{"left":"70.7%","top":"21.0%","type":"RT100304"},{"left":"70.7%","top":"27.1%","type":"RT100302"},{"left":"70.8%","top":"29.1%","type":"AI080301"},{"left":"75.9%","top":"19.6%","type":"RT100107"},{"left":"75.8%","top":"21.7%","type":"RT100207"},{"left":"76.3%","top":"28.8%","type":"AI080202"},{"left":"87.6%","top":"19.0%","type":"RT040303"},{"left":"87.8%","top":"21.4%","type":"RT040403"},{"left":"87.8%","top":"26.8%","type":"RT040405"},{"left":"87.8%","top":"29.1%","type":"RT040302"},{"left":"75.1%","top":"48.0%","type":"AI010206"},{"left":"38.2%","top":"50.3%","type":"TC040504"},{"left":"38.1%","top":"52.8%","type":"TC040504"},{"left":"59.6%","top":"59.1%","type":"RT030102"},{"left":"73.1%","top":"58.9%","type":"RT030202"},{"left":"59.6%","top":"64.7%","type":"RT030101"},{"left":"73.1%","top":"64.8%","type":"RT030201"},{"left":"60.2%","top":"68.9%","type":"AI020102"},{"left":"70.8%","top":"68.9%","type":"AI020202"},{"left":"50.6%","top":"70.8%","type":"TC040505"},{"left":"50.6%","top":"73.5%","type":"AI010304"},{"left":"63.8%","top":"74.2%","type":"RT040307"},{"left":"49.1%","top":"77.7%","type":"AI010201"},{"left":"61.5%","top":"81.7%","type":"AI070203"},{"left":"71.7%","top":"81.9%","type":"AI080203"},{"left":"61.2%","top":"88.2%","type":""},{"left":"61.3%","top":"90.7%","type":"RT030107"},{"left":"66.2%","top":"88.7%","type":"AI010305"},{"left":"93.4%","top":"60.1%","type":"AI030202"},{"left":"93.4%","top":"64.3%","type":"AI030203"},{"left":"91.2%","top":"67.9%","type":"AI030305"},{"left":"91.4%","top":"70.4%","type":"TC040702"},{"left":"91.4%","top":"72.9%","type":"AI010306"},{"left":"91.4%","top":"74.9%","type":"TC040703"},{"left":"77.1%","top":"90.2%","type":"AI070205"},{"left":"81.2%","top":"90.1%","type":"AI080205"},{"left":"85.4%","top":"90.0%","type":"AI080104"},{"left":"89.8%","top":"89.9%","type":"AI070204"},{"left":"94.2%","top":"89.8%","type":"AI080204"},{"left":"34.5%","top":"94.6%","type":"AI010202"},{"left":"34.5%","top":"96.9%","type":"TC040501"},{"left":"44.4%","top":"94.6%","type":"AI020105"},{"left":"44.6%","top":"97.0%","type":"AI080305"},{"left":"54.1%","top":"94.7%","type":"AI020303"},{"left":"53.9%","top":"97.5%","type":"AI020305"},{"left":"64.3%","top":"94.7%","type":"AI010306"},{"left":"64.2%","top":"97.4%","type":"AI080106"},{"left":"75.7%","top":"94.8%","type":"RT030205"},{"left":"75.7%","top":"97.4%","type":"RT030206"},{"left":"85.2%","top":"95.0%","type":"AI080206"},{"left":"85.3%","top":"97.6%","type":"AI080306"},{"left":"94.4%","top":"94.9%","type":"AI080304"},{"left":"94.6%","top":"97.6%","type":"AI010606"}];
    // num = 0;
    // dataSource.map((item, index) => {
    //   item.key = index +1;
    //   item.num = index +1;
    //   t.createDiv(item.left,item.top)
    // });
    // this.setState({
    //   dataSource
    // });
  };

  // 生成代码
  setBatch = () => {
    let {dataSource} = this.state;
    if (dataSource.length === 0) {
      message.warning('请先创建你要生成的数据！');
      return;
    }
    let outValue = [];
    dataSource.map((item, index) => {
      outValue.push({
        left: `${item.left ? ((item.left.toString().substr(item.left.length - 1) === '%') ? item.left : item.left + '%') : ''}`,
        top: `${item.top ? ((item.top.toString().substr(item.top.length - 1) === '%') ? item.top : item.top + '%') : ''}`,
        type: `${item.type}`,
      })
    });
    let oInput = document.createElement('input');
    oInput.value = JSON.stringify(outValue);
    document.body.appendChild(oInput);
    oInput.select(); // 选择对象
    document.execCommand("Copy"); // 执行浏览器复制命令
    document.body.removeChild(oInput);
    notification.open({
      message: '复制成功',
      description: JSON.stringify(outValue),
      placement: 'topLeft',
      duration: 2,
      icon: <Icon type="smile-circle" style={{color: '#1279ee'}}/>,
    });
  };
  // 鼠标移动
  onMove = (event) => {
    let t = this;
    let top, left, width, height, line, X, Y, oDiv, info;
    oDiv = document.getElementById('warp');
    line = document.getElementById('line');
    info = document.getElementById('info');
    width = oDiv.offsetWidth;
    height = oDiv.offsetHeight;
    top = t.getY(oDiv);
    left = t.getX(oDiv);
    X = (Math.round((event.clientX - left) / width * 10000) / 100.00 - 0.6).toFixed(1) + "%";
    Y = (Math.round((event.clientY - top) / height * 10000) / 100.00 - 1.3).toFixed(1) + "%";
    document.getElementById("mp_x").innerHTML = X;
    document.getElementById("mp_y").innerHTML = Y;
    line.style.width = X;
    line.style.height = Y;
    info.style.left = (Math.round((event.clientX - left) / width * 10000) / 100.00 + 0.6).toFixed(1) + "%";
    info.style.top = (Math.round((event.clientY - top) / height * 10000) / 100.00 + 1.3).toFixed(1) + "%";
  };
  // 获取X
  getX = (obj) => {
    let parObj = obj;
    let left = obj.offsetLeft;
    while (parObj = parObj.offsetParent) {
      left += parObj.offsetLeft;
    }
    return left;
  };
  // 获取Y
  getY = (obj) => {
    let parObj = obj;
    let top = obj.offsetTop;
    while (parObj = parObj.offsetParent) {
      top += parObj.offsetTop;
    }
    return top;
  };
  // 点击生成内容
  copyUrl = () => {
    let t = this;
    let oInput = document.createElement('input');
    let left = document.getElementById("mp_x").innerHTML;
    let top = document.getElementById("mp_y").innerHTML;
    oInput.value = 'left:"' + left + '",top:"' + top + '"';
    document.body.appendChild(oInput);
    oInput.select(); // 选择对象
    document.execCommand("Copy"); // 执行浏览器复制命令
    document.body.removeChild(oInput);
    t.createDiv(left, top);
  };
  // 生成div
  createDiv = (left, top) => {
    let t = this;
    let {dataSource} = t.state;
    let oDiv = document.getElementById('warp');
    let newDiv = document.createElement('div');
    newDiv.innerHTML = ++num;
    newDiv.className = 'newDiv';
    newDiv.style.left = left;
    newDiv.style.top = top;
    oDiv.appendChild(newDiv);
    dataSource.push({
      key: num,
      num: num,
      left: left.replace('%', ''),
      top: top.replace('%', ''),
      type: ''
    });
    t.setState({
      dataSource
    })
  };
  // 删除点位
  onDel = (i) => {
    let t = this;
    let {dataSource} = t.state;
    let oDiv = document.getElementById('warp');
    let newDivList = document.getElementsByClassName('newDiv');
    dataSource.splice(i, 1);
    oDiv.removeChild(newDivList[i]);
    t.setState({
      dataSource
    })
  };
  // 鼠标进入
  onOver = (event) => {
    let line = document.getElementById('line');
    let info = document.getElementById('info');
    line.style.display = 'block';
    info.style.display = 'block';
  };
  // 鼠标离开
  onOut = (event) => {
    let line = document.getElementById('line');
    let info = document.getElementById('info');
    line.style.display = 'none';
    info.style.display = 'none';
  };

  // 表格输入
  renderColumns(text, record, column, type, index) {
    return (
      <EditableCell
        type={type}
        value={text}
        onChange={value => {
          this.handleChange(value, record.key, column);
          this.upPosition(column, value, index);
        }}
      />
    );
  };

  // 改变点位的位置 type:'left || top' value:'值' i:'点位下标'
  upPosition = (type, value, i) => {
    let newDivList = document.getElementsByClassName('newDiv');
    newDivList[i].style[type] = value + '%';
  };

  // 输入框改变
  handleChange(value, key, column) {
    const newData = [...this.state.dataSource];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      target[column] = value;
      this.setState({dataSource: newData});
    }
  };

  // 下拉选改变
  onSelect = (value, node, extra) => {
    let t = this;
    let oDiv = document.getElementById('warp');
    oDiv.innerHTML = null;
    let type = node.props.id;
    let typeTemp = extra.node.props.parentKey;
    let dataSource = allData[typeTemp].Data[type];
    num = 0;
    dataSource.map((item, index) => {
      item.key = index + 1;
      item.num = index + 1;
      t.createDiv(item.left, item.top)
    });
    let bgImg = allData[typeTemp].BG[type];
    this.setState({
      bgImg,
      dataSource
    });
  };

  // 上传
  onUpChange = ({file, fileList, event}) => {
    let t = this;
    if (file && file.originFileObj) {
      if (window.FileReader) {
        var fr = new FileReader();
        fr.onloadend = function (e) {
          t.img.src = e.target.result;
          let oDiv = document.getElementById('warp');
          oDiv.innerHTML = null;
          num = 0;
          t.setState({
            dataSource: []
          })
        };
        fr.readAsDataURL(file.originFileObj);
      }
    }
  };

  render() {
    let t = this;
    let {dataSource, typeTemp, typeBG, bgImg} = t.state;
    //下拉参数
    const items = [
      {
        type: 'treeSelect',
        label: '组态选取',
        paramName: 'projectCompanyId',
        treeData: treeData,
        onSelect: t.onSelect,
      }
    ];
    const columns = [
      {
        dataIndex: 'num',
        title: '序号',
        key: 'num',
        width: 50,
      }, {
        dataIndex: 'left',
        title: 'Left',
        key: 'left',
        width: 90,
        render: (text, record, index) => this.renderColumns(text, record, 'left', 'InputNumber', index),
      }, {
        dataIndex: 'top',
        title: 'Top',
        key: 'top',
        width: 90,
        render: (text, record, index) => this.renderColumns(text, record, 'top', 'InputNumber', index),
      }, {
        dataIndex: 'type',
        title: '值',
        key: 'type',
        width: 100,
        render: (text, record, index) => this.renderColumns(text, record, 'type', 'Input', index),
      }, {
        dataIndex: 'index',
        title: '操作',
        key: 'index',
        width: 50,
        render: (text, record, index) => {
          return (
            <span><MyIcon onClick={t.onDel.bind(t, index)} type={'icon-del'}
                          style={{color: '#ff4650', cursor: 'pointer'}}/></span>
          )
        }
      }
    ];
    const extraBtn = [
      {
        icon: 'icon-shengcheng',
        name: '生成',
        iconStyle: {color: '#3c8fff', fontSize: 14},
        funName: 'setBatch'
      },
    ];
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <Link to={`/createLayout`} style={{fontSize: 18}}><MyIcon title={"跳转至布局"} type={'icon-buju'} style={{
            color: '#3c8fff',
            fontSize: 26,
            paddingLeft: 20
          }}/></Link>
        </div>
        <div className={styles.left}>
          <Container
            extraBtn={extraBtn}
            setBatch={t.setBatch.bind(t)}>
            <MyTable
              dataSource={dataSource}
              columns={columns}
              bordered
              pagination={false}
              scroll={{y: 750,}}
            />
          </Container>
        </div>
        <div className={styles.content}>
          <Filtrate items={items} clearBtn={'hide'}>
            <Upload onChange={t.onUpChange} showUploadList={false}>
              <Button style={{marginTop: 4}}><Icon type="upload" />上传背景图</Button>
            </Upload>
          </Filtrate>
          <div className={styles.contentWp}
               onMouseOver={t.onOver}
               onMouseOut={t.onOut} onMouseMove={t.onMove} onClick={t.copyUrl}>
            <img ref={ref => this.img = ref} src={bgImg} style={{width: '100%', height: '100%'}} alt=""/>
            <div id="warp" className={styles.warp}/>
            <div id="line" className={styles.line}/>
            <div className={styles.info} id="info">
              <div>left: <span id={"mp_x"}></span></div>
              <div>top: <span id={"mp_y"}></span></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CreateTemp;
