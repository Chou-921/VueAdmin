import Vue from 'vue'
import Vuex from 'vuex'
import th from "element-ui/src/locale/lang/th";

Vue.use(Vuex)

export default ({
    state: {
        menuList: [],
        permList: [],
        hasRoutes:  false,
        editableTabsValue: 'Index',
        editableTabs: [{
            title: '首页',
            name: 'Index',
        }]
    },
    mutations: {
        setMenuList(state,menus){
            state.menuList=menus
        },
        setPermList(state,authoritys){
            state.permList=authoritys
        },

        changeRouteStatus(state,hasRoute){
            state.hasRoutes=hasRoute

        },
        addTab(state,tab) {

           let index =  state.editableTabs.findIndex(e=>e.name===tab.name)
            if(index===-1){
                state.editableTabs.push({
                    title: tab.title,
                    name: tab.name,
                });
            }

            state.editableTabsValue = tab.name;
        },
        resetState:(state => {
            state.menuList=[]
            state.permList=[]
            state.hasRoutes=false
            state.editableTabsValue='Index'
            state.editableTabs=[{
                title: '首页',
                name: 'Index',
            }]
        })
    },
    actions: {
    },

})
