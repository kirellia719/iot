import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Home from './screens/Home';
import History from './screens/History';
import Profile from './screens/Profile';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import Reducer from './screens/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const screens = [
    { name: 'Home', component: Home },
    { name: 'History', component: History },
    { name: 'Profile', component: Profile },
];

const Tab = createBottomTabNavigator();
const store = createStore(Reducer, composeWithDevTools(applyMiddleware(thunk)));

const App = () => {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName;

                            if (route.name === 'Home') {
                                iconName = 'desktop';
                            } else if (route.name === 'History') {
                                iconName = 'comment';
                            } else if (route.name === 'Profile') {
                                iconName = 'address-card';
                            }

                            // You can return any component that you like here!
                            return <Icon name={iconName} size={size} color={color} solid={focused} />;
                        },
                        tabBarActiveTintColor: 'tomato',
                        tabBarInactiveTintColor: 'gray',
                    })}
                >
                    {screens.map((screen, index) => (<Tab.Screen key={index} name={screen.name} component={screen.component} />))}
                </Tab.Navigator>
            </NavigationContainer>
        </Provider>
    );
};

export default App;