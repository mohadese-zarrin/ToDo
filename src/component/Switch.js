import React from 'react'
import {View,TouchableOpacity,StyleSheet,Animated} from 'react-native'
import Dolphin from './Dolphin'
import common from '../common'

function SwitchButton(props) {
    const location=React.useRef(new Animated.Value(36)).current
    const handleAnimation=()=>{
        Animated.spring(location,{
            toValue:props.value?0:36,
            duration:100,
            useNativeDriver:false
        }).start()
    }
    React.useEffect(()=>{
        handleAnimation()
    },[props.value])
    return (
        <TouchableOpacity style={[styles.container,{borderColor:props.value?common.colors.green:common.colors.disable}]} onPress={props.onPress} activeOpacity={1}>
            <Animated.View style={[styles.switch,{left:location}]}>
                <Dolphin name={props.name} size={18}fill={true} color={props.value?common.colors.yellow:common.colors.gray}/>
            </Animated.View>
        </TouchableOpacity>
    )
}

export default SwitchButton
const styles=StyleSheet.create({
    container:{
        width:60,
        // height:30,
        borderWidth:1,
        borderRadius:50
    },
    switch:{
        width:20,
        height:20,
        padding:.5,
        borderRadius:50,
        backgroundColor:'#f3f3f3',
        margin:1,
        alignItems:'center',
        justifyContent:'center'
        // position:'absolute',
        // left:36
    }
})