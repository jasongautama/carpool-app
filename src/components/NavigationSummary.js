import React, {Component} from 'react'
import {View, Text, FlatList} from 'react-native';
import {CardSection} from './common';
import {connect} from 'react-redux';
import _ from 'lodash';
import {GOOGLE_API} from 'react-native-dotenv';
class NavigationSummary extends Component {

    /*
    one destination
    https://maps.googleapis.com/maps/api/directions/json?origin=3622+Maple+Rd&destination=Thornton+Place+Seattle&key=${GOOGLE_API}
    
    multiple waypoints
    https://maps.googleapis.com/maps/api/directions/json?origin=3622+Maple+Rd&destination=Thornton+Place+Seattle&waypoints=optimize:true|ifgf+seattle|rain+cafe+seattle&key=${GOOGLE_API}
    
    
    */
    state={
        data: []
    }
    componentWillMount() {
        const {origin, destination} = this.props.routes;
        const {address} = this.props.routes.member;
        console.log(origin);
        console.log(destination);
        var or = origin.replace(/ /g, "+");
        var des = destination.replace(/ /g, "+");
        var wp = address.replace(/ /g, "+");
        console.log(address);
        
        fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${or}&destination=${des}&waypoints=optimize:true|${wp}&key=${GOOGLE_API}`)
        .then((response) => response.json())
        .then((responseJson) => {
            const data = responseJson.routes[0].legs
            this.setState({data});
        })
        .catch((error) => {
            console.error(error);
        })
    }
    /*
      componentWillMount() {
        _.each(this.props.members, (value, prop) => {
        this.props.memberUpdate({prop, value});
    });
  }
  */

    _renderItem({item}) {
        return (
            <CardSection>
                <Text>
                    {item}
                </Text>
            </CardSection>
        )
    }

    _renderButton() {

    }

    
    render() {
        //const {name, phone, address} = this.props.routes.member; //get from MemberEdit //name="navigationForm" -- WRONG
        const {origin, destination} = this.props.routes;
        
        var start_addr = "";
        var end_addr = "";
        var addr = [];

        //console.log(name);
        //console.log(phone);
        //console.log(address);
        
        console.log(this.state.data);
        //if data has not yet return from Google, return empty
        if (!(this.state.data && this.state.data.length))
            return null;

        numOfRoutes = this.state.data.length;
        for (var i = 0; i < numOfRoutes; i++) {
            const {start_address, end_address} = this.state.data[i];
            console.log(`array: ${i}`);
            console.log(start_address);
            console.log(end_address);
            
            
            addr.push(start_address);
            start_addr = start_address; //delete later
            
            if (i == numOfRoutes - 1) {
                end_addr = end_address; //delete later
                addr.push(end_address);
            }
        }
        console.log(addr);

        return(
            <View>
                <CardSection>
                    <Text style={styles.textStyles}>
                        Summary: 
                    </Text>
                </CardSection>
                <CardSection style={styles.containerStyle}>
                    <Text style={styles.textStyles}>
                    Starting address: {origin}
                    </Text>

                    <Text style={styles.textStyles}>
                    {addr[0]}
                    </Text>
                </CardSection>
                <FlatList
                data={addr.slice(1, addr.length - 1)}
                renderItem={this._renderItem}
                />
                <CardSection style={styles.containerStyle}>
                    <Text style={styles.textStyles}>
                    Destination: {destination}
                    </Text>
                    <Text style={styles.textStyles}>
                    {addr[addr.length-1]}
                    </Text>
                </CardSection>

            </View>
        );
    }
}

const styles = {
    textStyles: {
      fontSize: 15,
      paddingTop: 4,
      paddingBottom: 10
    },
    containerStyle: {
        borderBottomWidth: 1,
        padding: 10,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        borderColor: '#ddd',
        position: 'relative' 
     }
};

export default NavigationSummary;