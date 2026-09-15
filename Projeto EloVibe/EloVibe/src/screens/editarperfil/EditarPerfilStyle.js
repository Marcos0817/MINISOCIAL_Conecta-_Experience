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

        fontSize: 28,

        fontWeight: "700",

        color: "#315F53",

        marginBottom: 20,
    },


    // ==========================================
    // FOTO
    // ==========================================

    fotoContainer: {
        width: 85,

        height: 85,

        borderRadius: 50,

        alignSelf: "center",

        position: "relative",

        marginBottom: 35,
    },


    foto: {
        width: "100%",

        height: "100%",

        borderRadius: 50,
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
        fontSize: 16,

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

        height: 63,

        borderWidth: 1,

        borderColor: "#E0DACE",

        borderRadius: 8,

        backgroundColor: "#FBF6EE",

        paddingHorizontal: 17,

        fontSize: 16,

        color: "#315F53",

        marginBottom: 48,
    },


    // ==========================================
    // LABEL USUÁRIO
    // ==========================================

    labelUsuario: {
        fontSize: 16,

        fontWeight: "600",

        color: "#315F53",

        marginLeft: 6,

        marginBottom: 7,
    },


    // ==========================================
    // LABEL BIO
    // ==========================================

    labelBio: {
        fontSize: 16,

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

        height: 101,

        borderWidth: 1,

        borderColor: "#E0DACE",

        borderRadius: 8,

        backgroundColor: "#FBF6EE",

        paddingHorizontal: 17,

        paddingTop: 10,

        fontSize: 16,

        color: "#315F53",

        marginBottom: 27,
    },


    // ==========================================
    // BOTÃO SALVAR
    // ==========================================

    botaoSalvar: {
        width: "100%",

        height: 63,

        backgroundColor: "#205D4D",

        borderRadius: 7,

        alignItems: "center",

        justifyContent: "center",
    },


    textoBotao: {
        color: "#FFFFFF",

        fontSize: 15,

        fontWeight: "700",
    },

});


export default EditarPerfilStyle;