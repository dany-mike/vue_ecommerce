import * as types from './types'
import actions from './actions'

export const state = {
  productResponse: [],
  productsCategory: [],
}

export const mutations = {
  [types.SET_PRODUCT_RESPONSE](state, productResponse) {
    state.productResponse = productResponse
  },
  [types.GET_PRODUCTS_BY_CATEGORY](state, productsCategory) {
    state.productsCategory = productsCategory
  },
}

const getters = {
  getProductResponse: (state) => state.productResponse,
  getProductsByCategory: (state) => state.productsCategory,
}

export default {
  state,
  actions,
  mutations,
  getters,
}
