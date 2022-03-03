<template>
    <div class="external block">
        <div class="tree">
        <ContactsTree 
        @onContactSelected="eventNodeClick"
        mode="user"
        ></ContactsTree>
         </div>
         <div class="content">
            <div v-if="!userid" class="content_desc"><i class="el-icon-service"></i>客户联系</div>
            <ExternalList v-else :userData="userData"></ExternalList>
         </div>
    </div>
</template>
<script>
import {get} from 'axios';
import ContactsTree from '../../components/contactsTree.vue';
import ExternalList from './externalList.vue';
export default {
    name: 'externalManage',
    components: {
        ContactsTree,
        ExternalList
    },
    data() {
        return {
            userid: '',
            userData: []
        }
    },
    watch: {
        async userid(val) {
            const { data } = await get('api/externalcontact/batch/get_by_user', {
                params: {
                    userid: val
                }
            });
            this.userData = data;
        }
    },
    methods: {
        eventNodeClick(data) {
            if(data.type == 'user'){
                this.userid = data.id || ''
            }
        }
    },
}
</script>
<style lang="css" scoped>
.external{
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
    margin-bottom: 30px;
    padding-top: 120px;
    width: 100%;
    font-size: 28px;
    text-align: center;    
    color: #333;
}
</style>