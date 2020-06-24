const cheerio = require('cheerio')
const axios = require('axios')

function ciligou(searchUrl) {

    const siteName = "磁力狗";
    //let searchUrl = `https://www.yhg22.xyz/search/${encodeURI(keyword)}-1.html`;
    let resultList = [];
    return new Promise((resolve, reject) => {
        axios.get(searchUrl).then(async res => {

            const $ = cheerio.load(res.data);

            let lists = $('#Search_list_wrapper>li');
            if (lists.length) {
                console.log(`${siteName}-${lists.length}条结果`);
                for (let i = 0; i < lists.length; i++) {
                    let infoUrl = "http://ciligou0.com" + lists.eq(i).find('.SearchListTitle_list_title>a').attr('href')
                    let name = lists.eq(i).find('.SearchListTitle_list_title>a').text()
                    let temp = lists.eq(i).find('.Search_list_info').text() || "";
                    let size = /文件大小.(.*?)创建时间/.exec(temp)[1]
                    let date = /(\d{4}-\d{2}-\d{2})/.exec(temp)[1];
                    let order = i+1;
                    let hot = lists.eq(i).find('span.Search_result_type').text() || "";
                    if (1) {
                        resultList.push({
                            order,
                            name,
                            size,
                            date,
                            siteName,
                            hot, //热度
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
            //console.log(resultList) //不要输出结果了
        }).catch(err => {
            reject(err)
        }).finally(() => {

        })
    });
}


module.exports = ciligou //这个是肯定没有问题的

//  url = 'http://ciligou0.com/search?word=ssni&sort=rele';
//  ciligou(url)

