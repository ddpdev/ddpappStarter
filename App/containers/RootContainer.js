import React, { Component } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { Router, Scene, Actions, Modal,NavBar,TabBar, ActionConst } from 'react-native-router-flux';
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

import Icon from "react-native-vector-icons/EvilIcons";
//import * as actions from '../../actions'

// class Right extends React.Component {
//   constructor(props) {
//     super(props);
//     console.log("Right:",props);
//   }
//   render(){
//     return <Text style={{
//       width: 80,
//       height: 37,
//       position: "absolute",
//       bottom: 4,
//       right: 2,
//       padding: 8,
//     }} onClick={()=>Actions.pageProduct}>{this.props.rightTitle}</Text>
//   }
// }

class RootContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn : false,
    }
    console.log("App:",props,this.state);
  }
  // componentDidMount() {
  //   //const { state} = this.props;
  //
  //   console.log("DidMount:",state,actions);
  //
  //   if(this.state.isLoggedIn) {
  //     console.log("isLoggedIn",this.state.isLoggedIn);
  //     userActions.userlogin();
  //   }
  // }

  render() {
    //const { state, actions } = this.props;
    //const { userActions } = actions;

    console.log("render:", this.props, this.state); // everything ok here
    const scenes = Actions.create(
      <Scene key="scene">
        <Scene key="modal" component={Modal} >
          <Scene key="root" hideNavBar={false}>
              <Scene key="pageTestHome"
                     component={PageTestHome}
                     title='HOME'
                     onRight={()=>(Actions.pageProductMain({type: ActionConst.REPLACE}))}
                     rightTitle='상품'
                     initial={true}
              />
              <Scene key="pageActionButton" component={PageActionButton} title="Action Button" />
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

              <Scene key="pageGeoPosition" component={PageGeoPosition} title="Geo Position"
                     onRight={()=>(Actions.pageTestHome({type: ActionConst.REPLACE}))}
                     rightTitle='HOME'
              />
              <Scene key="pageReactMaps" component={PageReactMaps} title="React Map "
                     onRight={()=>(Actions.pageTestHome({type: ActionConst.REPLACE}))}
                     rightTitle='HOME'
              />
              <Scene key="pageMaps" component={PageMaps} title="Map 테스트"
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
            <Scene key="menuDrawer" component={MenuDrawer} open={false} >
                <Scene key="mainTab"
                       type={ActionConst.REPLACE}
                        tabs
                        tabBarStyle={styles.tabBarStyle}
                        tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle}
                >
                    <Scene
                        key="tab1"
                        title="Tab #1"
                        icon={TabIcon}
                        navigationBarStyle={{ backgroundColor: 'red' }}
                        titleStyle={{ color: 'white' }}
                    >
                        <Scene
                            key="tab1_1"
                            component={TabView}
                            title="Tab #1_1"
                            onRight={() => alert('Right button')}
                            rightTitle="Right"
                        />
                        <Scene
                            key="tab1_2"
                            component={TabView}
                            title="Tab #1_2"
                            titleStyle={{ color: 'black' }}
                        />
                    </Scene>
                    <Scene key="tab2" initial title="Tab #2" icon={TabIcon}>
                        <Scene
                            key="tab2_1"
                            component={TabView}
                            title="Tab #2_1"
                            renderRightButton={() => <Text>Right</Text>}
                        />
                        <Scene
                            key="tab2_2"
                            component={TabView}
                            title="Tab #2_2"
                            hideBackImage
                            onBack={() => alert('Left button!')}
                            backTitle="Left"
                            duration={1}
                            panHandlers={null}
                        />
                    </Scene>
                    <Scene key="tab3" component={TabView} title="Tab #3" hideTabBar icon={TabIcon} />
                    <Scene key="tab4" component={TabView} title="Tab #4" hideNavBar icon={TabIcon} />
                    <Scene key="tab5" component={TabView} title="Tab #5" hideTabBar icon={TabIcon} />
                </Scene>
            </Scene>
            <Scene key="statusModal" component={StatusModal} />
              <Scene key="pageError" component={PageError}/>
            </Scene>
        </Scene>
    );
    return (
            <Router hideNavBar={false}  scenes={scenes} />
    );
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
