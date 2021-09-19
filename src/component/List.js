import React from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { Styles } from '../common/Styles'
import common from '../common'
import Dolphin from './Dolphin'

function List(props) {
    const {name,icon,color,backgroundColor}=props.data
    return (
        <TouchableOpacity activeOpacity={1} onPress={props.onPress} style={[Styles.shadow, styles.container, props.style]}>
            <View style={[Styles.shadow,styles.iconViwe, { backgroundColor: backgroundColor }]}>
                {icon?<Dolphin name={icon} size={35} fill={true} color={color} />:<Dolphin name='Home' size={35} fill={true} color={color}/>}
            </View>
            <View style={styles.nameView}>
                <Text style={Styles.titleText}>{name}</Text>
                {props.desc &&
                    <Text style={Styles.descText}>{props.desc}</Text>
                }
            </View>
        </TouchableOpacity>
    )
}

export default List
const styles = StyleSheet.create({
    container: {
        width: 110,
        padding: 10,
        alignItems: 'center',
        borderRadius: 8, 
        backgroundColor: 'white',
        marginHorizontal: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: 'white',
    },
    iconViwe: {
        width: 70,
        height: 70,
        borderRadius: 70/2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    nameView: {
        minHeight: 50, 
        justifyContent: 'center',
        // borderWidth:1,
        paddingVertical:2,
        alignItems:'center'
    }
})
