import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import common from '../common'
import { Styles } from '../common/Styles'
import CheckButton from './CheckButton'
import Dolphin from './Dolphin'
import moment from 'moment-jalaali'
import { editTask } from '../dataBase'
import ShadowView from 'react-native-simple-shadow-view'
const map = [common.colors.green, common.colors.yellow, common.colors.pink]
function Task(props) {
    const { date, desc, done, id, list, priority, reminder, title } = props.data
    const onPressCheck = () => {
        let newTask = { ...props.data }
        newTask.done = !done
        editTask(newTask).then(response => console.log(response, 'handleEditTask')).catch(e => console.log(e, 'editTask error'))
        props.updateList()
    }

    return (
        <TouchableOpacity onPress={props.onPress} style={styles.container} >
            <ShadowView style={[Styles.shadowColor, styles.priority, {shadowColor: map[priority]}]}>
                <View style={{width:'100%',height:'100%',backgroundColor:map[priority],borderBottomLeftRadius:5,borderTopLeftRadius:5}}></View>
            </ShadowView>
            <View style={styles.infoContainer}>
                <View>
                    <Text style={[Styles.normalText, done && { color: common.colors.disable }]}>{title}</Text>
                    {done && <View style={styles.doneLine}></View>}
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {date && <Text style={[Styles.normalText, styles.time]}>{moment(date).format('HH:mm')}</Text>}
                    <Dolphin style={{ marginHorizontal: 5 }} name='Notification' fill={true} color={reminder ? common.colors.yellow : common.colors.disable} />
                    <CheckButton type='Circle' value={done}
                        onPress={() => onPressCheck()} />
                </View>
            </View>
            
        </TouchableOpacity>
    )
}

export default Task
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 60,
        flexDirection: 'row',
        borderRadius: 8,
        // overflow: 'hidden',
        marginVertical: 10,
        elevation: 2,
        backgroundColor: 'white',
    },
    priority: {
        width: '2%',
        height: '100%',
        overflow:'hidden'
    },
    infoContainer: {
        width: '98%',
        height: '100%',
        padding: 15,
        // borderRadius:8,
        borderBottomRightRadius:8,
        borderTopRightRadius:8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    circleCheck: {
        width: '90%',
        aspectRatio: 1,
        position: 'absolute',
        backgroundColor: 'white',
        borderWidth: .5,
        borderRadius: 50
    },
    doneLine: {
        position: 'absolute',
        width: '105%',
        borderTopWidth: .8,
        bottom: '40%',
        borderColor: common.colors.disable
    },
    time: {
        color: common.colors.disable,
        marginHorizontal: 10
    },
    shadowColor: {
        shadowOpacity: 1,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: 0 },
    }
})