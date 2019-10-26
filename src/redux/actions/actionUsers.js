import * as types from '../types'
import * as URL from '../../../ENV_URL'
import axios from 'axios'

export const handleGetUser = (id, token) => ({
    type: types.GET_USER,
    payload: axios({
        method: "GET",
        url: URL.url+`/user/${id}`,
        headers: {
            "content-type": "application/json",
            "authorization": token
        }
    })
})



