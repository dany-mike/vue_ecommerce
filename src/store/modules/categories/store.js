import * as types from './types'
import actions from './actions'

export const state = {
  categoryResponse: [],
  categoryItem: {},
}

export const mutations = {
  [types.SET_CATEGORY_RESPONSE](state, categoryResponse) {
    state.categoryResponse = categoryResponse
  },
  [types.GET_CATEGORY_ITEM](state, categoryitem) {
    state.categoryItem = categoryitem
  },
}

const getters = {
  getCategoryResponse: (state) => state.categoryResponse,
  getCategoryItem: (state) => state.categoryItem,
}

export default {
  state,
  actions,
  mutations,
  getters,
}
