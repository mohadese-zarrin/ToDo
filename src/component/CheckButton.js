import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import Dolphin from './Dolphin'
import common from '../common'

function CheckButton(props) {
    return (
        <>
            <TouchableOpacity
                onPress={props.onPress}
                style={[
                    styles.container,
                    props.type=='Circle'&&{borderRadius:50},
                    props.value && { backgroundColor: common.colors.green, borderColor: common.colors.green
                    }]}>
                {props.value && <Dolphin style={{ textAlign: 'center' }} name='Tick' fill={true} size={16} color='white' />}
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={props.onPress}>
                <Dolphin name='Tick' type={props.type} color={common.colors.green} size={20} />
                {!props.value && <View style={styles.circleCheck}></View>}
            </TouchableOpacity> */}
        </>
    )
}

export default CheckButton
const styles = StyleSheet.create({
    container: {
        width: 16,
        aspectRatio:1,
        borderRadius: 5,
        overflow: 'hidden',
        borderWidth: .8,
        borderColor: common.colors.disable,
        backgroundColor: 'white',
        marginRight:5
    },
    circleCheck: {
        width: '90%',
        aspectRatio: 1,
        position: 'absolute',
        backgroundColor: 'white',
        borderWidth: .5,
        borderRadius: 5
    }
})