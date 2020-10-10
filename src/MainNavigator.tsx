import React, {FunctionComponent} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import Home from './screens/Home';
import AddMemory from './screens/AddMemory';
import {Screen, Screens} from './navigation';
import {applyHeaderRightBack} from './navigation/HeaderRightBack';

import {Colors} from './styles';

type ScreenParams = Record<Screen, undefined>;

const Stack = createStackNavigator<ScreenParams>();

const MainNavigator: FunctionComponent = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="screen">
        <Stack.Screen
          name={Screens.Home}
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={Screens.AddMemory}
          component={AddMemory}
          options={{
            ...TransitionPresets.ModalTransition,
            title: '',
            headerLeft: () => null,
            headerRight: applyHeaderRightBack(),
            headerStyle: {
              shadowColor: Colors.utility.transparent,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
