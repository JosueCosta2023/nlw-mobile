import { Button } from "@/components/button";
import { Steps } from "@/components/steps";
import { Welcome } from "@/components/welcome";
import { View } from "react-native";
import { router } from "expo-router";
import { StrictMode } from "react";

export default function Index() {
  return (
    <StrictMode>
      <View style={{ flex: 1, padding: 40, gap: 40 }}>
        <Welcome />
        <Steps />
        <Button onPress={() => router.navigate("/home")}>
          <Button.Title>Iniciar em 28:54</Button.Title>
        </Button>
      </View>
    </StrictMode>
  );
}
