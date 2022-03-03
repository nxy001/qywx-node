<template>
    <div class="partyinfo">
        <div class="partyinfo-banner">
            <div class="partyinfo-title">部门详情</div>                 
            <div class="">
                <el-link type="danger" size="mini" @click="onDelete">删除</el-link>
            </div>
        </div>
        <div class="partyinfo-content">
            <slot></slot>
            <CreateUserAndDepart :partyid="partyid"></CreateUserAndDepart>
        </div>
    </div>
</template>
<script>
import { get } from 'axios';
import CreateUserAndDepart from './createUserAndDepart.vue';
export default {
    components: {
        CreateUserAndDepart
    },
    props: {
        partyid: Number
    },
    methods: {
        async onDelete() {
            try {
                await this.$confirm('确认是否删除该部门？（注：不能删除根部门；不能删除含有子部门、成员的部门）', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })

                try {
                const  {data: { errcode }} = await get('api/department/delete', {
                    params:{
                        id: this.partyid
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
        },
    },
}
</script>
<style lang="css" scoped>
    .partyinfo-banner {
        padding:10px 20px;
        margin-bottom: 15px;
        background: #f7f7f7;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>