import React from "react";
import { DimensionValue, StyleSheet, TextInput, View } from "react-native";
import { Icon } from "react-native-elements";

type SearchInputProps = {
  value: string
  onChangeText: (type: string) => void;
  placeholder: string; 
  autoCapitalize: "none" | "sentences" | "words" | "characters" | undefined;
  width: DimensionValue;
}

export default function SearchInput(props: SearchInputProps) {
  return (
    <View style={[styles.container, { width: props.width }]}>
      <Icon name="search" type="font-awesome" color="#004643" size={18} />
      <TextInput
        value={props.value}
        onChangeText={props.onChangeText}
        placeholder={props.placeholder}
        autoCapitalize={props.autoCapitalize}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    height: 48,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: "#80A29E",
    fontSize: 16,
    fontFamily: "Lato",
  },
  input: {
    marginLeft: 15,
    fontFamily: "Lato",
  },
});
