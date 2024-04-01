<template>
  <div>
    <el-container>
        <el-aside width="auto">
          <common-aside/>
        </el-aside>
        <el-container>
          <el-header>
            <Header></Header>
          </el-header>

          <common-tag></common-tag>

          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonAside from '@/components/CommonAside.vue';
import Header from '../components/Header'
import CommonTag from '../components/CommonTag'
export default {
  
  components:{
    CommonAside,
    Header,
    CommonTag,
    CommonTag
  }
}
</script>

<style>

  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
    margin: 0;
    padding: 0;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>