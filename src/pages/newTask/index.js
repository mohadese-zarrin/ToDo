import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, Keyboard, ScrollView, StyleSheet, Platform } from 'react-native'
import { connect } from 'react-redux'
import { Styles } from '../../common/Styles'
import common from '../../common'
import List from '../../component/List'
import BackButton from '../../component/BackButton'
import SwitchButton from '../../component/Switch'
import CheckButton from '../../component/CheckButton'
import GradientButton from '../../component/GradientButton'
import Dolphin from '../../component/Dolphin'
import Modal from 'react-native-modal'
import DatePicker from '../../component/DatePicker'
import { addNewTask, getLists, deleteList, editTask, deleteTask } from '../../dataBase'
import moment from 'moment-jalaali'
import { handleScheduleNotification } from '../../notification'
import ShadowView from 'react-native-simple-shadow-view'


function newTask(props) {
    const [dateModal, setDateModal] = useState(false)
    const [Lists, setLists] = useState([])
    const [show, setShow] = React.useState({ list: false, reminder: false })
    const [reminder, setReminder] = useState(0)
    const [task, setTask] = useState({
        title: '',
        desc: '',
        list: props.user.defaultList,
        priority: 0,
        id: Date.now(),
        date: null,
        reminder: null,
        done: false,
        checkList: [],
        err: undefined
    })
    const onChangeReminder = (e) => {
        const newTask = task.date ? new Date(task.date) : new Date()
        if (e == 1) {
            setReminder(1)
            if (props.route.params) {
                handleEditTask({ name: 'reminder', value: new Date(newTask.setHours(9, 0, 0)) })
            }
            setTask({ ...task, reminder: new Date(newTask.setHours(9, 0, 0)) })
        }
        if (e == 2) {
            setReminder(2)
            if (props.route.params) {
                handleEditTask({ name: 'reminder', value: new Date(newTask.setHours(newTask.getHours() - 1)) })
            }
            setTask({ ...task, reminder: new Date(newTask.setHours(newTask.getHours() - 1)) })
        }
    }

    const [value, setValue] = useState('')
    const handlePushToCheckList = () => {
        if (value.length > 0) {
            let item = { done: false, title: value }
            setTask({ ...task, checkList: [...task.checkList, item] })
            if (props.route.params) {
                let newTask = { ...task }
                newTask.checkList = [...newTask.checkList, item]
                newTask.checkList = JSON.stringify(newTask.checkList)
                if (newTask.title.length > 0) {
                    editTask(newTask).then(response => { console.log(response, 'handleEditTask') }).catch(e => console.log(e, 'editTask error'))
                } else {
                    setTask({ ...task, err: 'لطفن یک نام مناسب وارد کنید' })
                }
            }
        }
        setValue('')
    }
    const editChecklist = (index, text) => {
        let item = { done: task.checkList[index].done, title: text }
        let newCheck = task.checkList
        newCheck[index] = item
        console.log(newCheck, 'c');
        // var removed = newCheck.splice(index, 1);
        // console.log(removed, 'r');
        if (text.length == 0) {
            var removed = newCheck.splice(index, 1);
            console.log(removed, 'r');
        }
        console.log(item, 'item')

        setTask({ ...task, checkList: newCheck })
        if (props.route.params) {
            handleEditTask({ name: 'checkList', value: newCheck })
        }
    }
    const onCheck = (index) => {
        let newTask = { ...task }
        newTask.checkList[index].done = !newTask.checkList[index].done
        setTask({ ...task, checkList: newTask.checkList })
        if (props.route.params) {
            newTask.checkList = JSON.stringify(newTask.checkList)
            editTask(newTask).then(response => { console.log(response, 'handleEditTask') }).catch(e => console.log(e, 'editTask error'))
        }
    }

    const handleAddTask = () => {
        let newTask = { ...task }
        newTask.checkList = JSON.stringify(task.checkList)
        if (task.title.length > 0) {
            addNewTask(newTask).then(response => props.navigation.navigate('Home')).catch(e => console.log(e, 'handleAddTask error'))
            if (newTask.reminder) {
                handleScheduleNotification(newTask.id, newTask.title, newTask.reminder)
            }
        }
        else {
            setTask({ ...task, err: 'لطفن یک نام مناسب وارد کنید' })
        }
    }
    const handleGetLists = () => {
        getLists().then(response => setLists(response)).catch(e => console.log(e, 'handleGetLists error'))
    }
    const handleEditTask = (e) => {
        const { name, value } = e
        let newTask = { ...task }
        newTask[name] = value
        newTask.checkList = JSON.stringify(newTask.checkList)
        editTask(newTask).then(response => name == 'done' && props.navigation.push('Home')).catch(e => console.log(e, 'editTask error'))
        if (newTask.reminder) {
            handleScheduleNotification(newTask.id, newTask.title, newTask.reminder)
        }
        setTask({ ...task, [name]: value })
    }

    const handleDeleteTask = () => {
        deleteTask(task).then(response => props.navigation.navigate('Home')).catch(e => console.log(e, 'deleteTask error'))
    }
    useEffect(() => {
        props.navigation.addListener('focus', () => {
            if (props.route.params) {
                console.log(props.route.params.data, 'data');
                const tempTask = props.route.params.data
                tempTask.checkList = JSON.parse(props.route.params.data.checkList) ? JSON.parse(props.route.params.data.checkList) : []
                setTask(tempTask)
            }
            handleGetLists()
        });
    }, [props.navigation])
    return (
        <View style={Styles.container}>
            <BackButton onBackPress={() => props.navigation.push('Home')} />
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={{ paddingHorizontal: 5 }}>
                    {task.err && <Text style={[Styles.normalText, { color: 'red', fontSize: 12, margin: 0 }]}>{task.err}</Text>}
                </View>
                <View style={[styles.field, { flexDirection: 'row', alignItems: 'center', }]}>
                    <Text style={Styles.normalText}>عنوان:</Text>
                    <TextInput
                        style={{ fontFamily: common.font.normal, textAlign: 'right', width: '85%' }}
                        value={task.title} placeholder='من میخواهم....'
                        onChangeText={(text) => { props.route.params ? handleEditTask({ name: 'title', value: text }) : setTask({ ...task, title: text, err: undefined }) }} />
                </View>
                <View style={styles.field}>
                    <Text style={Styles.normalText}>توضیح:</Text>
                    <TextInput
                        style={{ fontFamily: common.font.normal, textAlign: 'right' }}
                        multiline={true} value={task.desc} placeholder='توضیحات '
                        onChangeText={(text) => { props.route.params ? handleEditTask({ name: 'desc', value: text }) : setTask({ ...task, desc: text }) }} />
                </View>
                <View style={styles.field}>
                    <Text style={Styles.normalText}>چک لیست:</Text>
                    {task.checkList && task.checkList.map((data, index) =>
                        <View key={index} style={{ flexDirection: 'row', padding: 5, alignItems: 'center' }}>
                            <CheckButton value={data.done} type='Square' onPress={() => onCheck(index)} />
                            <View>
                                <TextInput
                                    value={data.title}
                                    style={[Styles.normalText, data.done && { color: common.colors.disable }]}
                                    onChangeText={(text) => editChecklist(index, text)} />
                                {data.done && <View style={styles.doneLine}></View>}
                            </View>
                        </View>
                    )}
                    <View style={{ flexDirection: 'row', paddingHorizontal: 5, alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => handlePushToCheckList()}>
                            <Dolphin name='More' type='Square' size={17} color={common.colors.disable} />
                        </TouchableOpacity>
                        <TextInput
                            onEndEditing={handlePushToCheckList}
                            style={{ textAlign: 'right' }}
                            value={value}
                            onChangeText={text => setValue(text)}
                            placeholder='...' />
                    </View>
                </View>
                <View style={styles.field}>
                    <Text style={Styles.normalText}>اولویت:</Text>
                    <View style={styles.priorityView}>
                        <TouchableOpacity style={[styles.priority, task.priority == 0 && { borderColor: common.colors.green }]} onPress={() => { props.route.params ? handleEditTask({ name: 'priority', value: 0 }) : setTask({ ...task, priority: 0 }) }}>
                            <Text style={[styles.priorityText, task.priority == 0 && { color: common.colors.green }]}>کم</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.priority, task.priority == 1 && { borderColor: common.colors.yellow }]} onPress={() => { props.route.params ? handleEditTask({ name: 'priority', value: 1 }) : setTask({ ...task, priority: 1 }) }}>
                            <Text style={[styles.priorityText, task.priority == 1 && { color: common.colors.yellow }]}>متوسط</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.priority, task.priority == 2 && { borderColor: common.colors.pink }]} onPress={() => { props.route.params ? handleEditTask({ name: 'priority', value: 2 }) : setTask({ ...task, priority: 2 }) }}>
                            <Text style={[styles.priorityText, task.priority == 2 && { color: common.colors.pink }]}>زیاد</Text>
                        </TouchableOpacity>
                    </View>

                </View>

                <View style={[styles.field, { paddingHorizontal: 0 }]}>
                    <TouchableOpacity onPress={() => setShow({ ...show, list: !show.list })} style={[styles.rowField]}>
                        <Text style={Styles.normalText}>لیست:</Text>
                        <View style={{ alignItems: 'flex-end' }}>
                            <SwitchButton
                                name="FileText"
                                value={task.list !== props.user.defaultList}
                                onPress={() => { props.route.params ? handleEditTask({ name: 'list', value: props.user.defaultList }) : setTask({ ...task, list: props.user.defaultList }) }} />
                            {task.list == props.user.defaultList && <Text style={[Styles.descText, { color: 'gray' }]}>لیست پیشفرض</Text>}
                        </View>
                    </TouchableOpacity>

                    {show.list && <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.listsView}>
                        {Lists.map((data, index) =>
                            <List key={index} data={data} style={task.list == data.id && { borderColor: data.color }} onPress={() => { props.route.params ? handleEditTask({ name: 'list', value: data.id }) : setTask({ ...task, list: data.id }) }} />
                        )}
                        <List data={{ name: 'افزودن', color: '#ff51a8', backgroundColor: '#feebf5', icon: 'More' }} onPress={() => props.navigation.navigate('NewList')} />
                    </ScrollView>}
                </View>

                <TouchableOpacity onPress={() => setDateModal('date')} style={[styles.field, styles.rowField]}>
                    <Text style={Styles.normalText}>زمان:</Text>
                    <View style={{ alignItems: 'flex-end' }}>
                        <SwitchButton name="Alarm-Clock" value={task.date} onPress={() => { props.route.params ? handleEditTask({ name: 'date', value: null }) : setTask({ ...task, date: null }) }} />
                        {/* <Text style={[Styles.descText]}>{task.date?task.date:0}</Text> */}
                        <Text style={[Styles.descText, { color: 'gray' }]}>{task.date ? `${moment(task.date).format('jYYYY/jM/jD')} - ${moment(task.date).format('HH:mm')}` : 'زمان تنظیم نشده'}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setShow({ ...show, reminder: !show.reminder })} style={[styles.field, styles.rowField]}>
                    <Text style={Styles.normalText}>یادآوری:</Text>
                    <View style={{ alignItems: 'flex-end' }}>
                        <SwitchButton name="Notification" value={task.reminder} onPress={() => { props.route.params ? handleEditTask({ name: 'reminder', value: null }) : setTask({ ...task, reminder: null }) }} />
                        {!task.reminder && <Text style={[Styles.descText, { color: 'gray' }]}>یادآوری فعال نیست</Text>}
                    </View>
                </TouchableOpacity>
                {show.reminder && <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 }}>

                    <TouchableOpacity
                        style={[styles.reminderItems, reminder == 1 && { borderColor: common.colors.pink }]}
                        onPress={() => onChangeReminder(1)}>
                        <View style={[styles.reminderIcons, reminder == 1 && { borderColor: common.colors.pink }]}>
                            <Text style={{ color: reminder == 1 ? common.colors.pink : common.colors.gray }}>9:00</Text>
                        </View>
                        <Text style={[Styles.lightText]}>صبح همان روز</Text>
                        <Text style={[Styles.descText, { color: 'gray' }]}>
                            {`${moment().format('jYYYY/jM/jD')} - ${moment('09:00', 'HH:mm').format('HH:mm')}`}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.reminderItems, reminder == 2 && { borderColor: common.colors.pink }]}
                        onPress={() => onChangeReminder(2)}>
                        <View style={[styles.reminderIcons, reminder == 2 && { borderColor: common.colors.pink }]}>
                            <Text style={{ color: reminder == 2 ? common.colors.pink : common.colors.gray }}>1</Text>
                        </View>
                        <Text style={[Styles.lightText]}>یک ساعت قبل</Text>
                        <Text style={[Styles.descText, { color: 'gray' }]}>
                            {/* {`${moment(new Date(new Date(task.date&&task.date).setHours(new Date().getHours() - 1))).format('jYYYY/jM/jD')} - ${moment(new Date(new Date(task.date?task.date:'').setHours(new Date().getHours() - 1))).format('HH:mm')}`} */}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.reminderItems, reminder == 3 && { borderColor: common.colors.pink }]}
                        onPress={() => { setDateModal('reminder'); setReminder(3) }}>
                        <Dolphin name='Calendar' size={55} color={reminder == 3 ? common.colors.pink : common.colors.gray} />
                        <Text style={[Styles.lightText]}>انتخاب زمان</Text>
                        <Text style={[Styles.descText, { color: 'gray' }]}>
                            {task.reminder ? `${moment(task.reminder).format('jYYYY/jM/jD')} - ${moment(task.reminder).format('HH:mm')}` : 'مشخص نشده'}
                        </Text>
                    </TouchableOpacity>
                </View>}
            </ScrollView>
            {props.route.params ?
                <View style={styles.btnView}>
                    <ShadowView style={[Styles.shadowColor, styles.addBtn, { shadowColor: "#1ed102" }]}>
                        <TouchableOpacity onPress={() => handleEditTask({ name: 'done', value: true })}>
                            <GradientButton start='#5ce419' end='#39a801'>
                                <Text style={Styles.gradientText}>انجام شد</Text>
                            </GradientButton>
                        </TouchableOpacity>
                    </ShadowView>
                    <ShadowView style={[Styles.shadowColor, styles.cancel, { shadowColor: "#f45686" }]}>
                        <TouchableOpacity onPress={() => handleDeleteTask()}>
                            <GradientButton start='#f874b2' end='#e51966'>
                                <Dolphin name='Delete' color='white' size={30} />
                            </GradientButton>
                        </TouchableOpacity>
                    </ShadowView>
                </View>
                :
                <View style={styles.btnView}>
                    <ShadowView style={[Styles.shadowColor, styles.addBtn, { shadowColor: "#6894ee" }]}>
                        <TouchableOpacity onPress={() => handleAddTask()}>
                            <GradientButton start='#7db4fe' end='#5f86e6'>
                                <Text style={Styles.gradientText}>افزودن کار جدید</Text>
                            </GradientButton>
                        </TouchableOpacity>
                    </ShadowView>
                    <ShadowView style={[Styles.shadowColor, styles.cancel, { shadowColor: "#f3e625" }]}>
                        <TouchableOpacity onPress={() => props.navigation.goBack()}>
                            <GradientButton start='#f8cc3d' end='#fab923'>
                                <Dolphin name='Cross' color='white' size={30} />
                            </GradientButton>
                        </TouchableOpacity>
                    </ShadowView>
                </View>
            }
            <Modal isVisible={dateModal == 'date' || dateModal == 'reminder'} backdropOpacity={0}>
                <DatePicker
                    setDate={(value) => { props.route.params ? handleEditTask({ name: [dateModal], value: new Date(value) }) : setTask({ ...task, [dateModal]: value }) }}
                    // setDate={(value)=>setTask({...task,[dateModal]:value})}
                    onPress={() => setDateModal(false)} />
            </Modal>
        </View>
    )
}

