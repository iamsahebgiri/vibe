import { Platform, StyleSheet } from 'react-native';
import { BottomNavigation, Text } from 'react-native-paper';
import React from 'react';
import ProfileScreen from '../pages/profile';
import InboxScreen from "../pages/inbox";
import ActivityScreen from '../pages/activity';
import HomeScreen from '../pages/home';


export default function ModalScreen() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: 'home',
      title: 'Home',
      focusedIcon: 'cards',
      unfocusedIcon: 'cards-outline',
    },
    {
      key: 'activity',
      title: 'Activity',
      focusedIcon: 'compass',
      unfocusedIcon: 'compass-outline',
    },
    {
      key: 'inbox',
      title: 'Inbox',
      focusedIcon: 'inbox',
      unfocusedIcon: 'inbox-outline',
    },
    {
      key: 'profile',
      title: 'Profile',
      focusedIcon: 'account-circle',
      unfocusedIcon: 'account-circle-outline',
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeScreen,
    activity: ActivityScreen,
    inbox: InboxScreen,
    profile: ProfileScreen,
  });
  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
