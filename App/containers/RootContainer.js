import React, { Component } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { Router, Scene, Actions, Reducer, Modal, ActionConst } from 'react-native-router-flux';
import { connect } from 'react-redux';

import StatusModal from '../components/StatusModal';
import MenuDrawer from './sidemenu/MenuDrawer';
import TabView from '../components/TabView';
import TabIcon from '../components/TabIcon';

import PageError from './common/PageError';
import PageTestHome from './PageTestHome';
import PageActionButton from './PageActionButton';
import PageThree from './PageThree';
import PageWebView from './common/PageWebView';
import PageEditor from './editor/PageEditor';
import PageProductMain from './product/PageProductMain';
import PageProductList from './product/PageProductList';
import PageProductDetail from './product/PageProductDetail';
import PageImagePicker from './picker/PageImagePicker';
import PageImageUploader from './picker/PageImageUploader';

import PageCameraRollPickerUploader from './picker/PageCameraRollPickerUploader';
import PageCameraRollPickerUpload from './picker/PageCameraRollPickerUpload';

import PageMaps from './geo/PageMaps';
import PageGeoPosition from './geo/PageGeoPosition';
import PageReactMaps from './geo/PageReactMaps';

import MenuSide from './sidemenu/MenuWide';
import NavigationDrawer from './sidemenu/NavigationDrawer';
//components
import PageTwitterEditor from '../components/TwitterEditor';
import PageThumblrMenu from '../components/ThumblrMenu';
import PageScrollTabView from '../components/ScrollTabView';



const reducerCreate = params => {
  const defaultReducer = new Reducer(params);
  return (state, action) => {
    console.log('ACTION:', action);
    return defaultReducer(state, action);
  };
};

// define this based on the styles/dimensions you use
const getSceneStyle = (/* NavigationSceneRendererProps */ props, computedProps) => {
  const style = {
    flex: 1,
    backgroundColor: '#fff',
    shadowColor: null,
    shadowOffset: null,
    shadowOpacity: null,
    shadowRadius: null,
  };
  if (computedProps.isActive) {
    style.marginTop = computedProps.hideNavBar ? 0 : 64;
    style.marginBottom = computedProps.hideTabBar ? 0 : 50;
  }
  return style;
};

class RootContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn : false,
    };
    console.log("RootContainer App:", props, this.state);
  };

  render() {
    console.log("render:", this.props, this.state); // everything ok here

    const scenes = Actions.create(
      <Scene key="scene">
        <Scene key="modal" component={Modal} >
          <Scene key="root" hideNavBar={false} hideTabBar>
              <Scene key="pageTestHome"
                     component={PageTestHome}
                     title='HOME'
                     onRight={()=>(Actions.pageProductMain({type: ActionConst.REPLACE}))}
                     rightTitle='상품'
                     initial={true}
              />

              <Scene key="tabbar" component={NavigationDrawer}>
                <Scene key="pageMenuSide" component={MenuSide} title="Action Button" />
              </Scene>

              <Scene key="pageActionButton" component={PageActionButton} title="Action Button" />
              <Scene key="pageTwitterEditor" component={PageTwitterEditor} title="Action Button" />
              <Scene key="pageThumblrMenu" component={PageThumblrMenu} title="Action Button" />
              <Scene key="pageScrollTabView" component={PageScrollTabView} title="Action Button" />

              <Scene key="pageThree" component={PageThree} title="웹뷰(DDPStyle)"
                     onRight={()=>(Actions.pageTestHome({type: ActionConst.REPLACE}))}
                     rightTitle='HOME'
              />
              <Scene key="pageWebView" component={PageWebView} title="웹뷰"
                     onRight={()=>(Actions.pageTestHome({type: ActionConst.REPLACE}))}
                     rightTitle='HOME'
              />
              <Scene key="pageCameraRollPickerUploader" component={PageCameraRollPickerUploader} title="사진 업로드(Uploader)"
                     onRight={()=>(Actions.pageTestHome({type: ActionConst.REPLACE}))}
                     rightTitle='HOME'
              />
              <Scene key="pageCameraRollPickerUpload" component={PageCameraRollPickerUpload} title="사진 업로드(Fetch_Blob)"
                     onRight={()=>(Actions.pageTestHome({type: ActionConst.REPLACE}))}
                     rightTitle='HOME'
              />
              <Scene key="pageImagePicker" component={PageImagePicker} title="Image Picker"
                     onRight={()=>(Actions.pageTestHome({type: ActionConst.REPLACE}))}
                     rightTitle='HOME' />
              <Scene key="pageProductMain"
                     tabs={true}
                     component={PageProductMain}
                     title="상점홈"
                     onRight={()=>(Actions.pageTestHome({type: ActionConst.REPLACE}))}
                     rightTitle='Home' />
              </Scene>
              <Scene key="pageProductList" component={PageProductList} title="상품리스트"
                  onRight={()=>(Actions.pageTestHome({type: ActionConst.REPLACE}))}
                  rightTitle='상품설명'
                />
                <Scene  key="pageProductDetail" component={PageProductDetail} title="상품상세정보"
                       onRight={()=>(Actions.pageTestHome({type: ActionConst.REPLACE}))}
                       rightTitle='리스트'
                />

              <Scene key="pageGeoPosition" component={PageGeoPosition}
                     title="Geo Position"
                     provider={'google'}
                     onRight={()=>(Actions.pageTestHome({type: ActionConst.REPLACE}))}
                     rightTitle='HOME'
              />
              <Scene key="pageReactMaps" component={PageReactMaps}
                     provider={'google'}
                     title="React Map "
                     onRight={()=>(Actions.pageTestHome({type: ActionConst.REPLACE}))}
                     rightTitle='HOME'
              />
              <Scene key="pageMaps" component={PageMaps}
                     provider={'google'}
                     title="Map 테스트"
                     onRight={()=>(Actions.pageTestHome({type: ActionConst.REPLACE}))}
                     rightTitle='HOME'
              />
              <Scene key="pageEditor" component={PageEditor} title="에디터"
                    onRight={()=>(Actions.pageTestHome({type: ActionConst.REPLACE}))}
                    rightTitle='HOME'
                />
            <Scene key="pageImageUploader" component={PageImageUploader} title="Image Uploader"
                   onRight={()=>(Actions.pageTestHome({type: ActionConst.REPLACE}))}
                   rightTitle='HOME'
            />
            <Scene key="statusModal" component={StatusModal} />
            <Scene key="pageError" component={PageError} />
            </Scene>
        </Scene>
    );

    return (<Router hideNavBar={false}  drawerImage={require('../images/icon/icon-nav.png')} createReducer={reducerCreate} getSceneStyle={getSceneStyle} scenes={scenes} />);
    //return (<MenuSide ref="menuDefault" scenes={scenes}/>);
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabBarStyle: {
        backgroundColor: '#eee',
    },
    tabBarSelectedItemStyle: {
        backgroundColor: '#ddd',
    },
});

export default connect()(RootContainer);
