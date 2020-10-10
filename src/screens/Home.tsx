import React, {FunctionComponent, useState, useCallback} from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  Button,
  SafeAreaView,
} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';

import {fetchMemories, Memory} from '../api';

import {Spacing, Typography} from './styles';

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

  useFocusEffect(
    useCallback(() => {
      getMemoriesList();
    }, []),
  );

  const hasImages = (memory: Memory): boolean => {
    return memory.images.length > 0;
  };

  return (
    <SafeAreaView>
      <View style={style.container}>
        <Text style={style.headerText}>Home</Text>
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
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    paddingVertical: Spacing.size.large,
    paddingHorizontal: Spacing.size.large,
  },
  headerText: {
    ...Typography.fontSize.xLarge,
    ...Typography.fontWeight.bold,
  },
  image: {
    width: '97%',
    height: 200,
    resizeMode: 'contain',
  },
});

export default Home;
