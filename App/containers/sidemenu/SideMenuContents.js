'use strict';

import React, {Component} from "react";
import {Text, View, TouchableOpacity, Image, ScrollView} from "react-native";
import styles from "./MenuStyle";
import {Actions} from "react-native-router-flux";

export default class SideMenuContents extends Component {
  constructor(props) {
    super(props);
    console.log("SideMenuContents:", props);
  }

  render() {
    return (
      <ScrollView>
        <View style={[styles.sideMenu, this.props.menuBody]}>
          <View style={styles.profile}>
            <Image style={styles.avatar}
                   source={{uri: 'https://freeiconshop.com/files/edd/person-flat.png' }}/>
            <Text style={[styles.fullname, this.props.textColor]}>일반사용자</Text>
            <Text style={[styles.email, this.props.textColor]}>ddpdev@ddpstyle.com</Text>
          </View>

          <TouchableOpacity
            style={[styles.menuRow, this.props.rowStyle]}
            underlayColor="#2D2D30"
            onPress={() => {
                              Actions.refresh({key: this.props.navigationState.key, open: false });
                              setTimeout(() => Actions.pageCameraRollPickerUploader(), 0);
                            }
            } >
            <Text style={[styles.menuLink, this.props.textColor]}>Uploader</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuRow, this.props.rowStyle]}
            underlayColor="#2D2D30"
            onPress={() => {
                              //Actions.pageReactMaps();
                              Actions.refresh({key: 'navigationDrawer', open: false });
                              setTimeout(() => Actions.pageReactMaps(), 0);
                           }
            }>
            <Text style={[styles.menuLink, this.props.textColor]}>Map</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuRow, this.props.rowStyle]}
            underlayColor="#2D2D30"
            onPress={() => {
                              //Actions.refresh({key: 'navigationDrawer', open: false });
                              Actions.pageProductMain();
                              setTimeout(() => Actions.refresh({key: 'navigationDrawer', open: false }), 0);

                          }
            }>
            <Text style={[styles.menuLink, this.props.textColor]}>Product List</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuRow, this.props.rowStyle]}
            underlayColor="#2D2D30"
            onPress={() => {
                              Actions.refresh({key: 'navigationDrawer', open: false });
                              setTimeout(() => Actions.pagePhotoLazySwiper(), 0);
                            }
            }>
            <Text style={[styles.menuLink, this.props.textColor]}>Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuRow, styles.menuSignOut, this.props.rowStyle]}
            underlayColor="#2D2D30"
            onPress={() => {
                              Actions.pageActionButton();
                              setTimeout(() =>  Actions.refresh({key: 'navigationDrawer', open: false }), 0);
                              //Actions.refresh({key: 'navigationDrawer', open: false });
                           }
            }>
            <Text style={[styles.menuLink, styles.logoutLink, this.props.textColor]}>Action Button</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

}
