import * as types from './types'
import actions from './actions'

export const state = {
  wishlistProductsResponse: [],
  wishlistProductPayload: null,
  isWishlistIconEmpty: true,
}

export const mutations = {
  [types.SET_WISHLIST_PRODUCTS_RESPONSE](state, wishlistProductsResponse) {
    state.wishlistProductsResponse = wishlistProductsResponse
  },
  [types.SET_WISHLIST_PRODUCT_PAYLOAD](state, wishlistProductPayload) {
    state.wishlistProductPayload = wishlistProductPayload
    state.isWishlistIconEmpty = false
  },
  [types.SET_DELETE_WISHLIST_PRODUCT](state) {
    state.isWishlistIconEmpty = true
  },
  [types.SET_HANDLE_WISHLIST_ICON](state, boolean) {
    state.isWishlistIconEmpty = boolean
  },
  [types.SET_AFTER_DELETE_WISHLIST_PRODUCT](state, afterDeleteWishlist) {
    state.wishlistProductsResponse = afterDeleteWishlist
  },
}

const getters = {
  getWishlistResponse: (state) => state.wishlistProductsResponse,
  getIsWishlistIcon: (state) => state.isWishlistIconEmpty,
}

export default {
  state,
  actions,
  mutations,
  getters,
}
