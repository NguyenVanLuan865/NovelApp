import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from 'react-native-vector-icons';
import theme from './src/styles/theme';
import { TopicProvider } from './src/context/TopicContext';
import { UserProvider } from './src/context/UserContext';
import { LogBox } from 'react-native';

import { HomeScreen } from './src/screen/HomeScreen';
import { UserScreen } from './src/screen/UserScreen';
import { BookScreen } from './src/screen/BookScreen';
import { Setting } from './src/screen/Setting.js';
import { Infouser } from './src/screen/Infouser.js';
import { NovelDetail } from './src/screen/NovelDetail.js';
import { ChapterViewer } from './src/screen/ChapterViewer.js';
import { LoginScreen } from './src/screen/LoginScreen.js';
import { Register } from './src/screen/RegisterScreen.js';
import { ListChapter } from './src/screen/LIstChapter.js';
import { SearchScreen } from './src/screen/SearchScreen.js';
import { CommentScreen } from './src/screen/CommentScreen.js';
const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

function CustomTabBarButton({ children, onPress, accessibilityState }) {
  const isSelected = accessibilityState.selected;
  return (
    <TouchableOpacity
      style={[
        styles.tabBarButton,
        isSelected ? styles.selectedTabBarButton : null
      ]}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Trang chủ') {
            iconName = 'home';
          } else if (route.name === 'Tài khoản') {
            iconName = 'user';
          } else if (route.name === 'Tủ sách') {
            iconName = 'book';
          }

          return <Feather name={iconName} size={20} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.buttonIcon,
        tabBarInactiveTintColor: theme.colors.text,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarButton: (props) => <CustomTabBarButton {...props} />
      })}
    >
      <Tab.Screen name="Trang chủ" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Tủ sách" component={BookScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Tài khoản" component={UserScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}
LogBox.ignoreAllLogs(true);
export default function App() {
  
  return (
    <TopicProvider>
      <UserProvider>
        <NavigationContainer >
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="Info" component={Infouser} options={{ headerShown: false }} />
            <Stack.Screen name="Setting" component={Setting} options={{ headerShown: false }} />
            <Stack.Screen name="NovelDetail" component={NovelDetail} options={{ headerShown: false }} />
            <Stack.Screen name="ChapterViewer" component={ChapterViewer} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
            <Stack.Screen name="ListView" component={ListChapter} options={{ headerShown: false }} />
            <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Comment" component={CommentScreen} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </UserProvider>
    </TopicProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBarButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedTabBarButton: {
    marginTop: 5,
    borderRadius: 30,
    backgroundColor: theme.colors.buttonbackgroud,
  }
});
