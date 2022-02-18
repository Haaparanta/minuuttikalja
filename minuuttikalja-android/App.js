import React, { useState, useEffect, Component } from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  Alert,
  SafeAreaView,
  ScrollView,
  Linking,
  Dimensions,
  Vibration,
} from 'react-native';

const gameTime = 60;

export default class App1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sec: gameTime,
      min: 0,
      gameON: false,
      beerPlatter: '',
      vibrationON: true,
      playingStatus: "nosound",
    };
  }

  componentDidMount() {
    this.intval = setInterval(() => {
      if (this.state.gameON) {
        this.setState({ sec: this.state.sec - 1 });
      }
    }, 1000);
  }

  render() {
    var vibrationTime = 0;
    const beerSize = 40;
    const { height, width } = Dimensions.get('window');
    const paddingConst = (width % beerSize) / 2;
    if (this.state.sec == 0) {
      this.setState({ sec: gameTime });
      this.setState({ min: this.state.min + 1 });
      let String_1 = this.state.beerPlatter;
      let String_2 = '🍺';
      let String_3 = String_1.concat(' ', String_2);
      this.setState({ beerPlatter: String_3 });
      if (this.state.vibrationON) {
        vibrationTime = 1000;
      }
    }
    return (
      <ScrollView>
        <View
          style={{
            marginTop: 50,
            alignItems: 'center',
          }}>
          <Text style={{ fontSize: 45 }} adjustsFontSizeToFit numberOfLines={1}>
            🍻Minuuttikalja🍻
          </Text>
          <Text
            style={{ fontSize: 180 }}
            adjustsFontSizeToFit
            numberOfLines={1}>
            {this.state.sec}
          </Text>
          <Text style={{ fontSize: 45 }} adjustsFontSizeToFit numberOfLines={1}>
            SHOTS 🍺: {this.state.min}
          </Text>
        </View>
        <Button
          title="Start"
          color="#841584"
          onPress={() => this.setState({ gameON: true })}
        />
        <Button
          title="Reset"
          color="#841584"
          onPress={() =>
            this.setState({
              gameON: false,
              sec: gameTime,
              min: 0,
              beerPlatter: '',
            })
          }
        />
        <Button
          title="Vibration ON"
          color="#841584"
          onPress={() => this.setState({ vibrationON: true })}
        />
        <Button
          title="Vibration off"
          color="#841584"
          onPress={() => this.setState({ vibrationON: false })}
        />
        <Button
          title="Rules"
          color="#841584"
          onPress={() => Linking.openURL('https://www.minuuttikalja.fi/')}
        />
        <Text
          style={{
            fontSize: beerSize,
            paddingHorizontal: paddingConst + 20,
            marginTop: 15,
          }}>
          {this.state.beerPlatter}
          {Vibration.vibrate(vibrationTime)}
        </Text>
      </ScrollView>
    );
  }
}
