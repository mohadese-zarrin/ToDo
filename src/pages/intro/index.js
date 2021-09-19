import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, } from 'react-native'
import { connect } from 'react-redux'
import common from '../../common'
import { Styles } from '../../common/Styles'
import GradientButton from '../../component/GradientButton'
import { addNewLIST } from '../../dataBase'
import PushNotification from 'react-native-push-notification'

PushNotification.createChannel(
    {
        channelId: "todoApp",
        channelName: "My channel",
        channelDescription: "A channel to categorise your notifications", 
        soundName: "default", 
        importance: 4,
        vibrate: true,
    },
    (created) => console.log(`createChannel returned '${created}'`)
);
function Intro(props) {
    const defaultList = {
        name: 'شخصی',
        color: "#33527d",
        icon: 'User',
        backgroundColor: '#a6c3ec',
        id: 100,
    }
    const handleAddList = () => {
        addNewLIST(defaultList).then(response => props.onSetUserInfo({ defaultList: defaultList.id })).catch(e => console.log(e, 'error'))
        let base64image = 'iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAMFBMVEXFxcX////CwsLGxsb7+/vT09PJycn19fXq6urb29ve3t7w8PDOzs7n5+f5+fnt7e30nlkBAAAFHUlEQVR4nO2dC5qqMAyFMTwUBdz/bq+VYYrKKJCkOfXmXwHna5uTpA+KwnEcx3Ecx3Ecx3Ecx3Ecx3Ecx3Ecx3Ecx3EcA2iO9cdIc5PUdO257y+BU39u66b4HplE3fk6VIcnqmNfl1+gksr6+iIucjl3WYukor7+re6Hoe1y1UhNO3zUd+fUFRmKpOa0Tt6dY5ubRCrOG/QFLk1WGmnt/JxzykcjdZ/jyxJDLlOV2l36AtcsJJb9boG3YcR3DuqODIE3ztYKPkDdmwRmpUToUaSaq++AvRgZMWbOpbQW8hdCAm8ZDugoikzREdCJ2okJPBx6azFLNOwoOgcxojJ98JkaTSJxMpklKrCAKhZGI0drTY/wU5lXoJYibannV9NYy4oozNEAkPHTjop+DTDxVGkIgYJNoyQQJtiIW+EMjGAjm649AjGIaqswcEFQKJ2QPlJbqytki6ZXAAZRJ52J2McaUowzAfs+uFzrYhnzaapphiPWdaJWShqxjqa6kTTQ205TVbsfMa6htL0iYOsXpJrQjHSmCkv1QGPtiHqlYcQ21Gj7fcDU8xOEUuNgSltPzexh+HqFlanCBHZ4OLhCV+gK/3OF6vWvucLv98MUOY2pwu/PS/+D2qJU7pYGbOvDFDW+bbON9p3o3oRxn0bfLgZTgSn6pSfrtr56qLHemtHPTK2319SzGvtjQ9qeb39WgS66Cm073nd0U1PzDdJCO3Gzn6TKpl9Zq7ujGWsQhlA3NwWIMwG9zM08Y/tBrR9VWeczv5CSQuuUNKIUTk23ZJ5RKfVhjnkXotfWIlgX2BSCDYbZR+QTcLhb3dKZDUY2M0d4KWItwhHRah/zsrOgKw4wycwjcgEVcgQDQo23CqSiWEJkFAfod2oE1uIFdA1OsCPqFXYNTjCfb8Ez+iX2x5sKLlVbhtqdDcar9ZevhnbZxoBUD35k23t0d304LYs1ELVbnfFaZ/REJJX9niP8Q19moZGo3m8XR/yBvOnjFfsXcI2c8ZuNo7WMP5HQh6yRGrlmFOJTnyTcT+zRlqPUBI2gTVWNUzUna1ERgecgF4GpNBQ38jGqxVLzQA1A31Rrhk6Yz9QEh/WND0GnuG9huhiTXJkxfAizTHLr6cbJKN6UCU6x/2DTRE1xEeEXi3O0ZUqBN4nJRzHhFB1JPlFTBZlI2kQ8zc3KJ1Le8DIRmFJiknuVS6RK4Ej/JtBfJErDSzOBiY4wJHX6Z1I4v1GUmdCPNirnLLeg3oJLcbX5PcpHNbRvOa1A956QmRPOUXVF+zkaUJynpkYR0bOMJH2nNej1pqyV/aKkz9jr5yj5vrXXz1F5SQLACiMapmierj2ikLyleKdlA/I/2oFxiglxx9B+mHwz0lf34IZQfhDRhlD6bhvgEAoPYooHkTczSIZTLC+cEExsoNKZiGBiY9cCfo/Y/SjIOBMQizWWTe73CMUasJx7jlD+DdKdWUKoY4PRYFtGpO0G1Lx4RaadgTtJhf4fiGqGIwKWCGuGIwKWqP+7IxYCzygjR9IAO5pC7Da9g70TBVpWRNgFBlgT8RV2WxHbKwJMv4BOaEaYaU2K16yZMN/qgV+G7IWIvwyZCxHeDQMsR8wg0DBDDXB5H2EV+hkEGmaoySHQsEJNFoGGFWrAq98JRhUMX1iMMMqLLEIpK5jCbd4vw9nSt/72lewXiN6jmdjfq8Hdknlk92ZwJnbIMMRM7JBhiFlUFoHd1UWaP1QKsPsHA5mkNB+Smn9JqV3wskatnQAAAABJRU5ErkJggg=='
        props.onSetUserInfo({ defaultImage: base64image })
        console.log(props.user);
    }
    return (
        <View style={styles.container}>
            <View><Image source={require('../../assets/first.png')} /></View>
            <Text style={[Styles.titleText, { color: 'white', fontSize: 30 }]}>کارهات رو مدیریت کن</Text>
            <View style={styles.textView}>
                <Text style={[Styles.mediumText, styles.descText]}>من قراره بهت کمک کنم که بتونی کارهات رو مدیریت کنی.بهت کمک میکنم تا چیزی رو فراموش نکنی و همه‌چی سر وقت خودش انجام بشه.پس بهتره که وقت رو از دست ندیم</Text>
            </View>
            <TouchableOpacity style={styles.btn} onPress={() => handleAddList()}>
                <GradientButton end='#3aaa02' start='#5ce519' >
                    <Text style={Styles.gradientText}>شروع کنیم </Text>
                </GradientButton>
            </TouchableOpacity>
        </View>
    )
}

const mapStateToprops = (state) => ({
    user: state.userReducer.user
})
const mapDispatchToProps = (dispatch) => {
    const { actions } = require('../../redux/user')
    const { listActions } = require('../../redux/lists')
    return {
        onSetUserInfo: (info) => dispatch(actions.setUserInfo(info)),
        onAddList: (list) => dispatch(listActions.addList(list))
    }
}
export default connect(mapStateToprops, mapDispatchToProps)(Intro)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: common.colors.main
    },
    imageView: {
        width: '30%'
    },
    image: {
        width: '100%',
    },
    textView: {
        width: '90%',
        paddingVertical: 50
    },
    descText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center'
    },
    btn: {
        width: '70%',
        height: 50
    }
})