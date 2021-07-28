/*
  Group Members: Jasmine Tye (p2036137), Yuhanaa Binte Izam (p2002145)
*/

import React, { useState, Component } from "react";
import {
     Text, View, StyleSheet, Image, Dimensions,
     ScrollView, Switch, Alert, TouchableOpacity,
} from 'react-native';

import CheckBox from '@react-native-community/checkbox';



const CheckTask = () => {
     const [toggleCheckBox, setToggleCheckBox] = useState(false)

     return (
          <View style={{justifycontent: 'center', marginHorizontal: 10, alignSelf: 'center'}}>
               <CheckBox
                    disabled={false}
                    value={toggleCheckBox}
                    onValueChange={(newValue) => setToggleCheckBox(newValue)}
               />
          </View>
     );

}

export default CheckTask;