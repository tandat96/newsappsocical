import React,{useEffect,useState} from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { MaterialBottomTabNavigationProp } from '@react-navigation/material-bottom-tabs';
import { Headline, Caption, useTheme, Button,  Card, Title, Paragraph } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import overlay from './overlay';



export const Save = ({navigation}) => {
  const theme = useTheme();
  const [saved, setSaved] = useState([]);

  const backgroundColor = overlay(2, theme.colors.surface);

  useFocusEffect(
    React.useCallback(() => {
      getSaved();

    }, [])
    );

  async function getSaved() {
    const existingProducts = await AsyncStorage.getItem('@itemsSaved:test')
    if(existingProducts !== null){
      await setSaved(JSON.parse(existingProducts))
    }
  }
  function replaceHtml(content){
    let stripedHtml = content.replace(/<[^>]+>/g, '');
    return stripedHtml
  }
  function pressNews (key){
    navigation.navigate('WebView', { link:  saved[key]._source.link} )
  }
  async function removeNews(item){
    const existingProducts = await AsyncStorage.getItem('@itemsSaved:test')
    let listNews = await JSON.parse(existingProducts);
    if( !listNews ){
      listNews = []
    }
    if(listNews != undefined){
      await listNews.map((i, n)=>{
        if(item._id === i._id){
          listNews.splice(n, 1);
        }
      })
    }
    await AsyncStorage.setItem('@itemsSaved:test', JSON.stringify(listNews) )
    .then( ()=>{
    console.log('It was removed successfully')
    getSaved();
    } )
    .catch( ()=>{
    console.log('There was an error saving the product')
    } )
  }
  return (
      <ScrollView>
      {saved.map((index, key)=>
        <Card key={key} onPress={() => pressNews(key)} style={{margin: 10, borderRadius: 5, overflow: 'hidden',
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.18,
          shadowRadius: 1.00,
          
          elevation: 1,
          }}>
          <Card.Content>
          <Card.Cover source={{ uri: index._source.img_src }} />
          <Title style={{marginTop: 5}}>{index._source.title}</Title>
          <Paragraph numberOfLines={2}>{replaceHtml(index._source.content)}</Paragraph>
          </Card.Content>
          <Card.Actions>
          <Button icon="bookmark-remove" onPress={()=>removeNews(index)}/>
            {/* <Button>Ok</Button> */}
          </Card.Actions>
      </Card>
      )}
      
      </ScrollView>
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
