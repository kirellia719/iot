import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import Home from './screens/Home';
import Statistic from './screens/Statistic';
import History from './screens/History';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import Reducer from './screens/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const screens = [
    { name: 'Home', component: Home, iconName: 'easel' },
    { name: 'History', component: History, iconName: 'hourglass' },
    { name: 'Statistic', component: Statistic, iconName: 'bar-chart' },
];

const Tab = createBottomTabNavigator();
const store = createStore(Reducer, composeWithDevTools(applyMiddleware(thunk)));

const App = () => {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Tab.Navigator initialRouteName='Home'>
                    {screens.map((screen, index) => (
                        <Tab.Screen key={index} name={screen.name} component={screen.component}
                            options={({ route }) => ({
                                tabBarIcon: ({ focused, color, size }) => {
                                    return <Icon name={screen.iconName} size={size} color={color} solid={focused} />;
                                },
                                tabBarActiveTintColor: 'dodgerblue',
                                tabBarInactiveTintColor: 'gray',
                            })}
                        />))}
                </Tab.Navigator>
            </NavigationContainer>
        </Provider>
    );
};

export default App;