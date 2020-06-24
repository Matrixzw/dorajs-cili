const ciligoub = require("../assets/ciligoub")

// 获取第二层的爬虫结果显示出来
/*
这个来控制显示结果,这个是第二层的页面。也就是搜索结果之后再点击进入才能获取磁力链接的页面
*/

module.exports = {
    type: 'list', //我们想让search可以点击进入另一个页面获取值
    allowBookmark: true,
    async fetch(context) { //删除了,page的参数，会出现搜索框，然后自动将输入的参数作为args.keyword

        // console.log(context.args.order) //当前的路由，应该就是searchb
        // console.log(context.from) //来源的路由，应该是search {args:{keyword:'神探狄仁杰'},path:'search'}

        let data = await ciligoub(context.args.infoUrl) //现在暂时只能返回一个magnet的数据

        //console.log('data',data)
        let listData = [{
            title: context.args.name
        }, {
            title: context.args.date
        }, {
            title: '文件数量',
            spanCount: 4,
            summary: data[0].files_num
        }, {
            title: '文件大小',
            spanCount: 4,
            summary: context.args.size
        }, {
            title: '访问次数',
            spanCount: 4,
            summary: data[0].visit_time
        }];

        // this.title = '';
        //this.subtitle = `${data.length} 条结果`;
        //控制搜索之后的结果，data应该是一个键值对的样子比如，[order:1,name:'aa',magnet:'adaf']
        //这里是展示搜索之后的结果的

        listData.push({
            title: '长按复制到剪贴板，点击直接浏览器打开',
            summary: `${data[0].magnet}`,


            onLongClick: () => { //长按复制
                $clipboard.text = data[0].magnet;
                $ui.toast("复制成功!")
            },
            onClick: () => { //点击打开浏览器
                $ui.browser(data[0].magnet) //显示用那个浏览器打开，打开方式
            }},{
                title: '■文件详情■'
            }
        );

        for(i=0; i<data[1].length; i++){
            listData.push({
                title:data[1][i].lists_name,
                spanCount: 10
            },{
                title: data[1][i].lists_size,
                spanCount: 2
            })
        };

        return listData //这样就能够展现出来了

    }
}



