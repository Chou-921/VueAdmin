import Vue from 'vue'
import Vuex from 'vuex'
import menus from "./moudules/menus";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:''
  },
  getters: {
  },
  mutations: {
    SET_TOKEN:(state,token)=>{
      state.token=token
      localStorage.setItem("token",token)
    },

  },
  actions: {
  },
  modules: {
    menus
  }
})