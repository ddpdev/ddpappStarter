/**
 * Created by leesy on 2016-09-08.
 */
"use strict";

import React, {Component} from 'react';
import {
    NetInfo,
    Image,
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableHighlight,
    ActivityIndicator,
} from 'react-native';
import { Router, Scene, Actions, ActionConst } from 'react-native-router-flux';
import { connect } from 'react-redux';
import ProgressImage from 'react-native-image-progress';
import * as Progress from 'react-native-progress'; // INDICATORS => Progress.Bar, Progress.Circle, Progress.Pie
import Util from '../../util/utils';
import Spinner from "react-native-spinkit";
import Toast from 'react-native-simple-toast';

//https://ddpimage01.s3.ap-northeast-2.amazonaws.com/thumb/BJYGFdiU_thm.png
const MOCKED_IMAGE_DATA = [
      {"itemlist":[
          {"item_id":33,"item_type":"img","last_date":"2016-07-09T11:58:18.000Z","item_value":"{\"bucket\":\"ddpimage01\",\"uploadfilename\":\"Screenshot_20160709-205537.png\",\"filesize\":102275,\"imagefilename\":\"ByQ1wwRI_img.png\",\"imagekey\":\"image/ByQ1wwRI_img.png\",\"thumbfilename\":\"ByQ1wwRI_thm.png\",\"thumbkey\":\"thumb/ByQ1wwRI_thm.png\"}","item_status":"Y"}
          ]
      }
    ];

//var REQUEST_URL = 'http://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';
const API_SERVER = 'http://app.ddpstyle.com';
const API_LASTEST = API_SERVER + '/json/get/itemlist?page={page}';

class Product extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1,row2) => row1 !== row2,
            }),
            loaded:false,
            currentPage:0,
            reloading:false,
            loadingNextPage:false,

        };
        // 전역변수 선언 state에 변수로 선언해서 진행해도 됨.
        this.itemList = [];
        this._prevY = 0;

        this.renderItem = this.renderItem.bind(this);
        this.handleEndReached = this.handleEndReached.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.renderFooter = this.renderFooter.bind(this);
        this.renderHeader = this.renderHeader.bind(this);
        this.getFormattedDate = this.getFormattedDate.bind(this);

        console.log("Product List:",this.props,this.state);
    }

    componentDidMount() {
      NetInfo.isConnected.fetch().then(isConnected => {
        console.log('First, is ' + (isConnected ? 'online' : 'offline'));

        if(isConnected) {
          Toast.show('Network is connected...loading ',Toast.LONG,Toast.CENTER);
          this.loadPage(0);
        } else {
          Toast.show('Network is not connected',Toast.SHORT,Toast.CENTER);
        }

      })
      .catch(error => {
          console.error(error);
      });

    }

  getFormattedDate(createdTimestamp) {
    const created = Date.parse(createdTimestamp);
    const elapsed = (Date.now() - created)/1000; // seconds

    if (elapsed < 10) return '방금 전';
    if (elapsed < 60) return `${(elapsed%60)} 초 전`;
    if (elapsed < 3600) return `${Math.round(elapsed/60)} 분 전`;
    if (elapsed < 86400) return `${Math.round(elapsed/3600)} 시간 전`;
    if (elapsed < 525600) return `${Math.round(elapsed/86400)} 일 전`;

    const createdDate = new Date(created);
    const saveDate = createdDate.getFullYear()+'-'+ (createdDate.getMonth()+1)+'-'+ createdDate.getDate();

    console.log("getFormattedDate:",createdTimestamp,created,elapsed,createdDate,"saveDate: "+saveDate);

    return saveDate;
  }

    // async 적용 since 9/21
    async loadPage(page?:number) {

      const url = (page ===undefined)? API_LASTEST.replace('{page}',0) : API_LASTEST.replace('{page}',page);

      console.log("loadPage url:"+url);
      //var tmpArray = this.itemList;
      //var newArray = [];

      console.log("prev itemList count:"+this.itemList.length);

      try {
          Toast.show('Data Fetching....',Toast.SHORT,Toast.CENTER);
          console.log("await Start:"+Date.now());
          const response = await fetch(url);
          console.log("await fetch success:"+Date.now());
          const responseData = await response.json();
          console.log("await End:"+Date.now());

          this.itemList = this.itemList.concat(responseData.itemlist);

          this.setState({
              //dataSource: this.state.dataSource.cloneWithRows(responseData.itemlist),
              // 추가된 item 배열을 전달한다.
              dataSource: this.state.dataSource.cloneWithRows(this.itemList),
              loaded:true,
              currentPage:page,
              loadingNextPage:false,
          });

      } catch (e) {
        console.log("error:"+e);
      }
      console.log("item count:"+this.itemList.length);
  }

    renderHeader() {
      if (!this.state.reloading) return null;

      return (
        <View style={styles.loadingIndicator}>
          <ActivityIndicator size="small" />
        </View>
      );
    }

    renderFooter() {
      console.log("renderFooter:"+this.state);

        if (!this.state.loadingNextPage || this.state.reloading) return null;

        return (
          <View style={styles.loadingIndicator}>
              <ActivityIndicator size="small" />
          </View>
        );
    }


    render() {
        //var image = MOCKED_IMAGE_DATA[0];
        //console.log("MOCK_IMAGE:" + image.item.thumbnail);
        console.log("Render Start");
        if (!this.state.loaded) {
            return this.renderLoadingView();
        }
        //var item = this.state.items[0];
        return (
            <ListView
                style={styles.listView}
                removeClippedSubviews={true}
                initialListSize={15}
                scrollEventThrottle={15}
                enableEmptySections={true}
                dataSource={this.state.dataSource}
                renderRow={this.renderItem}
                onEndReached={this.handleEndReached}
                onScroll={this.handleScroll}
            />
        );
    }
