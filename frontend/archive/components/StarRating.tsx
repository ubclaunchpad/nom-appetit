import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";

type Props = {
  maxRating: number;
  onChangeValue?: number;
  onChange?: Function;
  size: number;
};

const StarRating = (props: Props) => {
  const { maxRating, onChangeValue, onChange, size } = props;

  return (
    <View style={styles.container}>
      {[...Array(maxRating)].map((_, index) => (
        <TouchableOpacity key={index} onPress={() => onChange(index + 1)}>
          <Icon
            name={index < onChangeValue ? 'star-fill' : 'star'}
            type='octicon'
            color='#F9BC60'
            size={size}
            containerStyle={styles.icon}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    marginHorizontal: 4,
  },
});

export default StarRating;
