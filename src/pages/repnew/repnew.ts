// 此文件是由模板文件 ".dtpl/page/$rawModuleName.ts.dtpl" 生成的，你可以自行修改模板
// const getUuid = require('uuid/v4');
import {pagify, MyPage, wxp} from 'base/'
@pagify()
export default class extends MyPage {
  data = {

    title: "",
    sub: "",
    content: "",

  }

  // async onLoad(options: any) {
  //   console.log(await wxp.getUserInfo())
  // }
  
  /*
  获取实时输入值
  */
  onTitleChange(e:any){
    //console.log(e.detail.detail.value);
    // this.data.title=e.detail.detail.value;
    this.setDataSmart({
      title: e.detail.detail.value
    })
  }
  onContentChange(e:any){
    //console.log(e.detail.detail.value);
    // this.data.content=e.detail.detail.value;
    this.setDataSmart({
      sub: this.data.content,
      content: e.detail.detail.value
      //subValue: this.data.mainValue.toString
    })
  }

  /*
  点击发布按钮
  */ 
  onConfirmTap(e:any){
    let store:any = this.store
    let data= this.data
    //console.log(e);
    //console.log("title"+this.data.repInfo.title);
    //console.log("content"+this.data.repInfo.content);
    console.log(this.data)
    if( this.data.title.length==0 || this.data.content.length==0){//测试先允许空输入
      wxp.showToast({
        icon:"none",
        title:"请检查标题和内容,不可为空"
      })
    }
    else{
      //获取用户信息的备份
      const userInfo= JSON.parse(JSON.stringify(this.store.userInfo)); 
      wx.request({
        url: "http://127.0.0.1:7979/user/article/add",
        data:{
          openid: store.openid,
          content: data.content,
          title: data.title,
          sub: data.content
        },
        method: "POST",
        success:function(res){
          console.log(res)
          console.log(data.title)
          if (res.statusCode == 200){
            //创建返回的帖子对象
            console.log(res.data.id)
            console.log(res.data.time)
            const newArticle = new Object({
              id: res.data.articleItem.id,
              nickName: userInfo.nickName,
              avatarUrl: userInfo.avatarUrl,
              time: res.data.articleItem.time,
              title: data.title,
              sub: data.sub,
              //sub: this.data.content.substr(0,20)+(this.data.content.length>20?"...":""),
              content: data.content,
              agree: 0,
              commentList: []
            })
            console.log(newArticle);
        // commentList: [{
        //   id: '0',
        //   src: "http://file06.16sucai.com/2016/0403/bf104fd28ab2a1ec129df5acf69b32a5.jpg",
        //   nickName: '用户AA',
        //   time: '5分钟前',
        //   zone: '地区/学校',
        //   company: '公司名',
        //   post: '岗位',
        //   content: '具体问题1。。。。'
        // },{
        //   id: '1',
        //   src: "http://file06.16sucai.com/2016/0403/bf104fd28ab2a1ec129df5acf69b32a5.jpg",
        //   nickName: '用户AB',
        //   time: '10分钟前',
        //   zone: '地区/学校',
        //   company: '公司名',
        //   post: '岗位',
        //   content: '具体问题2。。。。'
        // }]
      // })
      
      
      //更新
      store.articleInfos.unshift(newArticle)
      wxp.navigateBack({delta:1});
    }},
        fail: function(res){
          wx.showToast({
            title: '更新列表失败，请检查网络后重新启动小程序',
            icon: 'none',
            duration: 2000
          })
        }
      })
      
      
      
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
