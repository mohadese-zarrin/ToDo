import React, { useState, useEffect } from 'react'
import DatePicker from '@mohamadkh75/react-native-jalali-datepicker';
import { View, StyleSheet, Button, Platform,Text } from 'react-native'
import common from '../common'
import { Styles } from '../common/Styles';
import moment from 'moment-jalaali'
import TimePicker from './TimePicker';
let today = moment().format('jYYYY/jM/jD')
const now = moment().format('HH:mm')
function datePicker(props) {
    const [mode,setMode]=useState('date')
    const [date,setDate]=useState(today)
    const [time, setTime] = React.useState({ hours:parseInt(now.split(':')[0]), minute: parseInt(now.split(':')[1]) })
    const onDateChange=(e)=>{
        setMode('time')
        setDate(e)
    }
    let newDate
    const handleSendDate=()=>{
        // console.log(new Date(moment(`${date} ${time.hours}:${time.minute}`,'jYYYY/jM/jD HH:mm').format('YYYY-M-D HH:mm')),'date&time');
        props.setDate(new Date(moment(`${date} ${time.hours}:${time.minute}`,'jYYYY/jM/jD HH:mm').format('YYYY-M-D HH:mm')))
        // props.setDate(date)
        props.onPress()
    }
    return (
        <View>
            {mode=='date' ?<DatePicker
                backIcon={false}
                nextIcon={false}
                style={styles.container}
                selected={today}
                // dateSeparator='/'
                minDate='1390/1/1'
                maxDate='1490/12/30'
                headerContainerStyle={styles.headerContainerStyle}
                yearMonthBoxStyle={styles.yearMonthBoxStyle}
                yearMonthTextStyle={[Styles.titleText, { color: 'white' }]}
                iconContainerStyle={{ width: `${100 / 7}%` }}
                eachYearStyle={styles.eachYearStyle}
                eachYearTextStyle={[Styles.normalText]}
                eachMonthStyle={styles.eachMonthStyle}
                eachMonthTextStyle={[Styles.normalText]}
                weekdaysContainerStyle={{ height: '10%', borderWidth: 0 }}
                weekdayStyle={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                weekdayTextStyle={[Styles.normalText]}
                borderColor='white'
                dayStyle={{
                    width: `${100 / 7}%`,
                    justifyContent: 'center',
                    alignItems: 'center',
                    aspectRatio: 1 / 1
                }}
                selectedDayStyle={{
                    width: '70%',
                    aspectRatio: 1 / 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 100
                }}
                selectedDayColor='#4bcffa'
                dayTextStyle={[Styles.normalText]}
                selectedDayTextColor='white'
                dayTextColor='#4bcffa'
                disabledTextColor='#4bcffa66'
                onDateChange={date => onDateChange(date)}
            />:
            <TimePicker date={date}  setTime={setTime} time={time} handleSendDate={handleSendDate}/>}
        </View>
    )
}

export default datePicker
const styles = StyleSheet.create({
    container: {
        width: '95%',
        height: '85%',
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 4,
        overflow: 'hidden'
    },
    yearMonthBoxStyle: {
        width: '30%',
        height: '75%',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0,
        borderRadius: 10
    },
    eachYearStyle: {
        width: '30%',
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '1.5%',
        marginBottom: 5,
        marginHorizontal: '1.5%',
        borderRadius: 10,
    },
    eachMonthStyle: {
        width: `${88 / 3}%`,
        height: `${88 / 4}%`,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '3%',
        borderRadius: 10,
    },
    headerContainerStyle: {
        height: '20%',
        backgroundColor: 'white'
    }
})