import React, { useState, useCallback, useEffect } from 'react';
import { Appbar, Card, Title, Paragraph, Searchbar, useTheme } from 'react-native-paper';
import axios from 'axios';
import { Animated, View, ScrollView } from 'react-native';
import { Host, Portal } from 'react-native-portalize';
import { debounce } from "lodash";

export const Results = ({ navigation }) => {
    const theme = useTheme();   
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = React.useState('');

  const [load, setLoad] = useState(false);

  const debounceLoadData = useCallback(debounce((searchQuery)=>{onChangeSearch(searchQuery)}, 1000), []);

  useEffect(() => {
    debounceLoadData(searchQuery);
  }, [searchQuery]);

  const onTypingSearch = query => setSearchQuery(query);
  
  function onChangeSearch (searchQuery){
      console.log(searchQuery)
    axios.post('http://13.212.165.87/news/_search', 
    {
        "size": 10,
        "from": 0,
        "query":{
           "query_string":{
              "query": searchQuery
           }
        },
         "sort": [{ "date": "desc" }]
     }
    )
        .then(res => {
            setData(res.data.hits.hits);
            setLoad(true);
        })
        .catch(err => {
            console.log(err.message);
            setLoad(true)
        })
  }

  
  function replaceHtml(content){
     let stripedHtml = content.replace(/<[^>]+>/g, '');
     return stripedHtml
  }
  function pressNews (key){
    navigation.navigate('WebView', { link:  data[key]._source.link} )
    // navigation.setOptions({ link:  data[key]._source.link});
    // modals[key].open()
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
    </Card>
)
  
  return (
    <Host style={{ zIndex: 0 }}>

        <Appbar.Header
            theme={{ colors: { primary: theme.colors.surface } }}
            style={{alignItems: 'center',justifyContent: 'space-between',}}
            >
            <Appbar.BackAction onPress={() => navigation.navigate('Home')}  style={{ margin: 0}}/>
            <Searchbar
                placeholder="Search"
                onChangeText={onTypingSearch}
                // onFocus={ ()=>onFocus() }
                autoFocus={true}
                value={searchQuery}
                style={{ height: 40, width: "89%", borderRadius: 30, shadowColor: "#000",
                shadowOffset: {
                width: 0,
                height: 0,
                },
                shadowOpacity: 0,
                shadowRadius: 0,
                elevation: 0,
                backgroundColor: '#F0EFF4'}}
                />
        </Appbar.Header>
        <ScrollView>
        {listNews}
        </ScrollView>

    </Host>
  );
};

