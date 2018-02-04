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

import arrowImg from '../images/left-arrow.png';

const SIZE = 40;

export default class SecondScreen extends Component {
	constructor() {
		super();
		this.state = {
			isLoading: false,
		};

		this._onPress = this._onPress.bind(this);
		this.growAnimated = new Animated.Value(0);
	}

	_onPress() {
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
            Actions.pop();
		}, 200);
	}

	render() {
		const changeScale = this.growAnimated.interpolate({
			inputRange: [0, 1],
			outputRange: [1, SIZE],
		});
		return (
			<View style={styles.container}>
                <Text style={styles.title}>Second Screen</Text>
				<TouchableOpacity onPress={this._onPress}
					style={styles.button}
					activeOpacity={1}>
					<Image style={styles.image} source={arrowImg} />
				</TouchableOpacity>
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
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		width: SIZE,
		height: SIZE,
		borderRadius: 100,
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