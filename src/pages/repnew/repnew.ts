// 此文件是由模板文件 ".dtpl/page/$rawModuleName.ts.dtpl" 生成的，你可以自行修改模板
const getUuid = require('uuid/v4');
import {pagify, MyPage, wxp} from 'base/'
@pagify()
export default class extends MyPage {
  data = {
    repInfo:{
      id: 0,
      nickName: '用户A',
      src: "http://file06.16sucai.com/2016/0403/bf104fd28ab2a1ec129df5acf69b32a5.jpg",
      time: "15分钟前",
      title: "",
      sub: "",
      content: "",
      agree: 15,
      commentList: ["评论1","评论2","评论3"]
    }
  }

  async onLoad(options: any) {
    console.log(await wxp.getUserInfo())
  }
  
  /*
  获取实时输入值
  */
  onTitleChange(e:any){
    //console.log(e.detail.detail.value);
    this.data.repInfo.title=e.detail.detail.value;
  }
  onContentChange(e:any){
    //console.log(e.detail.detail.value);
    this.data.repInfo.content=e.detail.detail.value;
  }

  /*
  点击发布按钮
  */ 
  onConfirmTap(e:any){
    //console.log(e);
    //console.log("title"+this.data.repInfo.title);
    //console.log("content"+this.data.repInfo.content);

    if( 0 && (this.data.repInfo.title.length==0 || this.data.repInfo.content.length==0)){//测试先允许空输入
      wxp.showToast({
        icon:"none",
        title:"请检查标题和内容"
      })
    }
    else{
      //获取用户信息的备份
      const userInfo= JSON.parse(JSON.stringify(this.store.userInfo)); 
      //创建返回的帖子对象
      const repInfo = new Object({
        id: this.store.repInfos.length,
        uuid:getUuid(),
        nickName: userInfo.nickName,
        src: userInfo.avatarUrl,
        time: new Date(),
        title: this.data.repInfo.title,
        sub: this.data.repInfo.content.substr(0,20),
        content: this.data.repInfo.content,
        agree: 15,
        commentList: [{
          id: '0',
          src: "http://file06.16sucai.com/2016/0403/bf104fd28ab2a1ec129df5acf69b32a5.jpg",
          nickName: '用户AA',
          time: '5分钟前',
          zone: '地区/学校',
          company: '公司名',
          post: '岗位',
          content: '具体问题。。。。'
        },{
          id: '1',
          src: "http://file06.16sucai.com/2016/0403/bf104fd28ab2a1ec129df5acf69b32a5.jpg",
          nickName: '用户AB',
          time: '10分钟前',
          zone: '地区/学校',
          company: '公司名',
          post: '岗位',
          content: '具体问题。。。。'
        }]
      })

      console.log(repInfo);
      
      //更新
      this.store.repInfos.unshift(repInfo)
      wxp.navigateBack({delta:1});
      
    }
    //console.log(getUuid());
    
  }
  /*
  guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
  }
  */

}
