import { StyleSheet } from "react-native";

export const CriarPubliStyle = StyleSheet.create({

    // =====================================================
    // CONTAINER
    // =====================================================

    container: {
        flex: 1,
        backgroundColor: "#FBF6EE",
    },


    // =====================================================
    // SCROLL
    // =====================================================

    scrollContent: {
        paddingBottom: 30,
    },


    // =====================================================
    // HEADER
    // =====================================================

    header: {
        height: 105,
        width: "100%",

        justifyContent: "center",
        alignItems: "center",

        position: "relative",
    },

    title: {
        fontSize: 28,
        fontWeight: "700",

        color: "#3A6152",

        marginTop: 20,
    },

    closeButton: {
        position: "absolute",

        top: 24,
        left: 20,

        width: 40,
        height: 40,

        justifyContent: "center",
        alignItems: "center",
    },

    closeText: {
        fontSize: 30,
        fontWeight: "600",

        color: "#3A6152",
    },


    // =====================================================
    // PERGUNTA
    // =====================================================

    question: {
        fontSize: 17,
        fontWeight: "500",

        color: "#3A6152",

        marginTop: 30,
        marginBottom: 17,

        marginHorizontal: 20,
    },


    // =====================================================
    // CAMPO DE TEXTO
    // =====================================================

    textInput: {
        width: "90%",
        height: 185,

        alignSelf: "center",

        borderWidth: 1,
        borderColor: "#E4DED2",

        borderRadius: 8,

        backgroundColor: "#FBF6EE",

        paddingHorizontal: 12,
        paddingTop: 12,

        fontSize: 18,

        color: "#24312A",

        textAlignVertical: "top",
    },


    // =====================================================
    // CONTADOR
    // =====================================================

    counter: {
        alignSelf: "flex-end",

        marginRight: 24,
        marginTop: 6,

        fontSize: 14,

        color: "#888888",
    },


    // =====================================================
    // OPÇÕES
    // =====================================================

    options: {
        width: "90%",

        alignSelf: "center",

        flexDirection: "row",

        alignItems: "center",

        justifyContent: "space-between",

        marginTop: 25,

        marginBottom: 10,
    },

    option: {
        flexDirection: "row",

        alignItems: "center",
    },

    optionIcon: {
        width: 22,
        height: 22,

        marginRight: 5,
    },

    optionText: {
        fontSize: 15,

        fontWeight: "500",

        color: "#3A6152",
    },


    // =====================================================
    // SENTIMENTOS
    // =====================================================

    sentimentosContainer: {
        width: "90%",

        alignSelf: "center",

        flexDirection: "row",

        flexWrap: "wrap",

        gap: 8,

        marginTop: 10,

        marginBottom: 10,
    },

    sentimentoButton: {
        backgroundColor: "#FFFFFF",

        borderWidth: 1,

        borderColor: "#E4DED2",

        borderRadius: 20,

        paddingHorizontal: 12,

        paddingVertical: 8,
    },


    // =====================================================
    // FOTO SELECIONADA
    // =====================================================

    previewContainer: {
        width: "90%",

        alignSelf: "center",

        marginTop: 15,

        alignItems: "center",
    },

    previewImage: {
        width: "100%",

        height: 200,

        borderRadius: 8,
    },

    removeText: {
        fontSize: 14,

        fontWeight: "600",

        color: "#F56333",

        marginTop: 8,
    },


    // =====================================================
    // INFORMAÇÕES SELECIONADAS
    // =====================================================

    selectedInfo: {
        width: "90%",

        alignSelf: "center",

        backgroundColor: "#FFFFFF",

        borderWidth: 1,

        borderColor: "#E4DED2",

        borderRadius: 8,

        paddingHorizontal: 12,

        paddingVertical: 10,

        marginTop: 10,
    },


    // =====================================================
    // BOTÃO PUBLICAR
    // =====================================================

    createButton: {
        width: "90%",

        height: 63,

        alignSelf: "center",

        backgroundColor: "#FF6037",

        borderRadius: 7,

        justifyContent: "center",

        alignItems: "center",

        marginTop: 30,
    },

    createButtonText: {
        fontSize: 18,

        fontWeight: "700",

        color: "#FFFFFF",
    },


    // =====================================================
    // DECORAÇÃO
    // =====================================================

    decoracao: {
        position: "absolute",

        left: 0,
        bottom: 0,

        width: 250,
        height: 255,

        zIndex: 10,
    },

});