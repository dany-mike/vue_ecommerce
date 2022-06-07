import axios from 'axios'
import * as types from './types'
import { authHeader } from '@/helpers/authHeader'

export default {
  [types.CREATE_ORDER]({ commit }, body) {
    return axios
      .post(`${process.env.VUE_APP_API_BASE_URL}/order`, body, {
        headers: authHeader(),
      })
      .then((response) => {
        commit(types.SET_ORDER_RESPONSE, response.data)
      })
      .catch((err) => console.log(err))
  },
  [types.COMPLETE_ORDER]({ commit }, body) {
    return axios
      .post(`${process.env.VUE_APP_API_BASE_URL}/order/complete`, body, {
        headers: authHeader(),
      })
      .then((response) => {
        commit(types.SET_ORDER_RESPONSE, response.data)
      })
      .catch((err) => console.log(err))
  },
  [types.CANCEL_ORDER]({ commit }, body) {
    return axios
      .post(`${process.env.VUE_APP_API_BASE_URL}/order/cancel`, body, {
        headers: authHeader(),
      })

      .then((response) => {
        commit(types.SET_ORDER_RESPONSE, response.data)
      })
      .catch((err) => console.log(err))
  },
  [types.FETCH_ORDER_SUMMARY]({ commit }, { orderId }) {
    return axios
      .get(`${process.env.VUE_APP_API_BASE_URL}/order/summary/i/${orderId}`, {
        headers: authHeader(),
      })
      .then((response) => {
        commit(types.SET_ORDER_RESPONSE, response.data)
      })
      .catch((err) => console.log(err))
  },
}
