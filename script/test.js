const spider = require("./spider");
//const json = require('./json')
const axios = require('axios')



save_config = {
  url: 'https://netcut.cn/api/note/update',
  method: 'post',
  data: {
    note_id: "e25c675226edff85",
    note_content: `adfaf`,
  }
};

//console.log(save_config)

axios(save_config).then(res => {
  console.log(res.data)
})