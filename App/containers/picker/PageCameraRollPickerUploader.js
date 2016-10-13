/**
 * Created by ms.kim2 on 2016-09-09.
 */
import React, { Component } from 'react';
import { Alert, View, Text ,StyleSheet, Image, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Dimensions from 'Dimensions';
import CameraRollPicker from 'react-native-camera-roll-picker';
import RNUploader from 'react-native-uploader';
import { SocialIcon, Button, Icon  } from 'react-native-elements';



const UPLOAD_URL = 'http://app.ddpstyle.com/common/awsfileuploadTest';
const prefix = ((Platform.OS === 'android') ? 'file://' : '')

const initState = {
  isUploaded: false,
  isUploading: false,
  error: null,
  uploadProgressPercent: 0,
  num: 0,
  selected: [],
}

class PageCameraRollPickerUploader extends Component {
  constructor(props) {
    super(props);
    const groupTypes = ['Album', 'All', 'Event', 'Faces', 'Library', 'PhotoStream','SavedPhotos'];

    selectType = props.groupTypes === 'undefinded' ? 'All' : 'SavedPhotos';

    this.state = {...initState};

    this.getSelectedImages = this.getSelectedImages.bind(this);
    this.uploadImages = this.uploadImages.bind(this);

    console.log("PageImagePicker",this.props,this.state);

  }

  //
// name: 'image[]',
//   filename: `image_${(new Date()).getTime()}`,
//   filepath: response.uri.replace('file://', ''),
//   isStatic: true

  getSelectedImages(images, current) {
    var num = images.length;
    //selectImages = this.state.selected.join();
    console.log("current:",current);

    var fileBlob = current.uri.replace('file://', '');
    console.log("fileBlob:", fileBlob[0].type, ",", fileBlob);

    //console.log("filename:" + `image_${(new Date()).getTime()}`);
    //console.log("filepath:" +current.uri.replace('file://', ''));

    console.log("images:", JSON.stringify(images));
    console.log("selected:" + JSON.stringify(this.state.selected));

    this.setState({
      num: num,
      selected: images,
    });

    // this.setState({
    //   num: num,
    //   selected: images,
    //   selectImagesUri: current.uri.toString(),
    //   uploadProgressPercent: 0,
    // });

  }


  // afterPicked(ref) {
  //   let refName     = ref.getName();
  //   let imgFilePath = ref.getImage().filepath;
  //
  //   this.state.imageRefs = this.state.imageRefs.map(iR => {
  //     if (iR.name == refName) {
  //       return {...iR, image: {filepath: imgFilePath}};
  //     }
  //     return iR;
  //   });
  // }

  uploadImages() {
    // reset before error
    this.setState({error: null});

    // reset if is uploaded
    if (this.state.isUploaded) {
      this.setState(initState);
    } else {
      // get image files
     //let { firstImage, secondImage, lastImage } = this.refs;
      //let imageFiles = this.state.selected;
      let imageFiles = [];

      // upload format에 맞춰 배열을 만든다.
      this.state.selected.map((item,index) => {
        let fileExt = item.uri.replace('file://', '');
        console.log("fileExt:"+fileExt.type+","+fileExt);
        imageFiles.push({filename: `image_${index+1}_${(new Date()).getTime()}.jpg`, filepath: item.uri.replace('file://', ''), isStatic: true });
      });

//   filename: `image_${(new Date()).getTime()}`,
//   filepath: response.uri.replace('file://', ''),
//   isStatic: true

      console.log("upload images:",imageFiles);

      if (imageFiles.length == 0){
        this.setState({error: 'No images to upload'});
      } else{
        // change status to uploading
        this.setState({isUploading: true});

        // build opts for uploader
        let opts = {
          //url: 'https://posttestserver.com/post.php', // not use localhost here for android. It must be a ip address.
          url: 'http://app.ddpstyle.com/common/awsfileupload',
          files: imageFiles,
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          params: { coder: 'ddpstyledev' }
        };

        // upload to server
        RNUploader.upload(opts, (err, res) => {
          if (err) {
            console.log(err);
            return;
          }
          if (Platform.OS === 'ios') {
            console.log(`Response status: ${res.status}`);
            console.log(`Response data: ${res.data}`);
            if (res.status == 200) {
              this.setState({selected: [], isUploaded: true, isUploading: false });
            }
          }
          if (Platform.OS === 'android') {
            this.setState({selected: [], isUploaded: true, isUploading: false});
          }
        })
      }
    }
  }

  _renderStatusText() {
    let { isUploaded, isUploading } = this.state;

    if (isUploading) {
      return ' Uploading....';
    }
    if (isUploaded) {
      return ' Uploaded Sucessfully. Choose Others!';
    }
    return ' 파일선택중';
  }




  // groupTypes : The group where the photos will be fetched, one of 'Album', 'All', 'Event', 'Faces', 'Library', 'PhotoStream' and 'SavedPhotos'. (Default: SavedPhotos)
  render() {
    return (
        <View style={styles.container}>
          <View style={styles.top}>
            <CameraRollPicker
              scrollRenderAheadDistance={500}
              initialListSize={1}
              pageSize={3}
              removeClippedSubviews={true}
              groupTypes={selectType}
              batchSize={5}
              maximum={15}
              selected={this.state.selected}
              assetType='Photos'
              imagesPerRow={3}
              imageMargin={5}
              callback={this.getSelectedImages} />
          </View>

          <View style={styles.bottom}>
            <View style={styles.innerTop}>
                <Text style={styles.view1}>
                  <Text style={styles.bold}>{this.state.num}</Text> images
                  <Text style={styles.text}>{this._renderStatusText()}</Text>
                </Text>
              </View>
            <View style={styles.innerBottom}>
                  <View style={styles.innerLeft}>
                    <ScrollView horizontal >
                      { this.state.selected.length > 0 ?
                        this.state.selected.map((item,i) => <Image key={i} source={{uri: item.uri.replace('file://', '')}} style={styles.thumbnail}>
                            <Text key={i} style={styles.imageInfo}>file{i}:{`image_${(new Date()).getTime()}`}</Text>
                          </Image>
                        )
                        : null }
                    </ScrollView>
                  </View>
                  <View style={styles.innerRight} >
                    <Icon
                      raised
                      name='image'
                      type='font-awesome'
                      color='#f50'
                      onPress={()=> Alert.alert(
                        '파일업로드',
                        '선택한파일을 등록하시겠습니까?',
                        [
                          {text:'Cancel', onPress:()=> console.log('Cancel Pressed')},
                          {text:'OK', onPress:()=> this.uploadImages(this.state.selected)},
                        ]
                      )}
                      style={styles.viewUploadIcon}
                    />
                    <Text style={styles.bold}>{this.state.uploadProgressPercent}%</Text>
                  </View>
              </View>
          </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
  },
  top: {
    flex: 0.7,
    flexDirection:'row',
    marginTop: 5,
    height: Dimensions.get('window').height/2 + 100 ,
    width: Dimensions.get('window').width,
  },
  bottom: {
    flex: 0.3,
    //flexDirection:'row',
    height: 240 ,
    width: Dimensions.get('window').width,
    backgroundColor: '#81D4FA',
    //borderColor: 'black',
    //borderWidth: 2,
  },
  innerTop: {
    height: 20,
    marginLeft: 5,
    width: Dimensions.get('window').width-10,
    //borderColor: 'yellow',
    //borderWidth: 2,
  },
  innerBottom: {
    //flex:1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: 180,
    marginTop: 2,
    marginLeft: 5,
    width: Dimensions.get('window').width-10,
    //borderColor: 'green',
    //borderWidth: 2,
  },
  innerLeft: {
    //flex:1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 180,
    //marginTop: 5,
    width: Dimensions.get('window').width-80,
    //borderColor: 'green',
    //borderWidth: 2,

  },
  innerRight: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    height: 100,
    marginLeft: 5,
    //width: 110,
    //borderColor: 'green',
    //borderWidth: 2,
  },
  text: {
    fontSize: 12,
    alignItems: 'center',
    color: 'black',
  },
  bold: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 10,
  },
  imageInfo: {
    fontSize: 6,
    alignItems: 'flex-start',
    color: 'black',
  },
  thumbnail:{
    width:50,
    height:50,
    marginRight: 5,
    // paddingTop: 5,
    // paddingBottom: 5,
    // paddingLeft: 5,
    // paddingRight: 5,
    // borderRadius: 20,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

export default connect()(PageCameraRollPickerUploader);