import 'react-native-gesture-handler';

import React, {FunctionComponent} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import Home from './src/screens/Home';
import AddMemory from './src/screens/AddMemory';

const Stack = createStackNavigator();

const App: FunctionComponent = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="AddMemory"
          component={AddMemory}
          options={{...TransitionPresets.ModalTransition}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
