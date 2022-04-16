/*
输入：入口文件，
输出：跳转路由search，search_a_2。search是主要的一个界面

*/




module.exports = {
    type: 'list',
    searchRoute: $route("search"), 


    async fetch() {

        items = [
            {
                style: 'dashboard',
                title: '磁力lite',
                textColor: '#284253',
                image: $icon('label', '#7a5e5a'),
                color: '#94BBBB',
                spanCount: 12
            },


            {
                title: '点击搜索',
                image: $icon('search', '#94bbbb'),
                spanCount: 12,
                onClick: async () => {
                    let keyword = await $input.prompt({
                        title: '输入搜索内容',
                        value: ''
                    });
                    if (keyword) {
                        $router.to($route('search', { keyword: keyword.trim() }))
                    }
                }
            }
        ];

        let search_obj = $storage.all();
        let search_name = Object.keys(search_obj);

        let listData = [];
        search_name.map(item => {
            listData.push({
                title: item,
                spanCount: 8,
                route: $route("search", { keyword: item }),
                onLongClick: () => {
                    $storage.remove(item)
                    this.refresh();
                },
            }, {
                title: '搜索次数：' + search_obj[item],
                spanCount: 2
            },
                {
                    title: '删除',
                    spanCount: 2,
                    onClick: () => {
                        $storage.remove(item)
                        this.refresh();
                    },

                })
        });




        items.push({
            style: 'label',
            title: '历史记录',
            spanCount: 12
        });


        if ($storage.all() != null) {
            listData.push({
                title: '清空历史记录',
                style: 'label',
                spanCount: 12,
                onClick: async () => {
                    let ok = await $input.confirm({
                        title: '确认全部清空？',
                        okBtn: '确认'
                    });
                    if (ok == true) {
                        search_name.map(item => {
                            $storage.remove(item);
                            this.refresh()
                        });
                    }
                }
            })
        };


        items = items.concat(listData)


        return items

    }
};


