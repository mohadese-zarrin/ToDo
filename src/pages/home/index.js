import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native'
import { Styles } from '../../common/Styles'
import common from '../../common'
import { connect } from 'react-redux'
import Dolphin from '../../component/Dolphin'
import GradientButton from '../../component/GradientButton'
import { getTasks, getreminderTasks, getOneListTasks, getSortedTasks } from '../../dataBase'
import Task from '../../component/Task'
import moment from 'moment-jalaali'
import { StackActions } from '@react-navigation/native';
import ShadowView from 'react-native-simple-shadow-view/src/ShadowView'
import { dateToString } from '../../component/function'
const map = [common.colors.green, common.colors.yellow, common.colors.pink]
const today = new Date()
const tomorrow = new Date(new Date().setDate(today.getDate() + 1))

function home(props) {
    const [reminder, setReminder] = React.useState(false)
    const [tasks, setTasks] = React.useState()
    const [todayTasks, setTodayTasks] = React.useState([])
    const [tomorrowTasks, setTomorrowTasks] = React.useState([])
    const [otherTasks, setOtherTasks] = React.useState([])

    const handleGetTasks = () => {
        getSortedTasks(reminder).then(response => { setTasks(response);setTodayTasks(response[0]) }).catch(e => console.log(e, 'error getSortedTasks'))
       
    }

    React.useEffect(() => {
        props.navigation.addListener('focus', () => {
            console.log('focus');
            handleGetTasks()

        });
    }, [props.navigation])

    React.useEffect(() => {
        handleGetTasks()
        if(tasks){
            setTodayTasks(tasks[0])
        }
    }, [reminder])
    
    return (
        <View style={Styles.container}>
            <ScrollView contentContainerStyle={[styles.scrollView]}>
                <View style={styles.userInfoView}>
                    {props.route.params ?
                        <View style={[Styles.shadow, styles.iconViwe, { backgroundColor: 'white' }]}>
                            {props.route.params.data.icon ? <Dolphin name={props.route.params.data.icon} size={35} fill={true} color={props.route.params.data.color} /> : <Dolphin name='Home' size={35} fill={true} color={props.color} />}
                        </View>

                        :
                        <TouchableOpacity style={styles.userPicView} onPress={() => props.navigation.navigate('Profile')}>
                            {props.user.image ?
                                <Image style={Styles.userPic} source={{ uri: `data:image/png;base64,${props.user.image}` }} /> :
                                <Image style={styles.userPic} source={{ uri: `data:image/png;base64,${props.user.defaultImage}`}} />}
                        </TouchableOpacity>}
                    <View style={{ paddingLeft: 15 }}>
                        {props.route.params ?
                            <Text style={[Styles.normalText, { fontSize: 20 }]}>{props.route.params.data.name}</Text>
                            :
                            <Text style={[Styles.normalText, { fontSize: 20 }]}>{props.user.name ?
                                `سلام ${props.user.name}!`
                                :
                                'سلام کاربر!'}
                            </Text>
                        }
                        <Text style={[Styles.lightText, { fontSize: 12 }]}>{todayTasks.length == 0 ?
                            'امروز کاری نداری'
                            :
                            todayTasks.length == 1 ?
                                'امروز یک کار داری'
                                :
                                `امروز${todayTasks.length} تا کار داری`
                        }
                        </Text>
                    </View>

                    <TouchableOpacity onPress={() => setReminder(!reminder)} style={{ position: 'absolute', right: 0 }}>
                        <Dolphin name='Notification' size={30} fill={true} color={reminder ? common.colors.yellow : common.colors.disable} />
                    </TouchableOpacity>
                </View>
                {/* {todayTasks.length == 0 && tomorrowTasks.length == 0 && otherTasks.length == 0 ?
                    <View style={styles.noTask}>
                        <View style={styles.imageView}><Image style={styles.image} source={require('../../assets/todoIn.png')} /></View>
                        <Text style={[Styles.titleText, { fontSize: 30, marginVertical: 20 }]}>کاری نیست!</Text>
                        <Text style={Styles.mediumText}>بیا کارها رو برنامه ریزی کنیم</Text>
                    </View>
                    : <View>
                        {todayTasks.length > 0 && <View><Text style={[Styles.normalText, { color: common.colors.disable, fontSize: 12 }]}>{`امروز ${dateToString(moment(today).format('jYYYY/jM/jD'))}`}</Text></View>}
                        {todayTasks && todayTasks.map((data, index) =>
                            <Task key={index} data={data} updateList={() => handleGetTasks()} onPress={() => props.navigation.push('NewTask', { data })} navigation={props.navigation} />
                        )}
                        {tomorrowTasks.length > 0 && <View><Text style={[Styles.normalText, { color: common.colors.disable, fontSize: 12 }]}>{`فردا ${dateToString(moment(tomorrow).format('jYYYY/jM/jD'))}`}</Text></View>}
                        {tomorrowTasks && tomorrowTasks.map((data, index) =>
                            <Task key={index} data={data} updateList={() => handleGetTasks()} onPress={() => props.navigation.push('NewTask', { data })} />
                        )}
                        {otherTasks.length > 0 && <View><Text style={[Styles.normalText, { color: common.colors.disable, fontSize: 12 }]}>بقیه کار ها</Text></View>}
                        {otherTasks && otherTasks.map((data, index) =>
                            <Task key={index} data={data} updateList={() => handleGetTasks()} onPress={() => props.navigation.push('NewTask', { data })} />
                        )}
                        {tasks.length > 0 && <View><Text style={[Styles.normalText, { color: common.colors.disable, fontSize: 12 }]}>گذشته</Text></View>}
                        {tasks && tasks.map((data, index) =>
                            <Task key={index} data={data} updateList={() => handleGetTasks()} onPress={() => props.navigation.push('NewTask', { data })} />
                        )}
                    </View>} */}
                {tasks && tasks.map((data, index) =>
                    <View>
                        <Text style={[Styles.normalText, { color: common.colors.disable, fontSize: 12 }]}>{dateToString(moment().add(index, 'day').format('jYYYY/jM/jD'))}</Text>
                        {data.length > 0 && data.map((data, index) => <Task key={index} data={data} updateList={() => handleGetTasks()} onPress={() => props.navigation.push('NewTask', { data })} />)}
                    </View>

                )}
            </ScrollView>
            {props.route.params ?
                <TouchableOpacity style={[styles.addBtn, { width: 50,elevation:0}]} onPress={() => props.navigation.goBack()}>
                    <Dolphin name='Home' size={35} fill={true} color={common.colors.mainText} />
                </TouchableOpacity>
                :
                <ShadowView style={[Styles.shadowColor, styles.addBtn, { shadowColor: "#6894ee" }]}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('NewTask')}>
                        <GradientButton start='#7db4fe' end='#5f86e6'>
                            <Dolphin name='More' size={40} color='white' />
                            <Text style={Styles.gradientText}>افزودن کار</Text>
                        </GradientButton>
                    </TouchableOpacity>
                </ShadowView>
            }
        </View>
    )
}
//props.navigation.dispatch(StackActions.popToTop())
const mapStateToprops = (state) => ({
    user: state.userReducer.user,
})
export default connect(mapStateToprops, null)(home)

const styles = StyleSheet.create({
    scrollView: {
        padding: 20,
        paddingBottom: 70,

    },
    addBtn: {
        width: 160,
        height: 50,
        position: 'absolute',
        bottom: 0,
        margin: 20, 
        zIndex: 100, 
        elevation: 5,
        borderRadius: 8
    },
    userPic: {
        width: '100%',
        height: '100%',
    },
    userPicView: {
        width: 50,
        height: 50,
        borderRadius: 50,
        overflow: 'hidden',
        elevation: 5
    },
    userInfoView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 40
    },
    iconViwe: {
        width: 70,
        height: 70,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    noTask: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
})