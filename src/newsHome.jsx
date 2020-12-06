import React, { useState, useEffect, useRef } from 'react';
import { Avatar, Card, Title, Paragraph, Button } from 'react-native-paper';
import axios from 'axios';
import { Animated, View, ScrollView } from 'react-native';
import { Host, Portal } from 'react-native-portalize';
import AsyncStorage from '@react-native-community/async-storage';
import { Layout } from './components/layout/Layout';
import { Header } from './components/header/Header';
import { WebView } from './webView';




export const NewsHome = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [lengthArr, setLengthArr] = useState(0);
  const [link, setLink] = useState("");

  const [load, setLoad] = useState(false);
  const animated = useRef(new Animated.Value(0)).current;



  useEffect(() => {
    axios.get('http://13.212.165.87/news/_search')
        .then(res => {
            setData(res.data.hits.hits);
            setLoad(true);
            setLengthArr(data.length)
        })
        .catch(err => {
            console.log(err.message);
            setLoad(true)
        })
  }, []);
  
  function replaceHtml(content){
     let stripedHtml = content.replace(/<[^>]+>/g, '');
     return stripedHtml
  }
  function pressNews (key){
    console.log(key)
    navigation.navigate('WebView', { link:  data[key]._source.link} )
  }
  const listNews = data.map((index, key)=>
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
    <Button icon="bookmark-outline" onPress={()=>saveNews(index)}/>
    </Card.Actions>
  </Card>
)
  
  async function saveNews(item){
    console.log(item)
    const existingProducts = await AsyncStorage.getItem('@itemsSaved:test')
    let listNews = await JSON.parse(existingProducts);
    if( !listNews ){
      listNews = []
    }
    await listNews.push( item )
    await AsyncStorage.setItem('@itemsSaved:test', JSON.stringify(listNews) )
    .then( ()=>{
    console.log('It was saved successfully')
    } )
    .catch( ()=>{
    console.log('There was an error saving the product')
    } )
  }
  return (
    <Host style={{ zIndex: 0 }}>
      <Layout
        // Style here is used to create the iOS 13 modal presentation style for the AppleMusicPlayer example
        style={{
          borderRadius: animated.interpolate({ inputRange: [0, 1], outputRange: [0, 12] }),
          transform: [
            {
              scale: animated.interpolate({ inputRange: [0, 1], outputRange: [1, 0.92] }),
            },
          ],
          opacity: animated.interpolate({ inputRange: [0, 1], outputRange: [1, 0.75] }),
        }}
      >
        <ScrollView>
        {listNews}
        </ScrollView>

      </Layout>
        {/* {data.map((index, key)=>
        <WebView key={key} ref={el => (modals[key] = el) }
                  link= {index._source.link}
                />
          )} */}
    </Host>
  );
};

