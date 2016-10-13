/**
 * Created by ms.kim2 on 2016-10-11.
 */

import React, { PropTypes } from 'react';
import Drawer from 'react-native-drawer';
import { DefaultRenderer, Actions } from 'react-native-router-flux';
import SideMenuContents from './SideMenuContents';
import styles from "./MenuStyle";
//import TabView from './TabView';

const propTypes = {
  navigationState: PropTypes.object,
};

class NavigationDrawer extends React.Component {

  constructor(props) {
    super(props);
    console.log('NavigationDrawer:', props, props.children);
  }

  // closeDrawerMenu() {
  //   if (typeof this.refs.navigation != 'undefined') {
  //     console.log("closeDrawerMenu");
  //     this.refs.navigation.close();
  //   }
  // }
  //
  // openDrawerMenu() {
  //   console.log("openDrawerMenu");
  //   this.refs.navigation.open();
  // }


  render() {
    const state = this.props.navigationState;
    const children = state.children;

    console.log("children:", children, state);
    console.log("state.open:",state.open, state.key);

    // if(!state.open) {
    //   closeDrawerMenu();
    // }

    return (
      <Drawer
        ref="navigation"
        open={state.open}
        onOpen={() => Actions.refresh({ key: state.key, open: true })}
        onClose={() => Actions.refresh({ key: state.key, open: false })}
        type="displace"
        content={<SideMenuContents
                  textColor={{color: '#fff', backgroundColor: 'transparent'}}
                  rowStyle={styles.menuRowWide}
                  iconStyle={styles.iconWide}
                  menuBody={styles.menuColorWide}
                  {...this.props}
                 />}
        tapToClose={true}
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        negotiatePan={true}
        tweenHandler={(ratio) => ({
          main: { opacity: Math.max(0.54, 1 - ratio) },
        })}
      >
        <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
      </Drawer>
    );
  }
}

NavigationDrawer.propTypes = propTypes;

export default NavigationDrawer;
