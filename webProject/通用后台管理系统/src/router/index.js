import Vue from "vue";
import VueRouter from "vue-router";


import Main from "../pages/Main.vue"
import Home from "../pages/Home.vue"
import User from "../pages/User.vue"
import Mall from "@/pages/Mall.vue";
import Page1 from "@/pages/Page1.vue";
import Page2 from "@/pages/Page2.vue";
import Login from "@/pages/Login.vue";
import Cookies from "js-cookie";
import store from '../store'
Vue.use(VueRouter)


const router = new VueRouter({
    routes:[
        {
            path: '/',
            component: Main,
            redirect: '/home',
            children:[
                {
                    path: '/home',
                    name: 'home',
                    component: Home,
                },
                {
                    path: '/user',
                    name: 'user',
                    component: User,
                },
                {
                    path: '/mall',
                    name: 'mall',
                    component: Mall,
                },
                {
                    path: '/page1',
                    name: 'page1',
                    component: Page1,
                },
                {
                    path: '/page2',
                    name: 'page2',
                    component: Page2,
                },
            ]

        },
        {
            path:'/login',
            name: 'login',
            component: Login
        }
    ]
})


const originalPush = VueRouter.prototype.push;
const originalReplace = VueRouter.prototype.replace;


// 重写replace 和 push 函数， 防止重复跳转相同路由报错
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}
VueRouter.prototype.replace = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
  return originalReplace.call(this, location).catch(err => err)
}

router.beforeEach(
    (to, from,next) => {
        // console.log(from, to)
        // console.log(Cookies.get('token'))
        if(Cookies.get('token') != null) {
            console.log("有token")
            if(to.path == '/login'){
                next(from)
            }
            else if(to.path == '/user' || to.path == 'mall'){
                if(store.state.menu.Menu.length === 4){
                    next()
                }
                else next(from)
            }
            else{
                next()
            }
        }
        else {
            console.log("无token")
            if(to.path == '/login'){
                next()
            }
            else{
                console.log("强制定位到登录界面")
                next('/login')
            }
        }
    }
)
  
export default router