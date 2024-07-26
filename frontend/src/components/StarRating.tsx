import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";

type Props = {
  maxRating: number;
  onChange: Function;
  size: number;
};

const StarRating = (props: Props) => {
  const { maxRating, onChange, size } = props;
  const [rating, setRating] = useState(0);

  const handleClick = (value) => {
    setRating(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <View style={styles.container}>
      {[...Array(maxRating)].map((_, index) => (
        <TouchableOpacity key={index} onPress={() => handleClick(index + 1)}>
          <Icon
            name={index < rating ? "star" : "star-o"}
            type="font-awesome"
            color="#F9BC60"
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
    flexDirection: "row",
  },
  icon: {
    marginHorizontal: 4,
  },
});

export default StarRating;
