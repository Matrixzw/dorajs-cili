
// 组件的入口文件，首先调用的文件名。这里就是展示了history的地方

module.exports = {
    type: 'list',

    async fetch() {
        let historyKeyword = [];
        if ($storage.get('historyKeyword')) { //获得key-value的本地存储数据key的值
            historyKeyword = $storage.get('historyKeyword').split(",") //把原本'ad,ad,da,da'的数据变为['da','da','da']
        };

        let listData = [];
        historyKeyword.map(item => { //map 就是一个单值函数作用到每个分量上面，就相当于排版了历史记录
            listData.push({ //历史记录所展示的数据
                title: item, //展示的就是item名称
                spanCount: 10,
                route: $route("search", {
                    keyword: item
                }), //点击之后跳转的路由，包括参数item。这个就是search中的arg.keyword
                onLongClick: () => {
                    historyKeyword.splice(historyKeyword.findIndex(keyword => keyword === item), 1);
                    $storage.put('historyKeyword', historyKeyword.join(","))
                    this.refresh(); //刷新页面
                }, //长按的操作，清除该项
            },
                {
                    title: '删除',
                    spanCount: 2,
                    onClick: () => {
                        historyKeyword.splice(historyKeyword.findIndex(keyword => keyword === item), 1);
                        $storage.put('historyKeyword', historyKeyword.join(","))
                        this.refresh(); //刷新页面 存放方式是{historyKeyword:'6,10,神探狄仁杰,ssni'}
                        // console.log($storage.get('historyKeyword')),
                        console.log($storage.all())
                    },

                })
        });
        if ($storage.get('historyKeyword')) { //如果全部清空了就不显示
            listData.push({
                title: '清空历史记录',
                onClick: async () => {
                    let ok = await $input.confirm({
                        title: '确认全部清空？',
                        //  message: 'are you sure',
                        okBtn: '确认'
                    });
                    if (ok == true) {
                        $storage.remove('historyKeyword');
                        this.refresh()
                    }
                }
            })
        }
        return listData; //这里才是展示的历史数据的地方
    }
};
