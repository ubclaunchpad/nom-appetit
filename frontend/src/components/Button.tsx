import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import { ButtonContainer, ButtonText } from "../styles/Theme";

export default function Button(props) {
  const { onPress, title = 'Save' } = props;
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
    button: {
        ...ButtonContainer
    },
    
    text: {
    ...ButtonText
  },

})

