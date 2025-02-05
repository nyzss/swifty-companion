import UserCard from "@/components/user";
import { getInformation } from "@/lib/utils";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { Spinner, Text, View } from "tamagui";

export default function Information() {
    const [user, setUser] = useState<User>();
    const theme = useColorScheme();

    useEffect(() => {
        getInformation().then((data) => {
            console.log("FETCHED_DATA", data);
            if (data) {
                setUser(data);
            } else if (data === null) {
                router.replace("/");
            }
        });
    }, []);

    return (
        <View flex={1}>
            {(!user && (
                <View flex={1} justifyContent="center" alignItems="center">
                    <Text marginBottom={"$2"}>
                        Fetching your information...
                    </Text>
                    <Spinner size="large" />
                </View>
            )) ||
                (user && <UserCard user={user} />)}
        </View>
    );
}
