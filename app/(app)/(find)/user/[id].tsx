import UserCard from "@/components/user";
import { getUserById } from "@/lib/utils";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Spinner, Text, View, YStack } from "tamagui";

export default function UserPage() {
    const { id } = useLocalSearchParams();
    const [user, setUser] = useState<User>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUserById(Number(id)).then((user) => {
            if (user) {
                setUser(user);
            }
            setLoading(false);
        });
    }, [id]);
    return (
        <View flex={1}>
            {loading && (
                <YStack
                    flex={1}
                    justifyContent="center"
                    gap={"$2"}
                    alignItems="center"
                >
                    <Text fontWeight={"bold"} fontSize={"$5"}>
                        Getting user ID: {id}...
                    </Text>
                    <Spinner size="large" />
                </YStack>
            )}
            {!loading &&
                ((user && <UserCard user={user} />) || (
                    <YStack
                        flex={1}
                        justifyContent="center"
                        gap={"$2"}
                        alignItems="center"
                    >
                        <Text fontWeight={"bold"} fontSize={"$5"}>
                            Couldn't find user with ID: {id}
                        </Text>
                    </YStack>
                ))}
        </View>
    );
}
