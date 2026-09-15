import { StyleSheet } from "react-native";

export const NotificacaoStyle = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#FBF6EE",
    },

    // HEADER
    header: {
        width: "100%",
        alignItems: "center",
        paddingTop: 35,
        paddingBottom: 28,
    },

    titulo: {
        fontSize: 28,
        fontWeight: "700",
        color: "#1F4F40",
    },

    // LISTA
    lista: {
        paddingHorizontal: 14,
        paddingBottom: 90,
    },

    // CARD
    notificacaoCard: {
        width: "100%",
        minHeight: 70,

        borderWidth: 1,
        borderColor: "#E4DED2",
        borderRadius: 10,

        marginBottom: 18,

        paddingHorizontal: 11,
        paddingVertical: 10,

        flexDirection: "row",
        alignItems: "center",

        backgroundColor: "#FBF6EE",
    },

    // ÍCONE
    iconeNotificacao: {
        width: 30,
        height: 30,
        resizeMode: "contain",
        marginRight: 10,
    },

    // TEXTOS
    textoContainer: {
        flex: 1,
    },

    linhaPrincipal: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
    },

    nome: {
        fontSize: 12,
        fontWeight: "700",
        color: "#000000",
        marginRight: 8,
    },

    acao: {
        fontSize: 12,
        fontWeight: "500",
        color: "#000000",
    },

    horario: {
        fontSize: 10,
        color: "#000000",
        marginTop: 3,
    },

    // TRÊS PONTOS
    tresPontos: {
        width: 25,
        height: 25,
        resizeMode: "contain",
        alignSelf: "center",
        marginTop: -5,
    },

});