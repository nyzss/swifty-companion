import React from "react";
import { Button, Text, View } from "tamagui";

export default function Index() {
    return (
        <View
            flex={1}
            justifyContent="center"
            marginBottom={"$12"}
            marginHorizontal={"$9"}
        >
            <Text marginBottom={"$4"} fontSize={"$6"} fontWeight={"bold"}>
                Welcome to your <Text color="thistle">42 companion</Text>!
            </Text>
            <Button size={"$5"} fontWeight={"500"}>
                Login with 42
            </Button>
        </View>
    );
}
