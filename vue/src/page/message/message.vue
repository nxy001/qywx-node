<template>
<div>
    <div class="block" style="padding:60px;">
        <el-form ref="form" :model="form" label-width="120px"  style="width:700px;">
            <el-form-item label="消息类型">
                <el-radio-group v-model="form.msgtype" size="small">
                    <el-radio-button label="text">文本</el-radio-button>
                    <el-radio-button label="image" >图文</el-radio-button>
                    <el-radio-button label="voice">语音</el-radio-button>
                    <el-radio-button label="video">视频</el-radio-button>
                    <el-radio-button label="file">文件</el-radio-button>
                    <el-radio-button label="textcard">文本卡片</el-radio-button>
                    <el-radio-button label="markdown">Markdown</el-radio-button>
                </el-radio-group>
                
            </el-form-item>
            <el-form-item label="接收成员">                
                <ContactsPicker
                    mode="user"
                    @onContactsChanged='eventUsersChanged'
                ></ContactsPicker>
            </el-form-item>

            <el-form-item label="接收部门">
                <ContactsPicker
                    mode="department"
                    @onContactsChanged='eventDepartmentsChanged'
                ></ContactsPicker>
            </el-form-item>

            <el-form-item label="接收标签">
                <el-input v-model="form.totag"></el-input>
            </el-form-item>
            <el-form-item label="保密消息">
                <el-switch v-model="form.safe"></el-switch>
            </el-form-item>
            
            <el-form-item v-if="form.msgtype ==='text'" label="文本内容">
                <el-input type="textarea" 
                    :autosize="{ minRows: 5, maxRows: 10}"
                v-model="form.text.content"></el-input>
            </el-form-item>
            <el-form-item v-if="form.msgtype ==='image'" label="上传图片">
                <el-upload
                    class="upload-demo"                    
                    :multiple='false'
                    :data="{type:this.form.msgtype}"
                    action="api/media/upload"
                    :on-success="eventUploadSuccess"                    
                    name="media">
                    <el-button size="small" type="plain">点击上传</el-button>
                    <div class="el-upload__tip" slot="tip">单个图片不超过 2MB，支持JPG,PNG格式</div>
                </el-upload>
            </el-form-item>
            <el-form-item v-else-if="form.msgtype ==='voice'" label="上传音频">
                <el-upload
                    class="upload-demo"                    
                    :multiple='false'
                    :data="{type:this.form.msgtype}"
                    action="api/media/upload"
                    :on-success="eventUploadSuccess"                    
                    name="media">
                    <el-button size="small" type="plain">点击上传</el-button>
                    <div class="el-upload__tip" slot="tip">单个文件不超过 2MB，播放长度不超过60s，仅支持AMR格式</div>
                </el-upload>
            </el-form-item>
            <el-form-item v-else-if="form.msgtype ==='video'" label="上传视频">
                <el-upload
                    class="upload-demo"                    
                    :multiple='false'
                    :data="{type:this.form.msgtype}"
                    action="api/media/upload"
                    :on-success="eventUploadSuccess"                    
                    name="media">
                    <el-button size="small" type="plain">点击上传</el-button>
                    <div class="el-upload__tip" slot="tip">单个文件不超过 10MB，支持MP4格式</div>
                </el-upload>
            </el-form-item>
            <el-form-item v-else-if="form.msgtype ==='file'" label="上传文件">
                <el-upload
                    class="upload-demo"                    
                    :multiple='false'
                    :data="{type:this.form.msgtype}"
                    action="api/media/upload"
                    :on-success="eventUploadSuccess"                    
                    name="media">
                    <el-button size="small" type="plain">点击上传</el-button>
                    <div class="el-upload__tip" slot="tip">单个文件不超过 20MB</div>
                </el-upload>
            </el-form-item>

            <el-form-item v-if="form.msgtype=='textcard'" label="卡片标题">
                <el-input v-model="form.textcard.title"></el-input>
            </el-form-item>

            <el-form-item v-if="form.msgtype=='textcard'" label="卡片描述">
                <el-input v-model="form.textcard.description"></el-input>
            </el-form-item>

            <el-form-item v-if="form.msgtype=='textcard'" label="跳转链接">
                <el-input v-model="form.textcard.url"></el-input>
            </el-form-item>


            <el-form-item v-if="form.msgtype ==='markdown'" label="MarkDown">
                <el-input type="textarea"
                     :autosize="{ minRows: 5, maxRows: 15}"
                 v-model="form.markdown.content"></el-input>
            </el-form-item>


            <el-form-item>
                <el-button type="primary" size="small"                 
                @click="onSubmit">发送</el-button>
            </el-form-item>
        </el-form>
    </div>
</div>    
</template>

<script>
import ContactsPicker from '../../components/contactsPicker.vue'
import {post} from 'axios';
export default {
  
    props:{
        userid:String
    },
    components:{
        ContactsPicker
    },
    data(){

        let md = '您的会议室已经预定，稍后会同步到`邮箱` \n >**事项详情** \n>事　项：<font color="info">开会</font> \n>组织者：@miglioguan \n>参与者：@miglioguan、@kunliu、@jamdeezhou、@kanexiong、@kisonwang \n> \n>会议室：<font color="info">广州TIT 1楼 301</font> \n>日　期：<font color="warning">2018年5月18日</font> \n>时　间：<font color="comment">上午9:00-11:00</font> \n> \n>请准时参加会议。 \n> \n>如需修改会议信息，请点击：[修改会议信息](https://work.weixin.qq.com)';
       return {
        form: {
          msgtype: 'text',
          touser: '',
          toparty: '',
          totag: '',
          safe: false,          
          text: {
              content:'Hello！欢迎使用企业微信开发者 CodeSamples'
          },
          image:{
              media_id:''
          },
          voice:{
              media_id:''
          },
          video:{
              media_id:'',
              title:'',
              description:''
          },
          file:{
              media_id:''
          },
          textcard:{
              title:'Hello',
              description:'欢迎使用企业微信开发者 CodeSamples',
              url:'http://work.weixin.qq.com',
              btntxt:''
          },
            news : {
                articles : [
                    {
                        title : "中秋节礼品领取",
                        description : "今年中秋节公司有豪礼相送",
                        url : "URL",
                        picurl : "http://res.mail.qq.com/node/ww/wwopenmng/images/independent/doc/test_pic_msg1.png", 
                        
                    }
                ]
           },
           markdown:{
               content:md
           }
        },
        media_id:'',
        
       }
        
    },
    
    methods:{
        async onSubmit() {

            console.log(this.form);
            try{
                let {data:{errcode,errmsg}} = await post('api/message/send',{            
                    form:this.form
                });
                if(errcode == '0'){
                    this.$message.success('发送成功');
                }
                else{
                    let msgcontent = errmsg.split(',')[0];
                    this.$message.error(msgcontent);
                }
            }
            catch(err){
                this.$message.error('发送失败');
            }
            
            
        },
        eventUploadSuccess(response){
            try{
                
                let {media_id,type,errcode,errmsg} = response;
                if(errcode == '0'){
                    this.form[type]['media_id'] = media_id;
                    this.$message.success('上传成功');                    
                }
                else{
                    let msgcontent = errmsg.split(',')[0];
                    this.$message.error(msgcontent);
                }
                
            }
            catch(error){
                this.$message.error('上传失败');
            }
            
        },
        eventUsersChanged(items){            
            this.form.touser = items.map( item => {return item.id}).join('|');
        },
        eventDepartmentsChanged(items){            
            this.form.toparty = items.map( item => {return item.id}).join('|');
        }
    }
    
}
</script>


<style scoped>
</style>