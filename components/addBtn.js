/*
  Group Members: Jasmine Tye (p2036137), Yuhanaa Binte Izam (p2002145)
*/

import React, { useState, Component } from "react";

import {
     Text, View, StyleSheet, Image, Dimensions,
     ScrollView, Switch, Alert, TouchableOpacity,
} from 'react-native';

export default class AddButton extends Component {
     render() {
          const { navigation } = this.props;
          return (
               <TouchableOpacity onPress={() =>
                    navigation.navigate('NewTask')}    
                    
                    style={{
                         position: 'absolute',
                         alignItems: 'center',
                         justifyContent: 'center',
                         right: 20,
                         bottom: 30,
                    }}>
                    <Image
                         source={require('../images/icons8-plus-red-48.png')}
                         style={{
                              borderRadius: 50,
                              padding: 35
                         }}
                    />
               </TouchableOpacity>
          );
     }
}