<template>
    <div class="tabs">
        <el-tag v-for="tag in tags" 
        :key="tag.name" 
        :closable = "tag.name != 'home'" 
        :effect = "$route.name === tag.name ? 'dark' : 'plain'"
        @close="handleClose(tag)"
        @click="handleClick(tag)"
        >
            {{ tag.label }}
        </el-tag>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {


    computed:{
        ...mapState({
            tags : state => state.tab.tabsList
        })
        
    },
    methods:{
        handleClose(item){
            this.$store.commit('popTab', item)
            this.$router.go(-1)
        },
        handleClick(item){
            this.$router.replace(item.path)
        }
    },

    mounted(){
        console.log("打印tags", this.$route)
    }
}
</script>

<style lang="less" scoped>

.tabs{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .el-tag{
        margin: 5px 5px;
        
    }
}

</style>