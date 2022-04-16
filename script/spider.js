
const axios = require('axios')
const cheerio = require('cheerio')
const iconv = require('iconv-lite')
const jschardet = require('jschardet')
const json = require('./json')

module.exports = {
    get_cheerio,
    get_index
}


/*
输入：url地址，base_url
输出：待解析的html网页，准备使用cheerio解析

*/

async function get_cheerio(url, base_url, headers) {
    var config = {
        responseType: 'stream',
        headers: headers || '',
        baseURL: base_url || ''
    };

    return new Promise((resolve, reject) => {

        if (/undefined/.test(url)) {
            reject('正常处理反馈：get_item function has empty url')
        }

        axios(url, config).then(res => {
            let chunks = [];


            if (/404/.test(res.data.responseUrl)) {
                reject('err message status 404')
            }

            res.data.on('data', chunk => {
                chunks.push(chunk);
            });

            res.data.on('end', () => {
                let buffer = Buffer.concat(chunks); //把Buffer中的和之后的拼接起来，用了concat函数

                let charset = jschardet.detect(buffer).encoding //这个东西就是用来判断网页的代码的      
                let html = iconv.decode(buffer, charset); //现在html也可以直接显示出来了，后面一步是格式化一下

                $ = cheerio.load(html, { decodeEntities: false });

                resolve($)


            })
        }).catch(err => {
            console.log('error message');

            if (err.response) {
                switch (err.response.status) {
                    case 501: reject(`err message: this data cannot get with code 501`)
                        break;
                    case 404: reject(`err message: Page Not Found`)
                        break;
                }
            } else {
                console.log('err message: ' + err.status)

            };
        })
    })

}






/*
输入：url地址
输出：title, second_url, time, size, hot, recent_download
*/
async function get_index(url, json_api, base_url, headers) {
    let items = [];
    return new Promise((resolve, reject) => {
        get_cheerio(url, base_url, headers).then($ => {


            let list = $(json_api.item.selector);


            let data_list_name = ['title', 'second_url', 'time', 'size', 'hot', 'recent_download'];

            list.each((index, element) => {
                let data = []


                data_list_name.map(name => {
                    data[name] = keyword_switch(json_api[name], $(element));
                });

                items.push(data)

            })
            resolve(items)
        }, err => {
            console.log('errer message')
            reject(err)
        });

    })
};

// get_index('https://www.yhg55.xyz/search/ssni-1.html',json_api).then(res=>{
//     console.log(res)
// })



/*
输入：第二层的json对象，也就是例如indexRul_title这种，还有一个value表示html待选择的代码块。
输出：处理之后的title
描述：使用正则表达式提取相关数据，
*/
var keyword_switch = (json_api_2, value) => {
    if (json_api_2) {
        if (json_api_2.selector && json_api_2.selector != 'this') {
            value = value.find(json_api_2.selector)
        };
        switch (json_api_2.fun) {
            case 'html': value = value.html(); break;
            case 'attr': value = value.attr(json_api_2.param); break
            case 'text': value = value.text().trim(); break;
            case undefined: return '';
        };
        if (json_api_2.regex) {
            if (json_api_2.replacement) {
                return value.replace(RegExp(json_api_2.regex), json_api_2.replacement)
            } else if (/\(/.test(json_api_2.regex)) {
                return value.match(RegExp(json_api_2.regex))[1] //选择的时候希望能用括号括起来，这里不能正则表达式里面有括号\\(不行
            } else {
                return value.match(RegExp(json_api_2.regex))[0]
            }
        };
        return value

    } else {
        return ''
    }

};



