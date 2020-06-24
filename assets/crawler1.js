const cheerio = require('cheerio'); //cheerio类似于jsquery的

var axios = require('axios')

axios.defaults.timeout = 5000; //设置超时时间为5s

// function bthub(keyword) {
//   let searchUrl = `https://bthub.site/search/kw-${encodeURI(keyword)}-1.html`;
//   let resultList = [];
//   const siteName = "bthub";
//   return new Promise((resolve, reject) => {
//     axios.get(searchUrl).then(res => {
//       const $ = cheerio.load(res.data);
//       let lists = $('#wall .search-item');
//       if (lists.length > 0) {
//         console.log(`${siteName}-${lists.length}条结果`);

//         for (let i = 0; i < lists.length; i++) {
//           let magnet = `magnet:?xt=urn:btih:${`${lists.eq(i).find('.item-title>h3>a').attr('href')}`.match(/\/hash\/(.*?).html/)[1].toLowerCase()}`;
//           let name = lists.eq(i).find('.item-title>h3>a').text()
//           let size = lists.eq(i).find('.item-bar>span').eq(0).children('b').text() || "";
//           let date = lists.eq(i).find('.item-bar>span').eq(1).children('b').text() || "";
//           if (isMagnet(magnet)) {
//             resultList.push({
//               name,
//               magnet,
//               size,
//               date,
//               siteName,
//               searchUrl
//             })
//           } else {
//             if ($config.debug) {
//               console.log("移除一项数据", magnet);
//             }

//           }
//         };
//       };

//       resolve(resultList);
//     }).catch(err => {
//       resolve(resultList)
//     }).finally(() => {})
//   });
// };

// function wuguibt(keyword) {
//   let searchUrl = `https://www.wuguibt.cc/search-${encodeURI(keyword)}-0-0-1.html`;
//   let resultList = [];
//   const siteName = "wuguibt";
//   return new Promise((resolve, reject) => {
//     axios.get(searchUrl).then(res => {
//       const $ = cheerio.load(res.data);
//       let lists = $('#wall .search-item');
//       if (lists.length > 0) {
//         console.log(`${siteName}-${lists.length}条结果`);
//         for (let i = 0; i < lists.length; i++) {
//           let magnet = `magnet:?xt=urn:btih:${`${lists.eq(i).find('.item-title>h3>a').attr('href')}`.match(/\/hash\/(.*?).html/)[1].toLowerCase()}`;
//           let name = lists.eq(i).find('.item-title>h3>a').text()
//           let size = lists.eq(i).find('.item-bar>span').eq(2).children('b').text() || "";
//           let date = lists.eq(i).find('.item-bar>span').eq(1).children('b').text() || "";
//           if (isMagnet(magnet)) {
//             resultList.push({
//               name,
//               magnet,
//               size,
//               date,
//               siteName,
//               searchUrl
//             })
//           } else {
//             if ($config.debug) {

//               console.log("移除一项数据", magnet);
//             }
//           }
//         };
//       };

//       resolve(resultList);
//     }).catch(err => {
//       resolve(resultList)
//     }).finally(() => {})
//   });
// };

