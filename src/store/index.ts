import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import { IPageState, PageModule } from './modules/page'
import { ICategoryState, CategoryModule } from "./modules/category"
// import config from "./modules/config"
import { IAnalyticState, } from "./modules/analytic"
import { IConfigState, } from "./modules/config"
import config from "./modules/config"
Vue.use(Vuex)

export interface IRootState {
  analytic: IAnalyticState
  category: ICategoryState
  page: IPageState,
}
export default new Vuex.Store<IRootState>({
  modules: {
    config
  }
})

// export {
//   PageModule,
//   CategoryModule
// }


// export default new Vuex.Store({
//   modules: {
//     page,
//     category,
//     analytic,
//     config
//   },
//   strict: process.env.DEV,
// })
