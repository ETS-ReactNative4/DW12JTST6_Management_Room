
import * as types from '../types'

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  users: []
};

export default function reducerUser(state = initialState, action) {
  switch (action.type) {
    case `${types.GET_USER}_PENDING`:
      return {
        ...state,
        isLoading: true
      };

    case `${types.GET_USER}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        users: action.payload.data
      };

    case `${types.GET_USER}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    case `${types.AUTH_LOGIN}_PENDING`:
      return {
        ...state,
        isLoading: true
      };

    case `${types.AUTH_LOGIN}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        users: action.payload.data
      };

    case `${types.AUTH_LOGIN}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    default:
      return state;
  }
}