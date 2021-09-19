
import userReducer from './user'
import taskReducer from './tasks'
import listReducer from './lists'
import { createStore, combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';

// import storage from 'redux-persist/lib/storage' 
// import { AsyncStorage } from 'react-native'
// import storage from 'redux-persist/es/storage';

const config = {
    key: "root",
    storage: AsyncStorage,
};
const combreducer = combineReducers({ userReducer,taskReducer,listReducer});

const persistedReducer = persistReducer(config, combreducer);
const store = createStore(persistedReducer)

export default store