//const httprequest = require("../assets/cili") 这个原本是将所有爬虫程序结合起来的内容
const yhg22 = require("../assets/yhg22")

/*
调用函数，展示search的结果页面，第一页
*/


module.exports = {
  type: 'list',
  async fetch({ args, page }) {
    let keyword = args.keyword; //args.keyword就是代表的搜索输入关键字

    this.title = '搜索-' + keyword; //在搜索结果页面显示搜索-ssni类似


    //关键步骤调用httprequest代码，也就是cili里面的内容
    let searchUrl = `https://www.yhg22.xyz/search/${encodeURI(keyword)}-${page || 1}.html`; //||表示的应该是初始的值
    let data = await yhg22(searchUrl); //去调用httpprequest，等出结果 关键这个东西是什么类型的 应该有了await就是正常类型了
    let listData = [];
    this.subtitle = `${data.length} 条结果`;
    //控制搜索之后的结果，data应该是一个键值对的样子比如，[order:1,name:'aa',magnet:'adaf']
    //这里是展示搜索之后的结果的
    if(page==null){
      pageorder = 1;
    }else{
      pageorder = page + 1
    };
    for (let i = 0; i < data.length; i++) {
      listData.push({
        title: `第${pageorder}页，`+data[i].order + ': ' + data[i].name,
        summary: `包含${data[i].size}个文件 | ${data[i].date}\n${data[i].infoUrl}\n`, //关键的输出结果
        route: $route('searchb', data[i]), //data[i]到底是什么数据啊？，应该就是和我想的一样，但是要调用context。现在再试一次
        // onClick: () => {
        //   $clipboard.text = data[i].magnet;
        //   $ui.toast("复制成功!")
        // },
        // onLongClick: () => {
        //   $ui.browser(data[i].magnet) //显示用那个浏览器打开，打开方式
        // }
      })
    }
    return {
      items: listData,
      nextPage: page + 1 //返回去调用第二个数据，这种都是下拉刷新的模式
    }//应该是一些历史数据,这个就是搜索之后的显示结果了啊，里面就是一个表格
  }
};
