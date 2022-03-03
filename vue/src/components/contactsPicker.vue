<template>
  <el-popover
    placement="bottom-start"
    v-model="visible"
    width="344"
    height="260"
    :visible-arrow="false"  
    popper-class="contacts-picker"
    trigger="click">
      <ContactsTree        
        @onContactSelected="eventContactSelected"
        :mode="mode"
       ></ContactsTree>
       <ContactsTag :items="items" slot="reference" ></ContactsTag>
      
  </el-popover>    
</template>

<script>
import ContactsTree from './contactsTree.vue';
import ContactsTag from './contactsTag.vue';
export default {
  props:{
    mode:String
  },
  data(){
    return {
      visible:false,      
      items:[]
    }
  },
    components:{
      ContactsTree,
      ContactsTag
    },
    methods:{
      eventContactSelected(item){
        this.addItem(item)
        this.visible = false;        
      },
      addItem(item){
        if(this.items.some( x =>{return (x.id === item.id)})){
          return;
        }
        else{
          this.items.push(item);
          this.$emit('onContactsChanged',this.items);
        }
        
      }
    }
}
</script>


<style>
.contacts-picker{
  
  height: 300px;
  overflow: auto;
  margin-top: 0px !important;
}
</style>