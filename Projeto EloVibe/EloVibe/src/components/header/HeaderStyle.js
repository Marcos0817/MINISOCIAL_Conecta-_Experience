import { StyleSheet } from "react-native";

export const HeaderStyle = StyleSheet.create({

    header: {
        width: "100%",
        height: 65,

        backgroundColor: "#FBF6EE",

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        paddingHorizontal: 18,

        borderBottomWidth: 1,
        borderBottomColor: "#DDD8CC",
    },

    logo: {
        width: 140,
        height: 45,
    },

    botaoSino: {
        width: 45,
        height: 45,

        alignItems: "center",
        justifyContent: "center",
    },

    sino: {
        width: 30,
        height: 30,
    },

});