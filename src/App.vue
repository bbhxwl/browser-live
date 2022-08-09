
<template>
  <div style="height: 100%;width: 100%;">

    <div  v-for="item in list"  class="kuai">
      <video controls :id="item.id"  v-show='item.isShowVideo'   style="width: 100%;height: 100%;position: relative;"></video>
      <div v-show='!item.isShowVideo' >
        <el-input placeholder="输入名称查看" v-model="item.url"></el-input>
        <el-button style="width: 100%;" round type="primary" @click="submitUrl(item)">在线观看</el-button>
        <el-button style="width: 100%;margin: 0;"  round type="danger" v-if="item.id=='v4'&&!item.isShowVideo" @click="chuanLiu">点我直播屏幕</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import LiveUrl from "@/liveUrl";
export default {
  name: 'App',
  data(){
    return {
      list:[
        {
          id:"v1",
          url:"",
          isShowVideo:false,
          srsPush:null,
          videoStream:null
        },
        {
          id:"v2",
          url:"",
          isShowVideo:false,
          srsPush:null,
          videoStream:null
        },
        {
          id:"v3",
          url:"",
          isShowVideo:false,
          srsPush:null,
          videoStream:null
        },
        {
          id:"v4",
          url:"",
          isShowVideo:false,
          srsPush:null,
          videoStream:null
        }
      ]
    }
  },
  mounted() {

    if(this.$route.query.name&&this.$route.query.name.length>5){
      this.list[0].url=this.$route.query.name
      this.submitUrl(this.list[0]);
    }
  }
  ,
  methods:{
    submitUrl(item){
      if(item.url.length<=5){
        this.$message.error('必须输入5个字符以上');
        return;
      }
      let sdk = new SrsRtcPlayerAsync();
      let v= document.getElementById(item.id);
      console.log(v)
      v.srcObject=sdk.stream;
      sdk.play("webrtc://"+LiveUrl+"/live/pubg/"+item.url.trim()).then(function(session){
        v.play();
        console.log("session",session)
        item.isShowVideo=true
      }).catch(reason=> {
        sdk.close();
        this.$message.error(reason);
        console.error(reason);
      });
    }
    ,
    chuanLiu(){
      if (navigator.mediaDevices === undefined||navigator.mediaDevices.getDisplayMedia===undefined){
        this.$message.error('浏览器可能不支持直播，但是可以观看');
        return;
      }
      var name=prompt("(斌斌)输入自定义名称不能重复，然后分享给别人","")
      if (name!=null && name!=""&&name.length>5)
      {
        navigator.mediaDevices.getDisplayMedia({video: {
            frameRate:60

          }}).then((mediastream) => {
          // 拿到流后 获取到视频中所有的track 取其中第一个videotrack
          let videoTrack = mediastream.getVideoTracks()[0]
          console.log(videoTrack)
          // 通过 videotrack 的getsettings 拿到constrants的对象
          let videoConstraints = videoTrack.getSettings()
          console.log("videoConstraints",videoConstraints)
          let sdk = new SrsRtcPublisherAsync();
          sdk.s=mediastream;
          sdk.publish("webrtc://"+LiveUrl+"/live/pubg/"+name.trim()).then(session=>{
            this.$message.success("共享屏幕成功，可以分享给别人了,让他输入你起的名称，点【在线观看】")
          }).catch(reason=> {
            this.$message.error(reason);
          });
        }).catch((err) => {
          // 获取摄像头失败，可以通过 err.name 或者 err.message 来判断错误原因，err并没有返回错误错误码
        })
      }else if (name.length<=5){
        this.$message.error("名称必须大于5位");
      }
    },

    copy(copyContent, isAlert, maxLength) {
      if (window.clipboardData) {
        window.clipboardData.setData("Text", copyContent);
      }
      if (document.execCommand) {
        var copyTextarea = document.createElement("textarea");
        document.body.appendChild(copyTextarea);
        copyTextarea.innerText = copyContent;
        copyTextarea.select();
        document.execCommand("Copy");
        copyTextarea.parentNode.removeChild(copyTextarea);
      }
      if (isAlert) {
        if (typeof isAlert === "function") {
          isAlert(copyContent);
        } else {
          maxLength && (copyContent.length > maxLength) && (copyContent = copyContent.substr(0, maxLength) + "…");
          alert(`“${copyContent}”复制成功！`);
        }
      }
    }

  }
}

</script>

<style>
.kuai{
  height: 50%;width: 50%;float: left;
}
</style>
