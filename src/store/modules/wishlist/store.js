import * as types from './types'
import actions from './actions'

export const state = {
  wishlistProductsResponse: [],
  wishlistProductPayload: null,
}

export const mutations = {
  [types.SET_WISHLIST_PRODUCTS_RESPONSE](state, wishlistProductsResponse) {
    state.wishlistProductsResponse = wishlistProductsResponse
  },
  [types.SET_WISHLIST_PRODUCT_PAYLOAD](state, wishlistProductPayload) {
    state.wishlistProductPayload = wishlistProductPayload
  },
}

const getters = {
  getWishlistResponse: (state) => state.wishlistProductsResponse,
}

export default {
  state,
  actions,
  mutations,
  getters,
}
