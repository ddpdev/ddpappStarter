
/**
 * Created by leesy on 2016-10-11.
 * 24days
 */

'use strict';

import React,{ Component } from 'react';
import { Image,StyleSheet,Text,TouchableHighlight,TouchableOpacity,StatusBar,Animated,ScrollView,View, Platform } from 'react-native';
import Util from '../util/utils';
import Icon from 'react-native-vector-icons/Ionicons';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import FacebookTabBar from './FacebookTabBar';

class HomePage extends Component{
    render() {
        return(
            <ScrollView>
                <Text>내용 : {this.props.tabTitle}</Text>
                <Image style={styles.img} source={require('../images/app/yt1.png')} />
            </ScrollView>
        )
    }
}

class PopularPage extends Component{
    render() {
        return(
            <ScrollView>
                <Text>내용 : {this.props.tabTitle}</Text>
                <Image style={styles.img} source={require('../images/app/yt2.png')} />
            </ScrollView>
        )
    }
}

class SubscribePage extends Component{
    render() {
        return(
            <ScrollView>
                <Text>내용 : {this.props.tabTitle}</Text>
                <Image style={styles.img} source={require('../images/app/yt3.png')} />
            </ScrollView>
        )
    }
}

class MinePage extends Component{
    render() {
        return(
            <ScrollView>
                <Text>내용 : {this.props.tabTitle}</Text>
                <Image style={styles.img} source={require('../images/app/yt4.png')} />
            </ScrollView>
        )
    }
}

export default class ScrollTabView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            title: "카테고리",
            initTab: this.props.initTab | 0,
        };
        console.log("ScrollTabView:", props, this.state);
    }

    render() {
        return(
                <ScrollableTabView
                    renderTabBar={() => <FacebookTabBar />}
                >
                    <ScrollView tabLabel="ios-paper" style={styles.tabView}>
                        <View style={styles.card}>
                            <Text>News</Text>
                        </View>
                    </ScrollView>
                    <ScrollView tabLabel="ios-people" style={styles.tabView}>
                        <View style={styles.card}>
                            <Text>Friends</Text>
                        </View>
                    </ScrollView>
                    <ScrollView tabLabel="ios-chatboxes" style={styles.tabView}>
                        <View style={styles.card}>
                            <Text>Messenger</Text>
                        </View>
                    </ScrollView>
                    <ScrollView tabLabel="ios-notifications" style={styles.tabView}>
                        <View style={styles.card}>
                            <Text>Notifications</Text>
                        </View>
                    </ScrollView>
                    <ScrollView tabLabel="ios-list" style={styles.tabView}>
                        <View style={styles.card}>
                            <Text>Other nav</Text>
                        </View>
                    </ScrollView>
                    {/*<HomePage tabLabel="ios-home" tabTitle={"content_1"} />*/}
                    {/*<PopularPage tabLabel="ios-bonfire" tabTitle={"content_1"} />*/}
                    {/*<SubscribePage tabLabel="ios-albums-outline" tabTitle={"content_1"} />*/}
                    {/*<MinePage tabLabel="ios-person" tabTitle={"content_1"} />*/}
                </ScrollableTabView>
            // </View>
        )
    }
}

//ion-android-more-vertical
const styles = StyleSheet.create({
    navBg:{
        backgroundColor: 'black' , //"#c11f1e",
        width:Util.size.width,
        height:20,
    },
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
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10,
    },
    icon: {
        position: 'absolute',
        top: 0,
        left: 35,
    },
    img: {
        width:375,
        height: 550,
        backgroundColor: '#7ff93d',
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
    tabView: {
        flex: 1,
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.01)',
    },
    card: {
        borderWidth: 1,
        backgroundColor: '#f2f64c',
        borderColor: 'rgba(0,0,0,0.1)',
        margin: 5,
        height: 300,
        padding: 15,
        shadowColor: '#ccc',
        shadowOffset: { width: 2, height: 2, },
        shadowOpacity: 0.5,
        shadowRadius: 3,
    },
});

