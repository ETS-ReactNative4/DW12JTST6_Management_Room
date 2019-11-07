import * as types from '../types'
import URL from '../../../ENV_URL'
import axios from 'axios'

export const handleLogin = (data) => ({  
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

export const handleRegister = (data) => ({  
    type: types.AUTH_REGISTER,
    payload: axios({
        method: 'POST',
        headers: {
          'content-type': 'application/json',
      },
      data,
      url: `${URL.apiUrl}/register`
      
      }),
}); 



