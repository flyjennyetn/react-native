/**
 * Created by flyjennyetn on 2016-11-02.
 */
import React, {Component, PropTypes} from 'react'
import {View,Text,Image,StyleSheet,Dimensions,TouchableOpacity,ListView} from 'react-native';
import {connect} from 'react-redux'
import {isNotNullObj,Storage} from '../tools/common';
import {IMGADDRESS} from '../tools/config';

const tipLabel = require('../../images/tipLabel.png');

function SubjectList ({items,dispatch,navigator}) {

    const learningThematic = (thematicSname,thematicNum,photoUrl1)=> {
        Storage.get('userData').then(ret=>{
            dispatch({
                type:'subject/learning/thematic',
                thematicNum,
                stuCode:ret.token,
                thematicSname,
                photoUrl1,
                navigator
            });
        });
    }

    renderItem = (el)=>{
        return (
            <View style={SubjectListStyles.li} >
                <View style={SubjectListStyles.titleMsg}>
                    <Image style={SubjectListStyles.tipLabel} source={tipLabel} />
                    <Text numberOfLines={1} style={SubjectListStyles.marPad}>{el.thematicSname}</Text>
                </View>
                <View style={SubjectListStyles.studyNum}>
                    <Text>已有 <Text style={{color: "#ff0000"}}>{el.studyNum}</Text>人学习</Text>
                </View>
                <TouchableOpacity onPress={() => learningThematic(el.thematicSname,el.thematicNum,el.photoUrl1)}>
                    <Image style={SubjectListStyles.photoUrl1} source={{uri:IMGADDRESS+el.photoUrl1}} />
                </TouchableOpacity>
                {isNotNullObj(el.thematicFname) && el.thematicFname.map((el,i)=>
                    <Text key={i} style={SubjectListStyles.p}>{el}</Text>
                )}
            </View>
        )
    }
    const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
        sectionHeaderHasChanged: (section1, section2) => section1 !== section2
    });

    return (
        <ListView
            initialListSize={3}
            dataSource={ds.cloneWithRows(items)}
            renderRow={this.renderItem}
            style={SubjectListStyles.ul}
        />
    )
}

const { height, width } = Dimensions.get('window');
const SubjectListStyles = StyleSheet.create({
    ul:{
        width:width,
        paddingTop:20,
    },
    li:{
        padding:20,
        borderBottomColor:'#DDDDDD',
        borderBottomWidth:1, 
    },
    titleMsg:{
        flex: 1,
        flexDirection:"row",
        alignItems:"center",
        marginBottom:5,
    },
    tipLabel:{
        marginRight:10,
        width:20,
        height:20,
        resizeMode:'stretch'
    },
    marPad:{
        width:width*0.8,
        fontSize:20,
    },
    studyNum:{
        flex: 1,
        flexDirection:"row",
        justifyContent:"flex-end",
        paddingBottom:2,
    },
    photoUrl1:{
        width:width,
        height:128,
        resizeMode:'stretch',
        marginBottom:10,
    },
    p:{
        width:width,
        fontSize:12,
        paddingTop:2,
        paddingBottom:2,
    }
});


export default SubjectList
