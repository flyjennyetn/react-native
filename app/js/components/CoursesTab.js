/**
 * Created by flyjennyetn on 2016-11-02.
 */
import React, {Component, PropTypes} from 'react'
import {View,StyleSheet,Dimensions} from 'react-native';
import {connect} from 'react-redux'
import Button from './Button';

function CoursesTab({dispatch, coursesState}) {

    const setCoursesState = (state)=>{
        dispatch({
            type:'courses/set/state',
            coursesState:state
        })
    }

    return (
        <View style={CoursesTabStyles.coursesMenu}>
            <Button
                text="下学期"
                onPress={()=>setCoursesState(1)}
                containerStyle={[CoursesTabStyles.container,coursesState == 1 && CoursesTabStyles.containerActive]}
                style={[CoursesTabStyles.button,coursesState == 1 && CoursesTabStyles.buttonActive]}
            />
            <Button
                text="上学期"
                onPress={()=>setCoursesState(2)}
                containerStyle={[CoursesTabStyles.container,coursesState == 2 && CoursesTabStyles.containerActive]}
                style={[CoursesTabStyles.button,coursesState == 2 && CoursesTabStyles.buttonActive]}
            />
        </View>
    )
}


const { height, width } = Dimensions.get('window');
const CoursesTabStyles = StyleSheet.create({
    coursesMenu:{
        flexWrap:'nowrap',
        justifyContent:'center',
        flexDirection: 'row',
        alignItems:'center',
        borderBottomWidth: 1,
        borderBottomColor: '#e3e3e3',
        paddingTop:10,
        paddingBottom:20,
    },
    container:{
        width: width*0.42,
        height: 42,
        borderColor:'#ccc',
        borderWidth:1,
        borderRadius: 20,
        backgroundColor: '#ffffff',
        marginLeft:5,
        marginRight:5,
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center"
    },
    button:{
        textAlign: 'center',
        fontSize: 22,
        color: '#000'
    },
    containerActive:{
        backgroundColor: '#2bac64',
        borderWidth:0,
    },
    buttonActive:{
        color: '#fff'
    }
});


export default CoursesTab
