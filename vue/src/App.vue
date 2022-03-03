<template>
  <div class="app">
    <el-container class="wrap">
      <el-header class="header">
          <h1 class="logo"><img src="./assets/logo.svg" /><span class="title">CodeSamples</span></h1>
          <el-menu 
          class="navigation el-menu-demo" 
          mode="horizontal" 
          >
            <el-menu-item index="1"><a href="https://open.work.weixin.qq.com/developer/portal" target="_blank">开发者中心</a></el-menu-item>
            <el-menu-item index="2"><a href="https://work.weixin.qq.com/api/doc/" target="_blank">开发文档</a></el-menu-item>
            <el-menu-item index="4"><a href="https://github.com/WecomTeam/CodeSameples" target="_blank">Github</a></el-menu-item>
          </el-menu>
      </el-header>
      <el-container>
        <el-aside width="200px">            
            <el-menu
              class="left-menu"
              :router="true"
              >
              <el-menu-item index="intro">
                <i class="el-icon-monitor"></i>
                <span slot="title">概览</span>
              </el-menu-item>
              <el-menu-item index="contacts">
                <i class="el-icon-user"></i>
                <span slot="title">通讯录管理</span>
              </el-menu-item>
              <el-menu-item index="message">
                <i class="el-icon-message"></i>
                <span slot="title">消息推送</span>
              </el-menu-item>
              <el-menu-item index="external">
                <i class="el-icon-service"></i>
                <span slot="title">客户联系</span>
              </el-menu-item>
              <el-menu-item index="qrscan">
                <i class="el-icon-mobile"></i>
                <span slot="title">扫码登录</span>
              </el-menu-item>              
              <el-menu-item index="media">
                <i class="el-icon-picture-outline"></i>
                <span slot="title">素材管理</span>
              </el-menu-item>
              
            </el-menu>
        </el-aside>
        <el-main style="padding:0;">
          <keep-alive><router-view name="title"></router-view></keep-alive>
          <div class="content-body">
            <router-view ></router-view>
          </div>
          
        </el-main>
      </el-container>
    </el-container>
    
    
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
*{
  margin:0;
  padding:0;
}
html,body{
  height: 100%;
  background:rgb(245, 245, 245);
}
.app {
  font-family:  Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;;
}
.wrap{
  height: 100%;
}
.header{
    display: flex;
    justify-content: space-between;    
    border-bottom: 1px solid #e7e7e7;
    align-items: center;
    box-sizing: content-box;
    background: #fff;
}
.navigation{
    border:0 none  !important;
    
    
}
.logo{
    display: flex;
    align-items: center;
    font-weight: 600;
}
.logo img{
    width: 32px;
}
.logo .title{
    font-family:Avenir;
    color:#333;
    font-weight: 500;
    font-size: 20px;
    /* color:rgba(0,0,255,0.4); */
    letter-spacing: -0.5px;
    padding-left: 5px;
}

.left-menu{
  min-height: 100%;
}
.content-body{
  padding:60px;
  min-height: 680px;
}
.block{
    padding:20px;
    border:1px solid rgb(220,220,220);
    background:#fff;
    min-height: 680px;
    overflow: auto;
}
.block-header{
    font-size: 16px;
    line-height: 26px;
    margin-bottom: 20px;
}

.el-tree-node{
  margin:3px 0;
}
.el-tree-node__content{
  height:28px;
}
.el-textarea__inner{
  font-family: Arial, Helvetica, sans-serif;
}
</style>
