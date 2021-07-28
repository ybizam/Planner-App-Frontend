/*
  Group Members: Jasmine Tye (p2036137), Yuhanaa Binte Izam (p2002145)
*/


import axios from 'axios';
import React, { Component, useState, useEffect } from 'react';
import moment from 'moment';
import {
  Text, View, StyleSheet, Image, Dimensions,
  ScrollView, Button, Alert, TouchableOpacity, TextInput, Touchable, Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ColorPalette from 'react-native-color-palette';
import CustomHeader from '../components/customHeaders';
import { TOUCHABLE_STATE } from 'react-native-gesture-handler/lib/typescript/components/touchables/GenericTouchable';

const hostname = 'https://planner-app-backend-final.herokuapp.com';
var data = [];

export default class selectedTask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      taskID : 0,
      title: '',
      date: '',
      timeFrom: '',
      timeTo: '',
      colorTag: '',
      notes: '',
      selectedColor: '',
      selectedTimeTo: '',
      selectedTimeFrom: '',
      isHidden: false,
      setDateVisibility: false,
      setTimeFromVisibility: false,
      setTimeToVisibility: false
    }

    var task_id = props.route.params.data

    const getTask = () => {
      axios.get(`${hostname}/task/get/${task_id}`, { params: { taskID: task_id } })
        .then((response) => {
          data = response.data;

          return (
            this.setState({
              taskID: data.taskID,
              title: data.title,
              date: data.date,
              timeFrom: data.timeFrom,
              timeTo: data.timeTo,
              colorTag: data.colorTag,
              notes: data.notes
            })
          )

        })
        .catch((error) => {
          console.log(error);
        });
    }
    getTask();
  }



  render() {
    const { navigation } = this.props;

    const showDatePicker = () => {
      this.setState({
        setDateVisibility: true
      })
    };

    const hideDatePicker = () => {
      this.setState({
        setDateVisibility: false
      })
    };

    const showTimeToPicker = () => {
      this.setState({
        setTimeToVisibility: true
      })
    };

    const hideTimeToPicker = () => {
      this.setState({
        setTimeToVisibility: false
      })
    };

    const showTimeFromPicker = () => {
      this.setState({
        setTimeFromVisibility: true
      })
    };

    const hideTimeFromPicker = () => {
      this.setState({
        setTimeFromVisibility: false
      })
    };

    const CustomColorPicker = () => {
      return (
        <ColorPalette
          onChange={color => (this.setState({ colorTag: `${color}` }))}
          value={this.state.colorTag}
          defaultColor={this.state.colorTag}
          title={"   "}
          colors={['#9BF6A4', '#9BF6E6', '#9BAFF6', '#E8DD7D', '#F6A0DE', '#F69B9B']}
        />
      )
    }

    const editTask = () => {
      const requestBody = {
        "title": this.state.title,
        "date": this.state.date,
        "timeFrom": this.state.timeFrom,
        "timeTo": this.state.timeTo,
        "colorTag": this.state.colorTag,
        "notes": this.state.notes
      };

      axios.put(`${hostname}/task/${this.state.taskID}`, requestBody)
        .then((response) => {
          Alert.alert("Successfully Edit");
          navigation.navigate('Home');
        })
        .catch((error) => {
          console.log(error);
          var errMssg = error.response.data.result;
          Alert.alert(errMssg);
        });
    }

    const deleteTask = () => {
      axios.delete(`${hostname}/task/delete/${this.state.taskID}`)
        .then((response) => {
          Alert.alert("Successfully Deleted");
          navigation.navigate('Home');
        })
        .catch((error) => {
          console.log(error);
        });
    }

    return (
      <ScrollView>
        <View style={{ backgroundColor: '#D484E1' }}>
          <View style={{ backgroundColor: "rgba(255, 255, 255, 0.5)", flex: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5 }}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Image
                source={require('../images/icons8-back-50.png')}
              />
            </TouchableOpacity>

            <Text style={styles.headerStyle}>Edit Task</Text>

            <TouchableOpacity onPress={() => deleteTask()}>
              <Image
                source={require('../images/icons8-trash-50.png')}
                style={styles.deleteIcon}
              />
            </TouchableOpacity>
          </View>

        </View>

        <View style={styles.container}>
          <Text style={styles.label} > Title: </Text>
          <TextInput
            editable
            maxLength={1000}
            style={styles.titleLabel}
            value={this.state.title}
            onChangeText={(value) => this.setState({ title: value })}
          ></TextInput>

          <Text style={styles.label} > Date: </Text>
          <TouchableWithoutFeedback style={styles.titleLabel} onPress={showDatePicker}>
            <DateTimePickerModal
              value={new Date()}
              isVisible={this.state.setDateVisibility}
              mode="date"
              display="spinner"
              maximumDate={new Date(2300, 10, 20)}
              onConfirm={(date) => {
                this.setState({
                  date: moment(date).format('DD-MM-YYYY')
                });
                hideDatePicker();
              }}
              onCancel={hideDatePicker}
              value={this.state.date}
              onChangeText={(value) => this.setState({ date: value })}
            />
            <Text style={styles.inputStyle}>{this.state.date}</Text>
          </TouchableWithoutFeedback>

          <Text style={styles.label} > Time: </Text>
          <View style={{ flexDirection: 'row', paddingBottom: 10 }}>

            <TouchableWithoutFeedback style={styles.timeLabel_1} onPress={showTimeFromPicker}>
              <DateTimePickerModal
                value={new Date()}
                isVisible={this.state.setTimeFromVisibility}
                mode="time"
                display="spinner"
                onConfirm={(date) => {
                  this.setState({
                    timeFrom: moment(date).format('HH:mm'),
                    selectedTimeFrom: moment(date).format('LT')
                  });
                  hideTimeFromPicker();
                }}
                onCancel={hideTimeFromPicker}
                value={this.state.timeFrom}
                onChangeText={(value) => this.setState({ timeFrom: value })}
              />
              <Text style={styles.inputStyle}>{this.state.timeFrom}</Text>
            </TouchableWithoutFeedback>

            <Text style={{ fontSize: 20, textTransform: 'uppercase', alignSelf: 'center' }}> To </Text>

            <TouchableWithoutFeedback style={styles.timeLabel_2} onPress={showTimeToPicker}>
              <DateTimePickerModal
                value={new Date()}
                isVisible={this.state.setTimeToVisibility}
                mode="time"
                display="spinner"
                onConfirm={(date) => {
                  this.setState({
                    timeTo: moment(date).format('HH:mm')
                  });
                  console.log(this.state.timeTo);
                  hideTimeToPicker();
                }}
                onCancel={hideTimeToPicker}
                value={this.state.timeTo}
                onChangeText={(value) => this.setState({ timeTo: value })}
              />
              <Text style={styles.inputStyle}>{this.state.timeTo}</Text>
            </TouchableWithoutFeedback>

          </View>
          <View style={{ flexDirection: 'row', marginTop: 30, marginBottom: 10 }}>
            <Text style={{ fontSize: 20, paddingLeft: 15, textTransform: 'uppercase', alignSelf: 'center' }} > Tags: </Text>
            <CustomColorPicker></CustomColorPicker>
          </View>

          <Text style={styles.label} > Notes: </Text>
          <TextInput
            editable
            multiline
            numberOfLines={10}
            maxLength={1000}
            style={styles.noteLabel}
            value={this.state.notes}
            onChangeText={(value) => this.setState({ notes: value })}
          >
          </TextInput>
        </View>

        <View style={{ backgroundColor: '#D484E1' }}>
          <TouchableOpacity style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}>
            <Text style={
              {
                fontSize: 20,
                textAlign: 'center',
                textTransform: 'uppercase',
                marginVertical: 20
              }}
              onPress={editTask}
            > Confirm</Text>



          </TouchableOpacity>
        </View>


        {/* <View style={{ backgroundColor: 'red' }}>
          <Text>HI</Text>
          <Text>ID: {this.state.taskID}</Text>
          <Text>TITLE: {this.state.title}</Text>
          <Text>DATE: {this.state.date}</Text>
          <Text>TIME FROM: {this.state.timeFrom}</Text>
          <Text>TIME TO: {this.state.timeTo}</Text>
          <Text>COLOR: {this.state.colorTag}</Text>
          <Text>NOTES: {this.state.notes}</Text>
        </View> */}

      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#D484E1',
    padding: 10,
    minHeight: Dimensions.get("window").height,
  },

  label: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 15,
    textTransform: 'uppercase',
    fontSize: 20,
  },

  headerStyle: {
    flex: 2,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 20,
    justifyContent: 'center',
    alignContent: 'center',
    marginLeft: 10,
    paddingHorizontal: 20
  },

  deleteIcon: {
    flex: 1,
    maxHeight: 35,
    maxWidth: 35,
    alignContent: 'center',
    marginRight: 10
  },

  titleLabel: {
    marginHorizontal: 20,
    paddingHorizontal: 30,
    marginBottom: 20,
    height: 40,
    fontSize: 20,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: '#efd1f4',
    borderRadius: 100,
  },

  timeLabel_1: {
    marginLeft: 20,
    marginRight: 10,
    paddingHorizontal: 10,
    minWidth: Dimensions.get('window').width / 3,
    fontSize: 20,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: '#efd1f4',
    borderRadius: 100,
  },

  timeLabel_2: {
    marginLeft: 20,
    paddingHorizontal: 5,
    minWidth: Dimensions.get('window').width / 2.7,
    height: 40,
    fontSize: 20,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: '#efd1f4',
    borderRadius: 100,
  },

  noteLabel: {
    marginHorizontal: 20,
    paddingHorizontal: 30,
    paddingTop: 30,
    marginBottom: 10,
    fontSize: 20,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: '#efd1f4',
    borderRadius: 15,
    textAlignVertical: 'top'
  },

  inputStyle: {
    fontSize: 20,
    paddingVertical: 5,
    paddingHorizontal: 5,
  }

});