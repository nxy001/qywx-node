/*
 * @Author: NIXY
 * @LastEditors: NIXY
 * @Date: 2022-02-10 15:34:00
 * @LastEditTime: 2022-03-03 14:45:36
 * @Description: desc
 * @FilePath: \CodeSameples\routes\index.js
 */
var express = require('express');
var router = express.Router();
const axios = require('axios');
const Config = require('../main.config');
const AccessToken = require('../server/accesstoken')('external');
const UrlEncode = require('urlencode')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'nixy' });
});
/* 扫码登录 */
router.get('/login', function (req, res, next) {
  res.render('login', Config);
});
/* web授权登录 */
router.get('/loginWeb', function (req, res, next) {
  const encodeUrl = UrlEncode('http://xzdz.yinhaiyun.com/houtai/redirect')
  const webUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+Config.corpid+'&redirect_uri='+encodeUrl+'&response_type=code&scope=snsapi_base&state=#wechat_redirect'
  res.send(webUrl)
});
/* 用户基本信息页面 */
router.get('/redirect',async function (req, res, next) {
  let query = req.query;
  let corpid = Config.corpid;
  let corpsecret = Config.secret;
  const access_token = await AccessToken.getToken();
  
  const {data:{
    UserId:userid
  }} = await axios.get('https://qyapi.weixin.qq.com/cgi-bin/user/getuserinfo',{
    params:{
      access_token,
      code:query.code
    }
  })

  const {data:userinfo} = await axios.get('https://qyapi.weixin.qq.com/cgi-bin/user/get',{
    params:{
      access_token,
      userid
    }
  })
  res.render('redirect',userinfo);
});




module.exports = router;
