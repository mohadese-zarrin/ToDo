import React, { Component } from 'react'
import { Text } from 'react-native'
import glyMap from '../common/glymap.json'
export default function Dolphin(props){
    const { name, size, color, style,fill,type,children,...prop } = props;

    let glyph = name ? glyMap[name] || '?' : '';
    if (typeof glyph === 'number') {
      glyph = String.fromCodePoint(glyph);
    }

    const styleDefaults = {
      fontSize: size,
      color,
    };
    const styleOverrides = {
        fontFamily:type== 'Circle'? fill?'Pika-Bulky_C':'Pika-Light_C':type== 'Square'? fill?'Pika-Bulky_S':'Pika-Light_S':fill?'Pika-Bulky':'Pika-Light',
        fontWeight: 'normal',
        fontStyle: 'normal',
      };

      prop.style = [styleDefaults, style, styleOverrides];
    return(
        <Text {...prop}>{glyph}</Text>
    )

}
// fill?'Pika-Bulky':'Pika-Light',