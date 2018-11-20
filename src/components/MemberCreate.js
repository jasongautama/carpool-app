import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import {CardSection, Button} from './common';
import {clearMemberForm, memberCreate, memberUpdate} from '../actions';
import MemberForm from './MemberForm';

class MemberCreate extends Component {

    componentWillMount() {
        this.props.clearMemberForm()
    }

    onButtonPress() {
        const {name, phone, address, driving} = this.props;
        this.props.memberCreate({name, phone, address, driving});
        //console.log(`${name}, ${phone}, ${address}, ${driving}`);
    }

    renderButton() {
      return (
        <Button onPress={this.onButtonPress.bind(this)}> 
            Add 
        </Button>
      );
    }

    render() {
      return (
        <View>
            <MemberForm {...this.props} />
            <CardSection>
                {this.renderButton()}
            </CardSection>
            
        </View>    
      );
        
    }
}

const mapStateToProps = (state) => {
  const {name, phone, address, driving} = state.memberForm;
  return {name, phone, address, driving}
}

export default connect(mapStateToProps, 
    {clearMemberForm, memberCreate, memberUpdate})(MemberCreate);