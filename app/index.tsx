import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Text style={styles.title}>title</Text>
            <Link href={"/information"} style={styles.link}>
                Go to information
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 80,
        fontWeight: "bold",
        color: "white",
    },
    link: {
        color: "cyan",
    },
});
