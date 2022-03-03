<template>
    <div>

        <div class="block" style="padding:60px;">
            <div class="block-content">
                <el-form ref="form" label-width="120px"  style="width:700px;">
                    <el-form-item label="素材类型">
                        <el-radio-group v-model="params.type" size="small">                            
                            <el-radio-button label="image">图片</el-radio-button>
                            <el-radio-button label="voice">语音</el-radio-button>
                            <el-radio-button label="video">视频</el-radio-button>
                            <el-radio-button label="file">文件</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                    
                    <el-form-item label="上传素材">
                        <el-upload
                            class="upload-demo"
                            drag
                            :data="params"
                            action="api/media/upload"
                            :on-success="eventUploadSuccess" 
                            name="media"
                            
                            :multiple='false'>
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text"><p>将文件拖到此处，或<em>点击上传</em></p></div>
                            <div class="el-upload__tip" style="margin-top:0" slot="tip">{{tips}}</div>
                        </el-upload>   
                    </el-form-item>

                    <el-form-item v-if="media_id" label="素材结果">
                        
                            <p>type: {{media_type}}</p>
                            <p>media_id: {{media_id}}</p>
                        
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            params:{
                type:'image'
            },
            media_id:'',
            media_type:''
        }
    },
    methods:{
        eventTypeChange(){
            this.media_id = ''
        },
        eventUploadSuccess(response){
            try{                
                let {media_id,type,errcode,errmsg} = response;
                if(errcode == '0'){
                    // this.form[type]['media_id'] = media_id;
                    console.log(media_id)
                    this.$message.success('上传成功');                    
                    this.media_id = media_id;
                    this.media_type = type;
                }
                else{
                    let msgcontent = errmsg.split(',')[0];
                    this.$message.error(msgcontent);
                }
                
            }
            catch(error){
                this.$message.error('上传失败');
            }
            
        }
    },
    computed:{
        tips(){
            let tips = '';
            switch(this.params.type){
                case 'image':
                    tips = '单个图片不超过 2MB，支持JPG,PNG格式'
                    break;
                case 'voice':
                    tips = '单个文件不超过 2MB，播放长度不超过60s，仅支持AMR格式'
                    break;
                case 'video':
                    tips = '单个文件不超过 10MB，支持MP4格式'
                    break;
                case 'file':
                    tips = '单个文件不超过 20MB'
                    break;

            }
            return tips;
        }
    }
}
</script>


<style scoped>

</style>