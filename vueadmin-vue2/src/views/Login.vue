<template>
    <el-row>
        <el-col :span="12">

            <el-image :src="require('../assets/logo1.png')" style="height: 180px;width: 180px"></el-image>
            <h2>欢迎登陆用户权限管理系统</h2>
        </el-col>
        <el-col :span="1">
            <el-divider direction="vertical"></el-divider>
        </el-col>
        <el-col :span="6">
            <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px" class="demo-loginForm">
                <el-form-item label="用户名" prop="username" style="width: 380px">
                    <el-input v-model="loginForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password"style="width: 380px">
                    <el-input v-model="loginForm.password"></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="code"style="width: 380px;">
                    <el-input v-model="loginForm.code" style="width: 172px;  float: left"></el-input>
                    <el-image :src="captchaImg" class="captchaImg" style=""></el-image>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
                    <el-button @click="resetForm('loginForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script>
    import qs from 'qs'
    export default {
        name: "Login",
        data() {
            return {
               loginForm: {
                    username: 'admin',
                    password: 'admin',
                    code: 'p7n5w',
                   token:''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                    ],
                    code: [
                        { required: true, message: '请输入验证码', trigger: 'blur' },
                        { min: 5, max: 5, message: '长度为 5 个字符', trigger: 'blur' }
                    ],
                },
                captchaImg: ''
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post('/login' ,this.loginForm).then(res => {
                            console.log(res.data)
                            const jwt = res.headers['authorization']
                            // 将jwt存储到应用store中
                            this.$store.commit("SET_TOKEN", jwt)
                            if(res.data.code==200){
                             this.$router.push('/index')
                            }
                          else
                            {
                                console.log(2)
                            }

                        }).catch(error => {
                            this.getCaptcha();
                            console.log('error submit!!');
                        })
                    } else {
                        this.getCaptcha();
                        console.log('error submit!!');
                        return false;
                    }

                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            getCaptcha(){
                this.$axios.get('/captcha').then(res=>{
                    console.log("/captcha")
                    this.loginForm.token=res.data.data.token
                    this.captchaImg=res.data.data.captchaImg
                })
            }
        },
        created() {
            this.getCaptcha()
        }
    }
</script>

<style scoped>
    body,html{
        margin: 0;
        padding: 0;
    }
    .el-form{

    }
    .el-row{
        background-color: #fafafa;
        /*background-image: url("../assets/paper2.jpg");*/
        height: 100%;
        display: flex;
        align-items: center;
        text-align: center;
    }
    .el-divider{
        height: 200px;
    }
    .captchaImg{
        float: left;
        margin-left: 8px;
    }

</style>