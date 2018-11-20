import React, {Component} from 'react';
import {View, Text, TextInput} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux'; //Router
import {Button, CardSection} from './common';
import {submitForm} from '../actions';
import {addressUpdate} from '../actions';
import BackgroundImage from './BackgroundImage';

class NavigationForm extends Component {

    onButtonPress () {
        console.log("buttonPressed!");
        console.log(`origin: ${this.props.origin}`);
        console.log(`destination: ${this.props.destination}`);

        this.props.submitForm();

        //console.log(this.props);
        Actions.navigationSummary({routes: this.props});
    }

    render() {
        console.log(this.props);
        const {backgroundImage, descContainerStyle, textStyle, inputStyle, inputContainerStyle} = styles;
        
        return(
            <BackgroundImage style={backgroundImage}>
                <View style={descContainerStyle}>
                    <Text style={textStyle}>
                        enter Starting location
                    </Text>
                </View>

                <View style={inputContainerStyle}>
                    <TextInput
                    placeholder= "123 Main St, Seattle, WA"
                    value={this.props.origin}
                    autoCorrect={false}
                    style={inputStyle}
                    onChangeText={text => this.props.addressUpdate({prop: 'origin', value:text})}

                    />
                </View>

                <View style={descContainerStyle}>
                    <Text style={styles.textStyle}>
                        enter Destination
                    </Text>
                </View>

                <View style={inputContainerStyle}>
                    <TextInput
                    placeholder= "123 Main St, Seattle, WA"
                    value={this.props.destination}
                    autoCorrect={false}
                    style={inputStyle}
                    onChangeText={text => this.props.addressUpdate({prop: 'destination', value:text})}
                    
                    />
                </View>

                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}> 
                        Navigate 
                    </Button> 
                </CardSection>
            </BackgroundImage>
        );
    }
}

const styles={
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover',
        paddingTop:100
    },
    textStyle: {
        fontSize: 20,
        paddingTop: 5,
        paddingBottom: 5
    },
    descContainerStyle: {
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        justifyContent: 'center',
        flexDirection: 'row',
        borderColor: '#ddd',
        position: 'relative' 
     },
     inputStyle: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23, //how much space between each line of text
        flex: 2
    },
    inputContainerStyle: {
        height: 40,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center'

        /*
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#ddd',
        position: 'relative' 
        */
     }
}

const mapStateToProps = (state) => {
    const {origin, destination} = state.navigationForm;
    return {origin, destination};
}
export default connect(mapStateToProps, {submitForm, addressUpdate})(NavigationForm);