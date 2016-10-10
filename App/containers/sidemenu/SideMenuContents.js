'use strict';

import React, {Component} from "react";
import {Text, View, TouchableOpacity, Image, ScrollView} from "react-native";
import styles from "./MenuStyle";
import {Actions} from "react-native-router-flux";

export default class SideMenuContents extends Component {
  render() {
    return (
      <ScrollView>
        <View style={[styles.sideMenu, this.props.menuBody]}>
          <View style={styles.profile}>
            <Image style={styles.avatar}
                   source={{uri: 'https://freeiconshop.com/files/edd/person-flat.png' }}/>
            <Text style={[styles.fullname, this.props.textColor]}>Best User</Text>
            <Text style={[styles.email, this.props.textColor]}>ddpdev@ddpstyle.com</Text>
          </View>

          <TouchableOpacity
            style={[styles.menuRow, this.props.rowStyle]}
            underlayColor="#2D2D30"
            onPress={Actions.pageCameraRollPickerUploader}>
            <Text style={[styles.menuLink, this.props.textColor]}>Uploader</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuRow, this.props.rowStyle]}
            underlayColor="#2D2D30"
            onPress={Actions.pageReactMaps}>
            <Text style={[styles.menuLink, this.props.textColor]}>Map</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuRow, this.props.rowStyle]}
            underlayColor="#2D2D30"
            onPress={Actions.pageProductMain}>
            <Text style={[styles.menuLink, this.props.textColor]}>Product List</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuRow, this.props.rowStyle]}
            underlayColor="#2D2D30"
            onPress={Actions.pageThree}>
            <Text style={[styles.menuLink, this.props.textColor]}>WebView</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuRow, styles.menuSignOut, this.props.rowStyle]}
            underlayColor="#2D2D30"
            onPress={Actions.pageActionButton}>
            <Text style={[styles.menuLink, styles.logoutLink, this.props.textColor]}>Action Button</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

}
