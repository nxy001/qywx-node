<template>
    <div class="content-header">
        <h1 class="content-header-title">{{titleConfig.title}}</h1>
        <div class="content-header-intro">{{titleConfig.desc}}</div>
            <!-- 通用应用向成员、部门、标签推送多种类型的消息，包括文本、图片、图文、语音视频等等 -->
    </div>
</template>
<script>
export default {
    data() {
        return {
            title: this.$route
        }
    },
    computed: {
        titleConfig() {
            const currentRoute = this.$router.options.routes.find(route => {
                return route.name === this.$route.name;
            });
            return currentRoute.content;
        }
    }
}
</script>
<style lang="css" scoped>
.content-header {
  padding: 40px 24px 40px 60px;
  border-bottom: 1px solid #e7e7e7;
  background: #fff;
}
.content-header-title{
  font-size: 38px;
  text-align: left;
  
  color:#333;
}
.content-header-intro{
  margin-top: 5px;
    font-size: 14px;
    color: rgba(0,0,0,0.6);
    line-height: 22px;
    
}
</style>