import { StyleSheet } from "react-native";


const EditarPerfilStyle = StyleSheet.create({

    // ==========================================
    // TELA
    // ==========================================

    container: {
        flex: 1,

        backgroundColor: "#FBF6EE",

        paddingHorizontal: 15,

        paddingTop: 24,
    },


    // ==========================================
    // TÍTULO
    // ==========================================

    titulo: {
        textAlign: "center",

        fontSize: 19,

        fontWeight: "700",

        color: "#315F53",

        marginBottom: 20,
    },


    // ==========================================
    // FOTO
    // ==========================================

    fotoContainer: {
        width: 65,

        height: 65,

        borderRadius: 33,

        alignSelf: "center",

        position: "relative",

        marginBottom: 35,
    },


    foto: {
        width: "100%",

        height: "100%",

        borderRadius: 33,
    },


    // ==========================================
    // BOTÃO EDITAR FOTO
    // ==========================================

    botaoEditar: {
        position: "absolute",

        right: -2,

        bottom: -1,

        width: 23,

        height: 23,

        borderRadius: 5,

        backgroundColor: "#FBF6EE",

        borderWidth: 1,

        borderColor: "#315F53",

        alignItems: "center",

        justifyContent: "center",
    },


    // ==========================================
    // LABEL NOME
    // ==========================================

    label: {
        fontSize: 13,

        fontWeight: "600",

        color: "#315F53",

        marginLeft: 6,

        marginBottom: 7,
    },


    // ==========================================
    // INPUT
    // ==========================================

    input: {
        width: "100%",

        height: 48,

        borderWidth: 1,

        borderColor: "#E0DACE",

        borderRadius: 8,

        backgroundColor: "#FBF6EE",

        paddingHorizontal: 17,

        fontSize: 13,

        color: "#315F53",

        marginBottom: 48,
    },


    // ==========================================
    // LABEL USUÁRIO
    // ==========================================

    labelUsuario: {
        fontSize: 13,

        fontWeight: "600",

        color: "#315F53",

        marginLeft: 6,

        marginBottom: 7,
    },


    // ==========================================
    // LABEL BIO
    // ==========================================

    labelBio: {
        fontSize: 13,

        fontWeight: "600",

        color: "#315F53",

        marginLeft: 6,

        marginBottom: 7,
    },


    // ==========================================
    // BIO
    // ==========================================

    bioInput: {
        width: "100%",

        height: 76,

        borderWidth: 1,

        borderColor: "#E0DACE",

        borderRadius: 8,

        backgroundColor: "#FBF6EE",

        paddingHorizontal: 17,

        paddingTop: 10,

        fontSize: 13,

        color: "#315F53",

        marginBottom: 27,
    },


    // ==========================================
    // BOTÃO SALVAR
    // ==========================================

    botaoSalvar: {
        width: "100%",

        height: 46,

        backgroundColor: "#205D4D",

        borderRadius: 7,

        alignItems: "center",

        justifyContent: "center",
    },


    textoBotao: {
        color: "#FFFFFF",

        fontSize: 15,

        fontWeight: "500",
    },

});


export default EditarPerfilStyle;