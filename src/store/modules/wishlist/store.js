import * as types from './types'
import actions from './actions'

export const state = {
  wishlistProductsResponse: [],
  wishlistProductPayload: null,
  isWislistIcon: true,
}

export const mutations = {
  [types.SET_WISHLIST_PRODUCTS_RESPONSE](state, wishlistProductsResponse) {
    state.wishlistProductsResponse = wishlistProductsResponse
  },
  [types.SET_WISHLIST_PRODUCT_PAYLOAD](state, wishlistProductPayload) {
    state.wishlistProductPayload = wishlistProductPayload
    state.isWislistIcon = false
  },
  [types.SET_DELETE_WISHLIST_PRODUCT](state) {
    state.isWislistIcon = true
  },
  [types.SET_HANDLE_WISHLIST_ICON](state, boolean) {
    state.isWislistIcon = boolean
  },
  [types.SET_AFTER_DELETE_WISHLIST_PRODUCT](state, afterDeleteWishlist) {
    state.wishlistProductsResponse = afterDeleteWishlist
  },
}

const getters = {
  getWishlistResponse: (state) => state.wishlistProductsResponse,
  getIsWishlistIcon: (state) => state.isWislistIcon,
}

export default {
  state,
  actions,
  mutations,
  getters,
}
