/**
 * Created by ms.kim2 on 2016-09-09.
 * @flow
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { SocialIcon, Button  } from 'react-native-elements';

class PageTestHome extends Component {
    constructor(props){
        super(props);

        this.state = {
            isLoggedIn : false,
        };

        this.goToPageTwo = this.goToPageTwo.bind(this);
        this.goToPageCameraRollPicker = this.goToPageCameraRollPicker.bind(this);
        this.pageCameraRollPickerUpload = this.pageCameraRollPickerUpload.bind(this);
        this.pageImagePicker = this.pageImagePicker.bind(this);
        this.pageMapExamples = this.pageMapExamples.bind(this);
        this.pageMaps = this.pageMaps.bind(this);
        this.pageWebView = this.pageWebView.bind(this);
        this.pageReactMaps = this.pageReactMaps.bind(this);

        console.log("PageTestHome:",props,this.state);
    }

  goToPageTwo() {
    return Actions.pageTwo({text: 'Hello World!'});
  }
  goToPageCameraRollPicker () {
      return Actions.pageCameraRollPicker();
  }
  pageCameraRollPickerUpload() {
      return Actions.pageCameraRollPickerUpload();
  }

  pageImagePicker () {
      return Actions.pageImagePicker();
  }
  pageMapExamples () {
      return Actions.pageMapExamples();
  }
  pageMaps () {
      return Actions.pageMaps();
  }
  pageWebView () {
      return  Actions.pageWebView({uri:'http://istarkov.github.io/google-map-react/map/main'});
  }
  pageReactMaps () {
      return Actions.pageReactMaps({provider:'google'});
  }

  render() {
    return (
      <View style={{flex:1, marginTop:60}}>
        <ScrollView>
            <Button
                raised
                iconRight
                icon={{name: 'collections'}}
                title='카메라롤 픽커 & 업로드(Real)'
                color='#f58'
                backgroundColor='#89faf8'
                onPress={this.pageCameraRollPickerUpload}
            />

            <Button
                raised
                iconRight
                icon={{name: 'collections'}}
                title='사진 선택 업로드 테스트(Fetch_Blob)'
                color='#f50'
                backgroundColor='#39fbf7'
                onPress={this.goToPageCameraRollPicker}
            />

            <Button
              raised
              iconRight
              icon={{name: 'collections'}}
              title='Image Picker,Camera,Video'
              color='#386'
              backgroundColor='#89faf8'
              onPress={this.pageImagePicker}
            />

            <Button
                raised
              iconRight
              icon={{name: 'web'}}
              title='Web(Upload)'
              color='#517fa4'
              backgroundColor='#89faf8'
              onPress={Actions.pageThree}
            />

            <Button
                raised
                iconRight
                icon={{name: 'web'}}
                title='Web(google map)'
                color='#317fc4'
                backgroundColor='#89faf8'
                onPress={this.pageWebView}
            />

            <Button
                raised
                iconRight
                icon={{name: 'collections'}}
                title='현재 위치 조회(GPS,WIFI)-Navigation'
                color='#737ad4'
                backgroundColor='#c9fab8'
                onPress={Actions.pageGeoPosition}
            />

            <Button
                raised
              iconRight
              icon={{name: 'collections'}}
              title='현재위치 - React GoogleMap 연동'
              color='#737fa4'
              backgroundColor='#a9cab8'
              onPress={this.pageReactMaps}
            />

            <Button
                raised
                iconRight
                icon={{name: 'collections'}}
                title='지도 표시 테스트'
                color='#d47'
                backgroundColor='#79f9b3'
                onPress={this.pageMaps}
            />

            <Button
                raised
              iconRight
              icon={{name: 'web'}}
              title='Editor(draft) 테스트'
              color='#517fa4'
              backgroundColor='#89faf8'
              onPress={Actions.pageEditor}
            />

            <Button
                raised
              iconRight
              icon={{name: 'smartphone'}}
              title='go To PageTwo!'
              backgroundColor='#397af8'
              onPress={() => this.goToPageTwo}
            />

            </ScrollView>
      </View>
    )
  }
}

export default connect()(PageTestHome);