import * as types from '../types'
import URL from '../../../ENV_URL'

import axios from 'axios'

export const handleGetCustomers = (token) => ({
    type: types.GET_CUSTOMERS,
    payload: axios({
        method: "GET",
        url : `${URL.apiUrl}/customers`,
        headers: {
            "content-type": "application/json",
            "authorization": token
        }
    })
})
export const handleGetCustomerById = (id,token) => ({
    type: types.GET_CUSTOMERS_ID,
    payload: axios({
        method: "GET",
        url : `${URL.apiUrl}/customer/${id}`,
        headers: {
            "content-type": "application/json",
            "authorization": token
        }
    })
})

// export const handleAddCustomers = (token, data) => ({
//     type: types.ADD_EPISODE,
//     payload: axios({
//         method:"POST",
//         headers: {
//             'authorization': `${token}`
//         },
//         url : url+`user/${data.id}/webtoon/${data.webtoon_id}/episode`,
//         data,
//     })
// })