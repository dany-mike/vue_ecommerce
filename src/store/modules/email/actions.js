import { authHeader } from '@/helpers/authHeader'
import axios from 'axios'
import * as types from './types'

export default {
  [types.SEND_INVOICE]({ commit }, { userToken, orderId, orderItemsDto }) {
    return axios
      .post(
        `${process.env.VUE_APP_API_BASE_URL}/email/invoice`,
        {
          userToken,
          orderId,
          orderItemsDto,
        },
        {
          headers: authHeader(),
        },
      )
      .then((response) => {
        commit(types.SET_SEND_INVOICE, response.data)
      })
      .catch((err) => console.log(err))
  },
  [types.SEND_RESET_LINK]({ commit }, body) {
    return axios
      .post(`${process.env.VUE_APP_API_BASE_URL}/email/reset-link`, body, {
        headers: authHeader(),
      })
      .then((response) => {
        commit(types.SET_SEND_RESET_LINK, response.data)
      })
      .catch((err) => commit(types.SET_ERROR_RESPONSE, err.response.data))
  },
  [types.CLEAR_ERROR_RESPONSE]({ commit }) {
    commit(types.SET_CLEAR_ERROR_RESPONSE)
  },
}
