// app/(tabs)/LoginScreen.tsx

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Import your backend URL
import { BACKEND_URL } from '../../constants/api';

export default function LoginRegisterScreen() {
  // Which mode are we in: 'login', 'register', or 'loggedIn'?
  const [mode, setMode] = useState<'login' | 'register' | 'loggedIn'>('login');

  // Form fields (shared for login/register)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Additional fields for registration
  const [yearOfStudy, setYearOfStudy] = useState('');
  const [program, setProgram] = useState('');

  // Store the logged-in user's info
  const [currentUser, setCurrentUser] = useState<null | {
    id: number;
    username: string;
    yearofstudy: string;
    program: string;
  }>(null);

  // Auto-login on mount if a user is saved in AsyncStorage
  useEffect(() => {
    const loadUser = async () => {
      try {
        const savedUser = await AsyncStorage.getItem('currentUser');
        if (savedUser) {
          setCurrentUser(JSON.parse(savedUser));
          setMode('loggedIn');
        }
      } catch (error) {
        console.error('Error loading user from storage', error);
      }
    };
    loadUser();
  }, []);

  // Handle login
  const handleLogin = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      if (response.ok) {
        // Logged in successfully, save user to AsyncStorage
        setCurrentUser(data.user);
        setMode('loggedIn');
        await AsyncStorage.setItem('currentUser', JSON.stringify(data.user));
      } else {
        alert(data.error || 'Login failed');
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong.');
    }
  };

  // Handle registration with validation
  const handleRegister = async () => {
    // Validate required fields
    if (!username || !password || !yearOfStudy || !program) {
      alert('All fields are required.');
      return;
    }
    // Username must be more than 6 characters and less than 14 characters
    if (username.length <= 6) {
      alert('Username must be more than 6 characters.');
      return;
    }
    if (username.length >= 14) {
      alert('Username must be less than 14 characters.');
      return;
    }
    // Password must be exactly 6 characters
    if (password.length <= 6) {
      alert('Password must be greater than 6 characters.');
      return;
    }

    if (password.length >= 14) {
      alert('Password must be less than 14 characters.');
      return;
    }
    // Year of Study must be a number between 1 and 20
    const numericYear = parseInt(yearOfStudy, 10);
    if (isNaN(numericYear) || numericYear < 1 || numericYear > 20) {
      alert('Year of Study must be a number between 1 and 20.');
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          username, 
          password, 
          yearOfStudy: numericYear.toString(), 
          program 
        }),
      });
      const data = await response.json();

      if (response.ok) {
        // Registration success: auto-login and save user
        setCurrentUser(data.user);
        setMode('loggedIn');
        await AsyncStorage.setItem('currentUser', JSON.stringify(data.user));
      } else {
        alert(data.error || 'Registration failed');
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong.');
    }
  };

  // Logout: clear state and AsyncStorage
  const handleLogout = async () => {
    setCurrentUser(null);
    setUsername('');
    setPassword('');
    setYearOfStudy('');
    setProgram('');
    setMode('login');
    await AsyncStorage.removeItem('currentUser');
  };

  // Delete Account: remove user from database and log out
  const handleDeleteAccount = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/delete`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: currentUser?.id }),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Account deleted successfully.');
        handleLogout();
      } else {
        alert(data.error || 'Error deleting account.');
      }
    } catch (error) {
      console.error(error);
      alert('Error deleting account.');
    }
  };

  // Conditionally render UI based on `mode`
  if (mode === 'loggedIn' && currentUser) {
    // Logged In View with Logout and Delete Account options
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome, {currentUser.username}!</Text>
        <Text style={styles.info}>
          Year of Study: {currentUser.yearofstudy}
        </Text>
        <Text style={styles.info}>Program: {currentUser.program}</Text>
        
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, { backgroundColor: 'red' }]} 
          onPress={handleDeleteAccount}
        >
          <Text style={styles.buttonText}>Delete Account</Text>
        </TouchableOpacity>
      </View>
    );
  } else if (mode === 'register') {
    // Register Form
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Enter Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Year of Study"
          value={yearOfStudy}
          onChangeText={setYearOfStudy}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Program"
          value={program}
          onChangeText={setProgram}
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Submit Registration</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, { backgroundColor: 'gray' }]} 
          onPress={() => setMode('login')}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    // mode === 'login'
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Enter Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={{ marginTop: 10 }}
          onPress={() => setMode('register')}
        >
          <Text style={{ color: 'blue' }}>No account? Register here</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: '#fff' 
  },
  title: { fontSize: 24, marginBottom: 20, fontWeight: 'bold' },
  input: {
    width: '80%',
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#f1f1f1',
    borderRadius: 5,
  },
  button: {
    backgroundColor: 'black',
    width: '80%',
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 5,
  },
  buttonText: { color: 'white', fontWeight: 'bold' },
  info: { fontSize: 16, marginVertical: 5 },
});
