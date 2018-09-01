/**
 * rtmp 播放器
 * 需引入 video.js 也可npm安装
 * 基本参数如下
 *   width: 650,
 *   height: 500,
 *   autoplay: true,
 *   controls: false,
 *   notSupportedMessage: '您的浏览器没有安装或开启Flash,戳我开启！',
 *   techOrder: ["html5", "flash"],
 *   sources: [{src: 'rtmp://live.hkstv.hk.lxdns.com/live/hks', type: 'rtmp/mp4'}],
 *   poster:picUrl || pathUrl('images/map/nopic.jpg'),
 */

import {Component} from 'react';

class VideoPlayer extends Component {

  componentDidMount () {

    // videojs.options.flash.swf = pathUrl('js/videojs/video-js.swf');
    this.player = videojs(this.videoNode, this.props, function onPlayerReady () {
      this.on('mouseup', (e)=>{//双击全屏
        if(this.clickTime){
          const dtime = new Date() - this.clickTime;
          if(dtime < 500){
            if(!this.isFullscreen()){
              this.requestFullscreen();
            }else{
              this.exitFullscreen();
            }
            this.clickTime = null;
          }else{
            this.clickTime = new Date();
          }

        }else{
          this.clickTime = new Date();
        }
      });
    });
    // this.player.on("error",function(e){//错误提示
    //   var $e = $(".vjs-error .vjs-error-display .vjs-modal-dialog-content");
    //   var $a = $("<a href='http://www.adobe.com/go/getflashplayer' target='_blank'></a>").text($e.text());
    //   $e.empty().append($a);
    // });
    // videojs('vidId').ready(function() {
    //   this.hotkeys({
    //     volumeStep: 0.1,
    //     seekStep: 5,
    //     enableVolumeScroll: false, //禁用鼠标滚轮调节问音量大小
    //     enableModifiersForNumbers: false
    //   });
    // });
  }

  componentWillUnmount () {
    if (this.player) {
      this.player.dispose();
    }
  }

  render () {
    const id = parseInt(Math.random() * 10000);
    return (
      <div style={{width: this.props.width, height: this.props.height}}>
        <video
          ref={node => this.videoNode = node}
          className="video-js vjs-default-skin vjs-big-play-centered"
          controls={false}
          preload="none"
          muted="true"
          style={{width: "100%", height: "100%", pointerEvents: 'auto'}}
        >
          <p className="vjs-no-js">
            要查看此视频，请启用JavaScript，并考虑升级浏览器。
            <a href="http://videojs.com/html5-video-support/" target="_blank">
              支持 HTML5 视频
            </a>
          </p>
        </video>
        <div style={{display: "none"}}>
          <a id={"fullscreen" + id} onClick={this.requestFullscreen}></a>
        </div>
      </div>
    );
  }

  play = () => {
    // if (this.player) {
    //     this.player.play()
    // }
  }
  requestFullscreen = ()=>{
    if (this.player) {
      this.player.requestFullscreen()
    }
  }
  exitFullscreen = ()=>{
    if (this.player) {
      this.player.exitFullscreen()
    }
  }
}
export default VideoPlayer;
