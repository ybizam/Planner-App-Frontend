/*
  Group Members: Jasmine Tye (p2036137), Yuhanaa Binte Izam (p2002145)
*/

import React, { useState, Component } from "react";

import {
     Text, View, StyleSheet, Image, Dimensions,
     ScrollView, Switch, Alert, TouchableOpacity,
} from 'react-native';

export default class DeletePopUp extends Component {
     render() {
          return (
               <TouchableOpacity onPress={() =>
                    Alert.alert(
                         "Confirmation",
                         "Delete Selected Task(s)?",
                         [
                           {
                             text: "Cancel",
                             onPress: () => console.log("Cancel Pressed"),
                             style: "color: red"
                           },
                           { text: "Confirm", onPress: () => console.log("Confirm Pressed") }
                         ]
                       
                    )} style={{
                         position: 'absolute',
                         alignItems: 'center',
                         justifyContent: 'center',
                         right: 20,
                         bottom: 40,
                    }}>
                    <Image
                         source={require('../images/icons8-trash-50.png')}
                         style={{
                              backgroundColor: 'white',
                              borderRadius: 50,
                              opacity: 0.6
                         }}
                    />
               </TouchableOpacity>
          );
     }
}