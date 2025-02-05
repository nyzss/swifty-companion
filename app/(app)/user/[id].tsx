import UserCard from "@/components/user";
import { getUserById } from "@/lib/utils";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View } from "tamagui";

export default function UserPage() {
    const { id } = useLocalSearchParams();
    const [user, setUser] = useState<User>();

    useEffect(() => {
        console.log(id);
        getUserById(Number(id)).then((user) => {
            if (user) {
                setUser(user);
            }
        });
    }, [id]);
    return (
        <View flex={1}>
            {(user && <UserCard user={user} />) || (
                <Text>Couldn't find user {id}</Text>
            )}
        </View>
    );
}
