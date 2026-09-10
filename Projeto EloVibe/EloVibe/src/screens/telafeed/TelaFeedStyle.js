import { StyleSheet } from "react-native";

export const TelaFeedStyle = StyleSheet.create({

    // =====================================================
    // CONTAINER PRINCIPAL
    // =====================================================

    container: {
        flex: 1,
        backgroundColor: "#FAF7F0",
        paddingTop: 0,
    },


    // =====================================================
    // HEADER FIXO
    // =====================================================

    headerFixo: {
        width: "100%",
        zIndex: 10,
        elevation: 10,
    },


    // =====================================================
    // TÍTULO
    // =====================================================

    titulo: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#315F53",
        marginLeft: 27,
    },


    // =====================================================
    // SUBTÍTULO
    // =====================================================

    subtitulo: {
        fontSize: 18,
        color: "#555555",
        marginLeft: 27,
        marginTop: 5,
        marginBottom: 20,
    },


    // =====================================================
    // SCROLL DO FEED
    // =====================================================

    scroll: {
        flex: 1,
    },


    scrollContent: {
        paddingHorizontal: 27,
        paddingTop: 15,
        paddingBottom: 20,
    },


    // =====================================================
    // PUBLICAÇÃO
    // =====================================================

    post: {
        backgroundColor: "#FFFFFF",

        borderRadius: 8,

        paddingHorizontal: 18,

        paddingTop: 15,

        paddingBottom: 12,

        marginBottom: 12,

        elevation: 2,
    },


    // =====================================================
    // CABEÇALHO DA PUBLICAÇÃO
    // =====================================================

    postHeader: {
        flexDirection: "row",

        alignItems: "center",

        justifyContent: "space-between",
    },


    // =====================================================
    // INFORMAÇÕES DO USUÁRIO
    // =====================================================

    userInfo: {
        flexDirection: "row",

        alignItems: "center",
    },


    // =====================================================
    // AVATAR
    // =====================================================

    avatar: {
        width: 40,

        height: 40,

        borderRadius: 20,

        backgroundColor: "#A8C7A0",

        alignItems: "center",

        justifyContent: "center",

        marginRight: 10,
    },


    avatarText: {
        fontSize: 16,

        fontWeight: "bold",

        color: "#FFFFFF",
    },


    // =====================================================
    // NOME DO USUÁRIO
    // =====================================================

    userName: {
        fontSize: 13,

        fontWeight: "bold",

        color: "#222222",
    },


    // =====================================================
    // HORÁRIO
    // =====================================================

    time: {
        fontSize: 10,

        color: "#999999",

        marginTop: 2,
    },


    // =====================================================
    // BOTÃO TRÊS PONTOS
    // =====================================================

    menuButton: {
        padding: 5,
    },


    menuIcon: {
        width: 18,

        height: 18,
    },


    // =====================================================
    // TEXTO DA PUBLICAÇÃO
    // =====================================================

    postText: {
        fontSize: 13,

        color: "#222222",

        marginTop: 20,

        marginBottom: 20,

        lineHeight: 19,
    },


    // =====================================================
    // AÇÕES
    // =====================================================

    actions: {
        flexDirection: "row",

        alignItems: "center",
    },


    action: {
        flexDirection: "row",

        alignItems: "center",

        marginRight: 18,
    },


    actionIcon: {
        width: 25,

        height: 25,

        marginRight: 5,
    },


    actionNumber: {
        fontSize: 12,

        color: "#315F53",
    },


    // =====================================================
    // BOTÃO SALVAR
    // =====================================================

    saveButton: {
        marginLeft: "auto",

        padding: 3,
    },


    saveIcon: {
        width: 25,

        height: 25,
    },

});