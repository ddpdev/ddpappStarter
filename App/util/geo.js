/**
 * Created by leesy on 2016-10-07.
 */

import React from 'react';
import { GeoLocation } from 'react-native';
import Toast from 'react-native-simple-toast';

const GeoPostion = {
    async getLocation (count) {
        /// Successful geolocation
        const success = function (position) {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            let date =  position.timestamp;

            /// Update state with new API Data based on lat lon
            //this.updateState(null, lat, lon);
            console.log('lat, lon, date : ', lat,lon, date);
            console.log('current position : ', position);
            Toast.show('Success:'+ count + ',' + JSON.stringify(position), Toast.SHORT, Toast.CENTER);
            return position; //JSON.stringify(position); //position;
        };
        /// Error'd geolocation
        const error = function (error) {
            if (error.message == 'User denied Geolocation') {
                console.log('Please enable location services : ', error);
            }
            Toast.show('GeoLocaton Error:'+error.message, Toast.SHORT, Toast.CENTER);
            return null;
        };

        //console.log("getLocation:"+Date.now());
        /// Get the position
        await navigator.geolocation.getCurrentPosition(success, error,  {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000});
        //Toast.show("getLocation:"+Date.now(), Toast.SHORT, Toast.CENTER);
    },

    async getGeoLocation(){

        if (!navigator.geolocation){
            throw new Error("Geolocation is not enabled.");
        }
        return new Promise((resolve,reject) => {
            navigator.geolocation.getCurrentPosition(position => {
                  console.log("received current position",position.coords);
                  resolve(position.coords);
              },
              reason => {
                  reject(reason);
              }
            );
        });
    },

    watchLocation (locationName, lat, lon) {
        const success = function (position) {
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;

            /// Update state with new API Data based on lat lon
            //this.updateState(null, lat, lon);
            console.log('current position : ', position);
            return position;
        };
        /// Error'd geolocation
        const error = function (error) {
            if (error.message == 'User denied Geolocation') {
                console.log('Please enable location services : ', error);
            }
            return null;
        };
        /// Get the position
        navigator.geolocation.watchPosition(success, error, {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});
    },
};

export default GeoPostion;