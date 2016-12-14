/**
 * Created by flyjennyetn on 2016-11-02.
 */
import React, {Component} from 'react';
import {View,Text} from 'react-native';
import {connect} from 'react-redux';
import Toolbar from '../../components/Toolbar'
import SubjectList from '../../components/SubjectList'
import LoadingView from '../../components/LoadingView'
import {isNotNullObj} from '../../tools/common';
const categoryPress = require('../../../images/ic_tab_category.png');
class Subject extends Component {

    componentWillMount(){
        this.props.dispatch({
            type:'subject/query'
        })
    }
    onIconClicked = ()=> {
        this.props.drawer.openDrawer();
    }   
    render() {
    	const {items} = this.props.subject;
        return (
            <View>
                <Toolbar
                    navigator = {this.props.navigator}
                    onIconClicked={this.onIconClicked}
                    title = "专题"
                    leftIcon = {categoryPress}
                />
            	{isNotNullObj(items) ?
            		<SubjectList items={items} dispatch={this.props.dispatch} navigator={this.props.navigator} />
	                :
					<LoadingView />
				}

            </View>
        )
    }
}

function mapStateToProps({subject}) {
    return {subject}
}
export default connect(mapStateToProps)(Subject)