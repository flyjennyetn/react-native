/**
 * Created by flyjennyetn on 2016-11-02.
 */
import React, {Component, PropTypes} from 'react'
import {View,Text,Image,StyleSheet,Dimensions,TouchableOpacity,ListView,} from 'react-native';
import {connect} from 'react-redux'
import moment from 'moment'
import Button from './Button';

import {IMGADDRESS} from '../tools/config';

const tipLabel = require('../../images/tipLabel.png');
const time = require('../../images/time.png');

class CouresesList extends Component {
    state={
        dataSource: new ListView.DataSource({
            // 遵循数据格式 就不需要用这2个方法去改变你的数据格式
            // getRowData: (data, sectionID, rowID) => {
            //     return data[sectionID][rowID];
            // },
            // getSectionHeaderData: (data, sectionID) => {
            //     return data[sectionID];
            // },
            rowHasChanged: (row1, row2) => row1 !== row2,
            //嵌套数据需要使用
            //sectionHeaderHasChanged: (section1, section2) => section1 !== section2,
        }),
    }

    renderItem = (el)=>{
        const {getVideoId,learningLesson} = this.props;
        return (
            <View style={CouresesListStyles.containerItem}>
                <TouchableOpacity onPress={()=>getVideoId(el.lessonId)}>
                    <Image
                        style={CouresesListStyles.showImg}
                        source={{uri:IMGADDRESS+el.videoImgUrl}}
                    />
                </TouchableOpacity>

                <View style={CouresesListStyles.tests}>
                    <Button
                        text="随堂考"
                        onPress={()=>learningLesson(el.lessonId)}
                        containerStyle={CouresesListStyles.container}
                        style={CouresesListStyles.button}
                    />
                </View>

                <View style={CouresesListStyles.botTitle}>
                    <View style={CouresesListStyles.botTitleLeft}>
                        <Image style={CouresesListStyles.tipLabel} source={tipLabel} />
                        <Text style={CouresesListStyles.marPad}>{el.lessonSname}</Text>
                        <Text style={CouresesListStyles.marPad}>{el.extCode1}</Text>
                        <Text style={CouresesListStyles.marPad} style={{color: el.stuTime !="" ? "#2bac64" : '#ff0000'}}>
                            {el.stuTime !="" ? "[已学习]" : '[未学习]'}
                        </Text>
                    </View>
 
                    {el.stuTime !="" &&
                    <View style={CouresesListStyles.timeData} >
                        <Image style={CouresesListStyles.timeSpan} source={time}/>
                        <Text style={CouresesListStyles.time}>{moment(el.stuTime).format('YYYY-MM-DD')}</Text>
                    </View>
                    }
                </View>

                {el.lessonScore != '' &&
                    <View style={CouresesListStyles.score} >
                        <Text style={CouresesListStyles.scoreTetxt}>课程分数：<Text style={{color:'#0BBA38'}}>{el.lessonScore}分</Text></Text>
                        <Text style={CouresesListStyles.scoreTetxt}>年级排名：<Text style={{color:'#0288E9'}}>第{el.gradeRanke}名</Text></Text>
                        <Text style={CouresesListStyles.scoreTetxt}>班级排名：<Text style={{color:'#1CB7B9'}}>第{el.classRanke}名</Text></Text>
                    </View>
                }

            </View>
        )
    }


    render() {
        const {coursesState,items} = this.props.courses;
        return (
            <ListView
                initialListSize={2}
                dataSource={this.state.dataSource.cloneWithRows(items.lessonInfoList)}
                renderRow={this.renderItem}
                style={CouresesListStyles.listView}
            />
        )
    }
}

const { height, width } = Dimensions.get('window');
const CouresesListStyles = StyleSheet.create({
    listView:{
        height:height*0.755,
    },
    modalContainer:{
        width:width,
        height:275,
        justifyContent: 'center',
    },
    containerItem:{
        borderBottomColor:'#DDDDDD',
        borderBottomWidth:1,
        padding:12,
    },
    showImg:{
        width:width,
        height:210.38,
        resizeMode:'stretch'
    },
    tests:{
        flex: 1,
        flexDirection:"row",
        justifyContent:'flex-end',
    },
    container:{
        marginTop:15,
        width:80,
        height:36,
        backgroundColor:'#1c98e7'
    },
    button:{
        color:'#fff',
        textAlign:'center',
        paddingTop:9,
        fontSize:14
    },
    botTitle:{
        flex: 1,
        flexDirection:"row",
        justifyContent:'space-between',
        alignItems:"center",
        marginTop:20,
        marginBottom:10,
    },
    botTitleLeft:{
        flex: 2,
        flexDirection:"row",
        alignItems:"center"
    },
    tipLabel:{
        width:20,
        height:20
    },
    marPad:{
        marginLeft:10,
    },
    timeData:{
        flex: 1,
        flexDirection:"row",
        justifyContent:'flex-end',
    },
    timeSpan:{
        width:20,
        height:20,
        marginRight:10
    },
    time:{
        color:'#000',
    },
    score:{
        flexDirection:"row",
        justifyContent:'flex-start',
        paddingBottom:20,
    },
    scoreTetxt:{
        marginRight:20
    }
});


export default CouresesList
