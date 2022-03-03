<template>
    <div class="external-list-wrapper">
        <el-table
            :data="userData"
            style="width: 100%"
            @row-click="onClick"
            header-row-class-name="external-list-header"
            cell-class-name="external-list-cell"
            >
            <el-table-column
                prop="avatar"
                label="头像"
                width="180">
                <template slot-scope="scope">
                    <img class="external-list-img" :src="scope.row.avatar" alt="">
                </template>
            </el-table-column>
            <el-table-column
                prop="name"
                label="姓名"
                width="180">
            </el-table-column>
            <el-table-column
                prop="corp_name"
                label="企业名"
                width="180">
            </el-table-column>
            <el-table-column
                prop="position"
                label="职位"
                width="180">
            </el-table-column>
            <el-table-column
                prop="label"
                label="标签"
                width="180">
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    props: {
        userData: {
            type: Array,
            default() {
                return []
            }
        }
    },
    methods: {
        onClick(row) {
            console.log(row.userid);
        }
    },

}
</script>
<style lang="css" scoped>
    /* /deep/.external-list-header .cell {
        text-align: center;
    } */
    /deep/.cell-class-name .cell{
        text-align: center;
    }
    .external-list-img {
        width: 40px;
        height: 40px;
    }
</style>