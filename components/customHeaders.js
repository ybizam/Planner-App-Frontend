/*
  Group Members: Jasmine Tye (p2036137), Yuhanaa Binte Izam (p2002145)
*/

import React, { useState, Component } from "react";
import {
     Text, View, StyleSheet, Image, Dimensions,
     ScrollView, Switch, Alert, TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';



export default class customHeader extends Component {
     constructor(props) {
          super(props);
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

                         <Text style ={styles.titleStyle}>{this.props.title}</Text>

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

customHeader.propTypes = {
     title: PropTypes.string.isRequired
};
   
   

const styles = StyleSheet.create({
     titleStyle: {
          flex: 2,
          textAlign: 'center', 
          textTransform: 'uppercase',
          fontSize: 20, 
          justifyContent: 'center', 
          alignContent: 'center', 
          marginLeft: 10, 
          paddingHorizontal: 20
     }
});

