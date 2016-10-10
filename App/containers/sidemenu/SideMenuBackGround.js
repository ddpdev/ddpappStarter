'use strict';

import React, {Component} from "react";
import {Text, View, TouchableOpacity, Image, ScrollView} from "react-native";
import styles from "./MenuStyle";
import {Actions} from "react-native-router-flux";
import Icon from "react-native-vector-icons/Ionicons";


export default class SideMenuIcons extends Component {
    render() {
        return (
            <ScrollView>
                <View style={[styles.sideMenuLeft, this.props.menuBody]}>
                    <Image source={require('../../images/app/menubackground.png')}
                           style={styles.menuBg}>
                    </Image>

                    <View style={styles.profileCenter}>
                        <Image style={styles.avatarLeft}
                               source={{uri: 'https://cdn1.iconfinder.com/data/icons/user-pictures/101/malecostume-512.png' }}/>
                        <Text style={[styles.fullname, this.props.textColor]}>Minh Pham</Text>
                        <Text style={[styles.email, this.props.textColor]}>minh@beostore.io</Text>
                        <Text style={[styles.address, this.props.textColor]}>London <Icon name={'ios-pin-outline'}
                                                                                       style={[styles.iconSmall]}/></Text>
                    </View>

                    <TouchableOpacity
                        style={[styles.menuRowLeft, this.props.rowStyle]}
                        underlayColor="#2D2D30"
                        onPress={Actions.pageTestHome}>
                        <Icon name={'ios-home-outline'} style={[styles.icon, this.props.iconStyle]}/>
                        <Text style={[styles.menuLinkLeft, this.props.textColor]}>Home</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.menuRowLeft, this.props.rowStyle]}
                        underlayColor="#2D2D30"
                        onPress={Actions.pageReactMaps}>
                        <Icon name={'ios-cart-outline'} style={[styles.icon, this.props.iconStyle]}/>
                        <Text style={[styles.menuLinkLeft, this.props.textColor]}>Map</Text>

                        <View style={styles.badge}>
                            <Image source={require('../../images/app/circle.png')}
                                   style={styles.badgeIcon}><Text style={styles.badgeText}>8</Text></Image>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.menuRowLeft, this.props.rowStyle]}
                      underlayColor="#2D2D30"
                      onPress={Actions.pageCameraRollPickerUploader}>
                        <Icon name={'ios-paper-outline'} style={[styles.icon, this.props.iconStyle]}/>
                        <Text style={[styles.menuLinkLeft, this.props.textColor]}>Uploader</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.menuRowLeft, this.props.rowStyle]}
                        underlayColor="#2D2D30"
                        onPress={Actions.pageProductMain}>
                        <Icon name={'ios-paper-outline'} style={[styles.icon, this.props.iconStyle]}/>
                        <Text style={[styles.menuLinkLeft, this.props.textColor]}>Product List</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.menuRowLeft, this.props.rowStyle]}
                        underlayColor="#2D2D30"
                        onPress={Actions.pageThree}>
                        <Icon name={'ios-settings-outline'} style={[styles.icon, this.props.iconStyle]}/>
                        <Text style={[styles.menuLinkLeft, this.props.textColor]}>WebView</Text>
                    </TouchableOpacity>


                    <TouchableOpacity
                        style={[styles.menuRowLeft, styles.menuSignOut, this.props.rowStyle]}
                        underlayColor="#2D2D30"
                        onPress={Actions.pageActionButton}>
                        <Icon name={'ios-log-out-outline'} style={[styles.icon, this.props.iconStyle]}/>
                        <Text style={[styles.menuLinkLeft, styles.logoutLinkLeft, this.props.textColor]}>Action</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }

}
