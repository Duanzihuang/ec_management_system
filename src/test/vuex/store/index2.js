import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import {
  addLocalGoods,
  getLocalGoodsList,
  getTotalCount
} from '../tools/localStorageHelper'

const store = new Vuex.Store({
    state:{
        goodsList:getLocalGoodsList(),
        totalCount:getTotalCount()
    },
    getters:{
      getTotalCount(state){
        return state.totalCount
      }
    },
    mutations:{
      addGoods(state,goods){
        state.totalCount = addLocalGoods(goods)
      }
    }
})

window.onbeforeunload = function(){
  alert("2222222222222")
}

export default store
