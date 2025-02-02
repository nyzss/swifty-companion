import { Text, View } from "tamagui";
import * as SecureStore from "expo-secure-store";
import { Link } from "expo-router";

export default function Information() {
    return (
        <View>
            <Text>hello world hahaha</Text>
            <Text>{SecureStore.getItem("access_token") || "none"}</Text>

            <Link href={"/"} replace>
                <Text color={"azure"}>Logout</Text>
            </Link>
        </View>
    );
}
