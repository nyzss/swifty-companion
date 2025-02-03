import { Card, View, XStack, YStack, Text, Image } from "tamagui";
import React from "react";

export default function UserCard({ user }: { user: User }) {
    return (
        <View flex={1} paddingHorizontal={"$4"}>
            <Card marginVertical={"$3"} bordered elevate>
                <XStack
                    alignItems="center"
                    justifyContent="space-between"
                    padding={"$4"}
                >
                    <YStack>
                        <Text>
                            {user.first_name} {user.last_name}
                        </Text>
                        <Text fontSize={"$11"} fontWeight={"bold"}>
                            {user.login}
                        </Text>
                        <Text>{user.email} </Text>
                        {user.phone !== "hidden" && (
                            <Text textDecorationLine="underline">
                                {user.phone}
                            </Text>
                        )}
                    </YStack>
                    <Image
                        source={{
                            uri: user?.image.versions.small || user?.image.link,
                            width: 100,
                            height: 100,
                        }}
                        borderRadius={12}
                    />
                </XStack>
            </Card>
            <Card bordered elevate>
                <Card.Header>
                    <Text fontWeight={"bold"} fontSize={"$4"}>
                        Information
                    </Text>
                </Card.Header>
                <View paddingHorizontal={"$4"} paddingBottom={"$4"}>
                    <Text>test</Text>
                </View>
            </Card>
        </View>
    );
}
