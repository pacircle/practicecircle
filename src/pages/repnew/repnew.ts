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

  async onLoad(options: any) {
    //console.log(await wxp.getUserInfo())
    wxp.showModal({
      title:"提示",
      //电脑上不会换行，手机上是会的
      content:"评论会由我们进行评选，优质复盘可能会获得红包，我们希望获得的复盘有如下标准：\r\n1.内容详细;\r\n2.过程的复盘比较完整内容不小于200字;\r\n3.有自己的体验和心得;\r\n4.内容原创，而非搬运",
      showCancel:false
    })
  }
  
  /*
  获取实时输入值
  */
  onTitleChange(e:any){
    // console.log(e.detail.value);
    // this.data.title=e.detail.detail.value;
    this.setDataSmart({
      title: e.detail.value
    })
  }
  onContentChange(e:any){
    console.log(e.detail.value);
    // this.data.content=e.detail.detail.value;
    this.setDataSmart({
      sub: e.detail.value.substr(0,20),
      content: e.detail.value
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
        url: "https://wechatx.offerqueens.cn/user/article/add",
        data:{
          openid: store.openid,
          content: data.content,
          title: data.title,
          sub: data.content.substr(0,20)
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
              _id: res.data.articleItem._id,
              nickName: userInfo.nickName,
              avatarUrl: userInfo.avatarUrl,
              time: res.data.articleItem.time,
              title: data.title,
              sub: data.sub,
              //sub: this.data.content.substr(0,20)+(this.data.content.length>20?"...":""),
              content: data.content,
              agree: 0,
              commentList: [],
              user_agree: false,
              user_collect: false,
              readTime: 1
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
