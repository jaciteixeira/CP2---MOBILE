import { StyleSheet, Text, View, FlatList, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';

export default function App() {
  const [data, setDados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await fetch('http://192.168.0.102/veiculo');
        const json = await response.json();
        setDados(json);
        setLoading(false);
      } catch (error){
        console.log(error);
      } 
    };
    fetchData();
  }, []);
  
  if (loading) {
    return <ActivityIndicator size="large"/>
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>CHECKPOINT 2 - Consumindo API</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity style={styles.item}>
              <Image
                style={styles.avatar}
                source={{uri: item.linkFoto}}
              />
              <Text>{item.nome}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin:20,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo:{
    padding:10,
    fontSize: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 25,
    marginRight: 10,
  },
});
