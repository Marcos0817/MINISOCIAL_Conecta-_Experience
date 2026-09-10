import { StyleSheet } from "react-native";


export const FooterStyle = StyleSheet.create({

    // ==========================================
    // FOOTER
    // ==========================================

    footer: {
        width: "100%",

        height: 68,

        backgroundColor: "#FBF6EE",

        flexDirection: "row",

        alignItems: "center",

        justifyContent: "space-around",

        borderTopWidth: 1,

        borderTopColor: "#D9D4C9",

        paddingHorizontal: 8,
    },


    // ==========================================
    // ITEM
    // ==========================================

    item: {
        flex: 1,

        height: "100%",

        alignItems: "center",

        justifyContent: "center",

        paddingTop: 5,
    },


    // ==========================================
    // TEXTO
    // ==========================================

    texto: {
        marginTop: 3,

        fontSize: 9,

        color: "#315F53",

        textAlign: "center",
    },

});