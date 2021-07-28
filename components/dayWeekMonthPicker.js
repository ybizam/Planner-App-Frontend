/*
  Group Members: Jasmine Tye (p2036137), Yuhanaa Binte Izam (p2002145)
*/

import React, { useState, Component } from "react";
import {
    Text, View, StyleSheet, Image, Dimensions,
    ScrollView, Switch, Alert, TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import moment from 'moment';




export default class dayWeekMonthPicker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: styles.buttonSelected,
            daySelected: false,
            weekSelected: false,
            monthSelected: false
        };

    }

    render() {

        const { navigation } = this.props;

        return (
            <View style={styles.buttons}>
            <TouchableOpacity onPress={() => {
                this.setState({
                    daySelected: true,
                    weekSelected: false,
                    monthSelected: false
                })
                navigation.navigate('Day');
                
                }}>
              <Text style={[this.state.daySelected ? (styles.buttons, styles.buttonSelected) : (styles.buttons)]}>Day</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                this.setState({
                    daySelected: false,
                    weekSelected: true,
                    monthSelected: false
                })
                navigation.navigate('Week');
                
                }}>
              <Text style={[this.state.weekSelected ? (styles.buttons, styles.buttonSelected) : (styles.buttons)]}>Week</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                this.setState({
                    daySelected: false,
                    weekSelected: false,
                    monthSelected: true
                })
                navigation.navigate('Month');
                }}>
              <Text style={[this.state.monthSelected ? (styles.buttons, styles.buttonSelected) : (styles.buttons)]}>Month</Text>
            </TouchableOpacity>
          </View>
        );
    }
}



const styles = StyleSheet.create({
    buttons: {
         flexDirection: 'row',
         justifyContent: 'space-evenly',
         alignItems: 'center',
         paddingVertical: 10,
         marginHorizontal: 20,
         fontSize: 20,
         textTransform: 'uppercase'
       },
       buttonSelected: {
         color: 'white',
         paddingHorizontal: 15,
         marginHorizontal: 5,
         backgroundColor: "rgba(101, 34, 187, 0.5)",
         borderRadius: 100 / 5
       },
})