/**
 * 公共弹框组件
 */
import React, {Component} from 'react';
import {connect} from 'dva';
import {Modal,Button} from 'antd';
import styles from './Mymodal.less'

class MyModal extends Component {
  state = {};

  componentDidMount() {
    let t = this;
    t.modalDraggable();
  };
  /*
  *  模态框拖拽事件
  *  因为antd的ant-modal样式的为position: 为relative;
  *  所以使用前需将ant-modal样式设置为 position: absolute;
  *  否则将会出现模态框移动偏移问题
  * */
  modalDraggable = ()=> {
    // 获取模态框及模态框的头部
    let modal = document.getElementsByClassName("ant-modal")[0];
    let header = document.getElementsByClassName("ant-modal-header")[0];
    let width = document.body.clientWidth / 2;
    let modalWidth = header.offsetWidth / 2;
    // 设置模态框的位置
    modal.style.left = width - modalWidth + 'px';
    // 模态框头部按下事件
    header.onmousedown = function (ev){
      /*
      * oEvent.clientX 当前鼠标的位置
      * modal.offsetLeft 当前模态框距离浏览器边界的距离
      * 当前鼠标在模态框上的位置 = 当前鼠标的位置 - 当前模态框距离浏览器边界的距离
      * */
      let oEvent=ev||event;
      let disX=oEvent.clientX-modal.offsetLeft;
      let disY=oEvent.clientY-modal.offsetTop;

      // 设置捕获范围  整个浏览器范围内被触发
      if(header.setCapture){
        header.onmousemove=fnMove;
        header.onmouseup=fnUp;

        header.setCapture();
      }else{
        document.onmousemove=fnMove;
        document.onmouseup=fnUp;
      }

      // 鼠标移动
      function fnMove(ev){
        /*
        * oEvent.clientX 当前鼠标的位置
        * disX 当前鼠标在模态框上的位置
        * 模态框到浏览器边界的距离 = 当前鼠标的位置 - 当前鼠标在模态框上的位置
        * */
        let oEvent=ev||event;
        let l = oEvent.clientX-disX;
        let t = oEvent.clientY-disY;

        // 设置鼠标按下时的样式
        header.style.cursor = 'move';

        // 加入边界检测
        let Width = document.body.clientWidth;
        let Height = document.body.clientHeight;
        let modalWidth = modal.offsetWidth;
        let modalHeight = modal.offsetHeight;
        if(t < 0){
          t = 0;
        }else if ((t+modalHeight) > Height){
          t = Height - modalHeight;
        }else if (l < 0) {
          l = 0;
        }else if ((l + modalWidth) > Width) {
          l = Width - modalWidth;
        }

        // 阻止模态框从四个角被拖出
        if(t <= 0 && l <= 0){
          t = 0;
          l = 0;
        }else if (l <= 0 && (t+modalHeight) >= Height){
          l = 0;
          t = Height - modalHeight;
        }else if (t <= 0 && (l + modalWidth) >= Width){
          t = 0;
          l = Width - modalWidth;
        }else if ((t+modalHeight) >= Height && (l + modalWidth) >= Width){
          t = Height - modalHeight;
          l = Width - modalWidth;
        }

        // 设置模态框的位置
        modal.style.left = l+'px';
        modal.style.top = t+'px';
      }

      // 鼠标抬起
      function fnUp(){
        // 设置鼠标抬起恢复默认样式
        header.style.cursor = 'default';

        //清除事件
        this.onmousemove=null;
        this.onmouseup=null;

        //取消捕获范围 用于处理IE下的问题
        if(this.releaseCapture){
          this.releaseCapture();
        }
      }
      //用于处理FF和Chrome下的问题
      return false;
    };
  };
  setFooter() {
    let t = this;
    let {footerShow,footerTitle} = t.props;
    if (footerShow) {
      return (
        <div className={styles.showCenter}>
          <Button loading={t.props.modalBtnLoading || false}
                  className={styles.saveBtn}
                  onClick={t.props.onModalSave}>{footerTitle||'保存'}</Button>
        </div>
      )
    } else {
      return null;
    }
  }
  render() {
    let t = this;

    return (
      <div>
        <Modal
          {...t.props}
          className={styles.commonModal+" "+t.props.className}
          footer={t.setFooter()}>
          {t.props.children}
        </Modal>
      </div>

    )
  }
}
function mapStateToProps(state) {
  return {};
}
export default connect(mapStateToProps)(MyModal);
