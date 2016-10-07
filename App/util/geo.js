/**
 * Created by leesy on 2016-10-07.
 */

import React from 'react';
import { GeoLocation } from 'react-native';

const geo = {
    getLocation : function () {
        /// Successful geolocation
        const success = function (position) {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            let date =  position.timestamp;

            /// Update state with new API Data based on lat lon
            //this.updateState(null, lat, lon);
            console.log('lat, lon, date : ', lat,lon, date);
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
        navigator.geolocation.getCurrentPosition(success, error,  {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000});
    },

    watchLocation: function (locationName, lat, lon) {
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
        navigator.geolocation.watchPosition(success, error, {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000});
    },
};