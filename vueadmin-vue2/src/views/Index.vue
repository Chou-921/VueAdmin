<template>
   <div style="text-align: center">欢迎登录VueAdmin管理系统！</div>
</template>

<script>
    export default {
        name: "Index",
    }
</script>

<style scoped>
    .el-container{
        padding: 0 ;
        margin: 0;
        height: 100%;
    }
    .header-avatar{
        float: right;
        width: 210px;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .el-menu{
        height: 100%;
    }
    .el-dropdown-link {
        cursor: pointer;
    }
    .el-header, .el-footer {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        line-height: 200px;
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        line-height: 160px;
    }



</style>