import { StyleSheet } from "react-native";

const PublicacaoStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FBF6EE",
    },

    scrollContent: {
        paddingTop: 20,
        paddingHorizontal: 5,
        paddingBottom: 25,
    },

    titulo: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "700",
        color: "#315F53",
        marginBottom: 38,
    },

    compartilhar: {
        position: "absolute",
        right: 10,
        top: 15,
        width: 35,
        height: 35,
        alignItems: "center",
        justifyContent: "center",
    },

    post: {
        width: "100%",
        backgroundColor: "#FBF6EE",
        paddingHorizontal: 27,
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

    salvar: {
        marginLeft: "auto",
        padding: 2,
    },

    comentariosTitulo: {
        fontSize: 12,
        color: "#315F53",
        marginTop: 2,
        marginBottom: 14,
    },

    comentario: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 110,
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
        color: "#222222",
    },

    campoComentario: {
        width: "100%",
        height: 30,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#D0CCC4",
        borderRadius: 5,
        backgroundColor: "#F8F5EF",
    },

    inputComentario: {
        flex: 1,
        height: "100%",
        paddingHorizontal: 10,
        fontSize: 9,
        color: "#315F53",
    },

    botaoEnviar: {
        width: 38,
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default PublicacaoStyle;