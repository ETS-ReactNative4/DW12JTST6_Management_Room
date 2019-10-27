
import * as types from '../types'

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  rooms: []
};

export default function reducerRooms(state = initialState, action) {
  switch (action.type) {
    case `${types.GET_ROOMS}_PENDING`:
      return {
        ...state,
        isLoading: true
      };

    case `${types.GET_ROOMS}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        rooms: action.payload.data
      };

    case `${types.GET_ROOMS}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    case `${types.ADD_ROOM}_PENDING`:
      return {
        ...state,
        isLoading: true
      };

    case `${types.ADD_ROOM}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        rooms: action.payload.data
      };

    case `${types.ADD_ROOM}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        isError: true
      };

    default:
      return state;
  }
}