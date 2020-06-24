const httprequest = require("../assets/cili")

//应该是如果有search.js都会自动生成一个搜索框

module.exports = {
  type: 'list', //我们想让search可以点击进入另一个页面获取值
  async fetch({ args}) { //删除了,page的参数，会出现搜索框，然后自动将输入的参数作为args.keyword
    let keyword = 'ssni'; //args.keyword就是代表的搜索输入关键字



    let data = await httprequest(keyword); //去调用httpprequest，等出结果
    let listData = [];
    this.subtitle = `${data.length} 条结果`;
    //控制搜索之后的结果，data应该是一个键值对的样子比如，[order:1,name:'aa',magnet:'adaf']
    //这里是展示搜索之后的结果的
    for (let i = 0; i < data.length; i++) {
      listData.push({
        title: data[i].order,
        summary: `${data[i].name} | ${data[i].size} }`,
     //   route: $route('search2',{'url':data[i].url}),
      //  onClick: () => {

      //    $clipboard.text = data[i].magnet;
      //    $ui.toast("复制成功!")
       // },
        onLongClick: () => {
          $ui.browser(data[i].magnet) //显示用那个浏览器打开，打开方式
        }
      })
    }
    return listData //这样就能够展现出来了
  }
};
