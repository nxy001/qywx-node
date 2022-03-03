import Vue from 'vue'
import "./assets/theme/style.css";
import ElementUI from 'element-ui';
import App from './App.vue'


import Contacts from './page/contacts/main.vue';
import Message from './page/message/message.vue';
import External from './page/external/index.vue';
import Intro from './page/intro/intro.vue';
import Media from './page/media/media.vue';
import Title from './components/title.vue';
import QrScan from './page/qrscan/qrscan.vue';
import vueRouter from 'vue-router';



Vue.config.productionTip = false;
Vue.use(vueRouter);
Vue.use(ElementUI);

new Vue({
  router: new vueRouter({
    routes: [{
      name: 'contacts',
      path: '/contacts',
      components: {
        default: Contacts,
        title: Title
      },
      content: {
        title: '通讯录管理',
        desc: '拉取企业通讯录的组织架构数，可以预览部门和成员的详情，对成员信息进行编辑，对部门进行成员的添加、删除、移动等操作'
      }
    },
    {
      name: 'intro',
      path: '/intro',
      components: {
        default: Intro,
        title: Title
      },
      content: {
        title: '概览',
        desc: '欢迎使用企业微信开放 Api 示例代码'
      }
    },
    {
      name: 'message',
      path: '/message',
      components: {
        default: Message,
        title: Title
      },
      content: {
        title: '消息推送',
        desc: '企业微信开放了消息发送接口，企业可以使用这些接口让自定义应用与企业微信后台或用户间进行双向通信。'
      }
    },
    {
      name: 'external',
      path: '/external',
      components: {
        default: External,
        title: Title
      },
      content: {
        title: '客户联系',
        desc: '企业内的员工可以添加外部企业的联系人进行工作沟通，外部联系人分为企业微信联系人和微信联系人两种类型。配置了客户联系功能的成员所添加的外部联系人为企业客户。'
      }
    },
    {
      name: 'media',
      path: '/media',
      components: {
        default: Media,
        title: Title
      },
      content: {
        title: '素材管理',
        desc: '企业微信开放了消息发送接口，企业可以使用这些接口让自定义应用与企业微信后台或用户间进行双向通信。'
      }
    },
    {
      name: 'qrscan',
      path: '/qrscan',
      components: {
        default: QrScan,
        title: Title
      },
      content: {
        title: '扫码登录',
        desc: '企业微信开放了消息发送接口，企业可以使用这些接口让自定义应用与企业微信后台或用户间进行双向通信。'
      }
    }
    
  ]
  }),
  render: h => h(App),
}).$mount('#app')
