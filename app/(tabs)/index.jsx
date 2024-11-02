import React from 'react';
import { StyleSheet, View, Text, Button, Image } from 'react-native';

const HomePage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header />
      <MainContent />
      <Footer />
    </View>
  );
};

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>Welcome to My App</Text>
    </View>
  );
};

const MainContent = () => {
  return (
    <View style={styles.mainContent}>
      <Image
        source={{ uri: 'https://via.placeholder.com/150' }} // Replace with your image URL
        style={styles.image}
      />
      <Text style={styles.contentText}>
        This is the main content area of the home page. You can add more information here.
      </Text>
      <Button title="Get Started" onPress={() => alert('Button Pressed!')} />
    </View>
  );
};

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>© 2024 My App. All rights reserved.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  header: {
    width: '100%',
    padding: 20,
    backgroundColor: '#6200EE',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  contentText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  footer: {
    padding: 10,
    backgroundColor: '#6200EE',
    alignItems: 'center',
    width: '100%',
  },
  footerText: {
    color: '#fff',
  },
});

export default HomePage;
