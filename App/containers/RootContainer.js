import React, { Component } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { Router, Scene, Actions, Modal,NavBar,TabBar, ActionConst } from 'react-native-router-flux';
import { connect } from 'react-redux';

import PageError from './common/PageError';
import StatusModal from '../components/StatusModal';
import pageTestHome from './PageTestHome';
import PageTwo from './PageTwo';
import PageThree from './PageThree';
import PageWebView from './common/PageWebView';
import PageEditor from './editor/PageEditor';
import PageProductMain from './product/PageProductMain';
import PageProductList from './product/PageProductList';
import PageProductDetail from './product/PageProductDetail';
import PageImagePicker from './picker/PageImagePicker';
import PageCameraRollPicker from './picker/PageCameraRollPicker';
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
                     component={pageTestHome}
                     title='HOME'
                     onRight={()=>(Actions.pageProductMain({type: ActionConst.REPLACE}))}
                     rightTitle='상품'
                     initial={true}
              />
              <Scene key="pageTwo" component={PageTwo} title="Page Two" />
              <Scene key="pageThree" component={PageThree} title="웹뷰(DDPStyle)"
                     onRight={()=>(Actions.pageTestHome({type: ActionConst.REPLACE}))}
                     rightTitle='HOME'
              />
              <Scene key="pageWebView" component={PageWebView} title="웹뷰"
                     onRight={()=>(Actions.pageTestHome({type: ActionConst.REPLACE}))}
                     rightTitle='HOME'
              />
              <Scene key="pageCameraRollPicker" component={PageCameraRollPicker} title="사진 업로드(Test)"
                     onRight={()=>(Actions.pageTestHome({type: ActionConst.REPLACE}))}
                     rightTitle='HOME'
              />
              <Scene key="pageCameraRollPickerUpload" component={PageCameraRollPickerUpload} title="사진 업로드(Real)"
                     onRight={()=>(Actions.pageTestHome({type: ActionConst.REPLACE}))}
                     rightTitle='HOME'
              />
              <Scene key="pageImagePicker" component={PageImagePicker} title="Image Picker"
                     onRight={()=>(Actions.pageTestHome({type: ActionConst.REPLACE}))}
                     rightTitle='HOME' />
              <Scene key="pageProductMain" component={PageProductMain} title="상점홈"
                     onRight={()=>(Actions.pageTestHome({type: ActionConst.REPLACE}))}
                     rightTitle='Home' />
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
              <Scene key="statusModal" component={StatusModal} />
              <Scene key="pageError" component={PageError}/>
            </Scene>
        </Scene>
      </Scene>
    );
    return (
            <Router hideNavBar={false}  scenes={scenes} />
    );
  }
}
//
// function select(store) {
//   console.log("select:",store);
//   return {
//     isLoggedIn: store.user.isLoggedIn || false,
//   };
// }
// export default connect(select)(App);
export default connect()(RootContainer);
