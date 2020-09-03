import React, {useEffect, FunctionComponent, useState} from 'react';
import {SafeAreaView, View, Text} from 'react-native';
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

  return (
    <SafeAreaView>
      <View>
        {memories.map((memory, idx) => {
          return <Text key={idx}>{memory.description}</Text>;
        })}
      </View>
    </SafeAreaView>
  );
};

export default App;
