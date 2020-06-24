
const axios = require('axios')
const cheerio = require('cheerio'); //cheerio类似于jsquery的

function yhg22(keyword) {

    const siteName = "雨花阁";
    let searchUrl = `https://www.yhg22.xyz/search/${encodeURI(keyword)}-1.html`;
    let resultList = [];
    return new Promise((resolve, reject) => {
        axios.get(searchUrl).then(async res => {
            const $ = cheerio.load(res.data);
            let lists = $('#wall .search-item');
            if (lists.length) {
                console.log(`${siteName}-${lists.length}条结果`);
                for (let i = 0; i < lists.length; i++) {
                    let infoUrl = "https://www.yhg22.xyz" + lists.eq(i).find('.item-title>h3>a').attr('href')
                    let magnet = await yhg22_getInfo(infoUrl);
                    let name = lists.eq(i).find('.item-title>h3>a').text()
                    let size = lists.eq(i).find('.item-bar>span').eq(2).children('b').text() || "";
                    let date = lists.eq(i).find('.item-bar>span').eq(1).children('b').text() || "";

                    if (isMagnet(magnet)) {
                        resultList.push({
                            name,
                            magnet,
                            size,
                            date,
                            siteName,
                            searchUrl
                        })
                    } else {
                        if ($config.debug) {

                            console.log("移除一项数据", magnet);
                        }

                    }
                };
            }

            resolve(resultList);
            console.log(resultList[0])
        }).catch(err => {
            resolve(resultList)
        }).finally(() => {

        })
    });
}
// 输出的resultList结果
// { 
//     name: '[ThZu.Cc]ssni-322',
//     magnet: 'magnet:?xt=urn:btih:1b6db2321989804f63d4f2d8322cd086f02c4f7b',
//     size: '1',
//     date: '3.4 GB',
//     siteName: '雨花阁',
//     searchUrl: 'https://www.yhg22.xyz/search/ssni-1.html'
//   }
function yhg22_getInfo(url) {
    return new Promise((resolve, reject) => {
        axios.get(url).then(res => {
            const $ = cheerio.load(res.data);
            let magnet = String($(".download").attr('href')).toLowerCase();


            resolve(magnet)
        }).catch(err => {
            reject(err)
        })
    })
};

function isMagnet(str) {
    return /^(magnet:\?xt=urn:btih:)/.test(str);
}

yhg22('ssni')