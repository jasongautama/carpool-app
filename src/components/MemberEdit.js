import React, {Component} from 'react'
import {View} from 'react-native';
import {connect} from 'react-redux';
import _ from 'lodash';
import {Actions} from 'react-native-router-flux';
import {CardSection, Button} from './common';
import {memberSave, memberUpdate} from '../actions';
import MemberForm from './MemberForm';

class MemberEdit extends Component {

  componentWillMount() {
        _.each(this.props.members, (value, prop) => {
        this.props.memberUpdate({prop, value});
    });
  }

    onSavePress() {
        const {name, phone, address, driving} = this.props;

        this.props.memberSave({name, phone, address, driving, uid: this.props.members.uid});

        console.log(`${name}, ${phone}, ${address}, ${driving}, ${this.props.members.uid}`);
    }

    onNavPress() {
        Actions.navigationForm({member: this.props});
    }

    saveButton() {
        return (
            <Button onPress={this.onSavePress.bind(this)}> 
                Save Changes 
            </Button>
        );
    }

    navigateButton() {
        return (
            <Button onPress={this.onNavPress.bind(this)}> 
                NAVIGATE
            </Button> 
        );       
    }

    render() {
      return (
        <View>
            <MemberForm {...this.props} />
            <CardSection>
                {this.saveButton()}
            </CardSection>
                
            <CardSection>
                {this.navigateButton()}
            </CardSection>
            
        </View>    
      );   
    }
}

const mapStateToProps = (state) => {
    const {name, phone, address, driving} = state.memberForm;

    return {name, phone, address, driving}
}

export default connect(mapStateToProps, {memberSave, memberUpdate}) (MemberEdit);