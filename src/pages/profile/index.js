import React, { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native'
import { connect } from 'react-redux'
import BackButton from '../../component/BackButton'
import { Styles } from '../../common/Styles'
import common from '../../common'
import List from '../../component/List'
import Task from '../../component/Task'
import { getLists } from '../../dataBase'
import {handleSelectImage} from '../../component/function'

function profile(props) {
    const [lists, setLists] = useState([])
    const handleGetLists = () => {
        getLists().then(response => { setLists(response) }).catch(e => console.log(e, 'handleGetLists error in profile'))
    }
    React.useEffect(() => {
        handleGetLists()
    }, [])
    React.useEffect(() => {
        console.log(props.user, 'user');
    }, [props.user])
    return (
        <View style={[Styles.container, styles.container]} >
            <BackButton onBackPress={() => props.navigation.goBack()} />
            <TouchableOpacity style={{ width: '100%', alignItems: 'center' }} onPress={()=>handleSelectImage(props.onSetUserInfo)}>
                <View style={[Styles.userPicView, { width: 80 }]}>
                    {props.user.image ?
                        <Image style={Styles.userPic} source={{ uri: `data:image/png;base64,${props.user.image}` }} /> :
                        <Image style={Styles.userPic} source={{uri: `data:image/png;base64,${props.user.defaultImage}`}} />}
                </View>
            </TouchableOpacity>
            <View style={[styles.field, { borderTopWidth: 0 }]}>
                <Text style={Styles.normalText}>نام:</Text>
                <TextInput style={[Styles.normalText, { width: '80%', textAlign: 'right' }]} value={props.user.name} onChangeText={text => props.onSetUserInfo({ name: text })} placeholder='لطفن نام خود را وارد کنید' />
            </View>
            <View style={{ width: '100%' }}>
                <Text style={[Styles.normalText, { marginLeft: 10 }]}>لیست پیش‌فرض:</Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ flexDirection: 'row', padding: 8, paddingBottom: 20 }}>
                    {lists.map((data, index) =>
                        <List
                            onPress={() => props.onSetUserInfo({ defaultList: data.id })}
                            data={data}
                            key={index}
                            desc={`${data.tasks.length} کار`}
                            style={props.user.defaultList == data.id && { borderColor: common.colors.main }}
                        />
                    )}
                </ScrollView>
            </View>
            <TouchableOpacity style={styles.field} onPress={() => props.navigation.navigate('DoneTasks')}>
                <Text style={Styles.normalText}>کارها‌ی انجام شده</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.field} onPress={() => props.navigation.navigate('Lists')}>
                <Text style={Styles.normalText}>لیست ها</Text>
            </TouchableOpacity>

        </View>
    )
}

const mapStateToprops = (state) => ({
    user: state.userReducer.user
})
const mapDispatchToProps = (dispatch) => {
    const { actions } = require('../../redux/user')
    return {
        onSetUserInfo: (info) => dispatch(actions.setUserInfo(info))
    }
}
export default connect(mapStateToprops, mapDispatchToProps)(profile)
const styles = StyleSheet.create({
    container: {
        // alignItems: 'center',
    },
    field: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        marginHorizontal: 10,
        borderTopWidth: 1,
        borderColor: common.colors.disable
    },

})