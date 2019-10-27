import * as types from '../types'
import URL from '../../../ENV_URL'
import axios from 'axios'
// const url = 'https://clowtoon-api.herokuapp.com/api/v1/'
// const url = 'http://192.168.0.62:4000/api/v1/'


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

// export const handleAddWebtoon = (token, data, id) => ({
//     type: types.ADD_WEBTOON,
//     payload: axios({
//         method:"POST",
//         headers: {
//             "content-type" : "application/json",
//             'authorization': `${token}`
//         },
//         url : URL.url+`/user/${id}/webtoon`,
//         data,
//     })
// })





