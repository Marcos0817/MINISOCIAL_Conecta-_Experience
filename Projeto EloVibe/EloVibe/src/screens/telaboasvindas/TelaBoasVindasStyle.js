import { StyleSheet } from "react-native";

export const TelaBoasVindasStyle = StyleSheet.create({

    // ==========================================
    // TELA
    // ==========================================

    container: {
        flex: 1,

        width: "100%",
        height: "100%",

        backgroundColor: "#FBF6EE",

        alignItems: "center",

        overflow: "hidden",

        position: "relative",
    },


    // ==========================================
    // FUNDO
    // ==========================================

    fundo: {
        position: "absolute",

        top: 0,
        left: 0,
        right: 0,
        bottom: 0,

        width: "100%",
        height: "100%",

        zIndex: 0,
    },


    // ==========================================
    // CONTEÚDO
    // ==========================================

    content: {
        flex: 1,

        width: "100%",

        maxWidth: 430,

        alignItems: "center",

        justifyContent: "center",

        paddingHorizontal: 18,

        zIndex: 2,
    },


    // ==========================================
    // LOGO
    // ==========================================

    logo: {
        width: 270,

        height: 190,

        marginBottom: 0,
    },


    // ==========================================
    // TEXTO
    // ==========================================

    description: {
        textAlign: "center",

        color: "#174C3D",

        fontSize: 12,

        lineHeight: 17,

        marginTop: 0,

        marginBottom: 62,
    },


    // ==========================================
    // BOTÕES
    // ==========================================

    buttons: {
        width: "100%",

        maxWidth: 408,
    },


    // ==========================================
    // ENTRAR
    // ==========================================

    buttonLogin: {
        width: "100%",

        height: 48,

        backgroundColor: "#1F5949",

        borderRadius: 7,

        alignItems: "center",

        justifyContent: "center",

        marginBottom: 28,
    },


    buttonLoginText: {
        color: "#FFFFFF",

        fontSize: 16,

        fontWeight: "500",
    },


    // ==========================================
    // CRIAR CONTA
    // ==========================================

    buttonCreate: {
        width: "100%",

        height: 48,

        backgroundColor: "#FBF6EE",

        borderWidth: 2,

        borderColor: "#1F5949",

        borderRadius: 7,

        alignItems: "center",

        justifyContent: "center",
    },


    buttonCreateText: {
        color: "#1F5949",

        fontSize: 18,

        fontWeight: "500",
    },

});