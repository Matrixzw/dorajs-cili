
// 组件的入口文件，首先调用的文件名。这里就是展示了history的地方
module.exports = {
  type: 'list',
  searchRoute: $route("search"), //启动search.js路由。这个就指定了有一个search框架
  actions: [{
    title: '历史记录',
    route: $route('search_history')//跳转到历史记录里面，会展示历史搜索数据。这个是在上方显示的内容，actions
  },{
    title: '退出程序',
    onClick: async function(){
      this.finish()
    }
  }], //是一个 Action 数组，设置后会在界面顶部显示菜单项，名称就是title


  //开始返回一些数据，显示一些数据
  async fetch() {

    // iu
    

    return [
      {
        title: ''
      },
      {
        title: ''
      },    
      {
        title: '历史记录',
        image: $icon('history'),
        spanCount: 6,
        onClick: async () => {
          $router.to($route('search_history'))
        }
      },
      {
        title: '点击搜索',
        // summary: '输入文本内容',
        image: $icon('search', 'yellow'),
        spanCount: 6,
        onClick: async () => {
          let keyword= await $input.prompt({
            title: '输入搜索内容',
          // hint: 'name',
            value: ''
          });
          //console.log(keyword)
          if(keyword){//如果输入不是空集的话
          $router.to($route('search',{keyword: keyword.trim()}))//用strim防止他出现空格回车
        }}
      },
    ]
  }


};
