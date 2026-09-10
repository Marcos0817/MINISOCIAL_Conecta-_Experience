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

    titulo: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: "700",
        color: "#315F53",
        marginTop: 34,
        marginBottom: 12,
    },

    fotoContainer: {
        width: 58,
        height: 58,
        borderRadius: 29,
        alignSelf: "center",
        overflow: "hidden",
        marginBottom: 7,
    },

    foto: {
        width: "100%",
        height: "100%",
    },

    nome: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: "600",
        color: "#315F53",
    },

    email: {
        textAlign: "center",
        fontSize: 8,
        color: "#777777",
        marginTop: 1,
        marginBottom: 22,
    },

    estatisticas: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        paddingHorizontal: 20,
        marginBottom: 20,
    },

    estatistica: {
        alignItems: "center",
        justifyContent: "center",
        minWidth: 70,
    },

    numero: {
        fontSize: 17,
        fontWeight: "500",
        color: "#315F53",
    },

    label: {
        fontSize: 8,
        color: "#315F53",
        marginTop: 2,
    },

    bio: {
        textAlign: "center",
        color: "#315F53",
        fontSize: 10,
        lineHeight: 14,
        paddingHorizontal: 20,
        marginBottom: 35,
    },

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

    linhaAbas: {
        width: "100%",
        height: 2,
        backgroundColor: "#D8D4CA",
        marginBottom: 5,
    },

    linhaAtiva: {
        width: "25%",
        height: 3,
        backgroundColor: "#315F53",
        marginLeft: "12.5%",
        borderRadius: 3,
    },

    grade: {
        width: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        paddingHorizontal: 7,
        gap: 5,
    },

    publicacao: {
        width: "32.5%",
        aspectRatio: 1.25,
        borderRadius: 6,
        overflow: "hidden",
        backgroundColor: "#222222",
    },

    imagemPublicacao: {
        width: "100%",
        height: "100%",
    },

});

export default PerfilStyle;