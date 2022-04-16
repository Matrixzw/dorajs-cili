

const axios = require('axios')
const cheerio = require('cheerio')
const iconv = require('iconv-lite')
const jschardet = require('jschardet')
const json = require('./json')
const spider = require('./spider')
const fs = require('fs')
const { stringify } = require('querystring')


// 发送 POST 请求


id = 'mg192' + 1001;






/*
输入： id
输出： 一个obj对象，包含一个列表。输出的是promise对象吧

*/

function get_list(id) {

    url = `https://www.chaojibiaoge.com/System/Model/getData?modelid=oa_sheet&rowCount=11&page=1&pagerows=11&filter=(RemoteService%3AUNI.service.WebSearchService-%3EgetWebSearchData_filter(%3CDYH%3Erytufg75%3CDYH%3E%2C%3CDYH%3E${id}%3CDYH%3E))&orderby=sort&view_id=&searchword=&sql=&getRecordCount=true&usermodel_recordid=20101010480039507847&sharekey=rytufg75&pageId=&autoFilter=%7B%7D&sumFields=&showPageModel=SIMPLEPAGE`

    config = {
        method: 'get',
        url: url
    };

    return new Promise((resolve, reject) => {
        axios(config).then(res => {


            let data = res.data.rows[0];
    
            console.log(data)
            if (data){
                id = data.SYS_string5;
                stu_name = data.SYS_string6;
                analysis_score = data.SYS_string7;
                algebra_score = data.SYS_string8;
                all_score = data.SYS_string9;
                rank = data.SYS_string10;

                list = [id, stu_name, analysis_score, algebra_score, all_score, rank];


                resolve(list)
            };



        }, () => {
            console.log('error')
        })

    }
    )

}

async function get_lists() {
    let data = [];
    let i = 0;
    for (i = 1008; i <= 1010; i++) {
        if (i != 1034) {
            temp = await get_list('dz192' + i);
            data.push(temp)
        };
    };
    console.log(data);
};

get_lists();



// data.forEach(elem => {
//     console.log(elem[5])
// });



