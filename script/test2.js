
const axios = require('axios')
const cheerio = require('cheerio')
const iconv = require('iconv-lite')
const jschardet = require('jschardet')
const json = require('./json')
const spider = require('./spider')



str = 'ssis-052\n' +
'                       \n' +
'                              \n' +
'                           文件大小：7.63 G    创建时间：2021-06-13';


ans = str.match(/(创建时间：\d{4}-\d{2}-\d{2})/)

console.log(ans)



// second_url ='http://wx880.site/detail?id=mg_NEXgBx4FVNZNYtfjY';
// base_url ='https://www.sokankan2.cc/';


// spider.get_cheerio(second_url).then($ => {
    

//     let magnet = $('input#src_manger').attr('value');


//     console.log(magnet)

// })




