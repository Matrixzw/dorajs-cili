const spider = require("../script/spider");
const json = require("../script/json");

module.exports = {
    type: 'list',

    async fetch({ args, page }) {
        let items = [];

        let data = [];

        let base_url = json[args.website].base_url;

        url = json[args.website].index_url.replace('ssni', encodeURI(args.keyword))
        data = await spider.get_index(url, json[args.website], base_url);


        if (data.length) {
            data.map(item => {
                items.push({
                    title: item.title,
                    summary: `♢ ${item.time} \n ${item.size} \t ${item.hot} `,
                    route: $route('searchb', { second_url: item.second_url, website: args.website }),
                })
            })



            return {
                items: items,
            }
        } else if (page == undefined) {
            $ui.toast('搜索结果为空');

        }

    }
}