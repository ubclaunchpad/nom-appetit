import { Button } from "react-native-elements";

type SignInButtonProps = {
  title: string;
  onPress: () => void;
};

export default function AuthButton(props: SignInButtonProps) {
  return (
      <Button
        title={props.title}
        buttonStyle={{
          height: 48,
          width: 200,
          borderRadius: 10,
          backgroundColor: "#F3CC91",
        }}
        titleStyle={{
          color: "#004643",
          fontSize: 16,
          fontFamily: "Lato-Regular",
        }}
        onPress={props.onPress}
      />
  );
}