function zhima998(keyword) {
  const siteName = "cabbage";
  let searchUrl = `https://zhima998.com/infolist.php?q=${encodeURI(keyword)}&m=&f=_all&s=&p=1`;
  let resultList = [];

  return new Promise((resolve, reject) => {
    axios.get(searchUrl).then(res => {
      const $ = cheerio.load(res.data);
      
      let lists = $('body > div.container > .list-group>.list-group-item');

      if (lists.length) {
        console.log(`${siteName}-${lists.length}条结果`);
        for (let i = 0; i < lists.length; i++) {
          let magnet = `${`${lists.eq(i).find('a').eq(1).attr('href')}`.toLowerCase()}`;
          let name = lists.eq(i).text().split("\n")[0].trim() || "";
          let size = "";
          let date = "";

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
    }).catch(err => {
      resolve(resultList)
    }).finally(() => {})
  });
}

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
// 
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

//yhg22('ssni')
// function magnetSearch(keyword) {
//   // https://www.magnet-search.com/search/BANK-002/1
//   let searchUrl = `https://www.magnet-search.com/search/${encodeURI(keyword)}/1`;
//   let resultList = [];
//   const siteName = "magnetSearch";

//   return new Promise((resolve, reject) => {
//     axios.get(searchUrl).then(res => {
//       const $ = cheerio.load(res.data);
//       let lists = $('ul.list-group>.list-group-item');
//       if (lists.length > 0) {
//         console.log(`${siteName}-${lists.length}条结果`);
//         for (let i = 0; i < lists.length; i++) {
//           let magnet = `magnet:?xt=urn:btih:${`${lists.eq(i).find('h3>a').attr('href')}`.replace("/details/","").toLowerCase()}`;
//           let name = lists.eq(i).find('h3>a').text();
//           let size = lists.eq(i).find('.list-inline>li').eq(1).text().replace('File Size:', "") || "";
//           let date = formateDate(lists.eq(i).find('.list-inline>li').eq(0).text().replace('ecord Time:')) || "";

//           if (isMagnet(magnet)) {
//             resultList.push({
//               name,
//               magnet,
//               size,
//               date,
//               siteName,
//               searchUrl
//             })
//           } else {
//             if ($config.debug) {

//               console.log("移除一项数据", magnet);
//             }
//           }
//         };
//       };

//       resolve(resultList);
//     }).catch(err => {
//       resolve(resultList)
//     }).finally(() => {

//     })
//   });

//   function formateDate(str) {
//     let date = new Date(str);
//     let day = zeroFill(date.getDate())
//     let month = zeroFill(date.getMonth() + 1)
//     let year = date.getFullYear();
//     return `${year}/${month}/${day}`
//   };

//   function zeroFill(num) {
//     return num < 10 ? `0${num}` : num
//   }
// };

// function btsow(keyword) {
//   // `https://btsow.club/search/ipz-921`
//   const siteName = "btsow";
//   let searchUrl = `https://btsow.club/search/${encodeURI(keyword)}`;
//   let resultList = []
//   return new Promise((resolve, reject) => {
//     axios.get(searchUrl).then(res => {
//       const $ = cheerio.load(res.data);
//       let lists = $('.data-list>.row');
//       if (lists.length) {
//         console.log(`${siteName}-${lists.length}条结果`);
//         for (let i = 1; i < lists.length; i++) {
//           let magnet = `magnet:?xt=urn:btih:${`${lists.eq(i).find('a').attr('href').replace("https://btsow.club/magnet/detail/hash/","")}`.toLowerCase()}`;
//           let name = lists.eq(i).find('a').attr('title').trim() || "";
//           let size = lists.eq(i).find('.size').text().trim() || "";
//           let date = lists.eq(i).find('.date').text().trim() || "";
//           if (isMagnet(magnet)) {
//             resultList.push({
//               name,
//               magnet,
//               size,
//               date,
//               siteName,
//               searchUrl
//             })
//           } else {
//             if ($config.debug) {

//               console.log("移除一项数据", magnet);
//             }
//           }
//         };
//       }

//       resolve(resultList);
//     }).catch(err => {
//       resolve(resultList)
//     }).finally(() => {})
//   });
// }

// function cilibao(keyword) {
//   // http://cilibao.biz/s/BANK-002_time_1.html
//   let searchUrl = `http://cilibao.biz/s/${encodeURI(keyword)}_time_1.html`;
//   let resultList = [];
//   const siteName = "cilibao";
//   return new Promise((resolve, reject) => {
//     axios.get(searchUrl).then(res => {
//       const $ = cheerio.load(res.data);
//       let lists = $('.search-list>.search-item');
//       if (lists.length > 0) {
//         console.log(`${siteName}-${lists.length}条结果`);
//         for (let i = 0; i < lists.length; i++) {

//           let magnet = `magnet:?xt=urn:btih:${`${lists.eq(i).find('.item-title>h3>a').attr('href')}` .match(/detail\/(.*)?\.html/)[1].toLowerCase()}`;
//           let name = lists.eq(i).find('.item-title>h3>a').text().trim();
//           let size = lists.eq(i).find('.item-bar b.cpill.yellow-pill').text().trim() || "";
//           let date = lists.eq(i).find('.item-bar>span').eq(1).find("b").text().trim() || "";
//           if (isMagnet(magnet)) {
//             resultList.push({
//               name,
//               magnet,
//               size,
//               date,
//               siteName,
//               searchUrl
//             })
//           } else {
//             if ($config.debug) {
//               console.log("移除一项数据", magnet);
//             }
//           }
//         };
//       };

//       resolve(resultList);
//     }).catch(err => {
//       resolve(resultList)
//     }).finally(() => {})
//   });


// };

// function sobt0(keyword) {
//   // http://sobt0.net/q/BANK-002.html
//   let searchUrl = `http://sobt0.net/q/${encodeURI(keyword)}.html`;
//   let resultList = [];
//   const siteName = "cilibao";

//   return new Promise((resolve, reject) => {
//     axios.get(searchUrl).then(res => {
//       const $ = cheerio.load(res.data);
//       let lists = $('.search-list>.search-item');
//       if (lists.length > 0) {
//         console.log(`${siteName}-${lists.length}条结果`);
//         for (let i = 0; i < lists.length; i++) {
//           let magnet = `magnet:?xt=urn:btih:${`${lists.eq(i).find('.item-title>h3>a').attr('href')}`.match(/\/torrent\/(.*?).html/)[1].toLowerCase()}`;
//           let name = lists.eq(i).find('.item-title>h3>a').text().trim();
//           let size = lists.eq(i).find('.item-bar b.cpill.yellow-pill').text().trim() || "";
//           let date = lists.eq(i).find('.item-bar>span').eq(1).find("b").text().trim() || "";
//           if (isMagnet(magnet)) {
//             resultList.push({
//               name,
//               magnet,
//               size,
//               date,
//               siteName,
//               searchUrl
//             })
//           } else {
//             if ($config.debug) {
//               console.log("移除一项数据", magnet);
//             }
//           }
//         };
//       };

//       resolve(resultList);
//     }).catch(err => {
//       resolve(resultList)
//     }).finally(() => {})
//   });


//   function zeroFill(num) {
//     return num < 10 ? `0${num}` : num
//   }
// };

// function xhub(keyword) {
//   // http://api.xhub.cn/api.php?op=search_list&callback=api&key=BANK-002&page=1

//   let searchUrl = `http://api.xhub.cn/api.php?op=search_list&callback=api&key=${encodeURI(keyword)}&page=1`;
//   let resultList = [];
//   const siteName = "xhub";

//   return new Promise((resolve, reject) => {
//     axios.get(searchUrl).then(res => {
//       let jsonStr = res.data.match(/api\((.*)?\)/)[1];
//       let jsonData = JSON.parse(jsonStr);
//       let magnetObj = jsonData.data;
//       if (jsonData.status === 200) {
//         let magnetList = Object.keys(magnetObj);
//         console.log(`${siteName}-${magnetList.length}条结果`);
//         for (let i = 0; i < magnetList.length; i++) {
//           let key = magnetList[i];
//           let magnet = `magnet:?xt=urn:btih:${key}`.toLowerCase();
//           if (isMagnet(magnet)) {
//             resultList.push({
//               name: magnetObj[key].title,
//               magnet: magnet,
//               size: magnetObj[key].size,
//               date: magnetObj[key].day,
//               siteName,
//               searchUrl
//             })
//           }
//         }
//       };

//       resolve(resultList);
//     }).catch(err => {
//       resolve(resultList)
//     }).finally(() => {})
//   });

//   function formateDate(str) {
//     let date = new Date(str);
//     let day = zeroFill(date.getDate())
//     let month = zeroFill(date.getMonth() + 1)
//     let year = date.getFullYear();
//     return `${year}/${month}/${day}`
//   };

//   function zeroFill(num) {
//     return num < 10 ? `0${num}` : num
//   }
// };

// 


function bytesToSize(bytes) {
  if (bytes === 0) return '0 B';
  let k = 1024,
    sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return (bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i];
}

function isChinese(str) {
  return /.*[\u4e00-\u9fa5]+.*$/.test(str)
};

// 判断是否为磁力链接
function isMagnet(str) {
  return /^(magnet:\?xt=urn:btih:)[0-9a-fA-F]{40}.*$/.test(str);
}
// https://professionaltools.tk/infolist.php?q=RCTS-016  资源少
// https://0mag.net/ 需要二次解析 /有爬虫权限校验
// http://zhongziba.biz/search?wd=ipz-921 需要二次解析
// http://ciligou.app/search?word=BANK-002 需要二次解析
// https://nwt.bthaha.buzz/cn/search/BANK-002/ 访问慢!



module.exports = [
  // cilibao,
  // btsow,
  // xhub,
  // sobt0,
  //zhima998, //这个网站突然没法访问了
  // bthub,//访问慢
  // wuguibt,//访问慢
  yhg22 //这个是肯定没有问题的
];

//yhg22('ssni') //调用测试

