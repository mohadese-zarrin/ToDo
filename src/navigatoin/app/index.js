import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import home from '../../pages/home'
import profile from '../../pages/profile'
import newTask from '../../pages/newTask'
import newList from '../../pages/newList'
import lists from '../../pages/profile/component/lists'
import doneTasks from '../../pages/profile/component/doneTasks'
import DatePicker from '../../component/DatePicker'

const Stack = createStackNavigator();

export default function AppNavigation(props) {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={home} options={{ headerShown: false }} />
            <Stack.Screen name="Profile" component={profile} options={{ headerShown: false }} />
            <Stack.Screen name="NewTask" component={newTask} options={{ headerShown: false }} />
            <Stack.Screen name="NewList" component={newList} options={{ headerShown: false }} />
            <Stack.Screen name="Lists" component={lists} options={{ headerShown: false }} />
            <Stack.Screen name="DoneTasks" component={doneTasks} options={{ headerShown: false }} />
            <Stack.Screen name="DatePicker" component={DatePicker} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}