import * as types from './types'
import actions from './actions'

export const state = {
  orderResponse: {},
  userOrders: [],
  orderCompleted: {},
  orderItem: {},
  payOrder: {},
  cancelOrder: {},
  createOrder: {},
  orderSummary: {},
}

export const mutations = {
  [types.SET_PAY_ORDER](state, payOrder) {
    state.payOrder = payOrder
  },
  [types.SET_ORDER_SUMMARY](state, orderSummary) {
    state.orderSummary = orderSummary
    console.log(orderSummary)
  },
  [types.SET_CREATE_ORDER](state, createOrder) {
    state.createOrder = createOrder
  },
  [types.SET_CANCEL_ORDER](state, cancelOrder) {
    state.cancelOrder = cancelOrder
  },
  [types.SET_USER_ORDERS](state, userOrders) {
    state.userOrders = userOrders
  },
  [types.SET_CLEAR_ORDER_DETAILS](state) {
    state.orderSummary = {}
  },
  [types.SET_ORDER_COMPLETED](state, orderCompleted) {
    state.orderCompleted = orderCompleted
  },
  [types.SET_ORDER_ITEM](state, orderItem) {
    state.orderItem = orderItem
  },
}

const getters = {
  getOrderSummary: (state) => state.orderSummary,
  getUserOrders: (state) => state.userOrders,
  getOrderCompleted: (state) => state.orderCompleted,
  getOrderItem: (state) => state.orderItem,
  getCreateOrder: (state) => state.createOrder,
}

export default {
  state,
  actions,
  mutations,
  getters,
}
