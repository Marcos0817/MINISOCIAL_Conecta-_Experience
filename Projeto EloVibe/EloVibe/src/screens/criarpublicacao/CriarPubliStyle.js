import { StyleSheet } from "react-native";

export const CriarPubliStyle = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#FBF6EE",
    },


    // HEADER

    header: {
        height: 105,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
    },

    closeButton: {
        position: "absolute",
        top: 24,
        left: 20,
        height: 40,
        width: 40,
    },

    fechar: {
        fontSize: 40,
        fontWeight: "600",
        color: "#3A6152",
    },

    titulo: {
        fontSize: 28,
        fontWeight: "700",
        color: "#3A6152",
        marginTop: 46,
    },


    // CONTEÚDO

    conteudo: {
        flex: 1,
        paddingHorizontal: 15,
    },

    pergunta: {
        fontSize: 17,
        fontWeight: "500",
        color: "#3A6152",

        marginTop: 30,
        marginBottom: 17,
    },


    // TEXT INPUT

    textoArea: {
        width: "100%",
        height: 185,

        borderWidth: 1,
        borderColor: "#E4DED2",
        borderRadius: 8,

        backgroundColor: "#FBF6EE",

        paddingHorizontal: 10,
        paddingTop: 8,

        fontSize: 20,
        color: "#24312A",

        textAlignVertical: "top",
    },

    contador: {
        position: "absolute",

        right: 54,
        top: 227,

        fontSize: 20,
        color: "#888888",
    },


    // OPÇÕES

    opcoes: {
        flexDirection: "row",
        alignItems: "center",

        marginTop: 34,
        marginLeft: 39,

        gap: 18,
    },

    opcao: {
        flexDirection: "row",
        alignItems: "center",
    },

    iconeOpcao: {
        width: 20,
        height: 20,

        marginRight: 4,
    },

    textoOpcao: {
        fontSize: 12,
        fontWeight: "500",
        color: "#3A6152",
         marginRight: 15,
    },


    // BOTÃO

    botaoCriar: {
        width: "100%",
        height: 63,

        backgroundColor: "#FF6037",

        borderRadius: 7,

        justifyContent: "center",
        alignItems: "center",

        marginTop: 24,
    },

    textoBotao: {
        fontSize: 14,
        fontWeight: "600",
        color: "#FFFFFF",
    },


    // IMAGEM DO CANTO

    decoracao: {
        position: "absolute",

        left: 0,
        bottom: 0,

        width: 250,
        height: 255,

        zIndex: 10,
    },

});