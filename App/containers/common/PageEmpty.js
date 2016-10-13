/**
 * Created by ms.kim2 on 2016-09-09.
 */
import React, { Component } from 'react';
import { View, Text ,StyleSheet} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

 class PageEmpty extends Component {
     constructor(props){
         super(props);
         console.log("PageEmpty:",props);
         // uri = 'http://app.ddpstyle.com/common/awsfileupload'
         // http://istarkov.github.io/google-map-react/map/main
     }

      render() {
        return (
          <View style={styles.container}>
              <Text>Props : {\n}`${props}`</Text>
          <View/>
        );
    }
 }

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#F5FCFF",
  },
  welcome: {
      fontSize: 20,
      textAlign: "center",
      margin: 10,
  },
  instructions: {
      textAlign: "center",
      color: "#333333",
      marginBottom: 5,
  },
});

export default connect()(PageEmpty);