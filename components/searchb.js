const json = require("../script/json");
const axios = require('axios')

module.exports = {
    type: 'list',
    allowBookmark: true,

    async fetch({ args }) {

        let items = [];

        var second_base_url = json[args.website].second_base_url?json[args.website].second_base_url:json[args.website].base_url;

        var config = {
            url: args.second_url,
            baseURL: second_base_url
        }

        try{
            var res = await axios(config);
            var magnet = res.data.match(/(magnet:\?xt=urn:btih:)[0-9a-fA-F]{40}/g)[0]

            console.log(magnet)
        }catch(e){
            console.log(e);
            console.log('可能是在axios获取的时候出错了')
            return {
                title: '出现一些错误'
            }
        }




        items.push({
            title: '长按复制到剪贴板，点击直接浏览器打开',
            summary: magnet,


            onLongClick: () => {
                $clipboard.text = magnet;
                $ui.toast("复制成功!")
            },
            onClick: () => {
                $ui.browser(magnet)
            }
        });

        return items


    }
}