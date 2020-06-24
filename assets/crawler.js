
var axios = require('axios')
var cheerio = require('cheerio')

axios.defaults.timeout = 5000; //设置超时时间为5s

//url = 'https://zhima998.com/infolist.php?q=ssni&m=&f=_all&s=&p=1'

//resultList = [];

function zhima998(keyword) {
    const siteName = "cabbage";
    let searchUrl = `https://zhima998.com/infolist.php?q=${encodeURI(keyword)}&m=&f=_all&s=&p=1`;
    let resultList = [];

    return new Promise((resolve, reject) => {
        axios.get(searchUrl).then(res => {
                //console.log(res.data);
                const $ = cheerio.load(res.data);
                let lists = $("li[class^='list']");
                console.log(lists.length)
                //let magnet = `${lists.eq(1).find('a').eq(1).attr('href')}`.toLowerCase();

                for (let i = 0; i < lists.length; i++) {
                    var magnet = `${lists.eq(i).find('a').eq(1).text()}`
                    //console.log(magnet)
                    let name = `${lists.eq(i).text()}`
                    name = name.match(/[^\n]+/g)[0]
                    //console.log(name)
                    let order = `第${i}项`

                    if (isMagnet(magnet)) {
                        resultList.push([order, magnet, name])
                    } else {
                        console.log(`已经移除原本第${i}项，内容是：`, magnet) //不是磁力链接返回数据，可能本身就是空的
                    }
                }
                console.log(resultList[0])
                resolve(resultList);

            })
            .catch(err => {
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
    zhima998
    // bthub,//访问慢
    // wuguibt,//访问慢
];

zhima998('ssni')
