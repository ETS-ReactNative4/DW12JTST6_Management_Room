import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import Auth from './AuthNavigator';
import UnAuth from './UnAuthnavigator';

const App = createSwitchNavigator({
    App: {
        screen: UnAuth,
    },
    Auth:{
        screen: Auth,
    },
});

export default createAppContainer(App);