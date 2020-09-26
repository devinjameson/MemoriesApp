import React, {FunctionComponent, useState} from 'react';
import {StyleSheet, View, TextInput, Button, Image} from 'react-native';
import ImagePicker from 'react-native-image-picker';

const AddMemory: FunctionComponent = () => {
  const [description, setDescription] = useState<string>('');
  const [imagesData, setImagesData] = useState<string[]>([]);

  const handleGetImage = () => {
    ImagePicker.showImagePicker(pickerOptions, (response) => {
      if (response.didCancel) {
        return;
      }

      if (!response.error) {
        const base64Image = 'data:image/jpeg;base64,' + response.data;
        setImagesData([...imagesData, base64Image]);
      }
    });
  };

  return (
    <View style={style.container}>
      <TextInput
        placeholder="Add a description"
        value={description}
        onChangeText={setDescription}
      />
      {imagesData.map((image, index) => {
        return <Image source={{uri: image}} key={index} style={style.image} />;
      })}
      <Button title="Add an image" onPress={handleGetImage} />
      <Button title="Add Memory" onPress={() => {}} />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexGrow: 1,
  },
  image: {
    width: '97%',
    height: 200,
    resizeMode: 'contain',
  },
});

const pickerOptions = {
  title: 'add a photo',
  storageoptions: {
    skipbackup: true,
  },
  maxwidth: 1000,
  maxheight: 1000,
  quality: 0.7,
};

export default AddMemory;
