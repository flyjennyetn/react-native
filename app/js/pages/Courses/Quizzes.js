/**
 * Created by flyjennyetn on 2016-11-02.
 */
import React, {Component, PropTypes} from 'react'
import {View,Text,StyleSheet,Dimensions,ScrollView,BackAndroid} from 'react-native';
import {connect} from 'react-redux'
import Toolbar from '../../components/Toolbar';
import LoadingView from '../../components/LoadingView';
import QuizzesRadio from '../../components/QuizzesRadio'
import QuizzesSelect from '../../components/QuizzesSelect'
import Button from '../../components/Button'
import {Storage,isNotNullObj,toastShort,naviGoBack} from '../../utils/common';
const { height, width } = Dimensions.get('window');

class Quizzes extends Component {
    state = {
        userData : {}
    }

    componentWillMount(){
        const {lessonId} = this.props.params;
        Storage.get('userData').then(ret=>{
            this.state.userData = ret;
            this.props.dispatch({
                type:'quizzes/query/questions',
                token:this.state.userData.token,
                lessonId
            })
        })
    }

    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', this.goBack);
    }

    componentWillUnmount() {
      BackAndroid.removeEventListener('hardwareBackPress', this.goBack);
    }

    goBack = ()=> {
      return naviGoBack();
    }

    subAnswer = (lessonScore)=>{
        if(lessonScore == 'no'){
            const {lessonId} = this.props.params;
            const {exam} = this.props.quizzes;
            let results = '{"results":[';
            let key=1;
            var examState = true;
            exam.map((el,i)=>{
                if(el == ''){
                    toastShort('第 '+key+' 题没有作答!', 1);
                    examState = false;
                    return false;
                }
                results+= '{"subId":"' + i + '","subAns":"' + el + '"},';
                key++;
            })
            results += ']}';
            if(!examState)
                return false;

            this.props.dispatch({
                type:'quizzes/query/Score',
                results,
                lessonId,
                stuCode:this.state.userData.token
            })
        }
    }

    selected =(examId,value)=>{
        const {lessonScore} = this.props.quizzes;
        if(lessonScore == 'no'){
            this.props.dispatch({
                type:'quizzes/set/exam',
                examId,
                value
            })
        }
    }

    render() {
        const {examPaperName,examList,examSelect,exam,lessonScore} = this.props.quizzes;
        return (
            <View style={QuizzesStyles.quizzes}>
                <Toolbar
                    title = "随堂考"
                />
                <ScrollView
                    style={QuizzesStyles.scroll}
                >
                {isNotNullObj(examList) && examList.map((el,i)=>
                    <QuizzesRadio 
                        {...el}
                        key={i}
                        i={i}
                        lessonScore={lessonScore}
                        exam = {exam}
                        onClick={this.selected}
                    />
                )}
                {isNotNullObj(examSelect) && examSelect.map((el,i)=>
                    <QuizzesSelect 
                        {...el}
                        key={i}
                        i={examList.length+i}
                        lessonScore={lessonScore}
                        exam = {exam}
                        onClick={this.selected}
                        
                    />
                )}

                { !isNotNullObj(examSelect) && 
                    <LoadingView />
                }

                <View style={QuizzesStyles.subBtn}>
                    <Button
                        text={lessonScore == 'no' ? '确认提交' : '答题分数:'+lessonScore+' 分' }
                        onPress={()=>this.subAnswer(lessonScore)}
                        containerStyle={QuizzesStyles.subAnswer}
                        style={QuizzesStyles.button}
                    />
                </View>
                </ScrollView>
            </View>
        )
    }
}


const QuizzesStyles = StyleSheet.create({
    quizzes:{
        backgroundColor:'#f4f4f4',
    },
    scroll:{
        height:height*0.9
    },
    subBtn:{
        flex: 1,
        flexDirection:'row',
        justifyContent:'center',
        marginTop:20,
        marginBottom:20,
    },
    subAnswer:{
        width:width*0.8,
        height:48,
        borderRadius: 20,
        backgroundColor: "#66cc66",
        justifyContent: 'center',
        alignItems: 'center',
    },
    button:{
        color: "#ffffff",
        textAlign: "center",
        fontSize: 16
    }
});


function mapStateToProps({quizzes}) {
    return {quizzes}
}
export default connect(mapStateToProps)(Quizzes)