//                onScroll={this.handleScroll}
//                renderFooter={this.renderFooter}

  handleScroll(event) {
      console.log("handleScroll:"+ event.nativeEvent.contentOffset.y+",_prevY:"+this._prevY);

      var posY = event.nativeEvent.contentOffset.y;
      if (posY < this._prevY && posY <= 0) {
        console.log("reload");
        Toast.show('최신데이터 조회중~',Toast.SHORT,Toast.CENTER);
        this.reloadItems();
      }
      this._prevY = posY;
    }

  reloadItems() {
    console.log("reloadItems:",this.state.reloading);

    if (this.state.reloading) return;

    Promise.all([
        this.itemList = [],
        this.loadPage(0),
        new Promise( resolve => this.setState({reloading: true}, resolve) ),
        new Promise( resolve => setTimeout(() => resolve(), 1500) )
      ]).then( () => this.setState({reloading: false}) );
    }

    handleEndReached() {
      console.log("handleEndReached:",this.state.loadingNextPage);

      if(this.state.loadingNextPage) {
        Toast.show('마지막 페이지입니다.'+this.state.currentPage,Toast.SHORT,Toast.CENTER);
        return ;
      }

      //alert("handleEndReached");

      //this.loadPage(this.state.currentPage+1);
      //this.state.currentPage+1
      Toast.show('다음 페이지 조회'+(this.state.currentPage+1),Toast.SHORT,Toast.CENTER);

      Promise.all([
                    this.loadPage(this.state.currentPage+1),
                    new Promise( resolve => this.setState({loadingNextPage:true}, resolve)),
                    new Promise( resolve => setTimeout(() => resolve(), 1000)),
                  ])
        .then (() => this.setState({loadingNextPage:false}) )
        .catch(reason => {
            console.log(reason);
        });
      ;

    }
// <View style={styles.container}>
//     <Text>Loading Items...</Text>
// </View>
    renderLoadingView() {
        return (
            <View style={styles.spinner}>
            <Spinner isVisible={!this.state.loaded}
                size={40}
                type="Circle"
                color="#1CAADE"/>
             </View>
        );
    }


    renderItem(image) {
        //console.log("image.item_value:"+ image.item_value );
        //console.log("image.item_value:"+ JSON.parse(image.item_value ));
        // String --> Json Type Parsing --> Object --> Use
        //console.log("renderItem:"+image.item_value);
        let itemInfo = JSON.parse(image.item_value );
        let imageUri = "https://ddpimage01.s3.ap-northeast-2.amazonaws.com/" + itemInfo.thumbkey;
        let uploadfilename = itemInfo.uploadfilename;
        let itemPrice = '만원';
        //console.log("Image Url:", imageUri );

        //var itemDetail = (<ProductDetail ProductItemTitle={uploadfilename} ProductItemPrice={itemPrice}/>);
        const gotoDetail = () => Actions.pageProductDetail({ProductItemTitle:uploadfilename, ProductItemPrice:itemPrice, ProductItemURL:imageUri});

        return (
            <TouchableHighlight
              underlayColor={'#eee'} style={{padding: 2, backgroundColor: "#F8F8F8", borderBottomWidth:1, borderColor: '#eee'}}
              onPress={gotoDetail}
            >
            <View style={styles.container} >
                <ProgressImage
                    source={{uri: imageUri}}
                    indicator={Progress.Pie}
                    style={styles.thumbnail}
                />
                <View style={styles.rightContainer}>
                    <Text style={styles.title}>[{image.item_id}] {itemInfo.uploadfilename}</Text>
                    <Text style={styles.text}>{this.getFormattedDate(image.last_date)}</Text><Text style={styles.date}>등록일시:{image.last_date}</Text>
                    <Text style={styles.date}>size:{itemInfo.filesize}byte</Text>
                </View>
            </View>
          </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#F5FCFF',
    },
    rightContainer:{
        flex:1,
    },
    thumbnail:{
        width:120,
        height:120,
    },
    title: {
        fontSize: 14,
        marginBottom: 8,
        marginLeft: 5,
        textAlign: 'left',
    },
    text: {
      fontSize: 12,
      marginLeft: 5,
      alignItems: 'center',
      color: 'darkblue',
    },
    date: {
      fontSize: 10,
      marginLeft: 5,
      alignItems: 'center',
      color: 'black',
    },
    bold: {
      fontWeight: 'bold',
    },
    year: {
        fontSize: 10,
        marginLeft: 5,
        textAlign: 'left',
    },
    listView: {
        paddingTop:2,
        backgroundColor:'#F5FCFF',
    },
    loadingIndicator: {
      flex:1,
      alignItems: 'center',
      marginTop: 15,
      marginBottom: 15,
    },
    spinner: {
        width: Util.size.width,
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 30
    },
});

export default connect()(Product);