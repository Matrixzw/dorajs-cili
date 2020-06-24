/*
这个模块是控制搜索的，额外的还用量儿topType的模式，但是问题出现在要点击才能显示

*/

module.exports = {
  type: 'topTab',
  async fetch({ args }) {
    this.title = '搜索' + args.keyword; //args.keyword就是代表的搜索输入关键字

    keyword = args.keyword
    console.log(keyword)
    if(keyword==null||undefined){
      $ui.toast('关键字为空')
      return []
    }
    //
    let openSearchHistory = $prefs.get('search_history'); //$prefs为全局api，读取配置项（prefs）中的值，其实只是一个布尔值
    if (openSearchHistory) { //如果是true
      let historyKeyword = [];
      if ($storage.get('historyKeyword')) { //$storage也是全局api，获取key的值
        historyKeyword = $storage.get('historyKeyword').split(",");
      };
      if (historyKeyword.indexOf(keyword) === -1) { //返回数组的位置，没有找到返回-1。之前没有搜索过就添加紧historyKeyword里面
        historyKeyword.push(keyword)
        $storage.put('historyKeyword', historyKeyword.splice(-30, 30).join(",")) //相当于保留后面的10条数据，但是我没有明白，什么意思
      }
    };
  
    items = [{
      title: '雨花阁',
      route: $route('searcha', {keyword: args.keyword})
    },
    {
      title: '磁力狗',
      route: $route('searcha_2', {keyword: args.keyword})
    }].reverse();
    
    return {
      tabMode: 'fixed',
      items: items
    }

  }
};
