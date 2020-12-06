import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialBottomTabNavigationProp } from '@react-navigation/material-bottom-tabs';
import { Headline, Caption, useTheme, Button } from 'react-native-paper';



export const TaskWork = () => {
  const theme = useTheme();


  return (
    <View
    >
      <Headline style={styles.centerText}>
        PENDING
      </Headline>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerText: {
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
  },
});
