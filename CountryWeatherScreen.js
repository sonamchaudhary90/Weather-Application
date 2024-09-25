// CountryWeatherScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const WEATHER_API_KEY = '2678d418de41463cad4172743241809';

const CountryWeatherScreen = () => {
  const [country, setCountry] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getWeatherByCountry = async (country) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${country}`);
      setWeatherData(response.data);
    } catch (err) {
      setError('Error fetching weather data');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (country.trim()) {
      getWeatherByCountry(country);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter country name"
        value={country}
        onChangeText={setCountry}
      />
      <Button title="Search" onPress={handleSearch} color="#4F8EF7" />

      {loading ? (
        <ActivityIndicator size="large" color="#4F8EF7" style={styles.loadingIndicator} />
      ) : weatherData ? (
        <View style={styles.weatherContainer}>
          <Text style={styles.title}>Weather in {weatherData.location.name}</Text>
          <Text style={styles.info}>Temperature: {weatherData.current.temp_c}°C</Text>
          <Text style={styles.info}>Humidity: {weatherData.current.humidity}%</Text>
          <Text style={styles.info}>Condition: {weatherData.current.condition.text}</Text>
        </View>
      ) : (
        <Text style={styles.errorText}>{error || 'No data available'}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 15,
    marginBottom: 20,
    borderRadius: 25,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  weatherContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  info: {
    fontSize: 18,
    marginVertical: 5,
    color: '#333',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
  loadingIndicator: {
    marginTop: 20,
  },
});

export default CountryWeatherScreen;
