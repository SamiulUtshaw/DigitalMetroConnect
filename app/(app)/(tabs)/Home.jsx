import { View, Text, Platform, SafeAreaView, ScrollView, StyleSheet, ToastAndroid, TouchableOpacity, Modal, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../context/authContext'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useFonts } from 'expo-font'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../../firebaseConfig'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';



export default function Home() {
  const { user } = useAuth()
  const router = useRouter()
  const [rapidpass, setRapidpass] = useState('');
  const [balance, setBalance] = useState('');




  

  useFocusEffect(
    React.useCallback(() => {
      const fetchUserData = async () => {
        try {
          await AsyncStorage.removeItem('userData'); // Invalidate cache for fresh fetch
          const storedUserData = await AsyncStorage.getItem('userData');
          if (storedUserData) {
            const userData = JSON.parse(storedUserData);
            console.log('Data from AsyncStorage:', userData);
            setBalance(userData.balance || '');
            setRapidpass(userData.rapidpass || '');
          } else if (user && user.userId) {
            const userDoc = doc(db, `users/${user.userId}`);
            const docSnapshot = await getDoc(userDoc);
            if (docSnapshot.exists()) {
              const userData = docSnapshot.data();
              setBalance(userData.balance || '');
              setRapidpass(userData.rapidpass || '');
              await AsyncStorage.setItem('userData', JSON.stringify(userData));
            }
          }
        } catch (error) {
          console.error('Error loading user data:', error);
        }
      };
  
      fetchUserData();
    }, [user])
  );
  


  let [fontsLoaded] = useFonts({
    'poppins-regular': require('../../../assets/fonts/NeueHaasDisplayRoman.ttf'),
    'poppins-semibold': require('../../../assets/fonts/NeueHaasDisplayMediu.ttf'),
    'neue-regular': require('../../../assets/fonts/NeueHaasDisplayRoman.ttf'),
    'neue-semibold': require('../../../assets/fonts/NeueHaasDisplayMediu.ttf'),
  })

  if (!fontsLoaded) {
    return null
  }



  return (
    <SafeAreaView style={[styles.container, {
      paddingTop: Platform.OS === 'android' ? 30 : 0
    }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.searchContainer}>
          <Text style={styles.subheading}>Welcome, {user.username}</Text>
          <Text style={styles.heading}>Where are you going now?</Text>
          <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <Text style={styles.cardTitle}>Dhaka Metro Rapid Pass</Text>
                            <Ionicons name="subway-outline" size={24} color="#232323" />
                        </View>
                        <Text style={styles.cardNumber}>RP {rapidpass}</Text>
                        <View style={styles.balanceContainer}>
                            <Text style={styles.balanceLabel}>Available Balance</Text>
                            <Text style={styles.balanceAmount}>BDT {parseFloat(balance).toFixed(2)}</Text>
                        </View>
                    </View>
          
        </View>

        <View style={styles.menuGrid}>
          <TouchableOpacity style={[styles.menuItem, { backgroundColor: '#C9E9D2' }]}
            onPress={() => router.push('/Notices')}
          >
            <View style={styles.iconContainer}>
              <Ionicons name="notifications-outline" size={24} color="#666" />
            </View>
            <Text style={styles.menuText}>Metro Notices</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, { backgroundColor: '#C9E9D2' }]}
            onPress={() => router.push('/Ticket')}
          >
            <View style={styles.iconContainer}>
              <Ionicons name="ticket-outline" size={24} color="#666" />
            </View>
            <Text style={styles.menuText}>Tickets</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, { backgroundColor: '#C9E9D2' }]}
            onPress={() => router.push('/Map')}
          >
            <View style={styles.iconContainer}>
              <Ionicons name="map-outline" size={24} color="#666" />
            </View>
            <Text style={styles.menuText}>Transport Map</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, { backgroundColor: '#C9E9D2' }]} 
            onPress={() => router.push('/Recharge')}
          >
            <View style={styles.iconContainer}>
              <Ionicons name="card-outline" size={24} color="#666" />
            </View>
            <Text style={styles.menuText}>Recharge</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.frequentSection}>
          <Text style={styles.sectionTitle}>Frequently visited station</Text>
          
          <View style={styles.journeyCard}>
            <View style={styles.journeyHeader}>
              <View style={styles.timeContainer}>
                <Text style={styles.label}>Arrival</Text>
                <Text style={styles.time}>9:30PM</Text>
              </View>
              <View style={styles.statusContainer}>
                <View style={styles.statusDot} />
                <Text style={styles.statusText}>Completed</Text>
              </View>
              <View style={styles.trainContainer}>
                <Text style={styles.label}>Train No.</Text>
                <Text style={styles.trainNumber}>DMR-U2</Text>
              </View>
            </View>

            <View style={styles.stationContainer}>
              <View style={styles.stationTrack}>
                <View style={styles.trackLine} />
                <View style={styles.trackDots}>
                  {[...Array(5)].map((_, i) => (
                    <View key={i} style={styles.dot} />
                  ))}
                </View>
              </View>
              <View style={styles.stationNames}>
                <Text style={styles.stationText}>Pallabi</Text>
                <Text style={styles.stationText}>Shahbagh</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingBottom: 60,
  },
  searchContainer: {
    padding: 16,
  },
  cardContainer: {
    padding: 20,
},
card: {
    backgroundColor: '#80C4E9',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
},
cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
},
cardTitle: {
    color: '#232323',
    fontSize: 20,
    fontFamily: 'neue-semibold',
},
cardNumber: {
    color: '#232323',
    fontSize: 16,
    letterSpacing: 2,
    marginBottom: 20,
},
balanceContainer: {
    borderTopWidth: 1,
    borderTopColor: 'rgb(35, 35, 35)',
    paddingTop: 15,
},
balanceLabel: {
    color: '#232323',
    fontSize: 14,
    opacity: 0.8,
},
balanceAmount: {
    color: '#232323',
    fontSize: 24,
    fontFamily: 'neue-semibold',
    marginTop: 5,
},
  heading: {
    color: '#232323',
    fontSize: 24,
    fontFamily: 'neue-semibold',
    marginBottom: 16,
  },
  subheading: {
    fontSize: 16,
    color: '#232323',
    marginBottom: 8,
    fontFamily: 'neue-regular',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 12,
  },
  searchInput: {
    flex: 1,
    marginRight: 8,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
    gap: 30,
  },
  menuItem: {
    width: '45%',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  iconContainer: {
    marginBottom: 12,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'neue-semibold',
  },
  frequentSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    fontFamily: 'neue-semibold',
  },
  journeyCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  journeyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  timeContainer: {
    alignItems: 'flex-start',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginRight: 4,
  },
  statusText: {
    color: '#4CAF50',
    fontSize: 12,
    fontFamily: 'neue-semibold',
  },
  trainContainer: {
    alignItems: 'flex-end',
  },
  label: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
    fontFamily: 'neue-regular',
  },
  time: {
    fontSize: 16,
    fontFamily: 'neue-semibold',
  },
  trainNumber: {
    fontSize: 16,
    fontFamily: 'neue-semibold',
  },
  stationContainer: {
    marginBottom: 24,
  },
  stationTrack: {
    height: 20,
    marginBottom: 8,
    position: 'relative',
  },
  trackLine: {
    position: 'absolute',
    top: 9,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#e0e0e0',
  },
  trackDots: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 5,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
  },
  stationNames: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stationText: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'neue-semibold',
  },
  bookButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    padding: 16,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'neue-semibold',
  },
})
