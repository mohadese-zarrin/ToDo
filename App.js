import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, } from 'react-native';;
import 'react-native-gesture-handler';
import Navigation from './src/navigatoin'
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import { persistStore } from "redux-persist";

// import { createStore } from 'redux'
import store from './src/redux'
const persistor = persistStore(store)

export default function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <StatusBar barStyle="dark-content" backgroundColor='rgba(255,255,255,.1)' />
          <Navigation />
        </PersistGate>
      </Provider>
    </>

  );
};

const styles = StyleSheet.create({
});
