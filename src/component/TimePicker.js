import React, { useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import common from '../common'
import { Styles } from '../common/Styles'
import GradientButton from '../component/GradientButton'
import Svg, { Line, Circle } from 'react-native-svg';
import moment from 'moment-jalaali'
import { dateToString } from './function'
import ShadowView from 'react-native-simple-shadow-view'

let DaysOfWeek = ['یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنج شنبه', "جمعه", 'شنبه']
function timePicker(props) {
    const { time, setTime, handleSendDate, date } = props
    const [mode, setMode] = React.useState('hour')
    const [hours, setHours] = React.useState([])
    const [minutes, setMinutes] = React.useState([])
    const [hLinePos, setHLinePos] = React.useState([])
    const [mLinePos, setMLinePos] = React.useState([])
    // const [time, setTime] = React.useState({ hours:parseInt(now.split(':')[0]), minute: parseInt(now.split(':')[1]) })
    const [pmPosition, setPmPosition] = React.useState([])
    const [pmLinePos, setPmLinePos] = React.useState([])

    function degToRad(deg) {
        return deg * Math.PI / 180;
    }
    const size = 200
    const symbolSize = 15
    const radius = size / 2;
    const center = radius;
    const setTimeArray = () => {
        let hArray = []
        let mArray = []
        let pmArray = []
        for (let deg = 270; deg >= -90;) {
            let radius = 70
            const angleRad = degToRad(deg);
            const x = radius * Math.cos(angleRad) + center - symbolSize / 2;
            const y = radius * Math.sin(angleRad) + center - symbolSize / 2;
            pmArray.push({ x, y })
            deg = deg - 30
            let reverseArray = [...pmArray]
            setPmLinePos(reverseArray.reverse())
            setPmPosition(pmArray)
        }
        for (let deg = 270; deg >= -90;) {
            const angleRad = degToRad(deg);
            const x = radius * Math.cos(angleRad) + center - symbolSize / 2;
            const y = radius * Math.sin(angleRad) + center - symbolSize / 2;
            hArray.push({ x, y })
            deg = deg - 30
            let reverseArray = [...hArray]
            setHLinePos(reverseArray.reverse())
            setHours(hArray)
        }
        for (let deg = 270; deg >= -90;) {
            const angleRad = degToRad(deg);
            const x = radius * Math.cos(angleRad) + center - symbolSize / 2;
            const y = radius * Math.sin(angleRad) + center - symbolSize / 2;
            mArray.push({ x, y })
            deg = deg - 6
            let reverseArray = [...mArray]
            setMLinePos(reverseArray.reverse())
            setMinutes(mArray)
        }
    }
    const handleSetTime = (e) => {
        setMode('minute')
        setTime({ ...time, [e.mode]: e.value })
    }
    React.useEffect(() => {
        setTimeArray()
    }, [])
    console.log(date, 'date');
    return (
        <View style={styles.container}>
            <GradientButton style={styles.header} start='#7db4fe' end='#5f86e6'>
                <Text style={[Styles.titleText, { color: 'white' }]}>{dateToString(date)}</Text>
            </GradientButton>

            <View style={styles.timeText}>
                <TouchableOpacity onPress={() => setMode('minute')}><Text style={mode == 'minute' ? styles.activeModeText : styles.inactiveModeText}>{time.minute < 10 ? `0${time.minute}` : time.minute}</Text></TouchableOpacity>
                <Text style={styles.inactiveModeText}>:</Text>
                <TouchableOpacity onPress={() => setMode('hour')}><Text style={mode == 'hour' ? styles.activeModeText : styles.inactiveModeText}>{time.hours < 10 ? `0${time.hours}` : time.hours}</Text></TouchableOpacity>
            </View>
            <View style={styles.circle}>
                <View style={[styles.itemsView, {
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                }]}>
                    {hours.length > 0 &&
                        <View style={styles.line}>
                            <Svg height="200" width="200">
                                {mode == 'hour' ?
                                    <Line x1={200 / 2} y1={200 / 2} x2={time.hours > 12 ? pmLinePos[time.hours - 12].x + 6 : time.hours == 0 ? pmLinePos[time.hours].x + 6 : hLinePos[time.hours].x + 6} y2={time.hours > 12 ? pmLinePos[time.hours - 12].y + 7 : time.hours == 0 ? pmLinePos[time.hours].y + 7 : hLinePos[time.hours].y + 7} stroke={common.colors.main} strokeWidth="1" /> :
                                    <Line x1={200 / 2} y1={200 / 2} x2={mLinePos[time.minute].x + 5} y2={mLinePos[time.minute].y + 5} stroke={common.colors.main} strokeWidth="1" />}
                                <Circle cx='100' cy='100' r='3' fill={common.colors.main} />
                            </Svg>
                        </View>}

                    {mode == 'hour' ?
                        <>
                            {hours.map((data, index) =>
                                index != 0 &&
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={() => handleSetTime({ mode: 'hours', value: index })}
                                    key={index}
                                    style={[styles.item, {
                                        left: data.x - 5,
                                        top: data.y - 5
                                    }]}>
                                    {index == time.hours ? 
                                    <GradientButton style={styles.selectedItem} start='#7db4fe' end='#5f86e6'>
                                        <Text style={[Styles.normalText, { color: 'white' }]}>{index}</Text>
                                    </GradientButton> : <Text style={[Styles.normalText]}>{index}</Text>}
                                </TouchableOpacity>
                            )}
                            {pmPosition.map((data, index) =>
                                index != 12 && <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={() => handleSetTime({ mode: 'hours', value: index == 0 ? 0 : index + 12 })}
                                    key={index}
                                    style={[styles.item, {
                                        left: data.x - 5,
                                        top: data.y - 5,
                                    }]}>
                                    {time.hours == 0 && index == time.hours || time.hours != 12 && index == time.hours - 12 ? <GradientButton style={styles.selectedItem} start='#7db4fe' end='#5f86e6'>
                                        <Text style={[Styles.normalText, { color: 'white' }]}>{index == 0 ? '00' : index + 12}</Text>
                                    </GradientButton> :
                                        <Text style={[Styles.normalText, { fontSize: 12 }]}>{index == 0 ? '00' : index + 12}</Text>}
                                </TouchableOpacity>
                            )}
                        </>
                        :
                        <>
                            {minutes.map((data, index) =>
                                index % 5 == 0 && index != 60 &&
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={() => handleSetTime({ mode: 'minute', value: index })}
                                    key={index}
                                    style={[styles.item, {
                                        left: data.x - 5,
                                        top: data.y - 5,
                                    }]}>
                                    {time.minute == index ? <GradientButton style={styles.selectedItem} start='#7db4fe' end='#5f86e6'>
                                        <Text style={[Styles.normalText, { color: 'white' }]}>{index == 0 ? '00' : index}</Text>
                                    </GradientButton> :
                                        <Text style={[Styles.normalText, { fontSize: 12 }]}>{index == 0 ? '00' : index}</Text>}
                                </TouchableOpacity>)}
                            {minutes.map((data, index) =>
                                index != 60 && index !== 0 &&
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={() => handleSetTime({ mode: 'minute', value: index })}
                                    key={index}
                                    style={[styles.item2, {
                                        left: data.x + 5,
                                        top: data.y + 5,
                                    }]}>
                                    {index == time.minute && <GradientButton style={[styles.selectedItem, { width: 30, height: 30, borderRadius: 15 }]} start='#7db4fe' end='#5f86e6'>
                                        <Text style={[Styles.normalText, { color: 'white' }]}>{index}</Text>
                                    </GradientButton>}
                                </TouchableOpacity>)}
                        </>
                    }
                </View>
            </View>
            <ShadowView style={[Styles.shadowColor, styles.btn, { shadowColor: "#1ed102" }]}>
                <TouchableOpacity onPress={() => handleSendDate()}>
                    <GradientButton start='#5ce318' end='#3aaa01'>
                        <Text style={Styles.gradientText}>تایید زمان</Text>
                    </GradientButton>
                </TouchableOpacity>
            </ShadowView>
        </View>
    )
}

export default timePicker
const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        backgroundColor: 'white', overflow: 'hidden',
        elevation: 5
    },
    circle: {
        width: 250,
        height: 250,
        borderRadius: 250 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: common.colors.main
    },
    itemsView: {
        width: 150,
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',


    },
    selectedItem: {
        width: '100%',
        height: '100%',
        borderRadius: 0,
        padding: 0,
        elevation: 5
    },
    item2: {
        width: 10,
        height: 10,
        borderRadius: 10 / 2,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center'

    },
    line: {
        position: 'absolute',
        width: 200,
        height: 200,
        borderRadius: 100,
    },
    timeText: {
        width: 100,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20
    },
    activeModeText: {
        fontSize: 20,
        color: common.colors.main,
        fontFamily: common.font.medium
    },
    inactiveModeText: {
        fontSize: 20,
        color: common.colors.mainText,
        fontFamily: common.font.medium
    },
    header: {
        width: '100%',
        height: 100,
        borderRadius: 0
        // backgroundColor: common.colors.main
    },
    btn: {
        width: '50%',
        height: 50, marginVertical: 20
    }
})