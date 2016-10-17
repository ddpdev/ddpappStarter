
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
import HeaderNavBar from './HeaderNavBar';
import ScrollTabView from './ScrollTabView';

export default class Header extends Component{
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title | '카테고리',
            // initTab: this.props.initTab | 1,
        };
        console.log("Header:", props, this.state);
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
                <HeaderNavBar title={this.props.title}/>
                <ScrollTabView />
            </View>
        )
    }
}

