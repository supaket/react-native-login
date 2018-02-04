import React, { Component, PropTypes } from 'react';
import {
	StyleSheet,
    View,
    Text,
	Image,
	TouchableOpacity,
	Animated,
	Easing
} from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';

import arrowNextImg from '../images/right-arrow.png';
import arrowBackImg from '../images/left-arrow.png';

const SIZE = 40;

export default class MainScreen extends Component {
	constructor() {
		super();
		this.state = {
			isLoading: false,
		};

		this._onPressNext = this._onPressNext.bind(this);
        this._onPressBack = this._onPressBack.bind(this);
        this.buttonAnimated = new Animated.Value(0);
		this.growAnimated = new Animated.Value(0);
	}

	_onPressNext() {
		if (this.state.isLoading) return;

		this.setState({ isLoading: true });

		Animated.timing(
			this.growAnimated,
			{
				toValue: 1,
				duration: 300,
				easing: Easing.linear,
			}
		).start();
		setTimeout(() => {
            Actions.secondScreen();
            this.setState({ isLoading: false });
			this.buttonAnimated.setValue(0);
			this.growAnimated.setValue(0);
		}, 200);
    }

    _onPressBack() {
		if (this.state.isLoading) return;

		this.setState({ isLoading: true });

		Animated.timing(
			this.growAnimated,
			{
				toValue: 1,
				duration: 300,
				easing: Easing.linear,
			}
		).start();
		setTimeout(() => {
            if (Actions.length > 0) {
                Actions.pop();
            } else {
                Actions.loginScreen();
            }
		}, 200);
	}

	render() {
		const changeScale = this.growAnimated.interpolate({
			inputRange: [0, 1],
			outputRange: [1, SIZE],
		});
		return (
			<View style={styles.container}>
                <Text style={styles.title}>Welcome to my app!</Text>
                <View style={styles.groupBtn}>
                    <TouchableOpacity onPress={this._onPressBack}
                        style={styles.button}
                        activeOpacity={1}>
                        <Image style={styles.image} source={arrowBackImg} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._onPressNext}
                        style={styles.button}
                        activeOpacity={1}>
                        <Image style={styles.image} source={arrowNextImg} />
                    </TouchableOpacity>
                </View>
                <Animated.View style={[ styles.circle, {transform: [{scale: changeScale}]} ]} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        marginVertical: 30,
        fontSize: 30,
        color: 'lightblue'   
    },
    groupBtn: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		width: SIZE,
		height: SIZE,
        borderRadius: 100,
        margin: 10,
		zIndex: 99,
		backgroundColor: 'lightblue',
	},
	circle: {
		height: SIZE,
		width: SIZE,
		marginTop: -SIZE,
		borderRadius: 100,
		backgroundColor: 'transparent',
	},
	image: {
		width: 24,
		height: 24,
    },
});