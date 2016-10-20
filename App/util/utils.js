/**
 * Created by ms.kim2 on 2016-09-14.
 */
"use strict";
// obtained from react native tutorials
import React from 'react';
import { PixelRatio, Dimensions, DeviceEventEmitter } from 'react-native';
//import Dimensions from 'Dimensions';
import BackgroundTimer from 'react-native-background-timer';
import { RNLocation as Location } from 'react-native-gps';
import Toast from 'react-native-simple-toast';

//Location.startUpdatingLocation();

const Util = {
  ratio: PixelRatio.get(),
  pixel: 1 / PixelRatio.get(),
  size: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  post(url, data, callback) {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    fetch(url, fetchOptions)
      .then((response) => {
        return response.json()
      })
      .then((responseData) => {
        callback(responseData);
      });
  },
  key: 'BDKHFSDKJFHSDKFHWEFH-REACT-NATIVE',
  //background timer
  BgTimer (intervalCount, intervalTime, funcName) {
    console.log('intervalCount:',intervalCount, intervalTime, funcName);
    switch (intervalCount) {
      case 1 :
        // 한번수행
        const timeoutId = BackgroundTimer.setTimeout(() => {
          console.log('한번수행:',intervalCount, intervalTime);
          Toast.show('백그라운드작업 : 한번수행', Toast.SHORT, Toast.CENTER);
        }, intervalTime);
        BackgroundTimer.clearTimeout(timeoutId);
        break;
      default :
        // 반복수행
        const count = 1;
        const intervalId = BackgroundTimer.setInterval(() => {
          console.log('반복수행:',intervalCount, intervalTime);
          Toast.show('백그라운드작업 : ' + count, Toast.SHORT, Toast.CENTER);
          count++;
        }, intervalTime);
        BackgroundTimer.clearInterval(intervalId);
        break;
    }
  },
  // Gps location
  getGpsLocation() {

    const subscription = DeviceEventEmitter.addListener(
        'locationUpdated',
        (location) => {
          // do something with the location
          /* Example location returned
           {
           coords: {
           speed: -1,
           longitude: -0.1337,
           latitude: 51.50998,
           accuracy: 5,
           heading: -1,
           altitude: 0,
           altitudeAccuracy: -1
           },
           timestamp: 1446007304457.029
           }
           */
          console.log("GPS Location:", location);
          return location;
        }
    );
  },
};


// import {StyleSheet, Platform} from 'react-native';

// export function create(styles: Object): {[name: string]: number} {
//   const platformStyles = {};
//   Object.keys(styles).forEach((name) => {
//     let {ios, android, ...style} = {...styles[name]};
//     if (ios && Platform.OS === 'ios') {
//       style = {...style, ...ios};
//     }
//     if (android && Platform.OS === 'android') {
//       style = {...style, ...android};
//     }
//     platformStyles[name] = style;
//   });
//   return StyleSheet.create(platformStyles);
// }

export default Util;
