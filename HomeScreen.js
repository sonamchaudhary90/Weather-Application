import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, PermissionsAndroid, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import LottieView from 'lottie-react-native';

const WEATHER_API_KEY = '2678d418de41463cad4172743241809';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const weatherAnimations = {
    Clear: require('./assets/clear.json'),
    Rain: require('./assets/rain.json'),
    Clouds: require('./assets/cloudy.json'),
    Snow: require('./assets/snow.json'),
    Thunderstorm: require('./assets/thunderstorm.json'),
    Drizzle: require('./assets/drizzle.json'),
  };

  const searchAnimation = require('./assets/search.json');

  useEffect(() => {
    const fetchCurrentLocationWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        const permission = await requestLocationPermission();
        if (permission) {
          Geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${latitude},${longitude}`);
              setWeatherData(response.data);
              setLoading(false);
            },
            (error) => {
              setError('Error fetching location');
              setLoading(false);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
          );
        } else {
          setError('Location permission denied');
          setLoading(false);
        }
      } catch (err) {
        setError('Failed to request location permission');
        setLoading(false);
      }
    };

    fetchCurrentLocationWeather();
  }, []);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        setError('Failed to request location permission');
        return false;
      }
    } else {
      return true; 
    }
  };

  const getWeatherByCity = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${city}`);
      setWeatherData(response.data);
    } catch (err) {
      setError('Error fetching weather data');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      getWeatherByCity(searchTerm);
    }
  };

  return (
    <View style={styles.container}>
      <LottieView
        source={searchAnimation}
        autoPlay
        loop
        style={styles.searchAnimation}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <Button title="Search" onPress={handleSearch} color="#4F8EF7" />

      {loading ? (
        <ActivityIndicator size="large" color="#4F8EF7" style={styles.loadingIndicator} />
      ) : weatherData ? (
        <View style={styles.weatherContainer}>
          <Text style={styles.title}>Weather in {weatherData.location.name}</Text>

          
          <LottieView
            source={weatherAnimations[weatherData.current.condition.text] || weatherAnimations['Clouds']}
            autoPlay
            loop
            style={styles.weatherAnimation}
          />

          <View style={styles.weatherDetails}>
            <Text style={styles.info}>Temperature: {weatherData.current.temp_c}°C</Text>
            <Text style={styles.info}>Humidity: {weatherData.current.humidity}%</Text>
            <Text style={styles.info}>Condition: {weatherData.current.condition.text}</Text>
          </View>
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
  searchAnimation: {
    width: 250,  
    height: 250, 
    alignSelf: 'center',
    marginBottom: 20,
  },
  weatherContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  weatherAnimation: {
    width: 150,
    height: 150,
    marginVertical: 20,
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
  weatherDetails: {
    alignItems: 'center',
    marginTop: 15,
  },
  loadingIndicator: {
    marginTop: 20,
  },
});

export default App;
