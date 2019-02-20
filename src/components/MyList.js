import React, {Component} from 'react'
import {ListItem} from 'react-native-elements'
import {connect} from 'react-redux'
import {View, TouchableWithoutFeedback} from 'react-native'
import {Actions} from 'react-native-router-flux'
import {CheckBox} from 'react-native-elements'
import {addMember, removeMember, memberUpdate, enableButton, disableButton} from '../actions'

class MyList extends Component {
    state = {
         checked: false
    }

    onRowPress() {
        Actions.memberEdit({members: this.props.members})
    }

    onCheckPress(member) {
        if (!this.state.checked) {
            console.log(`I checked the name of ${member.name}`)
            this.setState({checked: true})
            this.props.addMember({member})
            this.props.enableButton(this.props.list)
        }
        else {
            console.log(`I UNchecked the name of ${member.name}`)
            this.setState({checked: false})
            this.props.removeMember({member})
            this.props.disableButton(this.props.list)     
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
                        onPress = {() => {return this.onCheckPress(member)}}
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
    const list = state.list
    
    return { list }
}

export default connect(mapStateToProps, {memberUpdate, addMember, removeMember, enableButton, disableButton})(MyList)