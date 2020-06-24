const cheerio = require('cheerio')
const axios = require('axios')

function yhg22(searchUrl) {

    const siteName = "雨花阁";
    //let searchUrl = `https://www.yhg22.xyz/search/${encodeURI(keyword)}-1.html`;
    let resultList = [];
    return new Promise((resolve, reject) => {
        axios.get(searchUrl).then(async res => {
            const $ = cheerio.load(res.data);
            let lists = $('#wall .search-item');
            if (lists.length) {
                console.log(`${siteName}-${lists.length}条结果`);
                for (let i = 0; i < lists.length; i++) {
                    let infoUrl = "https://www.yhg22.xyz" + lists.eq(i).find('.item-title>h3>a').attr('href')
                    //    let magnet = await yhg22_getInfo(infoUrl); //不导出manage信息
                    let name = lists.eq(i).find('.item-title>h3>a').text()
                    let size = lists.eq(i).find('.item-bar>span').eq(2).children('b').text() || "";
                    let date = lists.eq(i).find('.item-bar>span').eq(1).children('b').text() || "";
                    let order = `第${i+1}项`;
                    if (1) {
                        resultList.push({
                            order,
                            name,
                            //    magnet,
                            size,
                            date,
                            siteName,
                            infoUrl
                        })
                    } else {
                        if ($config.debug) {

                            console.log("移除一项数据");
                        }

                    }
                };
            }

            resolve(resultList);
           // console.log(resultList)
        }).catch(err => {
            regect(err)
        }).finally(() => {

        })
    });
}


module.exports = yhg22 //这个是肯定没有问题的

//yhg22('ssni')