import React, {Component} from 'react'
import {View, Text, FlatList, Linking} from 'react-native';
import {CardSection, Button} from './common';
import _ from 'lodash';
import {GOOGLE_API} from 'react-native-dotenv';
class NavigationSummary extends Component {

    /*
    one destination
    https://maps.googleapis.com/maps/api/directions/json?origin=Seattle&destination=Los+Angeles&key=${GOOGLE_API}
    
    multiple waypoints
    https://maps.googleapis.com/maps/api/directions/json?origin=Seattle+WA&destination=Los+Angeles&waypoints=optimize:true|San+Fransisco|Portland,+Oregon&key=${GOOGLE_API}
    
    */

    state={
        data: [] //data to store .json response from google
    }
    componentWillMount() {
        const multipleWayPts = 2;
        const {origin, destination} = this.props.routes;
        console.log(this.props) //this.props.routes.waypoints

        const length = this.props.routes.waypoints.length
        var or = origin.replace(/ /g, "+");
        var des = destination.replace(/ /g, "+");
        var wp = ""

        //one waypoint
        if (length < multipleWayPts) {
            const {address} = this.props.routes.member
            wp = address.replace(/ /g, "+")
        }
        else {
            for (var i = 0; i < length; i++) {
                const {address} = this.props.routes.waypoints[i]
                var temp = address.replace(/ /g, "+")
                wp += temp + "|"
            }
        }

        
        
        
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

    _renderItem({item}) {
        return (
            <CardSection>
                <Text>
                    {item}
                </Text>
            </CardSection>
        )
    }

    
    render() {
        console.log(this.props)
        const {origin, destination} = this.props.routes
        var addr = []
        var strURL = "https://www.google.com/maps/dir/"

        console.log(this.state.data);
        
        //if data has not yet return from Google, return empty
        if (!(this.state.data && this.state.data.length))
            return null;

        numOfRoutes = this.state.data.length;
        for (var i = 0; i < numOfRoutes; i++) {
            const {start_address, end_address} = this.state.data[i]
            console.log(`array: ${i}`)
            console.log(start_address)
            console.log(end_address)
            
            
            addr.push(start_address)
            
            if (i == numOfRoutes - 1) {
                addr.push(end_address)
            }
        }


        for (var i=0; i < addr.length; i++) {
            strURL += addr[i].replace(/ /g, "+")
            strURL += "/"
        }
        console.log(strURL);

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

                <CardSection>
                    <Button onPress={() => Linking.openURL(strURL)}>
                        Start Navigation
                    </Button>
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