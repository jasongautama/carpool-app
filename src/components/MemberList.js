import React, {Component} from 'react';
import {FlatList} from 'react-native';
import _ from 'lodash';
import {connect} from 'react-redux';
import {Icon} from 'react-native-vector-icons';
import {CardSection, Spinner} from '../components/common';
import {membersFetch} from '../actions';
import ListItem from './ListItem';

class MemberList extends Component {
  componentWillMount() {
    this.props.membersFetch();
  }

  _renderItem({item}) {
    return <ListItem members={item} />
    //<Icon name= 'chevron-with-circle-right' />
  }

  _keyExtractor = (members) => members.uid;
 
  render() {
    const {members} = this.props;
    
    if (this.props.loading) {
      return (
        <CardSection>
          <Spinner size="large" />
        </CardSection>
      );
    }
    else {
      return (
        <FlatList
        data={members}
        renderItem={this._renderItem}
        keyExtractor={this._keyExtractor}
        /> 
      ); 
    }  
  }

}

const mapStateToProps = (state) => {
  const members = _.map(state.members, (val, uid) => {
    return {...val, uid};
  })
  const {loading} = state.members;

  return {
    members,
    loading: loading
  };
};

export default connect(mapStateToProps, {membersFetch}) (MemberList);