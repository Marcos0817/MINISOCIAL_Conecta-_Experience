import { StyleSheet } from "react-native";

const PerfilStyle = StyleSheet.create({

    // =====================================================
    // CONTAINER
    // =====================================================

    container: {
        flex: 1,
        backgroundColor: "#FBF6EE",
    },

    scrollContent: {
        paddingTop: 8,
        paddingBottom: 100,
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
    // FOTO DE PERFIL
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
    // EMAIL
    // =====================================================

    email: {
        textAlign: "center",
        fontSize: 13,
        color: "#777777",
        marginTop: 1,
        marginBottom: 22,
    },


    // =====================================================
    // SAIR
    // =====================================================

    sair: {
        position: "absolute",
        left: 12,
        top: 7,
        width: 35,
        height: 35,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10,
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
    // LINHAS DAS ABAS
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

    linhaAtivaSalvos: {
        marginLeft: "62.5%",
    },


    // =====================================================
    // GRADE DE PUBLICAÇÕES
    // =====================================================

    gradePublicacoes: {
        width: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
        paddingHorizontal: 7,
        gap: 5,
    },


    // =====================================================
    // CARD DA PUBLICAÇÃO
    // =====================================================

    cardPublicacao: {
        width: "32%",
        aspectRatio: 1,
        borderRadius: 7,
        overflow: "hidden",
        backgroundColor: "#E5E5E5",
        marginTop: 10,
    },


    // =====================================================
    // IMAGEM DA PUBLICAÇÃO
    // =====================================================

    imagemPublicacao: {
        width: "100%",
        height: "100%",
    },


    // =====================================================
    // PUBLICAÇÃO SEM IMAGEM
    // =====================================================

    publicacaoSemImagem: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#E5E5E5",
    },


    // =====================================================
    // MODAL DA FOTO DE PERFIL
    // =====================================================

    modalContainer: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.95)",
        justifyContent: "center",
        alignItems: "center",
    },


    // =====================================================
    // BOTÃO FECHAR DO MODAL
    // =====================================================

    botaoFecharModal: {
        position: "absolute",
        top: 45,
        right: 20,
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: "rgba(255,255,255,0.15)",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
    },


    // =====================================================
    // TEXTO DO BOTÃO FECHAR
    // =====================================================

    textoFecharModal: {
        color: "#FFFFFF",
        fontSize: 25,
        fontWeight: "300",
    },


    // =====================================================
    // ÁREA DA IMAGEM EXPANDIDA
    // =====================================================

    areaImagemModal: {
        width: "100%",
        height: "80%",
        justifyContent: "center",
        alignItems: "center",
    },


    // =====================================================
    // IMAGEM EXPANDIDA
    // =====================================================

    imagemModal: {
        width: "100%",
        height: "100%",
    },

});

export default PerfilStyle;