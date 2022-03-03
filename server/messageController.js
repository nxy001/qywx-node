/*
 * @Author: NIXY
 * @LastEditors: NIXY
 * @Date: 2022-02-10 15:34:00
 * @LastEditTime: 2022-03-03 14:53:21
 * @Description: desc
 * @FilePath: \CodeSameples\server\messageController.js
 */
const axios = require('axios');
const AccessToken = require('./accesstoken')();
const Config = require('../main.config');
const sha1 = require('sha1')

module.exports = function(router) {
    // 发送推送消息
    router.post('/message/send', async function (req, res, next) {
        // 从前端请求中获取对应的参数
        let {form:form_parames} = req.body || {};        
        // 将 agentid 拼入请求的结构体中
        let request_data  = {
            ...form_parames,
            agentid:Config.agentid,
        };
        request_data.safe = form_parames.safe ? '1' : '0';
        // 获取 Access Token
        const access_token = await AccessToken.getToken();
        // 向消息推送的 Api 发送对应的数据结构体
        const {data} =  await axios.post('https://qyapi.weixin.qq.com/cgi-bin/message/send', 
        request_data,
        {
            params: {
                access_token
            }
            
        });
        // 返回请求的结果
        res.send(data);
    
    
    });
    /**
     * 获取微信签名
     * 在使用js-sdk api前调用wx.config 等需要使用此接口
     */
    router.post('/message/sign',async function(req, res, next){
        // 从前端请求中获取对应的参数
        let {url:webUrl} = req.body || {}; 
        const access_token = await AccessToken.getToken();
        const noncestr = (Math.random()*1000000).toFixed(0)
        const timestamp = new Date().getTime()
        // 向消息推送的 Api 发送对应的数据结构体
        const {data} =  await axios.get('https://qyapi.weixin.qq.com/cgi-bin/get_jsapi_ticket?access_token='+access_token, );
        let {ticket: ticket} = data
        const str = 'jsapi_ticket='+ticket+'&noncestr='+noncestr+'&timestamp='+timestamp+'&url='+webUrl
        const signStr = sha1(str)
        res.send({
            noncestr,
            timestamp,
            signStr,
            corpid:Config.corpid,
        })
    })
    
};