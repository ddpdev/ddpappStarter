/**
 * Created by ms.kim2 on 2016-09-18.
 */
import React, { Component } from 'react';
import Dimensions from 'Dimensions';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableHighlight,
} from 'react-native';
import StatusBar from 'StatusBar';
import {Actions} from 'react-native-router-flux';
import { SocialIcon, Button  } from 'react-native-elements';

class BottomBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      name: this.props.name,
    };
    console.log("BottomBar:", this.props, this.state);
  };

  render() {
    const pageImagePicker = () => Actions.pageImagePicker();
    const pageCameraRollPickerUploader = () => Actions.pageCameraRollPickerUploader({ groupTypes: 'All', assetType: 'Photos' });
    return(
            <View style={styles.bottomContainer}>
              {/*<StatusBar*/}
                {/*translucent={true}*/}
                {/*backgroundColor="rgba(0, 0, 0, 0.2)"*/}
                {/*barStyle="light-content"*/}
              {/*/>*/}
              <SocialIcon
                type='google-plus-official'
              />
              <Button
                small
                iconRight
                icon={{name: 'add-a-photo'}}
                title='camera'
                onPress={pageImagePicker}
              />
              <Button
                small
                iconRight
                icon={{name: 'photo-library'}}
                title='gallery'
                onPress={pageCameraRollPickerUploader}
              />
              <SocialIcon
                title='Sign In With Facebook'
                type='facebook'
              />
            </View>
    );
  }
}


const styles = StyleSheet.create({
  bottomContainer: {
    flex: 1,
    flexDirection:'row',
    //marginBottom:20,
    //height: Dimensions.get('window').height/2,
    width: Dimensions.get('window').width,
    backgroundColor: '#add8e6' // lightblue
    //alignItems: 'center',
    //justifyContent: 'center',
  },

});

export default BottomBar;