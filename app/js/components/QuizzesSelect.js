/**
 * Created by flyjennyetn on 2016-11-02.
 */
import React, {Component, PropTypes} from 'react'
import {View,Text,Image,StyleSheet,Dimensions,TouchableOpacity,ListView} from 'react-native';
import {IMGADDRESS} from '../tools/config';

const selectImg = require('../../images/question_selectImg.png');

function QuizzesSelect ({
    i,exam,examName,examId,subScore,selectType,subAns,lessonScore,optionA,optionB,optionC,optionD,optionE,optionF,onClick
}) {

    const optionLetterImg = [
        ['A',optionA],
        ['B',optionB]
    ];    
    const optionLetter = [
        ['A',optionA],
        ['B',optionB],
        ['C',optionC],
        ['D',optionD],
        ['E',optionE],
        ['F',optionF]
    ];
    const optionsImg = ()=>{
        return (
            <View style={QuizzesSelectStyles.answer}>
                {optionLetterImg.map((option)=>
                <TouchableOpacity
                    key={option[1]}
                    style={QuizzesSelectStyles.answerItem}
                    onPress={() => onClick(examId,option[0])}
                >
                    {exam[examId] == option[0] ? 
                        <Image style={QuizzesSelectStyles.selected} source={selectImg} />
                        :
                        <View style={QuizzesSelectStyles.circle} />
                    }
                    <Text style={QuizzesSelectStyles.answerText}>{option[0]}、</Text>
                    <Image style={QuizzesSelectStyles.answerImg} source={{uri:IMGADDRESS+option[1]}}/>
                </TouchableOpacity>
                )}
            </View>
        )
    }
    const options = ()=>{
        return (
            <View>
                {
                    optionLetter.map((option)=>
                        option[1] != "" &&
                        <TouchableOpacity
                            key={option[1]}
                            style={QuizzesSelectStyles.answerItem}
                            onPress={() => onClick(examId,option[0])}
                        >
                            {exam[examId] == option[0] ? 
                                <Image style={QuizzesSelectStyles.selected} source={selectImg} />
                                :
                                <View style={QuizzesSelectStyles.circle} />
                            }
                            <Text style={QuizzesSelectStyles.answerText}>{option[0]}、</Text>
                            <Text>{option[1]}</Text>
                        </TouchableOpacity>
                    )
                }
            </View>
        )
    }

    return (
        <View style={QuizzesSelectStyles.li}>
            <Text style={QuizzesSelectStyles.question}>{parseInt(i)+1}、{examName}（{subScore}分）</Text>
            {
                selectType == 2 ? 
                    optionsImg()  
                    : 
                    options()
            }

            {lessonScore != 'no' &&
            <View style={QuizzesSelectStyles.result}>
                <Text>正确答案是：</Text>
                <Image style={QuizzesSelectStyles.selected} source={selectImg} />
                <Text style={QuizzesSelectStyles.resultText} >
                {subAns}
                </Text>
            </View>
            }
        </View>
    )
}


const { height, width } = Dimensions.get('window');
const QuizzesSelectStyles = StyleSheet.create({
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
        marginBottom:10,
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
    answerImg:{
        resizeMode:'stretch',
        width:195,
        height:146
    },
    result:{
        width:width,
        flexDirection:"row",
        padding:5,
        borderColor:'#b0b0b0',
        borderColor:'#fff',
    },
    resultText:{
        color:'#a9a9a9',
        marginBottom:10,
    }
});
export default QuizzesSelect
