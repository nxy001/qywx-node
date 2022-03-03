const FormData = require('form-data');
const axios = require('axios');
const AccessToken = require('./accesstoken')();

module.exports = function(router) {
    router.post('/media/upload', async function (req, res, next) {
    
        let {media:file} = req.files || {};
        console.log(req.files);
        
        let {type} = req.body || {} ;
        const access_token = await AccessToken.getToken();
    
        // 组件一个form，用来上传文件
        const form = new FormData();
        form.append('filename', file.name);
        form.append('filelength', file.size);   
        form.append('media',file.data,file.name);
    
        const {data} =  await axios.post('https://qyapi.weixin.qq.com/cgi-bin/media/upload', 
        form,
        {
            params: {
                access_token,
                type
            },
            headers: {
                "Content-Type": "multipart/form-data"
            },        
        });
    
        console.log(data);
        res.send(data);
    });
    
};