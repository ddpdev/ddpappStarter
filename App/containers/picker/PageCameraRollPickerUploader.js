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
    console.log("current:" +JSON.stringify(current));
    console.log("filename:" +'image_${(new Date()).getTime()}');
    console.log("filepath:" +current.uri.replace('file://', ''));

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
      let imageFiles = this.state.selected;

      //let uploadFiles = this.state.selected.map((item,index) => {{filename: `image_{index}_${(new Date()).getTime()}`, filepath: item.uri.replace('file://', ''), isStatic: true }});

//   filename: `image_${(new Date()).getTime()}`,
//   filepath: response.uri.replace('file://', ''),
//   isStatic: true

      console.log("upload images:",uploadFiles);

      if (imageFiles.length == 0){
        this.setState({error: 'No images to upload'});
      } else{
        // change status to uploading
        this.setState({isUploading: true});

        // build opts for uploader
        let opts = {
          url: 'https://posttestserver.com/post.php', // not use localhost here for android. It must be a ip address.
          files: imageFiles,
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          params: { coder: 'dddaaatranquangvu' }
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
              this.setState({isUploaded: true, isUploading: false});
            }
          }
          if (Platform.OS === 'android') {
            this.setState({isUploaded: true, isUploading: false});
          }
        })
      }
    }
  }

  _renderStatusText() {
    let { isUploaded, isUploading } = this.state;

    if (isUploading) {
      return 'Uploading....';
    }
    if (isUploaded) {
      return 'Uploaded Sucessfully. Click me to reset!';
    }
    return 'Upload 파일선택중';
  }




  // groupTypes : The group where the photos will be fetched, one of 'Album', 'All', 'Event', 'Faces', 'Library', 'PhotoStream' and 'SavedPhotos'. (Default: SavedPhotos)
  render() {
    return (
        <View style={styles.container}>
          <View style={styles.imageContent}>
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
          <View style={styles.bottomContent}>
            <View style={styles.view1}>
              <Text style={styles.text}>
                <Text style={styles.bold}>{this.state.num}</Text> images selected{'\n'}
                <Text style={styles.text}>{this._renderStatusText()}</Text>
              </Text>
            </View>
            {/*<View style={styles.view2} />*/}
            <View style={styles.selectImageList}>
              <ScrollView>
                { this.state.selected.length > 0 ?
                  this.state.selected.map((item,i) => <Image key={i} source={{uri: item.uri.replace('file://', '')}} style={styles.thumbnail}>
                      <Text key={i} style={styles.imageInfo}>file{i}:{`image_${(new Date()).getTime()}`}</Text>
                      </Image>
                  )
                  : null }
              </ScrollView>
            </View>
            <View style={styles.view3} >
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
                />
              <Text style={styles.bold}>{this.state.uploadProgressPercent}%</Text>
            </View>
          </View>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //height: Dimensions.get('window').height ,
    //width: Dimensions.get('window').width,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start', //'center',
    //backgroundColor: 'green',
  },
  imageContent: {
    flex: 0.8,
    marginTop: 130,
    //height: 250,
    flexDirection: 'column',
    height: Dimensions.get('window').height/2 + 100 ,
    width: Dimensions.get('window').width,
    //justifyContent: 'flex-start',
    //alignItems: 'flex-start',
    backgroundColor: 'steelblue',
    flexWrap: 'wrap',
  },
  bottomContent: {
    flex: 0.2,
    //marginTop: 15,
    //height: 150,
    height: 200,
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'skyblue',
    //flexWrap: 'wrap',
  },
  selectImageList:{
    flex: 1,
    //marginTop: 15,
    height: 150,
    //height: Dimensions.get('window').height/2 -100,
    //width: Dimensions.get('window').width,
    flexDirection: 'column',
    justifyContent: 'center',
    //alignItems: 'flex-start',
    //backgroundColor: 'skyblue',
    //flexWrap: 'wrap',
  },
  view1:{
    marginTop: 5,
    width: Dimensions.get('window').width/3,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'skyblue',
  },
  view2:{
    marginTop: 5,
    //width: Dimensions.get('window').width/3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'skyblue',
  },
  view3:{
    marginTop: 5,
    width: Dimensions.get('window').width/3,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'steelblue',
    backgroundColor: 'skyblue',
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
    width:80,
    height:80,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 20,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

export default connect()(PageCameraRollPickerUploader);