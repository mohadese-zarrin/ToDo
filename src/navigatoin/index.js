import React from 'react'
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import app from './app'
import intro from '../pages/intro'
import { connect } from 'react-redux'

const Stack = createStackNavigator();

export function mainNavigation(props) {
    console.log(props.user, 'userReducer');
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {!props.user ?
                    <Stack.Screen name="Intro" component={intro} options={{ headerShown: false }} />
                    :
                    <Stack.Screen name="App" component={app} options={{ headerShown: false }} />
                }
            </Stack.Navigator>
        </NavigationContainer>
    );
}
const mapStateToprops = (state) => ({
    user: state.userReducer.user,
})
export default connect(mapStateToprops)(mainNavigation)