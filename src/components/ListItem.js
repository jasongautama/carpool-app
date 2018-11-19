import React, {Component} from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
import {CardSection} from './common';
import { Actions } from 'react-native-router-flux';

class ListItem extends Component {

  onRowPress() {
    //console.log(`member:`);
    //console.log(this.props.members);

    Actions.memberEdit({members: this.props.members})
  }
  
  render() {
    const {name} = this.props.members;
    
    return (
      <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
        <View>
            <CardSection>
                <Text style={styles.textStyles}>
                    {name}
                </Text>
            </CardSection>
        </View>
      </TouchableWithoutFeedback>
    )
  }
};

const styles = {
    textStyles: {
      flex: 4,
      fontSize: 20,
      paddingTop: 10,
      paddingBottom: 10
    }
};
  
export default ListItem;