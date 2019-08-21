import React, { Component, Fragment } from "react";
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, Button, Image, } from 'react-native';
import { LoginButton, AccessToken } from 'react-native-fbsdk';
export default class LoginController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pushData: [],
            loggedIn: false
        }
    }
    componentDidMount() {

    }

    render() {
        return (
            <Fragment>
                <StatusBar barStyle="dark-content" />
                <SafeAreaView>
                    <ScrollView
                        contentInsetAdjustmentBehavior="automatic"
                        style={styles.scrollView}>
                        {global.HermesInternal == null ? null : (
                            <View style={styles.engine}>
                                <Text style={styles.footer}>Engine: Hermes</Text>
                            </View>
                        )}
                        <View style={styles.body}>
                            <View style={styles.sectionContainer}>
                                <LoginButton
                                    onLoginFinished={
                                        (error, result) => {
                                            if (error) {
                                                console.log("login has error: " + result.error);
                                            } else if (result.isCancelled) {
                                                console.log("login is cancelled.");
                                            } else {

                                                console.log(result);
                                                AccessToken.getCurrentAccessToken().then(
                                                    (data) => {
                                                        this.setState({
                                                            loggedIn: true,
                                                            userID: data.userID
                                                        })
                                                        console.log(data, data.accessToken.toString())
                                                    }
                                                )
                                            }
                                        }
                                    }
                                    onLogoutFinished={() =>
                                        this.setState({
                                            loggedIn: false,
                                            userID: ''
                                        })
                                    } />
                            </View>
                            <View style={styles.buttonContainer}>
                                {!this.state.loggedIn && <Text>You are currently logged out</Text>}
                            </View>
                            {this.state.loggedIn && <View>
                                <View style={styles.listHeader}>
                                    <Text>User Info</Text>
                                </View>
                                <View style={styles.detailContainer}>
                                    <Text style={styles.title}>ID</Text>
                                    <Text style={styles.message}>{this.state.userID}</Text>
                                </View>
                            </View>}
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </Fragment>
        );
    }
}

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: 'white',
    },
    listHeader: {
        backgroundColor: '#eee',
        color: "#222",
        height: 44,
        padding: 12
    },
    detailContainer: {
        paddingHorizontal: 20
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingTop: 10
    },
    message: {
        fontSize: 14,
        paddingBottom: 15,
        borderBottomColor: "#ccc",
        borderBottomWidth: 1
    },
    dp: {
        marginTop: 32,
        paddingHorizontal: 24,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    engine: {
        position: 'absolute',
        right: 0,
    },
    body: {
        backgroundColor: 'white',
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    buttonContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: 'black',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        color: 'black',
    },
    highlight: {
        fontWeight: '700',
    },
    footer: {
        color: 'black',
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right',
    },
});