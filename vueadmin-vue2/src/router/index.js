import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../views/Login";
import Home from "@/views/Home";
import Index from "../views/Index";
import Role from "../views/sys/Role";
import User from "../views/sys/User";
import Menu from "@/views/sys/Menu";
import axios from "axios";
import store from  "../store";
import {nextDate} from "element-ui/src/utils/date-util";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/index',
        name: 'Index',
        component: Index
      },
      {
        path: '/userCenter',
        name: 'UserCenter',
        component:  () => import('@/views/UserCenter.vue')
      },
      // {
      //   path: '/sys/user',
      //   name: 'SysUsers',
      //   component: User
      // },
      // {
      //   path: '/sys/Menu',
      //   name: 'SysMenu',
      //   component: Menu
      // },
      // {
      //   path: '/sys/Role',
      //   name: 'SysRole',
      //   component: Role
      // }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')

  }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach(function (to, from, next) {

  let  hasRoute=store.state.menus.hasRoutes
  if (!hasRoute){
    axios.get("/sys/menu/nav",{
      headers:{
        Authorization:localStorage.getItem("token")
      }
    }).then(res=>{

      console.log(res.data.data)
      //拿到menuList
      store.commit("setMenuList",res.data.data.nav)
      //拿到用户权限
      store.commit("setPermList",res.data.data.authoritys)
      console.log(store.state.menus.menus)

      //动态绑定路由
      let newRoutes=router.options.routes
      res.data.data.nav.forEach(menu =>{
        if (menu.children){
          menu.children.forEach(e=>{
            //转成路由
            let route= menuToRoute(e)

            //把路由器添加到路由管理中
            if (route){
              newRoutes[0].children.push(route)
            }

          })
        }
      })
      console.log("newRoutes")
      router.addRoutes(newRoutes)
      hasRoute=true
      store.commit("changeRouteStatus",hasRoute)
    })

  }


  next()
})
const  menuToRoute=(menu)=>{
  if(!menu.component){
    return null
  }
  let route={
    name:menu.name,
    path:menu.path,
    meta:{
      icon:menu.icon,
      title:menu.title
    }
  }
  route.component =()=>import('@/views/'+ menu.component+'.vue')
  return route
}
export default router