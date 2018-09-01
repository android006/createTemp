import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import QueueAnim from 'rc-queue-anim';
import Filtrate from '../../../components/common/Filtrate';
import Container from '../../../components/common/Container';
import MyTable from '../../../components/common/MyTable';
import MyPagination from '../../../components/common/MyPagination';
import ExamplesModal from './ExamplesModal';
import styles from './filt.less';

const dustbinTarget = {
  drop(props, monitor) {
    props.onDrop(monitor.getItem())
  },
};

class Dustbin extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    didDrop: PropTypes.bool.isRequired,
    accepts: PropTypes.arrayOf(PropTypes.string).isRequired,
    lastDroppedItem: PropTypes.string,
    onDrop: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      url:'',
    }
  }
  render() {
    let t = this;
    let {isOver,canDrop,connectDropTarget,lastDroppedItem,name,data} = this.props;
    let filtrateShow = false;
    let tableShow = false;
    let modalShow = false;
    let item = [
      {
        type: 'input',
        label: '示例一',
        paramName: 'baseId',
        options: [],
        style:true,
      },
      {
        type:'select',
        label:'示例二',
        paramName:'reportType',
        options:[],
        style:true,
      },
      {
        type: 'datePicker',
        label: '示例三',
        paramName: 'startDate',
        initialValue:null
      },
      {
        type: 'rangePicker',
        label: '示例四',
        paramName: 'startDate',
        initialValue:null
      }
    ];
    const columns = [
      {
        dataIndex: 'num',
        title: '示例一',
        key: 'num',
        width: 50,
      },
      {
        dataIndex: 'baseName',
        title: '示例二',
        key: 'baseName',
        width: 100,
      },
      {
        dataIndex: 'reportDate',
        title: '示例三',
        key: 'reportDate',
        width: 100,
      },
      {
        dataIndex: 'reportType',
        title: '示例四',
        key: 'reportType',
        width: 100,
      }, {
        dataIndex: 'reportUrl',
        title: '示例五',
        key: 'reportUrl',
        width: 120,
      }
    ];
    const extraBtn =[
      {
        icon:'icon-daoru',
        name:'导入',
        iconStyle:{color:'#3c8fff',fontSize:14},
        funName:'setUpLoad'
      },
    ];
    if ( data && data.length > 0 && data.indexOf("搜索栏") !== -1){
      filtrateShow = true
    }else{
      filtrateShow = false
    }
    if ( data && data.length > 0 && data.indexOf("表格容器") !== -1){
      tableShow = true
    }else{
      tableShow = false
    }
    if ( data && data.length > 0 && data.indexOf("模态框") !== -1){
      modalShow = true
    }else{
      modalShow = false
    }
    return connectDropTarget(
      <div className={styles.container}>
        <QueueAnim className="demo-content" duration={700}>
          {filtrateShow ? [
            <div className="demo-thead" key="a">
              <Filtrate
                ref={ref=>this.f1=ref}
                items={item}
                clearBtn={'hide'}
                onMask={t.props.onMask}
              />
            </div>]:null}
          {tableShow ? [
            <div className="demo-thead" key="b">
              <Container
                onMask={t.props.onMask}
                extraBtn={extraBtn}
              >
                <MyTable
                  onMask={t.props.onMask}
                  dataSource={[]}
                  columns={columns}
                  bordered
                  pagination={false}
                />
                <MyPagination
                  pageSize={10}
                  current={1}
                  total={10}
                  showSizeChanger={true}
                  showQuickJumper={true}
                />
              </Container>
            </div>]:null}
          {modalShow ? [
            <div key="c" style={{position:'absolute',zIndex:1111,top:0}}>
              <ExamplesModal />
            </div>]:null}
        </QueueAnim>
      </div>
    )
  }
}

export default DropTarget(props => props.accepts, dustbinTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
  didDrop:monitor.didDrop(),
}))(Dustbin);
