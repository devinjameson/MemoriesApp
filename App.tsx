import React, {useEffect, FunctionComponent, useState} from 'react';
import {StyleSheet, Image, SafeAreaView, View, Text} from 'react-native';
import {fetchMemories, Memory} from './api';

const App: FunctionComponent = () => {
  const [memories, setMemories] = useState<Memory[]>([]);

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
    <SafeAreaView>
      <View>
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
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  image: {
    width: '97%',
    height: 200,
    resizeMode: 'contain',
  },
});

export default App;
