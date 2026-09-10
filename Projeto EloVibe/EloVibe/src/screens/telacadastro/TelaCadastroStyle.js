import { StyleSheet } from "react-native";

export const TelaCadastroStyle = StyleSheet.create({

    // ==========================================
    // TELA
    // ==========================================

    container: {
        flex: 1,
        backgroundColor: "#FBF6EE",
        paddingHorizontal: 16,
        paddingTop: 34,
    },


    // ==========================================
    // HEADER
    // ==========================================

    header: {
        height: 32,

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        marginBottom: 17,
    },

    headerTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "#1F4F40",
    },


    // ==========================================
    // LABELS
    // ==========================================

    label: {
        fontSize: 14,
        fontWeight: "600",

        color: "#1F4F40",

        marginTop: 11,
        marginBottom: 7,
    },


    // ==========================================
    // INPUT
    // ==========================================

    input: {
        width: "100%",
        height: 48,

        borderWidth: 1,
        borderColor: "#E3DED1",

        borderRadius: 8,

        paddingHorizontal: 11,

        fontSize: 13,
        color: "#1F4F40",

        backgroundColor: "#FBF6EE",

        marginBottom: 13
    },


    // ==========================================
    // SENHA
    // ==========================================

    passwordContainer: {
        width: "100%",
        height: 48,

        flexDirection: "row",
        alignItems: "center",

        borderWidth: 1,
        borderColor: "#E3DED1",

        borderRadius: 8,

        paddingLeft: 11,
        paddingRight: 10,

        backgroundColor: "#FBF6EE",
         marginBottom: 13
    },

    passwordInput: {
        flex: 1,

        height: 48,

        fontSize: 13,
        color: "#1F4F40",
    },

    eyeButton: {
        width: 30,
        height: 40,

        alignItems: "center",
        justifyContent: "center",
    },


    // ==========================================
    // BOTÃO
    // ==========================================

    button: {
        width: "100%",
        height: 48,

        backgroundColor: "#F56333",

        borderRadius: 7,

        alignItems: "center",
        justifyContent: "center",

        marginTop: 52,
    },

    buttonText: {
        color: "#FFFFFF",

        fontSize: 14,
        fontWeight: "500",
    },


    // ==========================================
    // LOGIN
    // ==========================================

    loginText: {
        textAlign: "center",

        marginTop: 14,

        color: "#77736C",

        fontSize: 12,
    },

    loginLink: {
        color: "#1F4F40",

        fontWeight: "500",
    },

});