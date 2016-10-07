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
    TouchableOpacity,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import ShopMarker from './ShopMarker';

const { width, height } = Dimensions.get('window');

//lat: 37.5321114, lng: 126.8465744

const ASPECT_RATIO = width / height;
const LATITUDE = 37.5321114;
const LONGITUDE = 126.8465744;
const LATITUDE_DELTA = 0.0922;  //  0.0922 -->  0.0522 숫자(0.02)가 작으면 좁은 영역, 즉 우리동네 자세히~보임
const LONGITUDE_DELTA = 0.0421; //LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;

function randomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

class PageReactMaps extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            region: {
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
            markers: [],
            events: [],
            gpsHistory: [],
            watchID: 0,
        };
        this.updataPostion = this.updataPostion.bind(this);
        console.log("PageReactMap:",props,this.state);
    }

    updataPostion() {

        const geo_options = {
            enableHighAccuracy: false,
            maximumAge        : 30000,
            timeout           : 27000
        };

        let currentRegion = {
              latitude: LATITUDE,
              longitude: LONGITUDE,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
        };

        let currentPostion = {
            latitude: LATITUDE,
            longitude: LONGITUDE,
        };

        // 조회시만 발생함.
         navigator.geolocation.getCurrentPosition(
              (position) => {
                  currentPostion = { latitude: position.coords.latitude, longitude: position.coords.longitude };
                  currentRegion = {  latitude: position.coords.latitude, longitude: position.coords.longitude , latitudeDelta: LATITUDE_DELTA,longitudeDelta: LONGITUDE_DELTA,  }
                  this.setState({
                                    marker : this.state.markers.concat(currentPostion),
                                    region : currentRegion,
                                });
                  console.log("getCurrentPosition:", position);
          },
          (error) => console.log("error:",error), //alert(JSON.stringify(error)),
          geo_options
        );

        // 이동시 발생함.
        const watchPositionID = navigator.geolocation.watchPosition((position) => {
            currentPostion = { latitude: position.coords.latitude, longitude: position.coords.longitude };
            this.setState({marker : this.state.markers.concat(currentPostion), watchID : watchPositionID});
            console.log("watchPosition:", this.watchID, currentPostion);
        });

    }

    onMapPress(e) {
        this.setState({
            markers: [
                ...this.state.markers,
                {
                    coordinate: e.nativeEvent.coordinate,
                    key: id++,
                    color: randomColor(),
                },
            ],
        });
    }


    // componentWillMount() {
    //     //this.updataPostion();
    // };

    componentDidMount() {
        this.updataPostion();
    };

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.state.watchID);
    };

    render() {
        return (
            <View style={styles.container}>
                <MapView
                    provider={this.props.provider}
                    style={styles.map}
                    region={this.state.region}
                    onPress={(e) => this.onMapPress(e)}
                >
                    {this.state.markers.map(marker => (
                      <MapView.Marker
                        key={marker.key}
                        coordinate={marker.coordinate}
                        pinColor={marker.color}
                        title={'현재위치'}
                        description={'무엇을 팔까?'}
                      />
                    ))}
                </MapView>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      onPress={() => this.setState({ markers: [] })}
                      style={styles.bubble}
                    >
                        <Text>마커지우개</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    callout: {
        width: 60,
    },
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
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