const yhg22b = require("../assets/yhg22b")

//应该是如果有search.js都会自动生成一个搜索框
/*
这个来控制显示结果,这个是第二层的页面。也就是搜索结果之后再点击进入才能获取磁力链接的页面
*/

module.exports = {
    type: 'list', //我们想让search可以点击进入另一个页面获取值
    async fetch(context) { //删除了,page的参数，会出现搜索框，然后自动将输入的参数作为args.keyword

      //  url = 'https://www.yhg222.xyz/hash/127.html'
        // console.log(context.args.infoUrl) //调用args的内容
        // console.log(context.route) //当前的路由，应该就是searchb
        // console.log(context.from) //来源的路由，应该是search {args:{keyword:'神探狄仁杰'},path:'search'}

        let data = await yhg22b(context.args.infoUrl) //现在暂时只能返回一个magnet的数据

        let listData = [];

        this.title = '详情页';
        //this.subtitle = `${data.length} 条结果`;
        //控制搜索之后的结果，data应该是一个键值对的样子比如，[order:1,name:'aa',magnet:'adaf']
        //这里是展示搜索之后的结果的
        for (let i = 0; i < data.length; i++) {
            listData.push({
                title: '长按复制到剪贴板，点击直接浏览器打开',
                summary: `${context.args.name} | ${data[i].magnet}`,

                
                onLongClick: () => { //长按复制
                    $clipboard.text = data[i].magnet;
                    $ui.toast("复制成功!")
                },
                onClick: () => { //点击打开浏览器
                    $ui.browser(data[i].magnet) //显示用那个浏览器打开，打开方式
                }
            })

            return listData //这样就能够展现出来了
        }
    }
}



