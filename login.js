'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    TextInput,
    TouchableHighlight,
    ActivityIndicatorIOS,
    AsyncStorage,
    Text,
    View
} from 'react-native';

const ACCESS_TOKEN = 'access_token';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            error: "",
            showProgress: false,
        }
    }

    redirect(routeName, accessToken) {
        this.props.navigation.navigate(routeName);
    }

    storeToken(responseData) {
        AsyncStorage.setItem(ACCESS_TOKEN, responseData, (err) => {
            if (err) {
                console.log("an error");
                throw err;
            }
            console.log("success");
        }).catch((err) => {
            console.log("error is: " + err);
        });
    }

    async onLoginPressed() {
        this.setState({showProgress: true})
        try {
            let response = await fetch('http://10.240.186.41:3000/api_v1/authenticate', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({

                    name: this.state.email,
                    password: this.state.password,

                })
            });
            let res = await response.text();
            if (response.status >= 200 && response.status < 300) {
                //Handle success
                let accessToken = res;
                console.log(accessToken);
                //On success we will store the access_token in the AsyncStorage
                this.storeToken(accessToken);
                this.redirect('Home');
            } else {
                //Handle error
                let error = res;
                throw error;
            }
        } catch (error) {
            this.setState({error: error});
            console.log("error " + error);
            this.setState({showProgress: false});
        }
    }

    render() {

        return (
            <View style={styles.container}>
                <Text style={styles.heading}>
                    Native on Rails
                </Text>
                <TextInput
                    onChangeText={(text) => this.setState({email: text})}
                    style={styles.input} placeholder="Email">
                </TextInput>
                <TextInput
                    onChangeText={(text) => this.setState({password: text})}
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={true}>
                </TextInput>
                <TouchableHighlight onPress={this.onLoginPressed.bind(this)} style={styles.button}>
                    <Text style={styles.buttonText}>
                        Login
                    </Text>
                </TouchableHighlight>

                <Text style={styles.error}>
                    {this.state.error}
                </Text>

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
        paddingTop: 80
    },
    input: {
        height: 50,
        marginTop: 10,
        padding: 4,
        width: '100%',
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48bbec'
    },
    button: {
        height: 50,
        backgroundColor: '#48BBEC',
        alignSelf: 'stretch',
        marginTop: 10,
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 22,
        color: '#FFF',
        alignSelf: 'center'
    },
    heading: {
        fontSize: 30,
    },
    error: {
        color: 'red',
        paddingTop: 10
    },
    success: {
        color: 'green',
        paddingTop: 10
    },
    loader: {
        marginTop: 20
    }
});
