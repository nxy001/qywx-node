<template>
    <el-tree      
        lazy
        :load="eventLoadNode"
        :props ="props"
        @node-click="eventNodeClick"
         >
         <span class="node-item" slot-scope="{node,data}">
             <i v-if="data.type == 'department'" class="node-icon el-icon-folder"></i>
             <i v-if="data.type == 'user'" class="node-icon el-icon-user"></i>
             <span class="node-title">{{node.label}}</span>
         </span>
         </el-tree>
</template>
<script>
import {get} from 'axios';
export default {
    name: 'contactsTree',
    props:{
        mode:{
            type:String,
            default:()=>{return 'user'}
        }
    },
    components: {
        
    },
    data() {
        return {
            props:{
                label:'name',
                isLeaf:'leaf'
            },
            
        }
    },
    methods: {
        async eventLoadNode(node ,resolve){
            let id ;
            if(node.level === 0){
                id = 1;
            } else{
                id = node.data.id;
            }

            let need_user = this.mode.split("|").indexOf('user') > -1 ? '1' : '0';

            let {data} = await get('api/department/list',{
                params:{
                    id,
                    need_user
                }
            });
            return resolve(data  || []);        
        },
        eventNodeClick(data){
            
            if(this.mode.split('|').indexOf(data.type) > -1){
                this.$emit('onContactSelected',{
                    type:data.type,
                    id:data.id,
                    name:data.name
                });
            }
        }
    },
}
</script>
<style  scoped>

.node-item{
    color:#555;
    padding:2px 0;
    font-size: 14px;
}
.node-title{
    padding-left:4px;
}



</style>