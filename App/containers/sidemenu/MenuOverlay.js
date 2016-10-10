'use strict';
import React, {Component} from "react";
import AppEventEmitter from "./../../util/AppEventEmitter";
import {Router} from "react-native-router-flux";
import Drawer from "react-native-drawer";
import SideMenu from "./MenuWide";
import styles from "./MenuStyle";

export default class MenuOverlay extends Component {
    componentDidMount() {
        AppEventEmitter.addListener('hamburger.click', this.openSideMenu.bind(this));
    }

    closeSideMenu() {
        if (typeof this.refs.drawer != 'undefined') {
          this.refs.drawer.close();
        }
    }

    render() {
        const drawerStyles = {
            drawer: { backgroundColor: 'rgba(0, 0, 0, 0.2)'},
            main: {paddingLeft: 3},
        }
        return (
            <Drawer
                ref="drawer"
                type="overlay"
                tapToClose={true}
                panCloseMask={0.2}
                openDrawerOffset={0.2}
                styles={drawerStyles}
                content={<SideMenu
                    textColor={{color: '#fff'}}
                    rowStyle={{borderTopWidth: 0}}
                    menuBody={styles.menuOverlay} />}>

                <Router hideNavBar={true} scenes={this.props.scenes}/>
            </Drawer>
        );
    }

}
