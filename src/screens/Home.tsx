import React, {useEffect, FunctionComponent, useState} from 'react';
import {StyleSheet, Image, View, Text, Button} from 'react-native';
import {fetchMemories, Memory} from '../api';
import {useNavigation} from '@react-navigation/native';

const Home: FunctionComponent = () => {
  const [memories, setMemories] = useState<Memory[]>([]);
  const navigation = useNavigation();

  const getMemoriesList = () => {
    fetchMemories().then((response) => {
      if (response) {
        setMemories(response);
      }
    });
  };

  useEffect(() => {
    getMemoriesList();
  }, []);

  const hasImages = (memory: Memory): boolean => {
    return memory.images.length > 0;
  };

  return (
    <View>
      <Button
        title="Add Memory"
        onPress={() => {
          navigation.navigate('AddMemory');
        }}
      />
      {memories.map((memory, idx) => {
        return (
          <View key={idx}>
            <Text>{memory.description}</Text>
            {hasImages(memory) && (
              <Image source={{uri: memory.images[0]}} style={style.image} />
            )}
          </View>
        );
      })}
    </View>
  );
};

const style = StyleSheet.create({
  image: {
    width: '97%',
    height: 200,
    resizeMode: 'contain',
  },
});

export default Home;
