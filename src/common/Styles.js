import React from 'react'
import { StyleSheet } from 'react-native'
import common from './index.json'
export const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9fcff'
    },
    scrollView: {
        paddingBottom: 70,
    },
    gradientText: {
        fontFamily: common.font.bold,
        fontSize: 18,
        color: 'white'
    },
    normalText: {
        fontFamily: common.font.normal,
        color: common.colors.mainText,
        fontSize: 16,
    },
    mediumText: {
        fontFamily: common.font.medium,
        color: common.colors.mainText,
        fontSize: 16
    },
    thinText: {
        fontFamily: common.font.thin,
        color: common.colors.mainText
    },
    lightText: {
        fontFamily: common.font.light,
        color: common.colors.mainText
    },
    titleText: {
        fontFamily: common.font.bold,
        fontSize: 20, color: common.colors.mainText
    },
    descText: {
        fontFamily: common.font.thin,
        color: common.colors.gray,
        fontSize: 12,
        marginTop:3
    },
    shadow: {
        backgroundColor: 'white',
        borderRadius: 8,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 7.00,
        elevation: 4,
    },
    shadowColor: {
        shadowOpacity: .3,
        shadowRadius: 5,
        shadowOffset: { width: 3, height: 5 },
        overflow:'hidden',
        backgroundColor:'white',
        borderRadius:10,
    },
    userPic: {
        width: '100%',
        height: '100%',
        backgroundColor:'white'
    },
    userPicView: {
        width: 50,
        // height: 50,
        aspectRatio: 1,
        borderRadius: 50,
        overflow: 'hidden',
        elevation: 5
    },
})