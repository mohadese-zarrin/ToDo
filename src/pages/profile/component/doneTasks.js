import React from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { getDoneTasks } from '../../../dataBase'
import Task from '../../../component/Task'
import BackButton from '../../../component/BackButton'
import { Styles } from '../../../common/Styles'
import common from '../../../common'

function doneTasks(props) {
    const [tasks, setTasks] = React.useState([])
    const handleGetDoneTasks = () => {
        getDoneTasks().then(response => { setTasks(response); console.log(response, 'getDoneTasks') }).catch(e => console.log(e, '**error getDoneTasks'))
    }
    React.useEffect(() => {
        handleGetDoneTasks()
    }, [props])
    return (
        <View style={Styles.container}>
            <BackButton onBackPress={() => props.navigation.goBack()} />
            {tasks.length > 0 ?
                <ScrollView contentContainerStyle={styles.scrollView}>
                    {tasks && tasks.map((data, index) =>
                        <Task key={index} data={data} onPress={() => props.navigation.navigate('NewTask', { data })} />
                    )}
                </ScrollView>
                :
                <View style={styles.container}>
                    <Text style={Styles.titleText}>هیچ کار انجام شده ای وجود ندارد!</Text>
                </View>}


        </View>
    )
}

export default doneTasks
const styles = StyleSheet.create({
    scrollView: {
        padding: 15
    },
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
})