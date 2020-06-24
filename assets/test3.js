

var axios = require('axios')
var cheerio = require('cheerio')



function zhima998(keyword) {
    const siteName = "cabbage";
    let searchUrl = `https://zhima998.com/infolist.php?q=${encodeURI(keyword)}&m=&f=_all&s=&p=1`;
    let resultList = [];

    return new Promise((resolve, reject) => {
        axios.get(searchUrl).then(res => {
            const $ = cheerio.load(res.data);

            let lists = $('body > div.container > .list-group>.list-group-item');

            if (lists.length) {
                console.log(`${siteName}-${lists.length}条结果`);
                for (let i = 0; i < lists.length; i++) {
                    let magnet = `${`${lists.eq(i).find('a').eq(1).attr('href')}`.toLowerCase()}`;
                    let name = lists.eq(i).text().split("\n")[0].trim() || "";
                    let size = "";
                    let date = "";
                    let order = `第${i}项`

                    if (isMagnet(magnet)) {
                        resultList.push({
                            order,
                            name,
                            magnet,
                            size,
                            date,
                           // siteName,
                            searchUrl
                        })
                    } else {
                            console.log(`已经移除原本第${i}项，内容是：`, magnet) //不是磁力链接返回数据，可能本身就是空的          
                    }
                };
            }
            console.log(resultList[0])
            resolve(resultList);
        }).catch(err => {
            resolve(resultList)
        }).finally(() => { })
    });
}

// 利用正则表达式判断是不是为磁力链接。
function isMagnet(str) {
    return /^(magnet:\?xt=urn:btih:)/.test(str);
}

module.exports = [
    // cilibao,
    // btsow,
    // xhub,
    // sobt0,
    zhima998,
    // bthub,//访问慢
    // wuguibt,//访问慢
    require('./yhg22.js')
];

yhg22('ssni') //调用测试
