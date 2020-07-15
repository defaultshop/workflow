
<template>
    <div class="back">
        <div><span>用户名：</span><input type="text" v-model="account"></div>
        <div><span>密码：</span><input type="text" v-model="password"></div>
        <div class="confirm" @click="skipHome">确定</div>
    </div>
</template>

<script>

    import {post_token} from '@/api/common'

    export default {
        data() {
            return {
                account: 'admin',
                password: '123qwe',
            }
        },
        methods: {
            async skipHome(){

                let res = await post_token({
                    "loginName": this.account,
                    "password": this.password,
                })
                if(res.success){
                    sessionStorage.setItem("isLogin", "ok");
                    sessionStorage.setItem('accessToken', res.result.accessToken);
                    this.$router.push({
                        name: 'Area'
                    })
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .back{
        background: #fff;
        width: 100vw;
        height: 100vh;
        font-size: 30px;
        padding: 50px;
        box-sizing: border-box;

        div{
            margin-bottom: 30px;

            span{
                display: inline-block;
                width: 130px;
            }
        
            input{
                border: 1px solid #c7baba;
                padding: 0 10px;
                height: 50px;
                font-size: 26px;
                width: 490px;
            }
        }

        .confirm{
            border: 1px solid #8888ff;
            padding: 10px;
            width: 100px;
            text-align: center;
            color: #8888ff;
            border-radius: 2px;
        }
    }
</style>
