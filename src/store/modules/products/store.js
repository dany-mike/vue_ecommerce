import * as types from './types'
import actions from './actions'

export const state = {
  productResponse: [],
  productsCategory: [],
  product: {},
}

export const mutations = {
  [types.SET_PRODUCT_RESPONSE](state, productResponse) {
    state.productResponse = productResponse
  },
  [types.GET_PRODUCTS_BY_CATEGORY](state, productsCategory) {
    state.productsCategory = productsCategory
  },
  [types.SET_PRODUCT](state, product) {
    state.product = product
  },
  [types.SET_CLEAR_PRODUCT](state) {
    state.product = {}
  },
}

const getters = {
  getProductResponse: (state) => state.productResponse,
  getProductsByCategory: (state) => state.productsCategory,
  getProduct: (state) => state.product,
}

export default {
  state,
  actions,
  mutations,
  getters,
}
