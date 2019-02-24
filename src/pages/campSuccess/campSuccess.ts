// 此文件是由模板文件 ".dtpl/page/$rawModuleName.ts.dtpl" 生成的，你可以自行修改模板

import {pagify, MyPage} from 'base/'

@pagify()
export default class extends MyPage {
  data = {
    modalHidden: true,
  }

  async onLoad(options: any) {
    //console.log(await wxp.getUserInfo())
    
    this.store.dontRelogin=true//看文章的时候不许重新登录
  }
  onUnload(){
    this.store.dontRelogin=false//看文章的时候不许重新登录
  }
  getSignWay(e:any){
    this.setDataSmart({
      modalHidden: false
    })
  }

  modalConfirm(){
    this.setDataSmart({
      modalHidden: true
    })
  }

  modalCandel(){
    this.setDataSmart({
      modalHidden: true
    })
  }
}
