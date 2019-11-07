import * as types from '../types'
import URL from '../../../ENV_URL'
import axios from 'axios'

export const handleGetRooms = (token) => ({
    type: types.GET_ROOMS,
    payload: axios({
        method: "GET",
        url : `${URL.apiUrl}/rooms`,
        headers: {
            "content-type": "application/json",
            "authorization": token
        }
    })
})




