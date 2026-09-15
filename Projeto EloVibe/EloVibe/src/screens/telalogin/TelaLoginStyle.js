import { StyleSheet } from "react-native";

export const LoginStyle = StyleSheet.create({

    // =====================================================
    // CONTAINER DO TECLADO
    // =====================================================

    keyboardContainer: {
        flex: 1,
        backgroundColor: "#FBF6EE",
    },


    // =====================================================
    // CONTAINER PRINCIPAL
    // =====================================================

    container: {
        flex: 1,
        backgroundColor: "#FBF6EE",
        paddingHorizontal: 22,
        paddingTop: 45,
        paddingBottom: 30,
    },


    // =====================================================
    // TÍTULO
    // =====================================================

    title: {
        fontSize: 28,
        fontWeight: "700",
        color: "#1F4F40",
        textAlign: "center",
        marginBottom: 48,
        marginTop: 80
    },


    // =====================================================
    // GRUPO DO FORMULÁRIO
    // =====================================================

    formGroup: {
        width: "100%",
        marginBottom: 18,
    },


    // =====================================================
    // LABEL
    // =====================================================

    label: {
        width: "100%",
        fontSize: 16,
        fontWeight: "600",
        color: "#3A6152",
        marginBottom: 7,
    },


    // =====================================================
    // INPUT E-MAIL
    // =====================================================

    input: {
        width: "100%",
        height: 56,
        backgroundColor: "#FBF6EE",
        borderWidth: 2,
        borderColor: "#E4DED2",
        borderRadius: 9,
        paddingHorizontal: 12,
        fontSize: 15,
        color: "#24312A",
        outlineStyle: "none",
        marginBottom: 20
    },


    // =====================================================
    // INPUT E-MAIL FOCADO
    // =====================================================

  inputFocado: {
    borderColor: "#205847",
},




    // =====================================================
    // CONTAINER DA SENHA
    // =====================================================

    passwordContainer: {
        width: "100%",
        height: 56,
        backgroundColor: "#FBF6EE",
        borderWidth: 2,
        borderColor: "#E4DED2",
        borderRadius: 9,
        flexDirection: "row",
        alignItems: "center",
        
    },


    // =====================================================
    // SENHA FOCADA
    // =====================================================

    passwordFocado: {
    borderColor: "#205847",
},


    // =====================================================
    // INPUT DA SENHA
    // =====================================================

    passwordInput: {
        flex: 1,
        height: 52,
        paddingHorizontal: 12,
        fontSize: 15,
        color: "#24312A",
        borderWidth: 0,
        outlineStyle: "none",
    },


    // =====================================================
    // BOTÃO DO OLHO
    // =====================================================

    eyeButton: {
        width: 50,
        height: 52,
        justifyContent: "center",
        alignItems: "center",
        
    },


    // =====================================================
    // ESQUECEU A SENHA
    // =====================================================

    forgotButton: {
        width: "100%",
        alignItems: "flex-start",
        marginTop: 8,
        marginBottom: 24,
        paddingLeft: 7,
    },


    forgotPassword: {
        fontSize: 14,
        color: "#E8735F",
        fontWeight: "500",
        marginBottom: 40
    },


    // =====================================================
    // BOTÃO ENTRAR
    // =====================================================

    button: {
        width: "100%",
        height: 56,
        backgroundColor: "#205847",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },


    // =====================================================
    // TEXTO ENTRAR
    // =====================================================

    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "600",
    },


    // =====================================================
    // OU
    // =====================================================

    orText: {
        fontSize: 14,
        color: "#000000",
        textAlign: "center",
        marginVertical: 18,
    },


    // =====================================================
    // BOTÃO GOOGLE
    // =====================================================

    googleButton: {
        width: "100%",
        height: 56,
        backgroundColor: "#FBF6EE",
        borderWidth: 2,
        borderColor: "#E4DED2",
        borderRadius: 9,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },


    // =====================================================
    // IMAGEM GOOGLE
    // =====================================================

    googleIcon: {
        width: 21,
        height: 21,
        marginRight: 10,
    },


    // =====================================================
    // TEXTO GOOGLE
    // =====================================================

    googleText: {
        fontSize: 15,
        color: "#1F4F40",
        fontWeight: "500",
    },


    // =====================================================
    // FRASE CRIAR CONTA
    // =====================================================

    registerText: {
        fontSize: 14,
        color: "#3A6152",
        textAlign: "center",
        marginTop: 24,
    },


    // =====================================================
    // LINK CRIAR CONTA
    // =====================================================

    registerLink: {
        color: "#E8735F",
        fontWeight: "600",
    },

});