const crawler = require("./yhg22.js");  //调用了crawler爬虫的程序,
//调用yhg22表示不用manage信息，其实这个里面就是展示一下那些数据
//这个不过是将爬虫程序集合一下然后处理一下，现在这里去掉这些过程

function httprequest(keyword) {
  return new Promise((resolve, reject) => { 
    let reqArray = []
    for (let i = 0; i < crawler.length; i++) {
      reqArray.push(crawler[i](keyword)) //调用crawler的那些函数，那些函数就是爬虫的主要函数了.数据存在reqArray中
    };
    
    Promise.all(reqArray).then((dataArray) => {//看这里好像是全部搞成promise的东西的
      let result = [];
      for (let i = 0; i < dataArray.length; i++) {
        result = [...result, ...dataArray[i]] //...表示转化为逗号分隔符的序列
      };
      let finallyArray = result; //再调用了一下那个算函数，处理了一下result
      console.log(`已采集-${finallyArray.length}条结果`);
      resolve(finallyArray) //返回finallyArray数组，应该就是相当于那样的结果
      
    }).catch(err => {
      reject(err)
    }).finally(() => {

    })
  })
};

function uniq(arr) {
  let oldArrayLength = arr.length
  let hash = {};
  let newArr = deleteAd(arr);


  let lastArr = newArr.reduce(function(item, next) {
    hash[next.magnet] ? '' : hash[next.magnet] = true && item.push(next);
    return item
  }, []);
  console.log(`已过滤${arr.length-oldArrayLength}条结果`);
  return lastArr;
};

function deleteAd(arr) {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].name.indexOf("等千部合集") === -1 && arr[i].name.indexOf("嶶信") === -1 && arr[i].name.indexOf("维信") === -1 && arr[i].name.indexOf("維信") === -1) {
      newArr.push(arr[i]);
    }
  }
  return newArr;
}

module.exports = httprequest;

httprequest('ssni')