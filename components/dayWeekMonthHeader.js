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


export default class Header extends Component {
     constructor(props) {
          super(props);

          this.state = {
               day: moment().format('ddd'),
               date: moment().format('D'),
               month: moment().format('MMMM'),
               year: moment().format('YYYY')
          };

     }

     //===lifecycle hooks===
     componentDidMount() {
          this.timerID = setInterval(
               () =>
                    this.setState({
                         day: moment().format('ddd'),
                         date: moment().format('D'),
                         month: moment().format('MMMM'),
                         year: moment().format('YYYY')
                    }),
               1000 // the 2 states are changed every second
          );
     }

     //---runs before the component is removed---
     componentWillUnmount() {
          clearInterval(this.timerID);
     }


     render() {
          const { navigation } = this.props;

          return (
               <View style={{ backgroundColor: '#D484E1' }}>
                    <View style={{ backgroundColor: "rgba(255, 255, 255, 0.5)", flex: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5 }}>
                         <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                              <Image
                                   source={require('../images/icons8-back-50.png')}
                              />
                         </TouchableOpacity>

                         <Text
                              style={{
                                   flex: 2, textAlign: 'center', textTransform: 'uppercase',
                                   fontSize: 20, justifyContent: 'center', alignContent: 'center', marginLeft: 10, paddingHorizontal: 20
                              }} >
                              {this.state.day} , {this.state.date} {this.state.month} {this.state.year}</Text>

                         <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                              <Image
                                   source={require('../images/icons8-settings-black-50.png')}
                                   style={{ flex: 1 }}
                              />
                         </TouchableOpacity>
                    </View>
               </View>
          );
     }
}