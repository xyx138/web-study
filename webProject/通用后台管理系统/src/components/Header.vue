<template>
    <div class="header">
        <div class="left">
            <el-button style="margin-right: 20px;" @click="headleTab" icon="el-icon-menu" size="mini"></el-button>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item v-for="item in tabs" :key="item.path" :to="{ path: item.path }">{{ item.label }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="right">
            <el-dropdown  @command="handleClick">
                <span class="el-dropdown-link">
                    <div>
                        <img class="user" :src="img_url" alt="">
                    </div>
                </span>
                <el-dropdown-menu slot="dropdown" >
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item command="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import Cookie from 'js-cookie'

export default {
    methods:{
        headleTab(){
            this.$store.commit('updateCollapse')
        },
        handleClick(command){
            if(command === 'logout'){
                Cookie.remove('token')
                sessionStorage.clear();
                this.$router.replace('/login')
            }
        }
    },
    computed:{
        ...mapState({
            tabs : state => state.tab.tabsList,
            img_url: state => state.userInfo.infos.img,
        })
    },
}
</script>

<style lang="less" scoped>
.header {
    height: 60px;
    background-color: #333;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;


    .left {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        /deep/.el-breadcrumb__item{
            
            .el-breadcrumb__inner{
                font-weight: normal;
                &.is-link{
                    color: #666;

                }
            }
            &:last-child{
                .el-breadcrumb__inner{
                    color: #fff;
                }
            }
        }


    }

    .right {
        
        div{
            display: flex;
            align-items: center;
            .user {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            }
        }

    }
}
</style>