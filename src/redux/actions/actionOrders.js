import * as types from '../types'
import URL from '../../../ENV_URL'
import axios from 'axios'

export const handleGetOrders = (token) => ({
    type: types.GET_EPISODE_DETAIL,
    payload: axios({
        method: "GET",
        url : `${URL.apiUrl}/checkin`,
        headers: {
            "content-type": "application/json",
            "authorization": token
        }
    }),

})

