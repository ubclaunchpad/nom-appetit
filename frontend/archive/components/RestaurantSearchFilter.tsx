import { Pressable, StyleSheet, Text } from "react-native";

type RestaurantSearchFilter = {
  buttonPressed: boolean;
  handleButton: () => void;
  text: string;
};

export default function RestaurantSearchFilter(props: RestaurantSearchFilter) {
  return (
    <Pressable
      style={[
        styles.individualCategory,
        { backgroundColor: props.buttonPressed ? "#FFFFFF" : "#F3CC91" },
      ]}
      onPress={props.handleButton}
    >
      <Text style={styles.categoryText}>{props.text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  individualCategory: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 12,
  },
  categoryText: {
    fontFamily: "Lato-Regular",
    color: "#004643",
  },
});
