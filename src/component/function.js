import React from 'react'
import moment from 'moment-jalaali'

import DocumentPicker from 'react-native-document-picker'
import ImgToBase64 from 'react-native-image-base64'

let DaysOfWeek = ['یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنج شنبه', "جمعه", 'شنبه']
let month=['فروردین',
    'اردیبهشت',
    'خرداد',
    'تیر',
    'مرداد',
    'شهریور',
    'مهر',
    'آبان',
    'آذر',
    'دی',
    'بهمن',
    'اسفند',
]
export const dateToString=(date)=>{
    // const {date}=props
    let date2=moment(date,'jYYYY/jM/jD').format('jYYYY/jM/jD')
    let day=DaysOfWeek[new Date(moment(date,'jYYYY/jM/jD').format('YYYY-M-D')).getDay()]
    let jDate=moment(`${date}`, 'jYYYY/jM/jD').jDate()
    let jMonth=month[moment(date, 'jYYYY/jM/jD').jMonth()]
    let jYear=moment(date, 'jYYYY/jM/jD').jYear()
    let stringDate=`${day}-${jDate} ${jMonth} ${jYear}`
    return stringDate
}

export async function handleSelectImage(onSetUserInfo) {
    try {
        const res = await DocumentPicker.pick({
            type: [DocumentPicker.types.images],
        })
        ImgToBase64.getBase64String(res.uri)
            .then(base64String =>onSetUserInfo({image:base64String}))
            .catch(err => console.log(err))
    } catch (err) {
        if (DocumentPicker.isCancel(err)) {
        } else {
            throw err;
        }
    }
}
// const mapDispatchToProps = (dispatch) => {
//     const { actions } = require('../redux/user')
//     return {
//         onSetUserInfo: (info) => dispatch(actions.setUserInfo(info))
//     }
// }