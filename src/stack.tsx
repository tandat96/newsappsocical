import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { Appbar, Avatar, useTheme, Searchbar } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { BottomTabs } from './bottomTabs';
import { Details } from './details';
import { StackNavigatorParamlist } from './types';

const Stack = createStackNavigator<StackNavigatorParamlist>();

export const StackNavigator = ({navigation}) => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);
  function onFocus(){
    navigation.navigate('Results' )
  }
  return (
    <Stack.Navigator
      initialRouteName="FeedList"
      headerMode="screen"
      screenOptions={{
        header: ({ scene, previous, navigation }) => {
          const { options } = scene.descriptor;
          const title =
            options.headerTitle !== undefined
              ? options.headerTitle
              : options.title !== undefined
              ? options.title
              : scene.route.name;

          return (
            <Appbar.Header 
              theme={{ colors: { primary: theme.colors.surface } }}
            >
              <Searchbar
                placeholder="Search"
                // onChangeText={onChangeSearch}
                onFocus={ ()=>onFocus() }
                value={searchQuery}
                style={{ height: 40,marginRight: 5, marginLeft: 10, width: "80%", borderRadius: 30, shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 0,
                },
                shadowOpacity: 0,
                shadowRadius: 0,
                elevation: 0,
                backgroundColor: '#F0EFF4'}}
              />
              {previous ? (
                <Appbar.BackAction
                  onPress={navigation.goBack}
                  color={theme.colors.primary}
                />
              ) : (
                <TouchableOpacity
                  style={{ marginLeft: 10 }}
                  onPress={() => {
                    ((navigation as any) as DrawerNavigationProp<{}>).openDrawer();
                  }}
                >
                  <Avatar.Image
                    size={40}
                    source={{
                      uri:
                        'https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg',
                    }}
                  />
                </TouchableOpacity>
              )}
            </Appbar.Header>
          );
        },
      }}
    >
      <Stack.Screen
        name="FeedList"
        component={BottomTabs}
        options={({ route }) => {
          console.log('!@# options', { route });
          const routeName = route.state
            ? route.state.routes[route.state.index].name
            : 'Home';
          return { headerTitle: routeName };
        }}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{ headerTitle: 'Tweet' }}
      />
    </Stack.Navigator>
  );
};
