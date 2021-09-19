import React, { useState, useEffect } from 'react'
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, Image } from 'react-native'
import { Styles } from '../../../common/Styles'
import BackButton from '../../../component/BackButton'
import Dolphin from '../../../component/Dolphin'
import common from '../../../common'
import { connect } from 'react-redux'
import { getTasks, getLists } from '../../../dataBase'
import List from '../../../component/List'

function Lists(props) {
    const [tasks, setTasks] = useState([])
    const [lists, setLists] = useState([])

    const handleGetLists = () => {
        getLists().then(response => { setLists(response) }).catch(e => console.log(e, 'handleGetLists error in profile'))
        getTasks(false, 'today').then(response => { setTasks(response); console.log(response, 'handleGetTasks') }).catch(e => console.log(e, 'error handleGetTasks'))
    }
    console.log(lists);
    useEffect(() => {
        props.navigation.addListener('focus', () => {
            handleGetLists()
        });
    }, [props.navigation])
    return (
        <View style={Styles.container}>
            <ScrollView contentContainerStyle={{ padding: 10 }}>
                <BackButton onBackPress={() => props.navigation.goBack()} />
                <View style={styles.userInfoView}>
                    <TouchableOpacity style={Styles.userPicView} onPress={() => props.navigation.navigate('Profile')}>
                        {props.user.image ?
                            <Image style={Styles.userPic} source={{ uri: `data:image/png;base64,${props.user.image}` }} /> :
                            <Image style={styles.userPic} source={{ uri: `data:image/png;base64,${props.user.defaultImage}` }} />}
                    </TouchableOpacity>
                    <View style={{ paddingLeft: 15 }}>
                        <Text style={[Styles.normalText, { fontSize: 20 }]}>{props.user.name ?
                            `سلام ${props.user.name}!`
                            :
                            'سلام کاربر!'}
                        </Text>
                        <Text style={[Styles.lightText, { fontSize: 12 }]}>{tasks.length == 0 ?
                            'امروز کاری نداری'
                            :
                            tasks.length == 1 ?
                                'امروز یک کار داری'
                                :
                                `امروز${tasks.length} تا کار داری`
                        }
                        </Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}>
                    {lists.map((data, index) =>
                        <List
                            onPress={() => props.navigation.push('Home', { data })}
                            key={index}
                            desc={`${data.tasks.length} کار`}
                            data={data}
                        />
                    )}
                    <List data={{ name: 'افزودن', color: '#ff51a8', backgroundColor: '#feebf5', icon: 'More' }} onPress={() => props.navigation.push('NewList')} />
                </View>
            </ScrollView>

        </View>
    )
}

const mapStateToprops = (state) => ({
    user: state.userReducer.user
})
const mapDispatchToProps = (dispatch) => {
    const { taskActions } = require('../../../redux/tasks')
    return {
        onAddTask: (task) => dispatch(taskActions.addTask(task)),
        onDeleteTask: (task) => dispatch(taskActions.deleteTask(task)),
    }
}
export default connect(mapStateToprops, mapDispatchToProps)(Lists)
const styles = StyleSheet.create({
    userInfoView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 40
    },
})