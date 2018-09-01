/**
 * Created by GYL on 2018/8/20
 */
import React, {Component} from 'react';
import styles from './createLayout.less';
import { Row, Col, Tabs, Tooltip, Button } from 'antd';
import HTML5Backend, { NativeTypes } from 'react-dnd-html5-backend';
import QueueAnim from 'rc-queue-anim';
import { DragDropContext } from 'react-dnd';
import update from 'immutability-helper';
import tablePNG from '../../assets/createLayout/table.png';
import searchPNG from '../../assets/createLayout/search.png';
import modalPNG from '../../assets/createLayout/modal2.png';
import MyIcon from "../../components/common/MyIcon";
import Dustbin from './sub/Dustbin';
import Box from './sub/Box';
import MyFormItem from './sub/MyFormItem';

const TabPane = Tabs.TabPane;

class CreateLayout extends Component {
  state = {
    dustbins:[
      { accepts: ['true'],padding:'0 0.5vw 0 1vw',marginTop:'1vh',data:[]},
    ],
    activeKey:'1',
    boxes: [
      { name: '搜索栏', img: searchPNG, type:'true' },
      { name: '表格容器', img: tablePNG, type:'true' },
      { name: '模态框', img: modalPNG, type:'true' },
    ],
    droppedBoxNames: [],
    itemNum: 0,
    activeType:'',
    delShow:false
  };
  componentDidMount(){

  };
  // 下载文件
  funDownload = (content, filename) => {
    let eleLink = document.createElement('a');
    eleLink.download = filename;
    eleLink.style.display = 'none';
    // 字符内容转变成blob地址
    let blob = new Blob([content]);
    eleLink.href = URL.createObjectURL(blob);
    // 触发点击
    document.body.appendChild(eleLink);
    eleLink.click();
    // 然后移除
    document.body.removeChild(eleLink);
  };
  onDownload = () => {
    this.funDownload("", 'test.js');
  };
  /**
   *  参数(@index 容器的下标  @item 拖动的name  @box 携带播放所需的信息)
   **/
  handleDrop(index, item, box) {
    let t = this;
    /*
    * update 扩展不变的数据（immutability-helper） 可参考github地址:https://github.com/kolodny/immutability-helper
    * {$set: any} 直接赋值覆盖
    * {$push: array} 数组中的push()语法
    * */
    const { name } = item;
    // 判断是否已经存在
    if (this.state.droppedBoxNames && this.state.droppedBoxNames.length>0&&this.state.droppedBoxNames.indexOf(name) !== -1){
      return
    }
    const droppedBoxNames = name ? { $push: [name] } : {};
    this.setState(
      update(this.state, {
        dustbins: {
          [index]: {
            lastDroppedItem: {
              $set: name,
            },
            name:{
              $set: name,
            },
            open:{
              $set: true,
            },
            data:{
              $push: [name]
            }
          },
        },
        droppedBoxNames,
      }),
    )
  }
  // 拖拽完成回调
  isDropped(boxName) {
    return this.state.droppedBoxNames.indexOf(boxName) > -1;
  }
  // tabs切换
  onTabChange = (val) => {
    this.setState({
      activeKey:val
    });
  };
  // 重置
  onReset = () => {
    const droppedBoxNames = {$set:[]};
    this.setState(
      update(this.state, {
        dustbins: {
          [0]: {
            data:{
              $set: []
            }
          },
        },
        droppedBoxNames,
      })
    )
  };
  // 搜索栏遮罩点击
  onMask = (activeType) => {
    console.log("activeType:",activeType);
    this.setState({
      activeKey:'2',
      activeType
    });
  };
  // 添加条件
  onAdd = () => {
    let itemNum = this.state.itemNum + 1;
    this.setState({
      itemNum
    });
  };
  // 删除显示
  onDel = () => {
    this.setState({
      delShow:!this.state.delShow
    });
  };
  render(){
    let t = this;
    let { dustbins, boxes, activeKey, activeType, itemNum, delShow } = t.state;

    return(
      <Row className={styles.container}>
        <Col span={24} className={styles.header}>
          <ul>
            <li><Button type="primary" onClick={t.onReset}>重置参数</Button></li>
            <li><Button type="primary">生成代码</Button></li>
            <li><Button type="primary">生成文件</Button></li>
          </ul>
        </Col>
        <Col span={20} className={styles.content}>
          {
            dustbins.map(({ accepts,data, lastDroppedItem, name}, index) => (
            <Dustbin
              onMask={t.onMask}
              key={index}
              name={name}
              data={data}
              accepts={accepts}
              lastDroppedItem={lastDroppedItem}
              onDrop={item => this.handleDrop(index, item, boxes)}
            />
            ))
          }
        </Col>
        <Col span={4} className={styles.silder}>
          <Tabs activeKey={activeKey} onChange={t.onTabChange}>

            <TabPane tab={<Tooltip title="选择"><span><MyIcon type={'icon-tuozhuailiebiao'}/></span></Tooltip>} key="1">
              <QueueAnim className="demo-content" duration={700} type={['right', 'left']} ease={['easeOutQuart', 'easeInOutQuart']}>
              {
                activeKey === '1' &&
                boxes.map(({ name, img, type }, index) => (
                <Box
                  key={index}
                  name={name}
                  img={img}
                  type={type}
                  isDropped={this.isDropped(type)}
                />
                ))
              }
              </QueueAnim>
            </TabPane>
            <TabPane tab={<Tooltip title="编辑"><span><MyIcon type={'icon-huaban'}/></span></Tooltip>} key="2">
              <div className={styles.handle}>
                <div onClick={t.onAdd}><MyIcon type={'icon-add'} className={styles.anticon}/>添加条件</div>
                <div onClick={t.onDel}><MyIcon type={delShow?'icon-shanchu1':'icon-jianshao'} className={styles.anticon}/>{delShow?"关闭删除":"删除条件"}</div>
              </div>
              {
                activeKey === '2' &&
                <MyFormItem delShow={delShow} itemNum={itemNum} activeType={activeType}/>
              }
            </TabPane>
          </Tabs>
        </Col>
      </Row>

    )
  }
}
export default DragDropContext(HTML5Backend)(CreateLayout);
