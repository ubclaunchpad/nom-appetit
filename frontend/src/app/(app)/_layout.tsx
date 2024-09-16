import { Redirect, Stack, Tabs } from "expo-router";
import { useSession } from "../../context/SessionContext";
import { Icon } from "react-native-elements";

export default function AppLayout() {
  const { authState } = useSession();

  if (authState.authenticated) {
    return (
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    );
  } else {
    return <Redirect href="/sign-in" />;
  }
}
