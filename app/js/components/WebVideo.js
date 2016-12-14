/**
 * Created by flyjennyetn on 2016-11-02.
 */
import React, {Component} from 'react'
import {View,Text,WebView,Dimensions} from 'react-native';

const { width } = Dimensions.get('window');
class WebVideo extends Component {

    render() {
      const {videoId} = this.props;
         const HTML = `
            <!DOCTYPE html>\n
            <html>
              <head>
                <title></title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
                <script src="http://static.polyv.net/file/polyvplayer_v2.0.min.js"></script>
              </head>
              <style type="text/css">
                body{
                      margin: 0;
                      padding: 0;
                }
              </style>
              <body>
                <div id="plv_${videoId}"></div>
              </body>
                <script type="text/javascript">
                  function myfun(){
                    var player = polyvObject('#plv_${videoId}').videoPlayer({
                        'width': "100%",
                        'height': "275px",
                        'vid': "${videoId}",
                        'flashvars': {
                            "ban_seek_by_limit_time": 'off',
                            "autoplay": '1'
                        }
                    });
                  }
                  window.onload=myfun;
                </script>
            </html>`;

        return (
            <View style={{width:width,height: 275}}>
                <WebView
                  style={{width:width,height: 275}}
                  source={{html: HTML}}
                  automaticallyAdjustContentInsets={false}
                  javaScriptEnabled={true}
                  domStorageEnabled={true}
                  decelerationRate="normal"
                  scalesPageToFit={true}
                />
            </View>
        )
    }
}

export default WebVideo
