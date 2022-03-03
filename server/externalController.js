const axios = require('axios');
const AccessToken = require('./accesstoken')('external');

module.exports = function(router) {
    router.get('/externalcontact/batch/get_by_user', async function (req, res, next) {
        const query = req.query || {};
        const access_token = await AccessToken.getToken();
        const { data: {
            external_contact_list
        } } = await axios.post(`https://qyapi.weixin.qq.com/cgi-bin/externalcontact/batch/get_by_user?access_token=${access_token}`, {
            userid_list: [
                query.userid
            ]
        });
        res.send(external_contact_list.map(data => {
            const external_contact = data.external_contact;
            return {
                ...external_contact,
                label: external_contact.external_profile ? external_contact.external_profile.external_attr.map(attr => attr.name).join(', ') : ''
            }
        }));
    });
};