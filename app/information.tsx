import { Text, View } from "tamagui";
import * as SecureStore from "expo-secure-store";

export default function Information() {
    return (
        <View>
            <Text>hello world hahaha</Text>
            <Text>{SecureStore.getItem("access_token") || "none"}</Text>
        </View>
    );
}
