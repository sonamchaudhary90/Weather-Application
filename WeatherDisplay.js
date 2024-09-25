import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WeatherDisplay = ({ weather }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.city}>{weather.name}</Text>
      <Text style={styles.temp}>{weather.main.temp}°C</Text>
      <Text style={styles.desc}>{weather.weather[0].description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
  city: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  temp: {
    fontSize: 48,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  desc: {
    fontSize: 18,
    fontStyle: 'italic',
  },
});

export default WeatherDisplay;
