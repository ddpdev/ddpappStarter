/**
 * Created by leesy on 2016-10-18.
 */
'use strict';

import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from 'react-native';;
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-simple-toast';

import HeaderNavBar from '../HeaderNavBar';
import PageTopTab1 from './PageTabView';
import PageTopTab2 from './PageTabView';
import PageTopTab3 from './PageTabView';
import PageTopTab4 from './PageTabView';
import PageTopTab5 from './PageTabView';
import PageTopTab6 from './PageTabView';
import PageTopTab7 from './PageTabView';
import PageTopTab8 from './PageTabView';
import PageTopTab9 from './PageTabView';

import PageBottomTab1 from './PageTabView';
import PageBottomTab2 from './PageTabView';
import PageBottomTab3 from './PageTabView';
import PageBottomTab4 from './PageTabView';

//const height = Dimensions.get('window').height;

export default class MainTabView extends Component {
    constructor(props){
        super(props);
        this.state = {
            headerTitle : this.props.title | '카테고리',
            topTabBarVisible : true,
            bottomTabBarVisible : true,
            topTabBarHiddenStyles : {},
            bottomTabBarHiddenStyles : {},
        };
        this._prevY = 0;
        console.log("MainTabView:",props, this.state);

        this._headerTitleChange = this._headerTitleChange.bind(this);
        this.handleEndReached = this.handleEndReached.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
    }

    _headerTitleChange(obj) {
        const {i} = obj;
        this.setState({headerTitle:`메뉴${i+1}`});
        console.log("_headerTitleChange:"+i+","+this.state.headerTitle);
        //Toast.show('This is a long toast.',Toast.LONG);
        Toast.show('headerTitleChange.'+this.state.headerTitle,Toast.SHORT,Toast.CENTER);
        this.setState({topTabBarVisible : true,bottomTabBarVisible : true});
    }



    handleScroll(event) {
        console.log("handleScroll:"+ event.nativeEvent.contentOffset.y+",_prevY:"+this._prevY);

        let posY = event.nativeEvent.contentOffset.y;
        if (posY < this._prevY && posY <= 0) {
            Toast.show('스크롤 다운' + posY, Toast.SHORT, Toast.CENTER);
            console.log('스크롤 다운' + posY);
            //this.setState({topTabBarVisible : true,bottomTabBarVisible : false});
            this.setState({topTabBarVisible : true,topTabBarHiddenStyle : {}});
            this.setState(bottomTabBarVisible : false,bottomTabBarVisible : {marginTop: 0, top: Dimensions.get('window').height+120,});
        } else {
            Toast.show('스크롤 업' + posY, Toast.SHORT, Toast.CENTER);
            console.log('스크롤 업' + posY);
            this.setState({topTabBarVisible : false,topTabBarHiddenStyle : {marginTop: 0, top:-120,}});
            this.setState({bottomTabBarVisible : true,topTabBarHiddenStyle : {}});
        }
        this._prevY = posY;
    }

    handleEndReached() {
        console.log("handleEndReached");

    }
//{(scrollView) => { this._scrollView = scrollView; } }
    render() {
        return (
          <View style={{flex:1}}>
              <View style={{flex:1,borderWidth:1,borderColor:'red',backgroundColor:'#fcf9ac'}} >
                  <HeaderNavBar title={this.state.headerTitle} />
                  { this.state.topTabBarVisible &&
                      <ScrollableTabView
                        style={[styles.container,this.state.topTabBarHiddenStyles]}
                        initialPage={0}
                        renderTabBar={() => <ScrollableTabBar backgroundColor='rgba(255, 255, 255, 0.7)'/>}
                        tabBarPosition="top"
                        onChangeTab={(obj) => this._headerTitleChange(obj)}
                      >
                          <ScrollView tabLabel='iOS'
                                      onScroll={this.handleScroll}
                                      scrollEventThrottle={16}
                                      ref="iosScrollView"
                          >
                              <Ionicon name='logo-apple' color='black' size={300} style={styles.icon}/>
                              <Ionicon name='ios-phone-portrait' color='black' size={300} style={styles.icon}/>
                              <Ionicon name='logo-apple' color='#DBDDDE' size={300} style={styles.icon}/>
                              <Ionicon name='ios-phone-portrait' color='#DBDDDE' size={300} style={styles.icon}/>
                              <TouchableOpacity
                                style={styles.button}
                                onPress={() => {
                                    this._prevY = 0;
                                    this.refs.iosScrollView.scrollTo({y: 0});
                                }}>
                                  <Text>Scroll to top</Text>
                              </TouchableOpacity>
                          </ScrollView>
                          <ScrollView tabLabel='Android'>
                              <Ionicon name='ios-paper' color='#A4C639' size={300} style={styles.icon}/>
                              <Ionicon name='logo-android' color='black' size={300} style={styles.icon}/>
                              <Ionicon name='logo-android' color='brown' size={300} style={styles.icon}/>
                          </ScrollView>
                          <PageTopTab1 tabLabel="menu1" title='Top1' titleIndex={1}/>
                          <PageTopTab2 tabLabel="menu2" title='Top2' titleIndex={2}/>
                          <PageTopTab3 tabLabel="menu3" title='Top3' titleIndex={3}/>
                          <PageTopTab4 tabLabel="menu4" title='Top4' titleIndex={4}/>
                          <PageTopTab5 tabLabel="menu5" title='Top5' titleIndex={5}/>
                          <Text tabLabel="text1">메뉴1</Text>
                          <Text tabLabel="text2">메뉴2</Text>
                          <Image tabLabel="image1" source={require('../../images/sample/1_340.jpg')}>
                              <Text>메뉴3</Text>
                          </Image>
                          <Text tabLabel="text4">메뉴4</Text>
                      </ScrollableTabView>
                  }
                  <View style={{height:40,borderWidth:1,borderColor:'green',backgroundColor:'#ffffff'}}>
                      { this.state.bottomTabBarVisible &&
                          <ScrollableTabView
                              style={{flex:1, ...this.state.bottomTabBarHiddenStyles}}
                              initialPage={0}
                              renderTabBar={() => <ScrollableTabBar />}
                              tabBarPosition='overlayBottom'
                          >
                              <Ionicon tabLabel="paper" name="ios-paper" size={30} color='#f394c7' />
                              <Ionicon tabLabel="people" name="ios-people" size={30} color='#239457' />
                              <PageBottomTab1 tabLabel="메뉴1" title='Bottom1' titleIndex={1} />
                              <PageBottomTab2 tabLabel="메뉴2" title='Bottom2' titleIndex={2} />
                              <PageBottomTab3 tabLabel="메뉴3" title='Bottom3' titleIndex={3} />

                          </ScrollableTabView>
                      }
                   </View>
              </View>
          </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 1,
    },
    icon: {
        width: 300,
        height: 300,
        alignSelf: 'center',
    },
    button: {
        margin: 7,
        padding: 5,
        alignItems: 'center',
        backgroundColor: '#eaeaea',
        borderRadius: 3,
    },
});