import * as types from '../types'
import URL from '../../../ENV_URL'
import axios from 'axios'

export const handleGetUser = (id, token) => ({
    type: types.GET_USER,
    payload: axios({
        method: "GET",
        url: `${URL.apiUrl}/user/${id}`,
        headers: {
            "content-type": "application/json",
            "authorization": token
        }
    })
})

export const heandleLogin = (data) => ({  
    type: types.AUTH_LOGIN,
    payload: axios({
        method: 'POST',
        headers: {
          'content-type': 'application/json',
      },
      data,
      url: `${URL.apiUrl}/login`
      
      }),
}); 



