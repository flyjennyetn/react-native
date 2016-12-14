/**
 * Created by flyjennyetn on 2016-11-02.
 */
import React, {Component, PropTypes} from 'react'
import {View,Text,Image,StyleSheet,Dimensions,TouchableOpacity,ListView} from 'react-native';

const selectImg = require('../../images/question_selectImg.png');

function QuizzesRadio ({i,exam,examId,examName,subScore,subAns,lessonScore,onClick}) {
  
    const options = (num,text)=>{
        return (
            <TouchableOpacity
                style={QuizzesRadioStyles.answerItem}
                onPress={() => onClick(examId,num)}
            >
                {exam[examId] == num ? 
                    <Image style={QuizzesRadioStyles.selected} source={selectImg} />
                    :
                    <View style={QuizzesRadioStyles.circle} />
                }
                <Text style={QuizzesRadioStyles.answerText}>{text}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={QuizzesRadioStyles.li}>
            <Text style={QuizzesRadioStyles.question}>{parseInt(i)+1}、{examName}（{subScore}分）</Text>
            <View style={QuizzesRadioStyles.answer} >
                {options('1','正确')}
                {options('0','错误')}
            </View>
            {lessonScore != 'no' &&
            <View style={QuizzesRadioStyles.result}>
                <Text>正确答案是：</Text>
                <Image style={QuizzesRadioStyles.selected} source={selectImg} />
                <Text style={QuizzesRadioStyles.resultText} >
                {subAns == '1' ? '正确' : '错误'}
                </Text>
            </View>
            }
        </View>
    )
}

const { height, width } = Dimensions.get('window');
const QuizzesRadioStyles = StyleSheet.create({
    li:{
        padding:12,
    },
    question:{
        width:width,
        fontSize:14,
        marginBottom:20,
    },
    answer:{
        width:width,
    },
    answerItem:{
        width:width,
        flex: 1,
        flexDirection:"row",
        marginBottom:15,
    },
    circle:{
        width: 20,
        height: 20,
        borderRadius: 10,
        borderColor:'#b0b0b0',
        borderWidth:1,
        marginRight:10
    },
    selected:{
        width: 20,
        height: 20,
        resizeMode:'stretch',
        marginRight:10
    },
    answerText:{
        color:'#a9a9a9'
    },
    result:{
        width:width,
        flexDirection:"row",
        borderColor:'#b0b0b0',
        borderColor:'#fff',
    },
    resultText:{
        color:'#a9a9a9'
    }
});

export default QuizzesRadio
