/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { COLORS } from './src/constants/theme';
import ActivityScreen from './src/screens/ActivityScreen';
import BookMarksScreen from './src/screens/BookMarksScreen';
import DiscoverScreen from './src/screens/DiscoverScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Tab = createBottomTabNavigator();

function App(): JSX.Element {

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        tabBarActiveTintColor: COLORS.white,
        tabBarInactiveTintColor: COLORS.grey2,
        tabBarItemStyle: {backgroundColor: COLORS.black}
        }}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{
            tabBarIcon: () => (
                <Image source={require('./src/assets/home_icon.png')} style={styles.tabBarIcon}/>
            )
          }}
        />
        <Tab.Screen 
            name="Discover" 
            component={DiscoverScreen} 
            options={{
                tabBarIcon: () => (
                    <Image source={require('./src/assets/discover_icon.png')} style={styles.tabBarIcon}/>
                )
            }}
        />
        <Tab.Screen name="Activity" component={ActivityScreen} 
            options={{
                tabBarIcon: () => (
                    <Image source={require('./src/assets/stopwatch_light_grey.png')} style={styles.tabBarIcon}/>
                )
            }}
        />
        <Tab.Screen name="Bookmarks" component={BookMarksScreen} 
            options={{
                tabBarIcon: () => (
                    <Image source={require('./src/assets/bookmark_icon.png')} style={styles.tabBarIcon}/>
                )
            }}
        />
        <Tab.Screen name="Profile" component={ProfileScreen} 
            options={{
                tabBarIcon: () => (
                    <Image source={require('./src/assets/profile_icon.png')} style={styles.tabBarIcon}/>
                )
            }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
    tabBarIcon: {
        height: 24,
        width: 24
    }
});
