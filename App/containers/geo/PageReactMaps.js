/**
 * Created by ms.kim2 on 2016-09-09.
 * @flow
 */

import React, { PropTypes, DeviceEventEmtter } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    ScrollView,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
var { RNLocation: Location } = require('NativeModules');
//import { Location } from 'react-native-gps';

import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import ShopMarker from './ShopMarker';

const { width, height } = Dimensions.get('window');

//lat: 37.5321114, lng: 126.8465744

const ASPECT_RATIO = width / height;
const LATITUDE = 37.5321114;
const LONGITUDE = 126.8465744;
const LATITUDE_DELTA = 0.0522;  //  0.0922 -->  0.0522 숫자(0.02)가 작으면 좁은 영역, 즉 우리동네 자세히~보임
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;

class PageReactMaps extends React.Component {
    static watchID = 0;
    constructor(props) {
        super(props);
        this.state = {
            region: {
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
            events: [],
            gpsHistory: [],
        };
        this.updataPostion = this.updataPostion.bind(this);
        console.log("PageReactMap:",props,this.state);
    }

    async updataPostion() {

        let geo_options = {
            enableHighAccuracy: true,
            maximumAge        : 30000,
            timeout           : 27000
        };

        let currentRegion = {
              latitude: LATITUDE,
              longitude: LONGITUDE,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
        };

        await navigator.geolocation.getCurrentPosition(
          (position) => {
              let initialPosition = JSON.stringify(position);
              console.log("initialPosition",initialPosition);
              //this.updatePosition(initialPosition);
              currentRegion.latitude = position.coords.latitude;
              currentRegion.longitude = position.coords.longitude;

              this.setState({region : currentRegion});
          },
          (error) => console.log("error:",error), //alert(JSON.stringify(error)),
          geo_options
        );

        this.watchID = await navigator.geolocation.watchPosition((position) => {
            let lastPosition = JSON.stringify(position);
            //console.log("initialPosition",lastPosition);
            //this.updatePosition(lastPosition);
            //this.setState(this.state.region.latitude: position.latitude, this.state.region.longitude : position.longitude);
            currentRegion.latitude = position.coords.latitude;
            currentRegion.longitude = position.coords.longitude;

            this.setState({region : currentRegion});
            console.log("currentPosition:", this.watchID, lastPosition);
        });
    }

    componentWillMount() {

    }

    componentDidMount() {
        this.updataPostion();

        Location.startUpdatingLocation();
        const subscription = DeviceEventEmitter.addListener(
            'locationUpdated',
            (location) => {
                /* Example location returned
                 {
                 speed: -1,
                 longitude: -0.1337,
                 latitude: 51.50998,
                 accuracy: 5,
                 heading: -1,
                 altitude: 0,
                 altitudeAccuracy: -1
                 }
                 */
                const currLocation = Object.assign(location, {date:(new Date()).getTime()});
                this.setState({gpsLoction: this.state.gpsLocation.push(currLocation)});
                console.log("gps location:",this.state.gpsLoction);
            }
        );
        console.log("gps subscription:",subscription);

    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView
                    provider={this.props.provider}
                    style={styles.map}
                    initialRegion={this.state.region}
                >
                    <MapView.Marker
                      coordinate={() => {
                                        let curPosition = this.state.gpsLocation.reverse().slice(0);
                                        let latitude =  curPosition.latitude;
                                        let longitude =  curPosition.longitude;
                                        console.log("last Position",curPosition );
                                        return {latitude, longitude};
                                    }}
                      title={'현재위치'}
                      description={Date.now()}
                    />
                </MapView>
                {/*<View style={styles.eventList}>*/}
                    {/*<ScrollView>*/}
                        {/*{this.state.events.map(event => <Event key={event.id} event={event} />)}*/}
                    {/*</ScrollView>*/}
                {/*</View>*/}
            </View>
        );
    }
}

PageReactMaps.propTypes = {
    provider: MapView.ProviderPropType ? MapView.ProviderPropType : 'google',
};

const styles = StyleSheet.create({
    callout: {
        width: 60,
    },
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    event: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        padding: 8,
    },
    eventData: {
        fontSize: 10,
        fontFamily: 'courier',
        color: '#555',
    },
    eventName: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#222',
    },
    eventList: {
        position: 'absolute',
        top: height / 2,
        left: 0,
        right: 0,
        bottom: 0,
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: height / 2,
    },
    bubble: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 20,
    },
    latlng: {
        width: 200,
        alignItems: 'stretch',
    },
    button: {
        width: 80,
        paddingHorizontal: 12,
        alignItems: 'center',
        marginHorizontal: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginVertical: 20,
        backgroundColor: 'transparent',
    },
});

export default connect()(PageReactMaps);