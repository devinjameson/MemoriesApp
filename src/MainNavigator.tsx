import React, {FunctionComponent} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import Home from './screens/Home';
import AddMemory from './screens/AddMemory';
import {Screen, Screens} from './navigation';

type ScreenParams = Record<Screen, undefined>;

const Stack = createStackNavigator<ScreenParams>();

const MainNavigator: FunctionComponent = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={Screens.Home} component={Home} />
        <Stack.Screen
          name={Screens.AddMemory}
          component={AddMemory}
          options={{...TransitionPresets.ModalTransition}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
