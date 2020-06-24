
const cheerio = require('cheerio')
const axios = require('axios')

// 目标就是提取给定infoUrl的磁力链接
// 这个页面就是关键爬虫的
// 数据返回到searchb_2中展示

infoUrl = 'http://ciligou0.com/information/rav3xs6qd7h62ybqsh7kbiym3drjhc4k';

function ciligoub(infoUrl) {

    let result = [];
    return new Promise((resolve, reject) => {
        axios.get(infoUrl).then(async res => {
            const $ = cheerio.load(res.data);

            let magnet = $('.Information_l_content>a').eq(0).text();
            let temp =$('.Information_l_content').eq(1).text();
            let visit_time = /访问次数.(\d+)/.exec(temp)[1] || '';
            let files_num = /文件数目.(\d+)/.exec(temp)[1] || '';
            result.push({ magnet ,visit_time,files_num}); //竟然magnet拼写错误导致打不开

            let lists_result =[];
            let lists = $('ul.File_list div.File_list_info') || '';
            for(i=0; i<lists.length; i++){
                lists_name = lists.eq(i).children()[0].prev.data;
                lists_size = lists.eq(i).find('div').text()
                lists_result.push({lists_name,lists_size})
            }
            result.push(lists_result)

            resolve(result);
           // console.log(result)
        }).catch(err => {
            reject(err)
        }).finally(() => {

        })
    });
};

//问题出现在这个函数返回的并不是单纯的数据，而是一个Promise对象。里面包含了正确和错误的信息

module.exports = ciligoub; //这个是肯定没有问题的 之前导出的是一个数组然后老是出问题


//ciligoub(infoUrl)
