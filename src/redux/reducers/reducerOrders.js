import * as types from '../types'

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  orders: []
};

export default function reducerOrders(state = initialState, action) {
  switch (action.type) {
    case `${types.GET_ORDERS}_PENDING`:
      return {
        ...state,
        isLoading: true
      };

    case `${types.GET_ORDERS}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        orders: action.payload.data
      };

    case `${types.GET_ORDERS}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    default:
      return state;
  }
}