import React, {Component} from 'react'
import {ListItem} from 'react-native-elements'
import {connect} from 'react-redux'
import {View, TouchableWithoutFeedback} from 'react-native'
import {Actions} from 'react-native-router-flux'
import {CheckBox} from 'react-native-elements'
import {addMember, removeMember} from '../actions'

class MyList extends Component {
    state = {
        checked: false
    }

    onRowPress() {
        Actions.memberEdit({members: this.props.members})
    }

    onCheckPress(member) {
        this.setState({checked: !this.state.checked})
        if (!this.state.checked) {
            console.log(`I checked the name of ${member.name}`)
            this.props.addMember({member})
        }
        else {
            this.props.removeMember({member})
            console.log(`I UNchecked the name of ${member.name}`)
        }
    }


    render() {
        const member = this.props.members
        return (
            <View style={styles.backgroundStyle}>
                
                <TouchableWithoutFeedback
                onPress={this.onRowPress.bind(this)}>
                    <ListItem 
                    leftIcon = {
                    <CheckBox 
                    onPress = {() => this.onCheckPress(member)}
                    checked = {this.state.checked}
                    containerStyle = {styles.backgroundStyle}
                    />
                    }
                    title = {member.name}/>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}

const styles = {
    backgroundStyle: {
        backgroundColor: 'white'
    }
}


const mapStateToProps = (state) => {
    const arr = state.list
    return {arr}
} 

export default connect(mapStateToProps, {addMember, removeMember})(MyList)