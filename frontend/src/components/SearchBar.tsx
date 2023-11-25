import React from 'react';
import {SafeAreaView, StyleSheet, TextInput, Image} from 'react-native';

export const SearchBar = () => {
  const [text, onChangeText] = React.useState('Search for a restaurant...');
  const [number, onChangeNumber] = React.useState('');

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      >
        <Image source={require("../images/searchBar.png")} />
      </TextInput>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 52,
    margin: 12,
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    backgroundColor: "#FFFCF1",
    borderColor: "transparent",
    color: "rgba(67, 101, 91, 0.5)",
  },
});


