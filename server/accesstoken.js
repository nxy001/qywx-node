/*
 * @Author: NIXY
 * @LastEditors: NIXY
 * @Date: 2022-02-10 15:34:00
 * @LastEditTime: 2022-03-01 17:16:03
 * @Description: desc
 * @FilePath: \CodeSameples\server\accesstoken.js
 */
const axios = require('axios');
const Config = require('../main.config');
const fs = require('fs');
const path = require('path');
const sha1 = require('sha1')

let AccessToken = function(secretType) {
    const temp = secretType || 'common';
    return {
        _isExpire(create_time, expire_time) {
            const current = Math.floor(Date.now() / 1000);
            return create_time + expire_time < current;
        },
        async getToken () {
            let token = {};
            try {
                token = JSON.parse(fs.readFileSync(path.join(__dirname, '../token.json'), {
                    encoding: 'utf-8',
                }));
            } catch(err) {

            }
            // return 'lXRg_-GSu_twnNQ78ipfy9M9FbrGbNCTvG83XGnfCu-OAb8vkv59ICud4VDcP8xZoz50yV71jU3_UsJ-peLju1RQjDidPeHalLYt1KwQiNfEy0nD22w_hFYMrsanXQKo162pvQ3aN6deZPAtNppb1-0yI_DM088udQq7wmyreEdnWPCQegAsCkzC7N5QJl-LapZv2VM5DbStQ6CzHj9cQw';
            if(!token[temp] || this._isExpire(token[temp].create_time, token[temp].expire_time)) {
                let corpid = Config.corpid;
                let corpsecret = Config.secret[temp] || Config.secret.common;
            
                const {data: {
                    access_token, expires_in
                }} = await axios.get('https://qyapi.weixin.qq.com/cgi-bin/gettoken', {
                    params: {
                        corpid,
                        corpsecret
                    }
                });
                token[temp] = {};
                token[temp].create_time = Math.floor(Date.now() / 1000);
                token[temp].expire_time = expires_in;
                token[temp].token = access_token;
                fs.writeFileSync(path.join(__dirname, '../token.json'), JSON.stringify(token), {
                    encoding: 'utf-8'
                });
                console.log('-----------------------');
                console.log('Access Token OK!');
                console.log(access_token);
                console.log('-----------------------');
                return access_token;
            } else {
                return token[temp].token;
            }

        }
    }
};


module.exports = AccessToken;