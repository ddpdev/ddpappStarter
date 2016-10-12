/**
 * Created by ms.kim2 on 2016-09-09.
 */
import React, { Component } from 'react';
import { TouchableHighlight, Text, View, StyleSheet } from 'react-native';
import Util from '../util/utils';
//import { Router, Scene, Modal } from 'react-native-router-flux';

class StatusModal extends Component {

  constructor(props) {
    super(props)
    // set state with passed in props
    this.state = {
      message: props.error,
      hide: props.hide,
    }
    // bind functions
    this.dismissModal = this.dismissModal.bind(this);
    console.log("StatusModal:",props,this.state);
  }

  dismissModal() {
    this.setState({hide: true});
  }

  // show or hide Modal based on 'hide' prop
  render() {
    if(this.state.hide){
      return (
        <View>
        </View>
      )
    } else {
      return (
        <TouchableHighlight style={styles.mainContainer} onPress={this.dismissModal}>
          <Text style={styles.text}>{this.state.message}</Text>
        </TouchableHighlight>
      )
    }
  }
}

const styles = StyleSheet.create({
  mainContainer: {
      flex: 1,
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      top: 0,
      backgroundColor: "#c5ff1e",
  },
  text: {
    //backgroundColor: "#e32524",
    color: "#e32524",
    fontSize: 16,
    paddingTop: 5,
    paddingLeft: 5,
  },
});


module.exports = StatusModal;