const mapStateToprops = (state) => ({
    user: state.userReducer.user
})
const mapDispatchToProps = (dispatch) => {
    const { taskActions } = require('../../redux/tasks')
    return {
        onAddTask: (task) => dispatch(taskActions.addTask(task)),
        onDeleteTask: () => dispatch(taskActions.deleteTask()),
    }
}
export default connect(mapStateToprops, mapDispatchToProps)(newTask)
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollView: {
        paddingBottom: 70
    },
    field: {
        paddingHorizontal: 10,
        paddingBottom: 20
    },
    rowField: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10
    },
    fieldsText: {
        fontSize: 16
    },
    listsView: {
        flexDirection: 'row',
    },
    list: {
        padding: 5,
        margin: 5,
        borderWidth: .5
    },
    priority: {
        width: '30%',
        height: 60,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: common.colors.disable,
        justifyContent: 'center',
        alignItems: 'center'
    },
    priorityText: {
        fontFamily: common.font.light,
        color: common.colors.disable,
        fontSize: 14
    },
    priorityView: {
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    addBtn: {
        margin: 5,
        height: 50,
        width: '80%',
    },
    cancel: {
        margin: 5,
        height: 50,
    },
    btnView: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        padding: 10
    },
    doneLine: {
        position: 'absolute',
        width: '105%',
        borderTopWidth: .8,
        bottom: '40%',
        borderColor: common.colors.disable
    },
    reminderItems: {
        alignItems: 'center',
        width: '30%',
        // height: 150,
        borderRadius: 8,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: common.colors.gray
    },
    reminderIcons: {
        width: '50%',
        aspectRatio: 1,
        borderWidth: 2,
        borderColor: common.colors.gray,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5

    }
})
