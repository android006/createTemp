import request from '../utils/request';
import config from '../config';
import Util from '../utils/Util'

export default class PublicService {

  /**
   * @param allProjectInfo 所有项目信息数组
   * @param valueIndex select option的value
   * @param textIndex select option的text
   * @param addAll 添加option {value: '', text: '全部'}
   * @returns {Array} 根据需要生成的select option配置
   */
  static transformProjectInfoToSelect (allProjectInfo, valueIndex, textIndex, addAll) {
    let selectOpts = [];
    if (allProjectInfo && allProjectInfo.length !== 0) {
      if (addAll) {
        selectOpts.push({value: '', text: '全部'});
      }
      for (let i = 0, l = allProjectInfo.length; i < l; i++) {
        selectOpts.push({
          value: allProjectInfo[i][valueIndex],
          text: allProjectInfo[i][textIndex]
        });
      }
    }
    return selectOpts;
  }

  /**
   * @param data 需要转换结构的源数据
   * @param needColNum 需要增加table序号列数据
   * @param needKey 需要增加唯一标识key
   * @param currentPage 当前页
   * @param pageSize 每页数据数目
   * @returns {*} 转换后的数据
   */
  static transformArrayData (data, needColNum, needKey, currentPage, pageSize) {
    // 需要添加table序号
    if (needColNum) {
      for (let i = 0; i < data.length; i++) {
        // 有分页
        if (currentPage && pageSize) {
          data[i]['num'] = pageSize * (currentPage - 1) + i + 1;
          // 无分页
        } else {
          data[i]['num'] = i + 1;
        }
      }
      // 需要添加唯一标识key
    }
    // 添加Key
    if (needKey) {
      for (let i = 0; i < data.length; i++) {
        // 若数据不存在key字段,则增加唯一标识key
        if (!data[i]['key']) data[i]['key'] = i;
      }
    }
    if (!needColNum && !needColNum) {
      console.info('检查transformArrayData方法参数(needColNum,needKey),返回数据结构未改变');
    }
    return data;
  }

