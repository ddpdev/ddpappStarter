/**
 * Created by leesy on 2016-10-12.
 */

import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    Dimensions
} from 'react-native';
import Swiper from 'react-native-swiper';

const { width } = Dimensions.get('window');

const styles = {
    wrapper: {
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    image: {
        width,
        flex: 1,
    }
}

const renderPagination = (index, total, context) => {
    return (
        <View style={{
            position: 'absolute',
            bottom: 10,
            right: 10
        }}>
            <Text style={{ color:'grey' }}>
                <Text style={{
                    color: 'white',
                    fontSize: 20
                }}>{index + 1}</Text>/{total}
            </Text>
        </View>
    )
}

export default class PhotoSwiper extends Component {
    render () {
        return (
            <View>
                <Swiper style={styles.wrapper} height={240}
                        onMomentumScrollEnd={(e, state, context) => console.log('index:', state.index)}
                        dot={<View style={{backgroundColor: 'rgba(0,0,0,.2)', width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
                        activeDot={<View style={{backgroundColor: '#000', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
                        renderPagination={renderPagination}
                        paginationStyle={{
                            bottom: -23, left: null, right: 10
                        }} loop>
                    <View style={styles.slide} title={<Text numberOfLines={1}>Aussie tourist dies at Bali hotel</Text>}>
                        <Image resizeMode='stretch' style={styles.image} source={require('./../../images/sample/1_340.jpg')} />
                    </View>
                    <View style={styles.slide} title={<Text numberOfLines={1}>Big lie behind Nine’s new show</Text>}>
                        <Image resizeMode='stretch' style={styles.image} source={require('./../../images/sample/2_340.jpg')} />
                    </View>
                    <View style={styles.slide} title={<Text numberOfLines={1}>서버이미지 1</Text>}>
                        <Image resizeMode='stretch' style={styles.image} source={{uri: 'https://ddpimage01.s3.ap-northeast-2.amazonaws.com/image/H1pJcaQA_img.jpg'}} />
                    </View>
                    <View style={styles.slide} title={<Text numberOfLines={1}>서버이미지 2</Text>}>
                        <Image resizeMode='stretch' style={styles.image} source={{uri: 'https://ddpimage01.s3.ap-northeast-2.amazonaws.com/image/rJerEb3E0_img'}} />
                    </View>
                    <View style={styles.slide} title={<Text numberOfLines={1}>서버이미지 3</Text>}>
                        <Image resizeMode='stretch' style={styles.image} source={{uri:'https://ddpimage01.s3.ap-northeast-2.amazonaws.com/image/By9lTIWL_img.jpg'}} />
                    </View>
                    <View style={styles.slide} title={<Text numberOfLines={1}>local image 3</Text>}>
                        <Image resizeMode='stretch' style={styles.image} source={require('./../../images/sample/6_340.jpg')} />
                    </View>
                    <View style={styles.slide} title={<Text numberOfLines={1}>local image 4</Text>}>
                        <Image resizeMode='stretch' style={styles.image} source={require('./../../images/sample/7_340.jpg')} />
                    </View>
                    <View style={styles.slide} title={<Text numberOfLines={1}>local image 5</Text>}>
                        <Image resizeMode='stretch' style={styles.image} source={require('./../../images/sample/8_340.jpg')} />
                    </View>
                </Swiper>
            </View>
        )
    }
}
