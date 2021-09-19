import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, TouchableWithoutFeedback, TouchableOpacity, Keyboard, ScrollView, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { Styles } from '../../common/Styles'
import common from '../../common'
import Dolphin from '../../component/Dolphin'
import GradientButton from '../../component/GradientButton'
import { addNewLIST } from '../../dataBase'
import ShadowView from 'react-native-simple-shadow-view'
// const colors = ['#cf8245', '#4dcf45', '#4592cf', '#cf45c9', '#cf455c', '#1ba227', '#3f00f6']
const colors = [{ start: '#e61e6a', end: '#f776b3' }, { start: '#faad11', end: '#f6d247' }, { start: '#3bad02', end: '#57dd16' }, { start: '#5f89e7', end: '#7bb1fc' }]
const icons = ['ShoppingBag', 'Diamond', 'User', 'Suitcase', 'Home', 'Image', 'Instagram']

function newList(props) {
    const [err, setErr] = useState()
    const [list, setList] = useState({
        name: '',
        color: colors[0].start,
        backgroundColor: colors[0].end,
        id: Date.now(),
        icon: icons[0]
        // tasks:'sdfsadf'
    })
    const handleAddList = () => {
        setErr()
        if (list.name.length > 0) {
            addNewLIST(list).then(response => { console.log(response); props.navigation.goBack() }).catch(e => console.log(e, 'error'))
        }
        else {
            console.log(err);
            setErr('لطفن یک نام مناسب وارد کنید')
        }

    }
    useEffect(() => {
        setErr()
    }, [list.name])
    console.log(list);
    return (
        <View style={styles.container}>
            
            <ScrollView style={{ backgroundColor: 'white' }}>
                <View style={{ padding: 5 }}>
                    {err && <Text style={[Styles.normalText, { color: 'red' }]}>{err}</Text>}
                </View>
                <View style={[styles.field, { flexDirection: 'row', alignItems: 'center' }]}>
                    <Text style={Styles.normalText}>عنوان:</Text>
                    <TextInput style={[Styles.normalText, { width: '80%', textAlign: 'right' }]} value={list.name} placeholder='شخصی' onChangeText={(text) => setList({ ...list, name: text })} />
                </View>
                <View style={styles.field}>
                    <Text style={Styles.normalText}>انتخاب رنگ:</Text>
                    <View style={styles.colorListView}>
                        {colors.map((data, index) =>
                            list.color == data.start ?
                                <ShadowView style={[{ shadowColor: data.start },  Styles.shadowColor,styles.selectedColor]}>
                                    <TouchableOpacity >
                                        <GradientButton style={{ width: '100%', height: '100%', borderRadius: 70 / 2 }} start={data.end} end={data.start}></GradientButton>
                                    </TouchableOpacity>
                                </ShadowView>

                                :
                                <TouchableOpacity style={[styles.colorList]} onPress={() => setList({ ...list, color: data.start, backgroundColor: data.end })} key={index} >
                                    <GradientButton style={{ width: '100%', height: '100%' }} start={data.end} end={data.start}></GradientButton>
                                </TouchableOpacity>

                        )}
                    </View>
                </View>
                <View style={styles.field}>
                    <Text style={Styles.normalText}>آیکن:</Text>
                    <View style={styles.colorListView}>
                        {icons.map((data, index) =>
                            <TouchableOpacity key={index} style={[{ margin:8 },list.icon==data&&styles.selectedIcon,{borderColor:list.color}]} onPress={() => setList({ ...list, icon: data })}>
                                <Dolphin name={data} size={35} fill={true} color={list.icon == data ? list.color : common.colors.disable} />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </ScrollView>
            <View style={styles.btnView}>
                <ShadowView style={[Styles.shadowColor, styles.addBtn, { shadowColor: "#6894ee" }]}>
                    <TouchableOpacity onPress={() => handleAddList()}>
                        <GradientButton style={{ width: '100%', height: '100%' }} start='#7db4fe' end='#5f86e6'>
                            <Text style={Styles.gradientText}>افزودن لیست جدید</Text>
                        </GradientButton>
                    </TouchableOpacity>
                </ShadowView>
                <ShadowView style={[Styles.shadowColor, styles.cancel, { shadowColor: "#f3e625" }]}>
                    <TouchableOpacity  onPress={() => props.navigation.goBack()}>
                        <GradientButton start='#f8cc3d' end='#fab923'>
                            <Dolphin name='Cross' color='white' size={30} />
                        </GradientButton>
                    </TouchableOpacity>
                </ShadowView>
            </View>
        </View>
    )
}

const mapStateToprops = (state) => ({
    lists: state.listReducer.lists
})
const mapDispatchToProps = (dispatch) => {
    const { listActions } = require('../../redux/lists')
    return {
        onAddList: (list) => dispatch(listActions.addList(list)),
        onDeleteList: (list) => dispatch(listActions.deleteList(list)),
    }
}
export default connect(mapStateToprops, mapDispatchToProps)(newList)
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    field: {
        paddingHorizontal: 10,
        paddingBottom: 20
        // borderBottomWidth: 1,
    },
    fieldsText: {
        fontSize: 16
    },
    colorListView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center'
    },
    list: {
        padding: 5,
        margin: 5,
        borderWidth: .5
    },
    colorList: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        margin: 10,
        overflow: 'hidden'
    },
    selectedColor: {
        width: 70,
        height: 70,
        borderRadius: 70 / 2,
        margin: 10,
        overflow: 'hidden',
        backgroundColor: 'white',
    },
    selectedIcon:{
        width:50,
        height:50,
        borderRadius:50/2,
        borderWidth:1,
        alignItems:'center',
        justifyContent:'center'
    },
    addBtn: {
        height: 50,
        margin: 5,
        // elevation: 5,
        width: '80%',
        borderRadius: 8,
        overflow: 'hidden'

    },
    cancel: {
        margin: 5,
        height: 50,
        aspectRatio: 1,
    },
    btnView: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        padding: 10
    }
})
