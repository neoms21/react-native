'use strict';
import React, {Component} from 'react';
import {

    StyleSheet,
    TouchableHighlight,
    AsyncStorage,
    Text,
    View
} from 'react-native';

const ACCESS_TOKEN = 'access_token';

export default class Root extends Component {

    componentWillMount() {
        this.getToken();
    }

    navigate(routeName) {
        console.log(routeName);
        this.props.navigation.navigate(routeName);
    }

    async getToken() {
        try {
            let accessToken = await AsyncStorage.getItem(ACCESS_TOKEN);
            if (!accessToken) {
                console.log("Token not set");
            } else {
                this.navigate('Root');
            }
        } catch (error) {
            console.log("Something went wrong");
        }
    }

    //If token is verified we will redirect the user to the home page
    async verifyToken(token) {
        let accessToken = token

        try {
            let response = await fetch('https://afternoon-beyond-22141.herokuapp.com/api/verify?session%5Baccess_token%5D=' + accessToken);
            let res = await response.text();
            if (response.status >= 200 && response.status < 300) {
                //Verified token means user is logged in so we redirect him to home.
                this.navigate('Home');
            } else {
                //Handle error
                let error = res;
                throw error;
            }
        } catch (error) {
            console.log("error response: " + error);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Welcome </Text>
                <TouchableHighlight onPress={this.navigate.bind(this, 'Register')} style={styles.button}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.navigate.bind(this, 'Login')} style={styles.button}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        padding: 10,
        paddingTop: 180
    },
    button: {
        height: 50,
        backgroundColor: '#48BBEC',
        alignSelf: 'stretch',
        alignItems: 'center',
        marginTop: 10,
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 22,
        color: '#FFF',
        alignSelf: 'center'
    },
    title: {
        fontSize: 25,
        marginBottom: 15
    }
});