  /**
   * 冒泡排序
   * @param arr 要排序的数据源
   * @param arrIndex 根据哪个字段排序
   */
  static arrSort (arr, arrIndex) {
    let len = arr.length;
    if (arrIndex) {
      for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - 1 - i; j++) {
          if (arr[j][arrIndex] > arr[j + 1][arrIndex]) {        // 相邻元素两两对比
            let temp = arr[j + 1];        // 元素交换
            arr[j + 1] = arr[j];
            arr[j] = temp;
          }
        }
      }
    } else {
      for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - 1 - i; j++) {
          if (arr[j] > arr[j + 1]) {
            let temp = arr[j + 1];
            arr[j + 1] = arr[j];
            arr[j] = temp;
          }
        }
      }
    }
    return arr;
  }

  /**
   * @param data 需要转换结构的源数据
   * @param parentKey 父元素Key值
   * @param newKey 子元素key
   */
  static addKey (data, parentKey, newKey) {
    // 添加Key
    if (newKey) {
      for (let i = 0; i < data.length; i++) {
        // 增加唯一标识key
        data[i]['key'] = parentKey + i + '';
      }
    }
    return data;
  }

  /**
   * 传递moment对象数组转换为对象,
   * 0号位为开始时间(startTime),1号位为结果时间(endTime),
   */
  static transformDataToObj (dateArray, obj) {
    let dateObj = {};
    let defaultObj = {
      startTime: 'startTime',
      endTime: 'endTime',
      dateFormat: 'YYYY-MM-DD HH:MM:SS'
    };
    defaultObj = obj || defaultObj;
    dateObj = {
      [defaultObj.startTime]: dateArray[0].format(defaultObj.dateFormat),
      [defaultObj.endTime]: dateArray[1].format(defaultObj.dateFormat)
    };
    return dateObj
  }

  /***
   * @columns 表格的columns属性
   * @returns {number} table宽度
   */
  static getTableWidth (columns) {
    let tableWidth = 0;
    for (let i = 0; i < columns.length; i++) {
      if (columns[i].width) {
        tableWidth = tableWidth + parseInt(columns[i].width)
      } else {
        console.log('PublicService->getTableWidth: columns 中没有配置width属性');
      }
    }
    return tableWidth;
  }

  /**
   * @param params 导出文件所需参数
   * @returns {*}   返回导出拼接字符串
   */
  static paramSerializer (params) {
    if (!params) return '';
    let urlPart = [];
    for (let k in params) {
      let value = params[k];
      if (value === null || Util.isUndefined(value)) continue;
      if (Util.isArray(value)) {
        for (let i = 0, l = value.length; i < l; i++) {
          urlPart.push(k + '=' + value[i])
        }
      } else {
        urlPart.push(k + '=' + value)
      }
    }
    return urlPart.join('&')
  }

  /**
   * @param  e 为判断的对象
   * @returns 返回true 为空对象,返回false为不是空对象
   */
  static isEmptyObject (e) {
    let t;
    for (t in e)
      return !1;
    return !0
  }

  /**
   * @param  ids 为后端传过来的 逗号,id
   * @returns 返回一个数组,可以在页面中的upload中展示
   */
  static changeImageFileList (ids, len) {
    if (ids === '') {
      return [];
    }
    let array = ids.split(',');
    let fileList = [];
    for (let i = 0, j = array.length; i < j; i++) {
      fileList.push({
        uid: len || i + 1,
        name: array[i],
        status: 'done',
        url: config.publicUrl + '/vortexfile/clientUploadFile/download/' + array[i]
      })
    }
    return fileList
  }

  /**
   * @param  array 为后端传过来的需要展示数据 array=[{name:'',id:''}]
   * @returns 返回一个数组,可以在页面中的upload中展示
   */
  static changeFilesList (data) {
    let fileList = [];
    let array = data ? data : [];
    for (let i = 0, j = array.length; i < j; i++) {
      let commonUrl = config.publicUrl + '/vortexfile/clientUploadFile/download/' + array[i].id;
      let afterUrl = config.publicPreviewAfter + '/vortexfile/clientUploadFile/download/' + array[i].id;
      let previewUrl = config.publicPreviewFront + '/view/url?url=' + encodeURIComponent(afterUrl);
      fileList.push({
        uid: array[i].id,
        pname: array[i].name,
        previewUrl: previewUrl,
        downloadUrl: commonUrl
      })
    }
    return fileList
  }

  // 浏览器全屏方法
  static fullScreen (element) {
    if (element.requestFullScreen) {
      element.requestFullScreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullScreen) {
      element.webkitRequestFullScreen();
    }
  }

  // 取消全屏
  static outFull () {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
    else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    }
    else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    } else {
      window.parent.showTopBottom();
    }
  }

  /**
   * 保存字段到cookie
   * @param c_name 要保存字段的名称
   * @param value 要保存字段的值
   * @param expireDays 过期时间
   */
  static setCookie (c_name, value, expireDays = 30) {
    document.cookie = c_name + "=" + escape(value);
    // cookie过期时间
    // let timeCode = Date.now();
    // let expireTimeCode = timeCode + (60 * 60 * 24 * expireDays);
    // if (expireDays)
    //   document.cookie = 'expireTimeCode=' + expireTimeCode
  }

  /**
   * 从cookie中取字段
   * @param c_name 要取得的字段名
   * @returns {string} 返回字段对应的值, 若字段不存在则返回空
   */
  static getCookie (c_name) {
    if (document.cookie.length > 0) {
      let c_start = document.cookie.indexOf(c_name + "=")
      if (c_start !== -1) {
        c_start = c_start + c_name.length + 1
        let c_end = document.cookie.indexOf(";", c_start)
        if (c_end == -1) c_end = document.cookie.length
        return unescape(document.cookie.substring(c_start, c_end))
      }
    }
    return ""
  };

  /**
   * 清空cookie中某字段
   * @param name 要清空的字段名
   */
  static clearCookie (name) {
    this.setCookie(name, "", -1);
  }

  /**
   *
   * @param userId 用户登录ID
   * @param menuId 当前路由
   */
  static loadGngcButton (userId, menuId, projectModuleCode) {
    let result;
    return request({
      url: '/pms/loadGngcButtonByMenuId',
      method: 'GET',
      params: {
        userId, menuId, projectModuleCode
      }
    }).then(
      data => {
        console.log(data)
        return data.ret
      }
    ).catch()
  }

  /**
   * 判断数组里是否有两个相同的数据
   * @param arr 需要做判断的数组
   * @return true 有重复的数据  false 没有重复的数据
   */
  static isRepeat (arr) {
    let hash = {};
    for (let i in arr) {
      if (hash[arr[i]])
        return true;
      hash[arr[i]] = true;
    }
    return false;
  }

  // 年份选择
  static yearSelect () {
    let curYear = new Date().getFullYear();
    let yearSelectOpt = [];
    for (let i = curYear - 100; i < curYear + 100; i++) {
      yearSelectOpt.push({
        text: i,
        value: i,
      });
    }
    return yearSelectOpt;
  }

  // 浏览器全屏方法
  static fullScreen (element) {
    if (element.requestFullScreen) {
      element.requestFullScreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullScreen) {
      element.webkitRequestFullScreen();
    }
  }

  /***
   * 将对象数组按照对象某一属性分组
   * 每组的数据保存属性data中
   * @param arr 目标数组
   * @param index 分组根据的属性名
   */
  static arrGroupBy (arr, index) {
    let map = {};
    let dest = [];
    for (let i = 0; i < arr.length; i++) {
      let ai = arr[i];
      if (!map[ai[index]]) {
        dest.push({
          [index]: ai[index],
          data: [ai]
        });
        map[ai[index]] = ai;
      } else {
        for (let j = 0; j < dest.length; j++) {
          let dj = dest[j];
          if (dj[index] == ai[index]) {
            dj.data.push(ai);
            break;
          }
        }
      }
    }
    return dest;
  }
}
