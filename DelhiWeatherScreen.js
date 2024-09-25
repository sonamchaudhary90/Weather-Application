// DelhiWeatherScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import axios from 'axios';

const WEATHER_API_KEY = '2678d418de41463cad4172743241809';

const weatherIcons = {
  Clear: require('./assets/clear.json'),
  Rain: require('./assets/rain.json'),
  Clouds: require('./assets/cloudy.json'),
  Snow: require('./assets/snow.json'),
  Thunderstorm: require('./assets/thunderstorm.json'),
  Drizzle: require('./assets/drizzle.json'),
};

const DelhiWeatherScreen = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=Delhi`);
        setWeatherData(response.data);
      } catch (err) {
        setError('Error fetching weather data');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#4F8EF7" style={styles.loadingIndicator} />
      ) : weatherData ? (
        <View style={styles.weatherContainer}>
          <Text style={styles.title}>Weather in Delhi</Text>
          <Image
            source={weatherIcons[weatherData.current.condition.text] || weatherIcons['Clouds']}
            style={styles.weatherImage}
          />
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
  weatherImage: {
    width: 100,
    height: 100,
    marginVertical: 20,
  },
});

export default DelhiWeatherScreen;
