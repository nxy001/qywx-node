<template>
<div class="profile">
            <div class="profile-banner">
                <div class="profile-title">成员详情</div>                 
                <div class="">
                    <el-link style="margin-right:10px;" type="primary" size="mini" @click="onEdit">编辑</el-link>
                    <el-link type="danger" size="mini" @click="onDelete">删除</el-link>
                </div>
            </div>
            <div class="profile-content">
                <div class="profile-header">                 
                <el-avatar
                    class="profile-avatar"
                 shape="square" :size="64"
                :src="user.thumb_avatar || 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'" alt="" />
                <div class="profile-meta">
                    <div class="profile-name">{{user.name}}<el-icon class="el-icon-s-custom" style="margin-left:3px;color:#0082EF" /></div>                    
                    <div class="profile-position">{{user.english_name}}</div>
                </div>
                
                
            </div>

            <div class="profile-detail">
                    <div class="profile-item">
                        <div class="profile-label">职务：</div>
                        <div class="profile-option">{{user.position || '未设置'}}</div>
                    </div>
                    <div class="profile-item">
                        <div class="profile-label">手机：</div>
                        <div class="profile-option">{{user.mobile || '未设置'}}</div>
                    </div>
                    <div class="profile-item">
                        <div class="profile-label">座机：</div>
                        <div class="profile-option">{{user.telephone || '未设置'}}</div>
                    </div>
                    <div class="profile-item">
                        <div class="profile-label">邮箱：</div>
                        <div class="profile-option">{{user.email || '未设置'}}</div>
                    </div>
                    <div class="profile-item">
                        <div class="profile-label">微信：</div>
                        <div class="profile-option">{{user.wechat  || '未设置'}}</div>
                    </div>
                    <div class="profile-item">
                        <div class="profile-label">地址：</div>
                        <div class="profile-option">{{user.address  || '未设置'}}</div>
                    </div>
                   
                    <div class="profile-item">
                        <div class="profile-label">身份：</div>
                        <div class="profile-option">{{user.isleader?'上级':'员工'}}</div>
                    </div>
                </div>
            </div>
</div>    
</template>

<script>
import {get} from 'axios';
export default {
    props:{
        userid:String
    },
    data(){
        return {
            user:{}
        }
    },
    methods:{
        async userprofile (){
            let {profile} = await get('api/department/list',{
                params:{
                    userid: this.userid
                }
            })
            return profile;
        },
        onEdit() {
            console.log('edit');
        },
        async onDelete()  {
            try {
                await this.$confirm('确认是否删除该成员？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                try {
                const  {data: { errcode }} = await get('api/user/delete', {
                    params:{
                        userid: this.userid
                    }
                });
                if(errcode) {
                    throw new Error('' + errcode);
                }
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                setTimeout(() => window.location.reload(), 1000);
                } catch(err) {
                    this.$message({
                        type: 'error',
                        message: '' + err
                    });
                }
            } catch(err) {
                console.log(err);
            } 
        }
    },
    watch:{
        async userid(newvalue){
            let userid = newvalue || '' ;
            let {data:profile} = await get('api/user/get',{
                params:{
                    userid
                }
            })
            
            this.user = profile;


        }
    },
}
</script>


<style scoped>
.profile{
    font-size:14px;
    line-height: 24px;
}
.profile-banner{
    padding:10px 20px;    
    margin-bottom: 15px;
    background: #f7f7f7;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.profile-content {
    padding-left:15px;
}
.profile-title{
    font-size: 16px;
    font-weight: 400;
}
.profile-header{
    overflow: hidden;
}
.profile-avatar{
    float: left;
}
.profile-meta{
    overflow: hidden;
    padding-left:15px;
}
.profile-name{
    font-size: 18px;
    height: 28px;
    line-height: 28px;    
    
}
.profile-position{

    color: #666;
}
.profile-detail{
    border-top:1px dashed #f1f1f1;
    margin-top: 20px;
    padding-top:20px;
}
.profile-item{
    overflow: hidden;
    font-size: 14px;
    margin-bottom: 10px;
}
.profile-label{
    display: table-cell;
    vertical-align: top;
    color: #787878;
    text-align: right;
    width:73px;
}
.profile-option{
    display: table-cell;
    padding-left: 8px;
    vertical-align: top;
}
</style>