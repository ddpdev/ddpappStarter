/**
 * Created by leesy on 2016-10-18.
 */
'use strict';

import React, { Component } from 'react';
import {
    Text,
    View,

} from 'react-native';

export default class PageTabView extends Component {
    constructor(props){
        super(props);
        this.state = {
            title : this.props.title,
            titleIndex : this.props.titleIndex,
        }
        console.log("PageTabView:", props, this.state);
    }

    render() {
        return (
            <View>
                <Text>{this.props.title} {this.props.titleIndex}</Text>
            </View>
        );
    }

}
