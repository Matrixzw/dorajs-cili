
const cheerio = require('cheerio')
const axios = require('axios')

// 目标就是提取给定infoUrl的磁力链接
// 这个页面就是关键爬虫的，获取第二页的数据

infoUrl = 'https://www.yhg22.xyz/hash/127.html';

function yhg22b(infoUrl) {

    let result = [];
    return new Promise((resolve, reject) => {
        axios.get(infoUrl).then(async res => {
            const $ = cheerio.load(res.data);

            let magnet = $('div.panel-body>a').eq(0).text();

            result.push({ magnet }) //竟然拼写错误导致打不开

            resolve(result);
            //console.log(result)
        }).catch(err => {
            reject(err)
        }).finally(() => {

        })
    });
};

//问题出现在这个函数返回的并不是单纯的数据，而是一个Promise对象。里面包含了正确和错误的信息

module.exports = yhg22b; //这个是肯定没有问题的 之前导出的是一个数组然后老是出问题




// new Promise((resolve, reject) => {
//     let reqArray = []

//     reqArray.push(yhg22_2(infoUrl)) //调用crawler的那些函数，那些函数就是爬虫的主要函数了.数据存在reqArray中

//     Promise.all(reqArray).then((dataArray) => {
//         console.log('看看到底是不是对数据在处理',dataArray)
//         let result = [];
//         for (let i = 0; i < dataArray.length; i++) {
//             result = [...result, ...dataArray[i]] //...表示转化为逗号分隔符的序列
//         };
//         console.log('处理玩的数据到底是怎么养的',result)
//         let finallyArray = result; //再调用了一下那个算函数，处理了一下result
//         console.log(`已采集-${finallyArray.length}条结果`);
//         resolve(finallyArray) //返回finallyArray数组，应该就是相当于那样的结果

//     }).catch(err => {
//         reject(err)
//     })
// })


// reqArray = []
// reqArray.push(yhg22_2(infoUrl))

// console.log(reqArray)

// yhg22_2(infoUrl).then(data => {
//     console.log('Promise函数要用then函数接受',data)
// },console.err)



// yhg22_2(infoUrl).then(temp => {
//     data = temp;
//     console.log(data)
// }, console.err)

// console.log(data)
