/**
 * Created by leesy on 2016-10-05.
 */

import React, { Component, PropTypes } from 'react';
//import { PropTypes } from 'react-native';
import Drawer from 'react-native-drawer';
import SideMenuContents from './SideMenuContents';
import {Actions, DefaultRenderer} from 'react-native-router-flux';

const propTypes = {
    navigationState: PropTypes.object,
};

class MenuDrawer extends Component {
    render(){
        const state = this.props.navigationState;
        const children = state.children;
        return (
            <Drawer
                ref="navigation"
                open={state.open}
                onOpen={()=>Actions.refresh({key:state.key, open: true})}
                onClose={()=>Actions.refresh({key:state.key, open: false})}
                type="displace"
                content={<SideMenuContents />}
                tapToClose={true}
                openDrawerOffset={0.2}
                panCloseMask={0.2}
                negotiatePan={true}
                tweenHandler={(ratio) => ({
                    main: { opacity:Math.max(0.54,1-ratio) }
                })}>
                <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
            </Drawer>
        );
    }
}

MenuDrawer.propTypes = propTypes;

export default MenuDrawer;