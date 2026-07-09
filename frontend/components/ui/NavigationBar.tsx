import React from 'react';
import { View, StyleSheet, Image, Platform } from 'react-native';
import { Link } from 'expo-router'; // Import Link for navigation

export default function NavigationBar() {
  if (Platform.OS !== 'web') return null; // Only render this on the web

  console.log("NavigationBar Rendered");

  return (
    <View style={styles.navbar}>
      {/* Logo on the left */}
      <View style={styles.logoContainer}>
        <Image
          source={require('@/assets/images/logo.png')} // Path to your logo
          resizeMode="contain" // Ensures the image scales correctly
          style={styles.logo}
        />
      </View>
      {/* Navigation Tabs */}
      <View style={styles.tabsContainer}>
        <Link href="/" style={styles.tab}>Home</Link>
        <Link href="/calendar" style={styles.tab}>Calendar</Link>
        <Link href="/advising" style={styles.tab}>Advising</Link>
        <Link href="/groupchat" style={styles.tab}>Group Chat</Link>
        <Link href="/signup" style={styles.tab}>Login</Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    position: 'fixed',
    top: 0,
    width: '100%',
    height: 60,
    backgroundColor: '#fff', // Ensure a solid color for visibility
    zIndex: 1000, // Bring to front
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  logo: {
    height: 60,
    width: 100,
    resizeMode: 'contain',
  },
  tabsContainer: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 15,
  },
  tab: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
    marginHorizontal: 10,
    textDecorationLine: 'none', // Remove underline for links
  },
});
