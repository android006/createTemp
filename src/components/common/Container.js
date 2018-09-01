/***
 * 容器组件 定制了 新增与输出按钮
 * addBtnShow 新增按钮显隐, exportBtnShow 输出按钮显隐, extraBtn 额外按钮数组
 */
import React, {Component} from 'react';
import {Icon, Dropdown, Upload, Menu, message, Popconfirm, Modal} from 'antd';
import MyIcon from './MyIcon';
import config from '../../../config'
import styles from './Container.less';
import common from '../../less/universal-css.css';

let importBtnConfigDefault = {
  name: 'file',
  action: null,
  accept: '.xls, .xlsx',
  onChange(info) {
    console.log(info, "onChange")
  },
  onSuccess(info) {
    console.log(info, "onSuccess");
    if (info.rc !== 0) {
      message.error(info.err);
    } else {
      message.success('文件上传成功');
    }
  },
  onError(info) {
    console.log(info, "onError")
  },
  onStart(info) {
    console.log(info, "onStart")
  }

};

class Container extends Component {
  state = {
    // uploadConfig: {}
    exportBoolean: false,
  };

  componentDidMount () {

    //初始化上传设置
    let uploadConfig = this.props.importBtnConfig ? Object.assign(importBtnConfigDefault, this.props.importBtnConfig) : importBtnConfigDefault;
    uploadConfig.action = config.publicUrl + uploadConfig.action;
    this.setState({
      uploadConfig: uploadConfig,
    });
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.importBtnConfig !== nextProps.importBtnConfig) {
      let uploadConfig = nextProps.importBtnConfig ? Object.assign(importBtnConfigDefault, nextProps.importBtnConfig) : importBtnConfigDefault;
      uploadConfig.action = config.publicUrl + uploadConfig.action;
      this.setState({
        uploadConfig: uploadConfig,
      });
    }
  }

  // 调用父组件相应方法
  doFatherFunction (fatherFunction) {
    let t = this;
    t.props[fatherFunction]();
  }

  exportHandle (status) {
    this.setState({
      exportBoolean: true
    });
    this.props.exportBtn(status)
  }

  checkHandle (status) {
    this.props.checkBtnFun(status)
  }

  // 额外按钮的点击事件
  extraBtnClick (btnIndex) {
    let t = this;
    let funNameStr = t.props.extraBtn[btnIndex].funName;
    t.props[funNameStr]();
  }
// 遮罩点击
  onMask = () => {
    this.props.onMask("Container")
  };
  render () {
    let t = this;
    let {className, menu} = t.props;
    let url = t.props.importBtnUrl;
    const uploadProps = {
      name: 'file',
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
    let extraBtn = t.props.extraBtn || [];
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
      <div className={styles.container + ` ${className}`} style={this.props.style}>
        <div className={styles.conMack} onClick={t.onMask}/>
        {
          !t.props.header &&
          <div className={styles.containerHeader}>
            {t.props.subTitle && <p className={styles.title}>{t.props.subTitle}</p>}
            {
              t.props.addBtnShow &&
              <span className={common.cp} onClick={t.doFatherFunction.bind(t, 'addBtn')}>
              <MyIcon className={styles.baseFont} type="icon-zengjia1" style={{color:'#16B8BE'}}/>
              <span>新增</span>
                {
                  (extraBtn.length !== 0 || menu || t.props.exportBtnShow || t.props.importBtnUrl || t.props.deleteBtnShow) &&
                  <span className={styles.line}> </span>
                }
            </span>
            }
            {
              t.props.exportBtnShow &&
              <Popconfirm
                onConfirm={t.exportHandle.bind(t, 'all')}
                onCancel={t.exportHandle.bind(t, 'part')}
                title="导出全部/导出本页?"
                okText='导出全部'
                cancelText="导出本页"
                placement="bottom"
              >
              <span className={common.cp}>
              <MyIcon className={styles.baseFont} type="icon-daochu" style={{color:'#6ED1A6'}}/>

              <span>输出</span>
                {
                  (extraBtn.length !== 0 || menu || t.props.importBtnUrl || t.props.deleteBtnShow) &&
                  <span className={styles.line}> </span>
                }
              </span>
              </Popconfirm>
            }
            {
              t.props.deleteBtnShow &&
              <span>
              <span className={common.cp} onClick={t.props.setDelConfirm}>
                <MyIcon className={styles.baseFont} type="icon-shanchu" style={{color:'#FF692E',fontSize:15}}/>
                <span>删除</span>
              </span>
              <Modal
                visible={t.props.delConfirm}
                onOk={t.doFatherFunction.bind(t, 'deleteBtn')}
                onCancel={t.doFatherFunction.bind(t, 'deleteBtnCancel')}
              >
                <div style={{textAlign:'center',fontSize:'18px'}}>确定要删除吗?</div>
              </Modal>
                {
                  (extraBtn.length !== 0 || menu || t.props.importBtnUrl || t.props.importBtn ) &&
                  <span className={styles.line}> </span>
                }
           </span>
            }
            {
              t.props.checkBtn &&t.props.checkBtn.visible&&
              <span>
              <span className={common.cp} onClick={t.props.checkBtn.showModalFun}>
                <MyIcon className={styles.baseFont}
                        type={t.props.checkBtn.icon||"icon-queding"}
                        style={{color:'#6D85EE',fontSize:15,...t.props.checkBtn.iconStyle}}/>
                <span>{t.props.checkBtn.name}</span>
              </span>
              <Modal
                visible={t.props.checkModalVisible}
                onOk={t.props.checkBtn.onOkFun}
                onCancel={t.props.checkBtn.onCancelFun}
              >
                <div style={{textAlign:'center',fontSize:'18px'}}>{t.props.checkBtn.description}</div>
              </Modal>
                {
                  (extraBtn.length !== 0 || menu || t.props.importBtnUrl || t.props.importBtn ) &&
                  <span className={styles.line}> </span>
                }
           </span>
            }
            {
              extraBtn.map((item, index) => {
                let iconStyle = item.iconStyle || {};
                return (
                  <span key={index}>
                  <span className={common.cp} onClick={t.extraBtnClick.bind(t, index)}>
                    <MyIcon style={{...iconStyle, marginLeft: 10, marginRight: 4}} type={item.icon}/>
                    <span>{item.name}</span>
                  </span>
                    {
                      (extraBtn.length - 1 !== index || menu ) &&
                      <span className={styles.line}> </span>
                    }
                </span>
                )
              })
            }
            {
              t.props.menu &&
              <Dropdown
                overlay={t.props.menuSub || []}
                trigger={['click']}
              >
              <span>
                <MyIcon style={{fontSize: 12, marginLeft: 8}} type="icon-gongnengleixing"/> {t.props.menu.name}
                <Icon type="down"/>
              </span>
              </Dropdown>
            }
            {
              t.props.importBtnUrl && t.props.importBtnShow &&
              <Dropdown overlay={menuImport} trigger={['click']} disabled={t.props.upDisabled}>
                <span style={{cursor:'pointer'}}>
                  <MyIcon className={styles.baseFont} style={{color:t.props.upDisabled?'#90B3EE':'#6D85EE'}} type="icon-daoru"/>
                  <span style={{color:t.props.upDisabled?'#ccc':'#A1A1A1'}}>导入</span>
                </span>
              </Dropdown>
            }
          </div>
        }
        <div>
          {t.props.children}
        </div>
      </div>
    )
  }
}

export default Container;
