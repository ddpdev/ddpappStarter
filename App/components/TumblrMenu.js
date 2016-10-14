/**
 * Created by leesy on 2016-10-11.
 * day 10
 */
'use strict';

import React,{ Component } from 'react';
import { Image,StyleSheet,Text,TouchableWithoutFeedback,TouchableHighlight,StatusBar,Animated,Easing,View, Platform } from 'react-native';
import Util from '../util/utils';
// import {BlurView} from 'react-native-blur';

const _isMounted = false;

export default class TumblerMenu extends Component{
    constructor(props) {
        super(props);
        this.state = {
            shift: new Animated.Value(-120),
            show:false,
        };
        console.log("ThumblerMenu:",props,this.state);
    }

    _pushMenu() {
        this.setState({
            show: true,
        });

        Animated.timing(
            this.state.shift,
            {toValue: Util.size.width === 375? 50:30,
                duration: 200,
                delay:100,
                easing: Easing.elastic(1),
            },
        ).start();
    }

    _popMenu() {
        Animated.timing(
            this.state.shift,
            {toValue: -120,
                duration: 200,
                delay:100,
                easing: Easing.elastic(1),
            },
        ).start();

        setTimeout(()=>{
            if (this._isMounted) {
                this.setState({
                    show: false,
                });
            }
        },500);
    }

    componentDidMount() {
        if(Platform.OS === 'ios') {
            StatusBar.setBarStyle(1); // only ios
        } else {
            StatusBar.translucent = true;
        }
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
    render() {
        return(
            <View style={{backgroundColor:"#37465c"}}>
                <TouchableWithoutFeedback style={styles.imgContainer} onPress={() => this._pushMenu()}>
                    <Image source={{uri:'https://ddpimage01.s3.ap-northeast-2.amazonaws.com/image/SJs8Bw6h_img.jpg'}} style={styles.img}></Image>
                </TouchableWithoutFeedback>
                {this.state.show?
                    <Image source={require('../images/app/tumblrblur.png')} style={styles.menu}>
                        <Animated.View style={[styles.menuItem1,{left:this.state.shift}]}>
                            <Image style={styles.menuImg} source={require('../images/app/tumblr-text.png')}></Image>
                            <Text style={styles.menuText}>Text</Text>
                        </Animated.View>
                        <Animated.View style={[styles.menuItem2,{right:this.state.shift}]}>
                            <Image style={styles.menuImg} source={require('../images/app/tumblr-photo.png')}></Image>
                            <Text style={styles.menuText}>Photo</Text>
                        </Animated.View>
                        <Animated.View style={[styles.menuItem3,{left:this.state.shift}]}>
                            <Image style={styles.menuImg} source={require('../images/app/tumblr-quote.png')}></Image>
                            <Text style={styles.menuText}>Quote</Text>
                        </Animated.View>
                        <Animated.View style={[styles.menuItem4,{right:this.state.shift}]}>
                            <Image style={styles.menuImg} source={require('../images/app/tumblr-link.png')}></Image>
                            <Text style={styles.menuText}>Link</Text>
                        </Animated.View>
                        <Animated.View style={[styles.menuItem5,{left:this.state.shift}]}>
                            <Image style={styles.menuImg} source={require('../images/app/tumblr-chat.png')}></Image>
                            <Text style={styles.menuText}>Chat</Text>
                        </Animated.View>
                        <Animated.View style={[styles.menuItem6,{right:this.state.shift}]}>
                            <Image style={styles.menuImg} source={require('../images/app/tumblr-audio.png')}></Image>
                            <Text style={styles.menuText}>Audio</Text>
                        </Animated.View>
                        <TouchableHighlight underlayColor="rgba(0,0,0,0)" activeOpacity={0} style={styles.dismissBtn} onPress={() => this._popMenu()}>
                            <Text style={styles.dismiss}>취 소</Text>
                        </TouchableHighlight>
                    </Image>:
                    <View></View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    imgContainer:{
        height: Util.size.height,
        width: Util.size.width,
        position:"absolute",
        top:0,
        left:0
    },
    img:{
        resizeMode:"contain",
        height: Util.size.height-10,
        width: Util.size.width,
        marginTop:15
    },
    menu:{
        height: Util.size.height ,
        width: Util.size.width,
        resizeMode:"cover",
        position:"absolute",
        top:0,
        left:0
    },
    blur:{
        height: Util.size.height,
        width: Util.size.width,
    },
    menuImg:{
        width:120,
        height:100,
        resizeMode:"contain",
    },
    menuText:{
        width:120,
        textAlign:"center",
        color:"#fff",
        backgroundColor: "transparent"
    },
    menuItem1:{
        position:"absolute",
        left: 50,
        top: 80
    },
    menuItem3:{
        position:"absolute",
        left:50,
        top: 250
    },
    menuItem5:{
        position:"absolute",
        left:50,
        top: 420
    },
    menuItem2:{
        position:"absolute",
        right:50,
        top: 80
    },
    menuItem4:{
        position:"absolute",
        right:50,
        top: 250
    },
    menuItem6:{
        position:"absolute",
        right:50,
        top: 420
    },
    dismissBtn:{
        position:"absolute",
        width:Util.size.width,
        left:0,
        bottom:150,
    },
    dismiss:{
        textAlign:"center",
        color:"rgba(255,255,255,0.2)",
        fontWeight:"700",
        backgroundColor: "transparent"
    },
    buttonContainer: {
        flexDirection: 'row',
        marginVertical: 20,
        backgroundColor: 'transparent',
    },
});