<template>
    <div class="contacts block">
        <div class="tree">
        <ContactsTree 
        @onContactSelected="eventNodeClick"
        mode="user|department"
        ></ContactsTree>
         </div>
         <div class="content">
            <Userprofile 
            v-show="userid"
            :userid="userid">
            </Userprofile>
            <Partyinfo v-if="partyid" :partyid="partyid">
                <div class="content_desc"><el-icon class="party-icon el-icon-folder"></el-icon>{{partyName}}</div>
            </Partyinfo>
            <template v-if="!(userid||partyid)">
                <div  class="content_desc default"><el-icon class="party-icon  el-icon-folder"></el-icon>通讯录管理</div>
                <CreateUserAndDepart></CreateUserAndDepart>
            </template>
         </div>
    </div>
</template>
<script>
import {get} from 'axios';
import ContactsTree from '../../components/contactsTree.vue';
import Userprofile from './userprofile.vue';
import Partyinfo from './partyinfo.vue';
import CreateUserAndDepart from './createUserAndDepart.vue';
export default {
    name: 'contextManage',
    components: {
        ContactsTree,
        Userprofile,
        Partyinfo,
        CreateUserAndDepart
    },
    data() {
        return {
            props:{
                label:'name',
                isLeaf:'leaf'
            },
            userid:'',
            partyName: '',
            partyid: ''
        }
    },
    methods: {
        async eventLoadNode(node ,resolve){
            let id ;
            if(node.level === 0){
                id = 1;
            }
            else{
                id = node.data.id;
            }
            let {data} = await get('api/department/list',{
                params:{
                    id
                }
            });
            return resolve(data  || []);        
        },
        eventNodeClick(data){
            this.userid = '';
            this.partyName = '';
            this.partyid = '';
            if(data.type == 'user'){
                this.userid = data.id || ''
            }
            if(data.type === 'department') {
                this.partyName = data.name;
                this.partyid = data.id;
            }
        }
    },
}
</script>
<style  scoped>
.contacts{
    display: flex;
}
.tree{
        border: 1px solid #e9eaeb;
        width:200px;
    }
.content{
    flex: 1;
    border: 1px solid #e9eaeb;
    border-left: 1px solid transparent;
    height: 680px;
}
.content_desc {
    
    width: 100%;
    text-align: center;
    
    font-size: 48px;
    color: #333;
    margin-bottom: 30px;
    padding-top:120px;
    font-size: 28px;
    font-weight: 400;
}
.content_desc.default {

}

.party-icon {
    /* font-size: 24px; */
    margin-right: 5px;;
}
.node-item{
    color:#555;
    padding:2px 0;
    font-size: 14px;
}
</style>