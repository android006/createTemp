/**
 * Created by GYL on 2019/1/22 Description: videoTest
 */
import React, { Component } from 'react';
import { message } from 'antd';
import { connect } from 'dva';
import request from '../../utils/request';
import cyberplayer from './sub/cyberplayer.js';

class VideoTest extends Component {
  state = {

  };
  componentDidMount(){
    this.player = cyberplayer("dvplay").setup({
      width: 700,
      height: 400,
      autostart: true,
      playlist: [{
        //代表播放条目的海报图片。
        image: "ABC.jpg",
        //对播放条目的描述，在播放器左上角显示。
        description: 'This is ABC',
        //播放条目媒体资源的地址, 支持统一视频不同码率的播放，但视频类型必须一致
        sources: [{
          file: "rtmp://183.129.170.218:10935/hls/stream_1",
          label: '视角一',
          width: 640,
        },{
          file: "rtmp://183.129.170.218:10935/hls/stream_1",
          label: '视角二',
          width: 640,
        }],
        //播放条目的标题，首次出现播放按钮的时候在播放器左上角显示
        title: "rtmp",
      }],
      stretching: "exactfit",
      volume: 100,
      controls: true,
      rtmp: {
        reconnecttime: 5, // rtmp直播的重连次数
        bufferlength: 1 // 缓冲多少秒之后开始播放 默认1秒
      },
      ak: "19cb66c2bc7748a281e0f4ef6788ebc2" // 公有云平台注册即可获得accessKey
    });
  };
  componentWillUnmount(){
    this.player.remove();
  }
  render(){
    let t = this;
    let {} = t.state;
    return(
      <div style={{width: '100vw',height: '100vh'}}>
        <div id="dvplay"></div>
      </div>
    )
  }
}
function mapStateToProps (state) {
  return {
  };
}
export default connect(mapStateToProps)(VideoTest);
