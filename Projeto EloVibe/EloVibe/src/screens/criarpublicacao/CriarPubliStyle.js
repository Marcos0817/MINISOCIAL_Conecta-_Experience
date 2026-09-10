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
        top: 20, 
        left: 20, 
        height: 40,
        width:40
       
    },
    fechar: {
        fontSize: 24, // aumente ou diminua esse valor pra ajustar o tamanho
        fontWeight: "600",
        color: "#3A6152"
    },

    titulo: {
        fontSize: 18,
        fontWeight: "700",
        color: "#3A6152",
        marginTop: 10,
    },

    // CONTEÚDO
    conteudo: {
        flex: 1,
        paddingHorizontal: 15,
    },

    pergunta: {
        fontSize: 12,
        fontWeight: "500",
        color: "#3A6152",

        marginTop: 30,
        marginBottom: 13,
    },

    // TEXT INPUT
    textoArea: {
        width: "100%",
        height: 127,

        borderWidth: 1,
        borderColor: "#E4DED2",
        borderRadius: 8,

        backgroundColor: "#FBF6EE",

        paddingHorizontal: 10,
        paddingTop: 8,

        fontSize: 12,
        color: "#24312A",

        textAlignVertical: "top",
    },

    contador: {
        position: "absolute",

        right: 25,
        top: 168,

        fontSize: 10,
        color: "#888888",
    },

    // OPÇÕES
    opcoes: {
        flexDirection: "row",
        alignItems: "center",

        marginTop: 27,
        marginLeft: 17,

        gap: 18,
    },

    opcao: {
        flexDirection: "row",
        alignItems: "center",
    },

    iconeOpcao: {
        fontSize: 16,
        color: "#3A6152",

        marginRight: 3,
    },

    textoOpcao: {
        fontSize: 9,
        fontWeight: "500",
        color: "#3A6152",
    },

    // BOTÃO
    botaoCriar: {
        width: "100%",
        height: 43,

        backgroundColor: "#FF6037",

        borderRadius: 7,

        justifyContent: "center",
        alignItems: "center",

        marginTop: 14,
    },

    textoBotao: {
        fontSize: 14,
        fontWeight: "600",
        color: "#FFFFFF",
    },

    // DECORAÇÃO
    decoracao: {
        position: "absolute",

        left: 0,
        bottom: 0,

        width: 155,
        height: 150,

        overflow: "hidden",
    },

    curvaLaranja: {
        position: "absolute",

        width: 150,
        height: 150,

        borderTopRightRadius: 150,

        backgroundColor: "#F1974B",

        left: -75,
        bottom: -72,
    },

    curvaVermelha: {
        position: "absolute",

        width: 125,
        height: 125,

        borderTopRightRadius: 125,

        backgroundColor: "#E8735F",

        left: -55,
        bottom: -60,
    },

    curvaVerde: {
        position: "absolute",

        width: 110,
        height: 110,

        borderTopRightRadius: 110,

        backgroundColor: "#24312A",

        left: -35,
        bottom: -50,
    },

});