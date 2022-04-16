

//global.cilih_base_url = 'https://3dg7xnx2.xyz/'; 
//release page：https://cilidog.fun/ 
//check time: 2022-1-13 
//remark: 连接速度真的垃圾


clp_base_url = 'https://www.clp555.xyz'
//release page: https://www.cilipa.net/index.html, 
//check time: 2021-7-31 2022-1-13
//remark: 里面包含haoseqi网址，这个速度最快了。


sokankan_base_url = 'https://www.sokankan74.cc/'
//release page: https://cursor.vip/vip http://sokankan.top/
//check time: 2022-1-13


clm_base_url = 'https://clm141.xyz/'
//release page: 请收藏地址布页：磁力猫.com 磁力猫咪.com 魔法猫咪.lol 哆啦a猫.com 猫和老鼠.com
//check time: 2022-1-13

clb_base_url = 'https://clb5000.xyz/';
//release page: 磁力宝宝.com
//check tiem: 2022-1-13
// 这个应该和上面那个通框架的，所以在json里面是一样的呈现的



var clp = {
    base_url: clp_base_url,
    index_url: `/Search/ssni`,
    second_base_url: clp_base_url+ '/Search',
    item: {
        selector: 'div[class="panel panel-default"]'
    },
    title: {
        selector: 'h5>a',
        fun: 'text'
    },
    second_url: {
        selector: 'h5>a',
        fun: 'attr',
        param: 'href'
    },
    time: {
        selector: 'table td>span>i',
        fun: 'text'
    },
    size: {
        selector: 'table td>span>b',
        fun: 'text',
    }
}

var sokankan = {
    base_url: sokankan_base_url,
    index_url: `/search.html?name=ssis`,
    second_url: '',
    item: {
        selector: 'div.list-view>article>div'
    },
    title: {
        selector: 'h4',
        fun: 'text',
    },
    time: {
        selector: 'p',
        fun: 'text',
        regex: '((创建时间：|Created：).*?)\\s'
    },
    size: {
        selector: 'p',
        fun: 'text',
        regex: '((文件大小：|Size：).*?B)'
    },
    hot: {
        selector: 'p',
        fun: 'text',
        regex: '((热度：|Hot：).*?)\\s'
    },
    second_url: {
        selector: 'a',
        fun: 'attr',
        param: 'href'
    }
}

var clm = {
    base_url:clm_base_url,
    index_url:'/search-ssni-0-0-1.html',
    item: {
        selector: 'div.tbox>div.ssbox'
    },
    title: {
        selector: 'div.title a',
        fun: 'text',
    },

    time: {
        selector: 'div.sbar>span',
        fun: 'text',
        regex: '(添加时间:\\d{4}-\\d{2}-\\d{2})'
    },
    size: {
        selector: 'div.sbar>span',
        fun: 'text',
        regex: '(大小:.*?)最'
    },
    second_url: {
        selector: 'div.title a',
        fun: 'attr',
        param: 'href'
    },
    recent_download: {
        selector: 'div.sbar>span',
        fun: 'text',
        regex: '(最近下载:\\d{4}-\\d{2}-\\d{2})'
    },
    hot: {
        selector: 'div.sbar>span',
        fun: 'text',
        regex: '(热度:.*)'
    }
}

var clb = {
    base_url:clb_base_url,
    index_url:'/search-ssni-0-0-1.html',
    item: {
        selector: 'div.tbox>div.ssbox'
    },
    title: {
        selector: 'div.title a',
        fun: 'text',
    },

    time: {
        selector: 'div.sbar>span',
        fun: 'text',
        regex: '(添加时间:\\d{4}-\\d{2}-\\d{2})'
    },
    size: {
        selector: 'div.sbar>span',
        fun: 'text',
        regex: '(大小:.*?)最'
    },
    second_url: {
        selector: 'div.title a',
        fun: 'attr',
        param: 'href'
    },
    recent_download: {
        selector: 'div.sbar>span',
        fun: 'text',
        regex: '(最近下载:\\d{4}-\\d{2}-\\d{2})'
    },
    hot: {
        selector: 'div.sbar>span',
        fun: 'text',
        regex: '(热度:.*)'
    }
}

module.exports = {
    clp,
    sokankan,
    clm,
    clb
}
