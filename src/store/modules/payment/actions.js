import { authHeader } from '@/helpers/authHeader'
import axios from 'axios'
import * as types from './types'

export default {
  [types.CREATE_PAYMENT_INTENT]({ commit }, body) {
    return axios
      .post(`${process.env.VUE_APP_API_BASE_URL}/payment`, body, {
        headers: authHeader(),
      })
      .then((response) => {
        commit(types.SET_PAYMENT_INTENT, response.data)
      })
      .catch((err) => console.log(err))
  },
}
