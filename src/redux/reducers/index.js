
//combine all reducer
import { combineReducers } from 'redux';
import { createNavigationReducer } from 'react-navigation-redux-helpers';

import RootNavigator from './../../navigators/RootNavigator'
import reducerRooms from './../reducers/reducerRooms';
import reducerCustomers from './../reducers/reducerCustomers';
import reducerOrders from './../reducers/reducerOrders';
import reducerUser from './../reducers/reducerUser';

const reducerRouter = createNavigationReducer(RootNavigator);

const appReducer = combineReducers({
  router: reducerRouter,  
  Rooms: reducerRooms,
  Customers:reducerCustomers,
  Orders:reducerOrders,
  Users:reducerUser,
})

export default appReducer