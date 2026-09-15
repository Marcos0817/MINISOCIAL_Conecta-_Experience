import { StyleSheet } from "react-native";

const PerfilStyle = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#FBF6EE",
    },


    scrollContent: {
        paddingTop: 8,
        paddingBottom: 30,
    },


    // =====================================================
    // CONFIGURAÇÕES
    // =====================================================

    configuracao: {
        position: "absolute",

        right: 12,

        top: 7,

        width: 35,

        height: 35,

        alignItems: "center",

        justifyContent: "center",

        zIndex: 10,
    },


    // =====================================================
    // TÍTULO
    // =====================================================

    titulo: {
        textAlign: "center",

        fontSize: 28,

        fontWeight: "700",

        color: "#1F4F40",

        marginTop: 42,

        marginBottom: 17,
    },


    // =====================================================
    // FOTO
    // =====================================================

    fotoContainer: {
        width: 74,

        height: 74,

        borderRadius: 37,

        alignSelf: "center",

        marginBottom: 8,

        position: "relative",

        overflow: "visible",
    },


    foto: {
        width: 74,

        height: 74,

        borderRadius: 37,
    },


    // =====================================================
    // BOTÃO EDITAR
    // =====================================================

    botaoEditar: {
        position: "absolute",

        right: -2,

        bottom: -2,

        width: 24,

        height: 24,

        alignItems: "center",

        justifyContent: "center",

        zIndex: 10,
       
    },


    imagemEditar: {
        width: "100%",

        height: "100%",
    },


    // =====================================================
    // NOME
    // =====================================================

    nome: {
        textAlign: "center",

        fontSize: 24,

        fontWeight: "600",

        color: "#315F53",
    },


    // =====================================================
    // E-MAIL
    // =====================================================

    email: {
        textAlign: "center",

        fontSize: 13,

        color: "#777777",

        marginTop: 1,

        marginBottom: 22,
    },


    // =====================================================
    // ESTATÍSTICAS
    // =====================================================

    estatisticas: {
        width: "100%",

        flexDirection: "row",

        justifyContent: "space-around",

        paddingHorizontal: 18,

        marginBottom: 19,
    },


    estatistica: {
        alignItems: "center",

        justifyContent: "center",

        minWidth: 75,
    },


    numero: {
        fontSize: 22,

        fontWeight: "500",

        color: "#315F53",
    },


    label: {
        fontSize: 18,

        color: "#315F53",

        marginTop: 2,
    },


    // =====================================================
    // BIO
    // =====================================================

    bio: {
        textAlign: "center",

        color: "#315F53",

        fontWeight: "500",

        fontSize: 15,

        lineHeight: 19,

        paddingHorizontal: 20,

        marginBottom: 36,
    },


    // =====================================================
    // ABAS
    // =====================================================

    abas: {
        width: "100%",

        flexDirection: "row",

        justifyContent: "space-around",

        alignItems: "center",

        height: 35,
    },


    aba: {
        width: "50%",

        alignItems: "center",

        justifyContent: "center",
    },


    // =====================================================
    // LINHA DAS ABAS
    // =====================================================

    linhaAbas: {
        width: "100%",

        height: 2,

        backgroundColor: "#D8D4CA",

        marginBottom: 6,
    },


    linhaAtiva: {
        width: "25%",

        height: 3,

        backgroundColor: "#315F53",

        marginLeft: "12.5%",

        borderRadius: 3,
    },


    // =====================================================
    // GRADE
    // =====================================================

    grade: {
        width: "100%",

        flexDirection: "row",

        flexWrap: "wrap",

        justifyContent: "space-between",

        paddingHorizontal: 7,

        rowGap: 5,
    },


    publicacao: {
        width: "32.5%",

        aspectRatio: 1.25,

        borderRadius: 6,

        overflow: "hidden",

        backgroundColor: "#222222",

        marginBottom: 3,
        
    },


    imagemPublicacao: {
        width: "100%",

        height: "100%",
    },

});

export default PerfilStyle;