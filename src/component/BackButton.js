import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import Dolphin from './Dolphin'
import common from '../common'

function BackButton(props) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={props.onBackPress} style={styles.button}>
                <Dolphin name='Right' size={40} color={common.colors.mainText} style={{ transform: [{ rotate: '180deg' }] }} />
            </TouchableOpacity>
        </View>
    )
}

export default BackButton
const styles = StyleSheet.create({
    container:{
        width:'100%',
        alignItems:'flex-end',
        // position:'absolute',
    },
    button: {
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },

})
