import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';

import { StackNavigator } from './stack';
import { WebView } from './webView.jsx';
import { Results } from './results.jsx';
import { NewsHome } from './newsHome.jsx';
import { Notifications } from './notifications';
import { DrawerContent } from './drawerContent';

const Drawer = createDrawerNavigator();

export const RootNavigator = () => {
  const theme = useTheme();
  const navigationTheme = theme.dark ? DarkTheme : DefaultTheme;

  return (
    <NavigationContainer theme={navigationTheme}>
      <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />} initialRouteName="Home">
        <Drawer.Screen name="Home" component={StackNavigator} />
        <Drawer.Screen name="WebView" component={WebView} />
        <Drawer.Screen name="Results" component={Results} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
