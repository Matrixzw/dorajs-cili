/*
输入：携带args参数的跳转
输出：其实这个页面仅仅控制了搜索结果页面上面的tab，顺便处理了一下历史记录数据存储。
转向：seach_histroy就是显示历史记录的地方。还有两个items主要内容，list。
备注：2022-1-25将这个过程紧凑成了用map方式构建的东西
*/
const const_data = require("../script/const_data");


module.exports = {
  type: 'topTab',
  async fetch({ args }) {
    this.title = args.keyword;


    let set_open = $prefs.get('search');

    if (set_open) {
      if ($storage.get(args.keyword)) {
        $storage.put(args.keyword, $storage.get(args.keyword) + 1)
      } else {
        $storage.put(args.keyword, 1)
      }
    };


    var data = const_data.index_panel

    var items =[];

    data.map(item => {
      items.push({
        title: item.title,
        route: $route('searcha', { keyword: args.keyword, website: item.website })
      })
    })

  

    return {
      tabMode: 'fixed',
      items: items
    }

  }
}
