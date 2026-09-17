
import { StyleSheet } from "react-native";

const PublicacaoStyle = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#FBF6EE",
    },

    scrollContent: {
        paddingTop: 20,
        paddingHorizontal: 22,
        paddingBottom: 20,
    },

    titulo: {
        textAlign: "center",
        fontSize: 28,
        fontWeight: "700",
        color: "#315F53",
        marginBottom: 30,
        marginTop: 25,
    },

    compartilhar: {
        position: "absolute",
        right: 10,
        top: 15,
        width: 35,
        height: 35,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10,
    },

    post: {
        width: "100%",
        backgroundColor: "#F9F9F1",
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingTop: 14,
        paddingBottom: 14,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        marginBottom: 5,
    },

    postHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 14,
    },

    usuario: {
        flexDirection: "row",
        alignItems: "center",
    },

    avatar: {
        width: 38,
        height: 38,
        borderRadius: 19,
        marginRight: 10,
    },

    nome: {
        fontSize: 12,
        fontWeight: "700",
        color: "#222222",
    },

    horario: {
        fontSize: 9,
        color: "#999999",
        marginTop: 2,
    },

    pontos: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#315F53",
        letterSpacing: 1,
    },

    textoPublicacao: {
        fontSize: 11,
        fontWeight: "600",
        color: "#222222",
        marginBottom: 10,
        lineHeight: 17,
    },

    sentimento: {
        fontSize: 9,
        color: "#315F53",
        marginTop: 4,
        marginBottom: 6,
    },

    imagem: {
        width: "100%",
        height: 158,
        borderRadius: 8,
        marginBottom: 8,
    },

    acoes: {
        flexDirection: "row",
        alignItems: "center",
        height: 38,
    },

    acao: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 12,
    },

    numero: {
        fontSize: 12,
        color: "#315F53",
        marginLeft: 4,
    },

    iconeSalvar: {
        marginLeft: 187,
        width: 25,
        height: 25,
        alignItems: "center",
        justifyContent: "center",
    },

    comentariosTitulo: {
        fontSize: 12,
        color: "#315F53",
        marginTop: 2,
        marginBottom: 12,
    },

    areaComentarios: {
        height: 180,
        width: "100%",
    },

    scrollComentarios: {
        paddingBottom: 10,
    },

    comentario: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 24,
    },

    avatarComentario: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: "#858A82",
        marginRight: 8,
    },

    comentarioConteudo: {
        flex: 1,
    },

    nomeComentario: {
        fontSize: 11,
        fontWeight: "600",
        color: "#222222",
    },

    horarioComentario: {
        fontSize: 9,
        color: "#999999",
        marginTop: 1,
        marginBottom: 10,
    },

    textoComentario: {
        fontSize: 11,
        fontWeight: "600",
        color: "#000000",
    },

    comentarioFixo: {
        width: "100%",
        paddingHorizontal: 22,
        paddingVertical: 8,
        backgroundColor: "#FBF6EE",
    },

    campoComentario: {
        width: "100%",
        height: 38,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#BEBEBE",
        borderRadius: 6,
        backgroundColor: "#D9D9D9",
        marginTop: 0,
        overflow: "hidden",
    },

    inputComentario: {
        flex: 1,
        height: "100%",
        paddingHorizontal: 10,
        paddingVertical: 0,
        fontSize: 9,
        color: "#315F53",
        borderWidth: 0,
        borderColor: "transparent",
        backgroundColor: "transparent",
        underlineColorAndroid: "transparent",
    },

    botaoEnviar: {
        width: 42,
        height: 38,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 0,
        borderWidth: 0,
        backgroundColor: "transparent",
    },

    iconeEnviar: {
        width: 22,
        height: 22,
    },
});

export default PublicacaoStyle;
