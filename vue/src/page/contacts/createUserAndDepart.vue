<template>
    <div class="create-wrapper">
        <el-button size="small" type="primary" @click="onCreateUser">添加成员</el-button>
        <el-button size="small" @click="onCreateParty">添加部门</el-button>
        <el-dialog title="创建" :visible="isCreate">
            <div class="dialog-body">
                <div
                v-if="currentType === 'user'"
                class="dialog-userinfo-wrapper"
                >
                <el-form ref="form" :model="userinfo" label-width="80px">
                    <el-form-item label="userid">
                        <el-input v-model="userinfo.userid"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名">
                        <el-input v-model="userinfo.name"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号">
                        <el-input v-model="userinfo.mobile"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <el-input v-model="userinfo.email"></el-input>
                    </el-form-item>
                </el-form>
                </div>
                <el-input 
                    v-if="currentType === 'department'" 
                    v-model="partyname" 
                    placeholder="请输入新部门名">
                </el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="onCancel">取 消</el-button>
                <el-button type="primary" @click="onConfirm">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
const initUserInfo = {
    userid: '',
    name: '',
    department: [],
    mobile: '',
    email: ''
}
import { post } from 'axios';
export default {
    props: {
        partyid: {
            type: Number,
            default: 1
        }
    },
    data() {
        return {
            isCreate: false,
            partyname: '新建部门',
            currentType: '',
            userinfo: Object.assign({}, initUserInfo)
        }
    },
    methods: {
        initDialoginfo() {
            this.currentType = '';
            this.partyname = '新建部门';
        },
        onCreateUser() {
            this.isCreate = true;
            this.currentType = 'user';
            this.userinfo.department = [this.partyid];
        },
        onCreateParty() {
            this.isCreate = true;
            this.currentType = 'department';
        },
        onCancel() {
            this.initDialoginfo();
            this.isCreate = false;
        },
        async onConfirm() {
            this.isCreate = false;
            if(this.currentType === 'department') {
                await post('api/department/create', {
                    parentid: this.partyid,
                    name: this.partyname
                });
            }else if(this.currentType === 'user') {
                await post('api/user/create', {
                    ...this.userinfo
                });
            }
            window.location.reload();
            this.initDialoginfo();
        },
    },
}
</script>
<style lang="css" scoped>
    .create-wrapper {
        text-align: center;
    }
    .dialog-body {
        margin-top: 20px;
    }
</style>