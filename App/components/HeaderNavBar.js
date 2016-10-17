
/**
 * Created by leesy on 2016-10-11.
 * 24days
 */

'use strict';

import React,{ Component } from 'react';
import { StyleSheet,
      Text,
      StatusBar,
      View,
      Platform, } from 'react-native';
import Util from '../util/utils';
import Icon from 'react-native-vector-icons/Ionicons';

export default class HeaderNavBar extends Component{
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title | '카테고리',
            // initTab: this.props.initTab | 1,
        };
        console.log("HeaderNavBar:", props, this.state);
    }

    componentDidMount() {
        if(Platform.OS === 'ios') {
            StatusBar.setBarStyle(1); // only ios
        } else {
            StatusBar.translucent = true;
        }
    }

    _updateTitle(obj) {
        const {i} = obj;
        let title = "카테고리" + (i+1);

        this.setState({
            title
        });
    }

    render() {
        return(
            <View>
                <View style={styles.nav}>
                    <Text style={styles.title}>{this.props.title}</Text>
                    <View style={styles.iconContainer}>
                        <Icon name="ios-search" color="#fff" size={25}/>
                        <Icon name="md-more" color="#fff" size={25}/>
                    </View>
                </View>
            </View>
        )
    }
}

//ion-android-more-vertical
const styles = StyleSheet.create({
    nav:{
        backgroundColor: 'skyblue',  //"#e37594",
        width:Util.size.width,
        height:55,
        flexDirection:"row",
        justifyContent:"space-between",
        paddingTop:15,
        paddingLeft:20,
        paddingRight:10,
    },
    title:{
        color:"#fff",
        fontSize:20,
    },
    iconContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        width:60,
    },
});

