<template>
  <div>
        <el-menu :default-active="$route.path === '/home' ? '/' : $route.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
          :collapse="isCollapse" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" >
          <h3>{{ isCollapse ? '后台' : "后台管理系统" }}</h3>

          <el-menu-item @click="clickMenu(item)" class="el-menu-item__content" v-for="item in noChildren" :key="item.name" :index="item.path">
            <i :class="`el-icon-${item.icon}`"></i>
            <span slot="title">{{ item.label }}</span>
          </el-menu-item>


          <el-submenu @click="clickMenu(item)" class="el-menu-item__content" v-for="item in hasChildren" :key="item.label" :index="item.label">
            <template slot="title">
              <i :class="`el-icon-${item.icon}`"></i>
              <span slot="title">{{ item.label }}</span>
            </template>
            <el-menu-item-group v-for="kid in item.children" :key="kid.name">
              <el-menu-item :index="kid.path" :class="`el-icon-${kid.icon}`" @click="clickMenu(kid)">{{ kid.label }}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>

  </div>
</template>

<script>
import Cookie from 'js-cookie'


export default {
  data() {
    return {

    };
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    clickMenu(item){
      // 防止重复push同一个路径报错
      if(this.$route.path == item.path || (this.$route.path == '/home' && item.path == '/')) return;
      
      console.log('点击选项卡')

      this.$router.push(item.path)

      this.$store.dispatch('selectMenu', item)

    },
  
  },
  computed: {
    noChildren() {
      return this.menuData.filter(item => !item.children)
    },
    hasChildren() {
      return this.menuData.filter(item => item.children)
    },
    isCollapse(){
      return this.$store.state.tab.isCollapse
    },
    menuData(){
     return  this.$store.state.menu.Menu
    }
  },
  mounted(){
    console.log(this.$route)
  }
}
</script>

<style lang="less" scoped>

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}


.el-menu {
  border-right: none;
  line-height: 0;
  height: 100vh;

  h3 {
    color: #fff;
    text-align: center;
    line-height: 48px;
    font-size: 16px;
    font-weight: normal;
  }
}

.el-menu-item__content {
  text-align: left;
}
</style>