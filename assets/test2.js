

var cheerio = require('cheerio')
//var https = require('https') 这个用axios api代替了，对应了dorajs中的$http全局api

url = 'https://zhima998.com/infolist.php?q=ssni&m=&f=_all&s=&p=1'

// https.get(url, function (res) {
//     var data = "";
//     res.on('data', function (chunk) {
//         data += chunk;
//     });
//     res.on("end", function () {
//         console.log(data)
//     });
// })

var cheerio = require('cheerio') //类似css选择器，用来选择文本的
$ = cheerio.load(`<ul id="fruits">
<li class="apple">Apple</li>
<li class="orange">Orange</li>
<li class="pear">Pear</li>
</ul>`)

fruit = []

list = [1, 2, 4, 5];


var iconv = require('iconv-lite') //转化编码格式的教程


console.log(encodeURI('你好')) //转化为utf-6编码，其实是URL编码格式

//http://tool.chinaz.com/tools/urlencode.aspx 网站上可以测试URL编码的转化
//gb2312代码	B2E2CAD4 测试
// gb2312编码在线测试网站 https://www.haomeili.net/Code/DetailCodes
buf = iconv.encode("测试中文", 'gb2312'); //编码过程，输出Buffer格式
console.log(buf)
console.log(buf.toString('hex')); //hex是转化为16进制的东西，刚好gb2312就是转化为16进制的







console.log(1, ...[], ...[2, 3, 4], 5) //...表示展平，可以作为函数参数调用 输出 1,2,3,4,5

var axios = require('axios')
list = { 'a': 1, 'b': 2, 'a': 4 };
console.log(list.a)


let searchUrl = `https://www.yhg22.xyz/search/ssni-1.html`;

result = [];
// axios.get(searchUrl).then(async res => {
//     const $ = cheerio.load(res.data);
//     let lists = $('#wall .search-item');
//     console.log(`${lists.length}条结果`);
//     for (i = 0; i < lists.length; i++) {
//         let title = lists.eq(i).find('.item-title a[href]').text()
//         let url = lists.eq(i).find('a').attr('href')
//         result.push({
//             title,
//             url
//         }) //result.push({})中加了一个括号能够使得其变成键值对的形式
//     };
//     console.log(result)
// })


listData = [];
[1, 3, 4, 5].map(item => { //map就相当于把后面的一个单值函数作用到每一个分量上
    listData.push({ //历史记录所展示的数据
        title: item, //展示的就是item名称
        route: {
            keyword: item
        }, //点击之后跳转的路由，包括参数item。这个就是search中的arg.keyword
    })
})

console.log(listData);

console.log(['da,daf,daa,da', 'ads'].splice(-2, 2))


list = [
    {
        magent: 'magnet:?xt=urn:btih:1B6DB2321989804F63D4F2D8322CD086F02C4F7B',
        magent: 'da '
    }
]

console.log(list[0].magent)

ans = [];
if (null) {
    console.log('adads')
} else {
    ans.push({ 'adf': 1 })
    console.log(ans)
    console.log('这个是false的输出结果')
}

//console.log(Date.parse('2020-06-20T17:12:19.000Z')) //这个是时间戳的转化代码

console.log('   adfaddafs \n\t'.trim())
console.log('afd')

size = '708文件大小：5.53 GB创建时间：2019-08-26文件格式：.mp4';



list = [
    {
        magnet: 'magnet:?xt=urn:btih:882BBBCBD01FCFED603091FEA0A30CD8E2938B8A',
        visit_time: '708',
        files_num: '18'
    }
]

console.log('看看返回的是什么东西', list.push(1, 2, 'adf'))
console.log(list)


console.log(toString.call([{ dadd: 21 }, 2, 3]))

arr = 'adf,daf,daf'
console.log(arr.split(','))



items = [{
    title: '雨花阁',
    route:'searcha'
},
{
    title: '磁力狗',
    route: 'daf'
}];

console.log(items.reverse())