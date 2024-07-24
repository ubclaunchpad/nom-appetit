import { Input } from 'react-native-elements';

type AuthInputProps = {
  label: string;
  value: string;
  onChangeText: (type: string) => void;
  placeholder: string;
  errorMessage?: string;
  autoCapitalize: "none" | "sentences" | "words" | "characters" | undefined;
  secureTextEntry: boolean;
};

export default function InputForm(props: AuthInputProps) {
  let renderErrorMessage = false;

  if (props.errorMessage) {
    renderErrorMessage = true;
  }

  return (
    <Input
      // ===== label =====
      label={props.label}
      labelStyle={{
        color: "#004643",
        marginBottom: 7,
        fontSize: 16,
        fontFamily: "Lato-SemiBold",
        fontWeight: "400",
      }}
      // ===== input =====
      value={props.value}
      onChangeText={props.onChangeText}
      placeholder={props.placeholder}
      inputStyle={{
        fontFamily: "Lato-Regular",
        fontSize: 16,
      }}
      inputContainerStyle={{
        backgroundColor: "white",
        height: 48,
        padding: 15,
        borderWidth: 1,
        borderRadius: 12,
        borderColor: "#80A29E",
      }}
      // ===== container =====
      containerStyle={{
        paddingHorizontal: 0,
      }}
      // ===== error message =====
      errorMessage={props.errorMessage}
      errorStyle={{ 
        fontFamily: "Lato-Regular",
        color: 'red', 
      }}
      renderErrorMessage={renderErrorMessage}
      // ===== extras =====
      autoCapitalize={props.autoCapitalize}
      secureTextEntry={props.secureTextEntry}
    />
  );
}