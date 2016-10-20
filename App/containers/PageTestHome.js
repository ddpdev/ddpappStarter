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
import Toast from 'react-native-simple-toast';
import Util from '../util/utils';
import BackgroundTimer from 'react-native-background-timer';

class PageTestHome extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoggedIn : false,
            gpsLocation : [],
            bgCount : 0,

        };
        const intervalId = 0;


        this.pageCameraRollPickerUploader = this.pageCameraRollPickerUploader.bind(this);
        this.pageCameraRollPickerUpload = this.pageCameraRollPickerUpload.bind(this);
        this.pageImagePicker = this.pageImagePicker.bind(this);
        this.pageMapExamples = this.pageMapExamples.bind(this);
        this.pageMaps = this.pageMaps.bind(this);
        this.pageWebView = this.pageWebView.bind(this);
        this.pageReactMaps = this.pageReactMaps.bind(this);

        console.log("PageTestHome:",props,this.state);
    }

    showToast(message) {
        Toast.show('Message:' + message, Toast.SHORT, Toast.CENTER);
    }

    componentDidMount() {
        //const currentLocation = Util.getGpsLocation();
        //showToast(currentLocation);
        //Util.BgTimer(10, 3000, 'abc');
        intervalId = BackgroundTimer.setInterval(() => {
            //console.log('반복수행:',0, intervalTime);
            this.setState({bgCount: this.state.bgCount+1});
            Toast.show('백그라운드작업 : ' + this.state.bgCount, Toast.SHORT, Toast.CENTER);
        }, 10000);
    }

    componentWillUnmount() {
        BackgroundTimer.clearInterval(intervalId);
    }


        //Uploader
  pageCameraRollPickerUploader () {
      return Actions.pageCameraRollPickerUploader();
  }
  //Fetch_Blob
  pageCameraRollPickerUpload () {
      return Actions.pageCameraRollPickerUpload();
  }

  pageImagePicker () {
      return Actions.pageImagePicker();
  }
  pageMapExamples () {
      return Actions.pageMapExamples({provider:'google'});
  }
  pageMaps () {
      return Actions.pageMaps({provider:'google'});
  }
  pageWebView () {
      return  Actions.pageWebView({uri:'http://istarkov.github.io/google-map-react/map/main'});
  }
  pageReactMaps () {
      return Actions.pageReactMaps({provider:'google'});
  }

  render() {
    return (
        <ScrollView scrollEnabled={true}>
            <Button
                small
                iconRight
                icon={{name: 'tab'}}
                title='Twitter Editor'
                backgroundColor='#a97c58'
                onPress={Actions.pageTwitterEditor}
            />
            <View style={style.viewMarginTop} />
            <Button
                small
                iconRight
                icon={{name: 'tab'}}
                title='Scrollable TabView'
                backgroundColor='#b93c58'
                onPress={() => Actions.pagePageHeader({title:'카테고리'})}
            />
            <View style={style.viewMarginTop} />
            <Button
                small
                iconRight
                icon={{name: 'tab'}}
                title=' TabView 테스트'
                backgroundColor='#663d38'
                onPress={() => Actions.pageMainTabView({title:'메인'})}
            />
            <View style={style.viewMarginTop} />
            <Button
                small
                iconRight
                icon={{name: 'tab'}}
                title='Thumblr Menu '
                backgroundColor='#c3ac5f'
                onPress={Actions.pageTumblrMenu}
            />
            <View style={style.viewMarginTop} />
            <Button
              small
              iconRight
              icon={{name: 'touch-app'}}
              title='Action Button'
              backgroundColor='#397af8'
              onPress={Actions.pageActionButton}
            />
            <View style={style.viewMarginTop} />
            <Button
                small
                iconRight
                icon={{name: 'view-list'}}
                title='상품리스트'
                backgroundColor='#79dad5'
                onPress={Actions.pageProductMain}
            />
            <View style={style.viewMarginTop} />
            <Button
                small
                iconRight
                icon={{name: 'location-on'}}
                title='Photo Pinch Zoom'
                color='#737fa4'
                backgroundColor='#7993d8'
                onPress={Actions.pagePhotoPinchZoom}
            />
            <View style={style.viewMarginTop} />
            <Button
                small
                iconRight
                icon={{name: 'location-on'}}
                title='Photo Lazy Swiper'
                color='#737fa4'
                backgroundColor='#a9cab8'
                onPress={Actions.pagePhotoLazySwiper}
            />
            <View style={style.viewMarginTop} />
            <Button
                small
                iconRight
                icon={{name: 'location-on'}}
                title='Photo Swiper'
                color='#737fa4'
                backgroundColor='#49f5b8'
                onPress={Actions.pagePhotoSwiper}
            />
            <View style={style.viewMarginTop} />
            <Button
                small
                iconRight
                icon={{name: 'collections'}}
                title='카메라롤 픽커 & 업로드(Uploader)'
                color='#f58'
                backgroundColor='#89faf8'
                onPress={this.pageCameraRollPickerUploader}
            />
            <View style={style.viewMarginTop} />
            <Button
                small
                iconRight
                icon={{name: 'location-on'}}
                title='지도표시 - pageReactMaps'
                color='#737fa4'
                backgroundColor='#a9cab8'
                onPress={this.pageReactMaps}
            />
            <View style={style.viewMarginTop} />
            <Button
                small
                iconRight
                icon={{name: 'collections'}}
                title='Image Picker(pageImagePicker)'
                color='#386'
                backgroundColor='#89faf8'
                onPress={this.pageImagePicker}
            />
            <View style={style.viewMarginTop} />
            <Button
                small
                iconRight
                icon={{name: 'http'}}
                title='Web Browser'
                color='#317fc4'
                backgroundColor='#89faf8'
                onPress={() => Actions.pageWebBrowser({url:'http://app.ddpstyle.com'})}
            />
            <View style={style.viewMarginTop} />
            <Button
                small
                iconRight
                icon={{name: 'file-upload'}}
                title='DDP Web(Upload)'
                color='#517fa4'
                backgroundColor='#89faf8'
                onPress={Actions.pageThree}
            />
            <View style={style.viewMarginTop} />
            <Button
                small
                iconRight
                icon={{name: 'add-location'}}
                title='현재 위치 조회(GPS,WIFI)-pageGeoPosition'
                color='#737ad4'
                backgroundColor='#c9fab8'
                onPress={Actions.pageGeoPosition}
            />
            <View style={style.viewMarginTop} />
            <Button
                small
                iconRight
                icon={{name: 'collections'}}
                title='지도 표시 - pageMaps'
                color='#d47'
                backgroundColor='#79f9b3'
                onPress={this.pageMaps}
            />
            <View style={style.viewMarginTop} />
            <Button
                small
                iconRight
                icon={{name: 'collections'}}
                title='카메라롤 픽커 & 업로드(Fetch_Blob)'
                color='#f50'
                backgroundColor='#39fbf7'
                onPress={this.pageCameraRollPickerUpload}
            />
            <View style={style.viewMarginTop} />
            <Button
                small
                iconRight
                icon={{name: 'tab'}}
                title='Image Picker & Uploader - PageImageUploader'
                backgroundColor='#4d7c55'
                onPress={() => {console.log("PageImageUploader 클릭");Actions.pageImageUploader();}}
            />
            <View style={style.viewMarginTop} />
            <Button
                small
                iconRight
                icon={{name: 'http'}}
                title='Web(google map)-pageWebView'
                color='#317fc4'
                backgroundColor='#89faf8'
                onPress={this.pageWebView}
            />
            <View style={style.viewMarginTop} />
            {/*<Button*/}
                {/*small*/}
              {/*iconRight*/}
              {/*icon={{name: 'web'}}*/}
              {/*title='Editor(draft) 테스트'*/}
              {/*color='#517fa4'*/}
              {/*backgroundColor='#89faf8'*/}
              {/*onPress={Actions.pageEditor}*/}
            {/*/>*/}
            {/*<View style={style.viewMarginTop} />*/}
            {/*<View style={style.viewMarginTop} />*/}
            {/*<Button*/}
                {/*small*/}
                {/*iconRight*/}
                {/*icon={{name: 'tab'}}*/}
                {/*title='Main Tab 테스트'*/}
                {/*backgroundColor='#997c58'*/}
                {/*onPress={() => {console.log("Main Tab 클릭");Actions.mainTab();}}*/}
            {/*/>*/}
            </ScrollView>
    )
  }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    viewMarginTop: {
        marginTop:5,
    },
    viewMarginHeader: {
        marginTop:2,
    }
});

export default connect()(PageTestHome);