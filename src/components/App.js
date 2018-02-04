import React, {Component} from 'react';
import { Scene, Router, Actions, ActionCons } from 'react-native-router-flux';
import LoginScreen from './Login/LoginScreen'
import MainScreen from './MainScreen'
import SecondScreen from './SecondScreen'

export default class App extends Component<{}> {
    render() {
        const refreshOnBack = () => { Actions.pop(); Actions.refresh(); }  
        return (
            <Router>
                <Scene key="root">
                    <Scene key="loginScreen"
                        component={LoginScreen}
                        animation='fade'
                        hideNavBar={true}
                        initial={true}
                        onBack={refreshOnBack}
                        />
                    <Scene key="mainScreen"
                        component={MainScreen}
                        animation='fade'
                        hideNavBar={true}
                        />
                    <Scene key="secondScreen"
                        component={SecondScreen}
                        animation='fade'
                        hideNavBar={true}
                        />
                </Scene>
            </Router>
        );
    }
}

