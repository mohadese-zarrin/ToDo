import React from 'react'
import { StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';

export default function (props) {
    return (
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={[props.start, props.end]} style={[styles.btn,{width:props.width},props.style]}>
            {props.children}
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    btn: {
        borderRadius: 8,
        padding: 10,
        alignItems:'center',
        width:'100%',
        height:'100%',
        flexDirection:'row',
        justifyContent:'center'
    }
})