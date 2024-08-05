import { Input } from 'react-native-elements';
import { DimensionValue } from 'react-native';

type AuthInputProps = {
  label?: string;
  value: string;
  onChangeText: (type: string) => void;
  placeholder: string;
  errorMessage?: string;
  autoCapitalize: "none" | "sentences" | "words" | "characters" | undefined;
  secureTextEntry?: boolean;
  searchInput?: boolean;
  fontSize?: number;
  width?: DimensionValue;
  onSubmitEditing?: () => void;
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
        fontSize: props.fontSize ? props.fontSize : 16,
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
        width: props.width,
      }}
      // ===== error message =====
      errorMessage={props.errorMessage}
      errorStyle={{ 
        fontFamily: "Lato-Regular",
        color: 'red', 
      }}
      renderErrorMessage={renderErrorMessage}
      // ===== left icon =====
      leftIconContainerStyle= {props.searchInput ? { marginRight: 5 } : undefined }
      leftIcon={props.searchInput ? { type: 'font-awesome', name: 'search', size: 16, color: "#457874" } : undefined }
      // ===== extras =====
      autoCapitalize={props.autoCapitalize}
      secureTextEntry={props.secureTextEntry}
      // ===== on submit =====
      onSubmitEditing={props.onSubmitEditing}
    />
  );
}