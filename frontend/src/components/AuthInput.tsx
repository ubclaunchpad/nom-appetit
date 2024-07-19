import { StyleSheet, Text, TextInput, View } from "react-native";

type AuthInputProps = {
  title: string;
  value: string;
  onChangeText: (type: string) => void;
  placeholder: string;
  autoCapitalize: "none" | "sentences" | "words" | "characters" | undefined;
  secureTextEntry: boolean;
};

export default function InputForm(props: AuthInputProps) {
  return (
    <View>
      <Text style={styles.title}>{props.title}</Text>
      <TextInput
        style={styles.input}
        value={props.value}
        onChangeText={props.onChangeText}
        placeholder={props.placeholder}
        autoCapitalize={props.autoCapitalize}
        secureTextEntry={props.secureTextEntry}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "#004643",
    paddingBottom: 7,
    fontSize: 16,
    fontFamily: "Lato",
  },
  input: {
    backgroundColor: "white",
    height: 48,
    padding: 15,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: "#80A29E",
    fontSize: 16,
    fontFamily: "Lato",
  },
});
