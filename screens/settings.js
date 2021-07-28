/*
  Group Members: Jasmine Tye (p2036137), Yuhanaa Binte Izam (p2002145)
*/

import React, { useState, Component } from "react";
import CheckTask from '../components/checkBox';
import {
  Text, View, StyleSheet, Image, Dimensions,
  ScrollView, Switch, Alert, TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import CustomHeader from '../components/customHeaders';

const Settings = (props) => {
  const navigation = useNavigation();
  const [time, setSelectedTime] = useState("0");
  const [value, setSelectedValue] = useState("0");

  const [isNotifEnabled, setNotifIsEnabled] = useState(false);
  const toggleNotifSwitch = () => setNotifIsEnabled(previousState => !previousState);

  const [isVibrateEnabled, setVibrateIsEnabled] = useState(false);
  const toggleVibrateSwitch = () => setVibrateIsEnabled(previousState => !previousState);

  const [is24HourEnabled, set24HourIsEnabled] = useState(false);
  const toggle24HourSwitch = () => set24HourIsEnabled(previousState => !previousState);

  const [isHomeTimeEnabled, setHomeTimeIsEnabled] = useState(false);
  const toggleHomeTimeSwitch = () => setHomeTimeIsEnabled(previousState => !previousState);

  return (
    <ScrollView>      
      <CustomHeader title="Settings" navigation = {navigation}/>

      <View style={styles.container}>
        <Text style={styles.label} > Notification Settings </Text>
        <View style={{ flexDirection: 'row', paddingHorizontal: 10, paddingRight: 20, paddingBottom: 8 }}>
          <Text style={styles.settings}>Notifications </Text>
          <Switch
            trackColor={{ false: "#767577", true: "#1cbc9c" }}
            thumbColor={isNotifEnabled ? "#fbfbfb" : "#f4f3f4"}
            value={isNotifEnabled}
            onValueChange={toggleNotifSwitch}
          />
        </View>

        <View style={{ flexDirection: 'row', paddingHorizontal: 10, paddingRight: 20, paddingBottom: 8 }}>
          <Text style={styles.settings}>Vibrate </Text>
          <Switch
            trackColor={{ false: "#767577", true: "#1cbc9c" }}
            thumbColor={isVibrateEnabled ? "#fbfbfb" : "#f4f3f4"}
            value={isVibrateEnabled}
            onValueChange={toggleVibrateSwitch}
          />
        </View>

        <View style={{ flexDirection: 'row', paddingHorizontal: 10, paddingRight: 20, paddingBottom: 8 }}>
          <Text style={styles.settings}>Default Reminder Time </Text>
          <View style={{ width: 125 }}>
            <Picker
              style={{ color: '#474747' }}
              selectedValue={time}
              itemStyle={{ justifyContent: 'flex-end' }}
              onValueChange={(itemValue, itemIndex) => setSelectedTime(itemValue)}
            >
              <Picker.Item label="5 mins" value="0" />
              <Picker.Item label="10 mins" value="1" />
              <Picker.Item label="15 mins" value="2" />
            </Picker>

          </View>
        </View>

        <Text style={styles.label} > Time Settings </Text>
        <View style={{ flexDirection: 'row', paddingHorizontal: 10, paddingRight: 20, paddingBottom: 8 }}>
          <Text style={styles.settings}>24-hour time </Text>
          <Switch
            trackColor={{ false: "#767577", true: "#1cbc9c" }}
            thumbColor={is24HourEnabled ? "#fbfbfb" : "#f4f3f4"}
            value={is24HourEnabled}
            onValueChange={toggle24HourSwitch}
          />
        </View>

        <View style={{ flexDirection: 'row', paddingHorizontal: 10, paddingRight: 20,  paddingBottom: 8 }}>
          <View style={{ flexDirection: 'column', flex: 1, padding: 12 }}>
            <Text style={{ height: 'auto', fontSize: 22 }}>Use Home time zone</Text>
            <Text style={{ color: '#474747', fontSize: 20 }}> Display calender in home time zones even when travelling </Text>
          </View>

          <Switch
            trackColor={{ false: "#767577", true: "#1cbc9c" }}
            thumbColor={isHomeTimeEnabled ? "#fbfbfb" : "#f4f3f4"}
            value={isHomeTimeEnabled}
            onValueChange={toggleHomeTimeSwitch}
          />
        </View>


        <View style={{ flexDirection: 'row', paddingHorizontal: 10, paddingRight: 20, paddingBottom: 8 }}>
          <Text style={styles.settings}>Home Time Zone </Text>
          <View style={{ width: 180, height: 60 }}>
            <Picker
              style={{ color: '#474747', flexWrap: 'wrap'}}
              selectedValue={value}
              itemStyle={{ justifyContent: 'flex-end' }}
              onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
            >
              <Picker.Item label="GMT +8:00 Singapore" value="0" />
              <Picker.Item label="GMT +7:00 Thailand" value="1" />
              <Picker.Item label="GMT +13:00 New Zealand" value="2" />
              <Picker.Item label="GMT +09:00 Japan" value="3" />
              <Picker.Item label="GMT +02:00 Romania" value="4" />
              <Picker.Item label="GMT +01:00 Germany" value="5" />
              <Picker.Item label="GMT +00:00 Iceland" value="6" />
              <Picker.Item label="GMT -06:00 Costa Rica" value="7" />
              <Picker.Item label="GMT -05:00 Colombia" value="8" />
              <Picker.Item label="GMT -03:00 Argentina" value="9" />
            </Picker>
          </View>
        </View>

        <Text style={styles.label} > About </Text>
        <Text style={styles.settings}>About Us </Text>
        <Text style={styles.settings}>Contact Us  </Text>
        <Text style={styles.settings}>Support Us </Text>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height,
    backgroundColor: '#D484E1',
  },

  label: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#e6b8ee',
    fontSize: 24
  },

  settings: {
    flex: 4,
    height: 'auto',
    marginLeft: 5,
    marginVertical: 5,
    padding: 10,
    fontSize: 22,
  },

});

export default Settings;


