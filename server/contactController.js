const axios = require('axios');
const AccessToken = require('./accesstoken')('contact');

module.exports = function(router) {
    router.get('/user/get', async function (req, res, next) {
        const query = req.query || {};
        const access_token = await AccessToken.getToken();
        const { data } = await axios.get('https://qyapi.weixin.qq.com/cgi-bin/user/get', {
            params: {
                access_token,
                userid: query.userid
            }
        });
        res.send(data);
    });
    
    router.get('/user/delete', async function (req, res, next) {
        const query = req.query || {};
        const access_token = await AccessToken.getToken();
        const { data } = await axios.get('https://qyapi.weixin.qq.com/cgi-bin/user/delete', {
            params: {
                access_token,
                userid: query.userid
            }
        });
        res.send(data);
    });
    
    router.post('/user/create', async function(req, res) {
        const {department, name, mobile, email, userid} = req.body || {};
        const access_token = await AccessToken.getToken();
        const {data} =  await axios.post(`https://qyapi.weixin.qq.com/cgi-bin/user/create?access_token=${access_token}&debug=1`, 
        {
            department,
            name,
            mobile,
            email,
            userid
        });
        res.send(data);
    });

    router.get('/department/list', async function (req, res, next) {
        const query = req.query || {};
        if (!query.id) {
            query.id = 1;
        }
        const access_token = await AccessToken.getToken();
        
        let final_data = [];
        let filter_users = [];
        let filter_departments = [];
    
        const { data:{department:departmentlist} } = await axios.get('https://qyapi.weixin.qq.com/cgi-bin/department/list', {
            params: {
                access_token,
                id: query.id || ''
            }
        });
    
        departmentlist.forEach(item => {
            if (item.parentid == query.id) {
                filter_departments.push({
                    id: item.id,
                    name: item.name || '',
                    order: item.order,
                    type: 'department'
                });
            }
        });
        if(query.need_user == 1){
            const { data:{userlist} } = await axios.get('https://qyapi.weixin.qq.com/cgi-bin/user/simplelist', {
                params: {
                    access_token,
                    department_id: query.id || '',
                    fetch_child: 0
                }
            });
    
            filter_users = userlist.map(user => {
                return {
                    id:user.userid || '',
                    name : user.name || '',
                    leaf : true,
                    type : 'user'
                };
            });

        }
        else{
            if (filter_departments.length > 0) {
                for (let index = 0; index < filter_departments.length; index++) {
                    let element = filter_departments[index];
                    if (departmentlist.some(item => {
                        return item.parentid == element.id
                    })) {
                        element.leaf = false;
    
                    } else {
                        element.leaf = true;
                    }
                }
            }
        }
        final_data = [].concat(filter_users,filter_departments);
        res.send(final_data);
    });
    router.get('/department/simplelist', async function (req, res, next) {
        const query = req.query || {};
        
        const access_token = await AccessToken.getToken();
        
        let final_data = [];
        let filter_users = [];
        let filter_departments = [];
    
        const { data:{userlist} } = await axios.get('https://qyapi.weixin.qq.com/cgi-bin/user/simplelist', {
            params: {
                access_token,
                id: query.id || '',
            }
        });

        filter_users = userlist.map(user => {
            return {
                id:user.userid || '',
                name : user.name || '',
                leaf : true,
                type : 'user'
            };
        });


        final_data = [].concat(filter_users,filter_departments);
        res.send(final_data);
    });
    
    router.post('/department/create', async function(req, res) {
        const {parentid, name} = req.body || {};
        const access_token = await AccessToken.getToken();
        const {data} =  await axios.post(`https://qyapi.weixin.qq.com/cgi-bin/department/create?access_token=${access_token}`, 
        {
            parentid,
            name
        });
        res.send(data);
    });

    router.get('/department/delete', async function(req, res) {
        const {query:form_params} = req || {};
        const access_token = await AccessToken.getToken();
        const {data} =  await axios.get(`https://qyapi.weixin.qq.com/cgi-bin/department/delete`, 
        {
            params: {
                id: form_params.id,
                access_token
            }
        });
        res.send(data);
    });
};