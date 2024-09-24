import { Input } from "react-native-elements";

type InputFormProps = {
  value: string;
  onChangeText: (type: string) => void;
  onSubmitEditing?: () => void;
  placeholder: string;
  errorMessage?: string;
  iconName?: string;
  autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined;
  secureTextEntry?: boolean;
  borderRadius?: number;
};

export default function InputForm(props: InputFormProps) {
  return (
    <Input
      // ===== input =====
      value={props.value}
      onChangeText={props.onChangeText}
      inputStyle={{
        fontFamily: "GT-America-Standard-Regular",
        fontSize: 14,
      }}
      // ===== on submit =====
      onSubmitEditing={props.onSubmitEditing}
      // ===== placeholder =====
      placeholder={props.placeholder}
      placeholderTextColor={"#747474"}
      // ===== container =====
      containerStyle={{
        borderWidth: 1,
        borderRadius: props.borderRadius ? props.borderRadius : 12,
        borderColor: "#E2E2E2",
        backgroundColor: "#FFFFFF",
        paddingLeft: 10,
      }}
      inputContainerStyle={{
        height: 42,
        borderBottomWidth: 0,
      }}
      // ===== error message =====
      errorMessage={props.errorMessage}
      errorStyle={{
        fontFamily: "GT-America-Standard-Regular",
        color: "#FF0000",
      }}
      renderErrorMessage={props.errorMessage ? true : false}
      // ===== left icon =====
      leftIcon={{ type: "material", name: props.iconName, size: 20, color: "#747474" }}
      // ===== extras =====
      autoCapitalize={props.autoCapitalize}
      secureTextEntry={props.secureTextEntry}
    />
  );
}
