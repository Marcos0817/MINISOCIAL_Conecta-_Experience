import React, { useEffect, useState } from "react";

import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    TextInput,
    Alert,
    KeyboardAvoidingView,
    Platform,
    Modal,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import AsyncStorage from "@react-native-async-storage/async-storage";

import api from "../../services/api";

import PublicacaoStyle from "./DetalhePubliStyle";

import Footer from "../../components/footer/Footer";


const Publicacao = ({ route, navigation }) => {

    const { publicacaoId } =
        route.params;


    const [publicacao, setPublicacao] =
        useState(null);


    const [comentarios, setComentarios] =
        useState([]);


    const [curtidas, setCurtidas] =
        useState([]);


    const [curtidaUsuario, setCurtidaUsuario] =
        useState(false);


    // =====================================================
    // NOVO ESTADO - PUBLICAÇÃO SALVA
    // =====================================================

    const [publicacaoSalva, setPublicacaoSalva] =
        useState(false);


    const [novoComentario, setNovoComentario] =
        useState("");


    const [usuarioLogadoId, setUsuarioLogadoId] =
        useState(null);


    // =====================================================
    // ESTADO DA IMAGEM EXPANDIDA
    // =====================================================

    const [imagemExpandida, setImagemExpandida] =
        useState(false);


    // =====================================================
    // CARREGAR TUDO AO ABRIR A TELA
    // =====================================================

    useEffect(() => {

        const iniciarTela = async () => {

            try {

                const idUsuario =
                    await AsyncStorage.getItem(
                        "idUsuario"
                    );


                if (!idUsuario) {

                    Alert.alert(
                        "Atenção",
                        "Usuário não encontrado."
                    );

                    return;

                }


                setUsuarioLogadoId(
                    idUsuario
                );


                await carregarDados(
                    idUsuario
                );


            } catch (erro) {

                console.log(
                    "Erro ao iniciar tela:",
                    erro
                );

            }

        };


        iniciarTela();

    }, [publicacaoId]);


    // =====================================================
    // CARREGAR TUDO
    // =====================================================

    const carregarDados = async (
        idUsuario
    ) => {

        await carregarPublicacao();

        await carregarCurtidas(
            idUsuario
        );

        await carregarSalvo(
            idUsuario
        );

        await carregarComentarios();

    };


    // =====================================================
    // CARREGAR PUBLICAÇÃO
    // =====================================================

    const carregarPublicacao = async () => {

        try {

            const resposta =
                await api.get(
                    `/publicacoes/${publicacaoId}`
                );


            const usuario =
                await api.get(
                    `/usuarios/${resposta.data.usuarioId}`
                );


            setPublicacao({

                ...resposta.data,

                nome:
                    usuario.data.nome,

                fotoPerfil:
                    usuario.data.foto,

            });


        } catch (erro) {

            console.log(
                "Erro ao carregar publicação:",
                erro
            );


            Alert.alert(
                "Erro",
                "Não foi possível carregar a publicação."
            );

        }

    };


    // =====================================================
    // ABRIR PERFIL DO USUÁRIO DA PUBLICAÇÃO
    // =====================================================

    const abrirPerfil = () => {

        if (
            !publicacao ||
            !publicacao.usuarioId
        ) {

            return;

        }


        navigation.navigate(
            "Perfil",
            {
                usuarioId:
                    String(
                        publicacao.usuarioId
                    )
            }
        );

    };


    // =====================================================
    // ABRIR PERFIL DO USUÁRIO DO COMENTÁRIO
    // =====================================================

    const abrirPerfilComentario = (
        usuarioId
    ) => {

        if (!usuarioId) {

            return;

        }


        navigation.navigate(
            "Perfil",
            {
                usuarioId:
                    String(
                        usuarioId
                    )
            }
        );

    };


    // =====================================================
    // CARREGAR CURTIDAS
    // =====================================================

    const carregarCurtidas = async (
        idUsuario
    ) => {

        try {

            const resposta =
                await api.get(
                    `/curtidas?publicacaoId=${publicacaoId}`
                );


            setCurtidas(
                resposta.data
            );


            const usuarioCurtiu =
                resposta.data.some(
                    (curtida) =>
                        String(
                            curtida.usuarioId
                        ) ===
                        String(
                            idUsuario
                        )
                );


            setCurtidaUsuario(
                usuarioCurtiu
            );


        } catch (erro) {

            console.log(
                "Erro ao carregar curtidas:",
                erro
            );

        }

    };


    // =====================================================
    // CARREGAR STATUS DO SALVO
    // =====================================================

    const carregarSalvo = async (
        idUsuario
    ) => {

        try {

            const salvosStorage =
                await AsyncStorage.getItem(
                    `publicacoesSalvas_${idUsuario}`
                );


            if (!salvosStorage) {

                setPublicacaoSalva(false);

                return;

            }


            const publicacoesSalvas =
                JSON.parse(
                    salvosStorage
                );


            const estaSalva =
                publicacoesSalvas.some(
                    (id) =>
                        String(id) ===
                        String(publicacaoId)
                );


            setPublicacaoSalva(
                estaSalva
            );


        } catch (erro) {

            console.log(
                "Erro ao verificar publicação salva:",
                erro
            );

            setPublicacaoSalva(false);

        }

    };


    // =====================================================
    // SALVAR / REMOVER PUBLICAÇÃO
    // =====================================================

    const salvarPublicacao = async () => {

        try {

            if (!usuarioLogadoId) {

                Alert.alert(
                    "Atenção",
                    "Você precisa estar logado para salvar uma publicação."
                );

                return;

            }


            // =================================================
            // PEGAR SALVOS ATUAIS
            // =================================================

            const salvosStorage =
                await AsyncStorage.getItem(
                    `publicacoesSalvas_${usuarioLogadoId}`
                );


            let publicacoesSalvas =
                salvosStorage
                    ? JSON.parse(
                        salvosStorage
                    )
                    : [];


            // =================================================
            // VERIFICAR SE JÁ ESTÁ SALVA
            // =================================================

            const index =
                publicacoesSalvas.findIndex(
                    (id) =>
                        String(id) ===
                        String(publicacaoId)
                );


            // =================================================
            // JÁ ESTÁ SALVA → REMOVER
            // =================================================

            if (
                index !== -1
            ) {

                publicacoesSalvas.splice(
                    index,
                    1
                );


                setPublicacaoSalva(
                    false
                );

            }


            // =================================================
            // NÃO ESTÁ SALVA → ADICIONAR
            // =================================================

            else {

                publicacoesSalvas.push(
                    String(
                        publicacaoId
                    )
                );


                setPublicacaoSalva(
                    true
                );

            }


            // =================================================
            // SALVAR NOVAMENTE NO ASYNC STORAGE
            // =================================================

            await AsyncStorage.setItem(

                `publicacoesSalvas_${usuarioLogadoId}`,

                JSON.stringify(
                    publicacoesSalvas
                )

            );


        } catch (erro) {

            console.log(
                "Erro ao salvar publicação:",
                erro
            );


            Alert.alert(
                "Erro",
                "Não foi possível salvar a publicação."
            );

        }

    };


    // =====================================================
    // CARREGAR COMENTÁRIOS
    // =====================================================

    const carregarComentarios = async () => {

        try {

            const resposta =
                await api.get(
                    `/comentarios?publicacaoId=${publicacaoId}`
                );


            // =================================================
            // BUSCAR A FOTO DE CADA USUÁRIO
            // =================================================

            const comentariosComUsuarios =
                await Promise.all(

                    resposta.data.map(
                        async (comentario) => {

                            try {

                                const respostaUsuario =
                                    await api.get(
                                        `/usuarios/${comentario.usuarioId}`
                                    );


                                return {

                                    ...comentario,

                                    nome:
                                        respostaUsuario.data.nome,

                                    fotoPerfil:
                                        respostaUsuario.data.foto,

                                };


                            } catch (erro) {

                                console.log(
                                    "Erro ao buscar usuário do comentário:",
                                    erro
                                );


                                return {

                                    ...comentario,

                                    fotoPerfil:
                                        "",

                                };

                            }

                        }
                    )

                );


            setComentarios(
                comentariosComUsuarios
            );


        } catch (erro) {

            console.log(
                "Erro ao carregar comentários:",
                erro
            );

        }

    };


    // =====================================================
    // CURTIR / DESCURTIR
    // =====================================================

    const curtirPublicacao = async () => {

        try {

            if (!usuarioLogadoId) {

                Alert.alert(
                    "Atenção",
                    "Usuário não encontrado."
                );

                return;

            }


            // =================================================
            // SE JÁ CURTIU → REMOVE
            // =================================================

            if (curtidaUsuario) {

                const resposta =
                    await api.get(
                        `/curtidas?usuarioId=${usuarioLogadoId}&publicacaoId=${publicacaoId}`
                    );


                if (
                    resposta.data.length > 0
                ) {

                    const curtida =
                        resposta.data[0];


                    await api.delete(
                        `/curtidas/${curtida.id}`
                    );

                }

            }


            // =================================================
            // SE NÃO CURTIU → ADICIONA
            // =================================================

            else {

                await api.post(
                    "/curtidas",
                    {

                        usuarioId:
                            String(
                                usuarioLogadoId
                            ),

                        publicacaoId:
                            String(
                                publicacaoId
                            ),

                        dataHora:
                            new Date().toISOString(),

                    }
                );

            }


            await carregarCurtidas(
                usuarioLogadoId
            );


        } catch (erro) {

            console.log(
                "Erro ao curtir publicação:",
                erro
            );


            Alert.alert(
                "Erro",
                "Não foi possível alterar a curtida."
            );

        }

    };


    // =====================================================
    // ENVIAR COMENTÁRIO
    // =====================================================

    const enviarComentario = async () => {

        if (
            novoComentario.trim() === ""
        ) {

            return;

        }


        try {

            if (!usuarioLogadoId) {

                Alert.alert(
                    "Atenção",
                    "Usuário não encontrado."
                );

                return;

            }


            const respostaUsuario =
                await api.get(
                    `/usuarios/${usuarioLogadoId}`
                );


            const comentario = {

                publicacaoId:
                    String(
                        publicacaoId
                    ),

                usuarioId:
                    String(
                        usuarioLogadoId
                    ),

                nome:
                    respostaUsuario.data.nome,

                texto:
                    novoComentario.trim(),

                horario:
                    "Agora",

                dataHora:
                    new Date().toISOString(),

            };


            await api.post(
                "/comentarios",
                comentario
            );


            setNovoComentario("");


            await carregarComentarios();


        } catch (erro) {

            console.log(
                "Erro ao enviar comentário:",
                erro
            );


            Alert.alert(
                "Erro",
                "Não foi possível enviar o comentário."
            );

        }

    };


    // =====================================================
    // FOTO DE PERFIL
    // =====================================================

    const pegarImagemPerfil = (
        foto
    ) => {

        if (
            !foto ||
            foto === ""
        ) {

            return require(
                "../../../assets/perfilIcone.png"
            );

        }


        if (
            foto === "images-galocego.jpg"
        ) {

            return require(
                "../../../assets/perfilIcone.png"
            );

        }


        if (
            foto === "perfilIcone.png"
        ) {

            return require(
                "../../../assets/perfilIcone.png"
            );

        }


        return {
            uri: foto
        };

    };


    // =====================================================
    // FOTO DA PUBLICAÇÃO
    // =====================================================

    const pegarImagemPost = (
        foto
    ) => {

        if (
            !foto ||
            foto === ""
        ) {

            return null;

        }


        if (
            foto === "images-galocego.jpg"
        ) {

            return require(
                "../../../assets/images-galocego.jpg"
            );

        }


        return {
            uri: foto
        };

    };


    // =====================================================
    // CARREGANDO
    // =====================================================

    if (!publicacao) {

        return (

            <SafeAreaView
                style={
                    PublicacaoStyle.container
                }
            >

                <Text>
                    Carregando...
                </Text>

            </SafeAreaView>

        );

    }


    // =====================================================
    // TELA
    // =====================================================

    return (

        <SafeAreaView
            style={
                PublicacaoStyle.container
            }
        >

            {/* =====================================================
                CONTEÚDO + TECLADO
            ===================================================== */}

            <KeyboardAvoidingView

                style={{
                    flex: 1
                }}

                behavior={
                    Platform.OS === "ios"
                        ? "padding"
                        : "height"
                }

                keyboardVerticalOffset={
                    0
                }

            >

                {/* =====================================================
                    CONTEÚDO
                ===================================================== */}

                <ScrollView

                    showsVerticalScrollIndicator={
                        false
                    }

                    contentContainerStyle={
                        PublicacaoStyle.scrollContent
                    }

                    keyboardShouldPersistTaps="handled"

                >

                    {/* =====================================================
                        TÍTULO
                    ===================================================== */}

                    <Text
                        style={
                            PublicacaoStyle.titulo
                        }
                    >
                        Publicação
                    </Text>


                    {/* =====================================================
                        CARD
                    ===================================================== */}

                    <View
                        style={
                            PublicacaoStyle.post
                        }
                    >

                        {/* =================================================
                            CABEÇALHO
                        ================================================= */}

                        <View
                            style={
                                PublicacaoStyle.postHeader
                            }
                        >

                            <View
                                style={
                                    PublicacaoStyle.usuario
                                }
                            >

                                {/* =========================================
                                    FOTO DE PERFIL
                                ========================================= */}

                                <TouchableOpacity

                                    onPress={
                                        abrirPerfil
                                    }

                                    activeOpacity={
                                        0.7
                                    }

                                >

                                    <Image

                                        source={
                                            pegarImagemPerfil(
                                                publicacao.fotoPerfil
                                            )
                                        }

                                        style={
                                            PublicacaoStyle.avatar
                                        }

                                        resizeMode="cover"

                                    />

                                </TouchableOpacity>


                                {/* =========================================
                                    NOME E HORÁRIO
                                ========================================= */}

                                <TouchableOpacity

                                    onPress={
                                        abrirPerfil
                                    }

                                    activeOpacity={
                                        0.7
                                    }

                                >

                                    <View>

                                        <Text
                                            style={
                                                PublicacaoStyle.nome
                                            }
                                        >

                                            {
                                                publicacao.nome
                                            }

                                        </Text>


                                        <Text
                                            style={
                                                PublicacaoStyle.horario
                                            }
                                        >

                                            {
                                                publicacao.horario
                                            }

                                        </Text>

                                    </View>

                                </TouchableOpacity>

                            </View>


                            {/* =================================================
                                3 PONTOS
                            ================================================= */}

                            <TouchableOpacity

                                style={
                                    PublicacaoStyle.compartilhar
                                }

                                onPress={() => {

                                    Alert.alert(
                                        "Opções",
                                        "Funcionalidade de opções."
                                    );

                                }}

                            >

                                <Text
                                    style={
                                        PublicacaoStyle.pontos
                                    }
                                >
                                    •••
                                </Text>

                            </TouchableOpacity>

                        </View>


                        {/* =====================================================
                            TEXTO
                        ===================================================== */}

                        <Text
                            style={
                                PublicacaoStyle.textoPublicacao
                            }
                        >

                            {
                                publicacao.texto
                            }

                        </Text>


                        {/* =====================================================
                            SENTIMENTO
                        ===================================================== */}

                        {
                            publicacao.sentimento !== "" &&
                            publicacao.sentimento != null && (

                                <Text
                                    style={
                                        PublicacaoStyle.sentimento
                                    }
                                >

                                    {
                                        publicacao.sentimento
                                    }

                                </Text>

                            )
                        }


                        {/* =====================================================
                            LOCALIZAÇÃO
                        ===================================================== */}

                        {
                            publicacao.localizacao !== "" &&
                            publicacao.localizacao != null && (

                                <Text
                                    style={{
                                        fontSize: 9,
                                        color: "#315F53",
                                        marginTop: 4,
                                        marginBottom: 6,
                                    }}
                                >

                                    📍 {
                                        publicacao.localizacao
                                    }

                                </Text>

                            )
                        }


                        {/* =====================================================
                            FOTO DA PUBLICAÇÃO
                        ===================================================== */}

                        {
                            publicacao.foto &&
                            publicacao.foto !== "" && (

                                <TouchableOpacity

                                    activeOpacity={0.9}

                                    onPress={() =>
                                        setImagemExpandida(true)
                                    }

                                >

                                    <Image

                                        source={
                                            pegarImagemPost(
                                                publicacao.foto
                                            )
                                        }

                                        style={
                                            PublicacaoStyle.imagem
                                        }

                                        resizeMode="cover"

                                    />

                                </TouchableOpacity>

                            )
                        }


                        {/* =====================================================
                            AÇÕES
                        ===================================================== */}

                        <View
                            style={
                                PublicacaoStyle.acoes
                            }
                        >

                            {/* ================================================
                                CURTIDA
                            ================================================= */}

                            <TouchableOpacity

                                style={
                                    PublicacaoStyle.acao
                                }

                                onPress={
                                    curtirPublicacao
                                }

                            >

                                <Image

                                    source={

                                        curtidaUsuario

                                            ? require(
                                                "../../../assets/CoracaoVermelhoCard.png"
                                            )

                                            : require(
                                                "../../../assets/Coracao.png"
                                            )

                                    }

                                    style={{
                                        width: 22,
                                        height: 22,
                                    }}

                                    resizeMode="contain"

                                />


                                <Text
                                    style={
                                        PublicacaoStyle.numero
                                    }
                                >

                                    {
                                        curtidas.length
                                    }

                                </Text>

                            </TouchableOpacity>


                            {/* ================================================
                                COMENTÁRIOS
                            ================================================= */}

                            <TouchableOpacity

                                style={
                                    PublicacaoStyle.acao
                                }

                            >

                                <Image

                                    source={
                                        require(
                                            "../../../assets/Comentario.png"
                                        )
                                    }

                                    style={{
                                        width: 22,
                                        height: 22,
                                    }}

                                    resizeMode="contain"

                                />


                                <Text
                                    style={
                                        PublicacaoStyle.numero
                                    }
                                >

                                    {
                                        comentarios.length
                                    }

                                </Text>

                            </TouchableOpacity>


                            {/* ================================================
                                SALVAR
                            ================================================= */}

                            <TouchableOpacity

                                style={
                                    PublicacaoStyle.iconeSalvar
                                }

                                onPress={
                                    salvarPublicacao
                                }

                                activeOpacity={
                                    0.7
                                }

                            >

                                <Image

                                    source={
                                        require(
                                            "../../../assets/Salvar.png"
                                        )
                                    }

                                    style={{

                                        width: 23,
                                        height: 23,

                                        // =================================
                                        // VERDE = NÃO SALVO
                                        // LARANJA = SALVO
                                        // =================================

                                        tintColor:
                                            publicacaoSalva
                                                ? "#FF6B00"
                                                : "#315F53",

                                    }}

                                    resizeMode="contain"

                                />

                            </TouchableOpacity>

                        </View>


                        {/* =====================================================
                            COMENTÁRIOS
                        ===================================================== */}

                        <Text
                            style={
                                PublicacaoStyle.comentariosTitulo
                            }
                        >
                            Comentários
                        </Text>


                        <View
                            style={
                                PublicacaoStyle.areaComentarios
                            }
                        >

                            <ScrollView

                                showsVerticalScrollIndicator={
                                    true
                                }

                                nestedScrollEnabled={
                                    true
                                }

                                keyboardShouldPersistTaps={
                                    "handled"
                                }

                                contentContainerStyle={
                                    PublicacaoStyle.scrollComentarios
                                }

                            >

                                {
                                    comentarios.map(
                                        (comentario) => (

                                            <View

                                                key={
                                                    comentario.id
                                                }

                                                style={
                                                    PublicacaoStyle.comentario
                                                }

                                            >

                                                {/* =================================
                                                    FOTO DO USUÁRIO
                                                ================================= */}

                                                <TouchableOpacity

                                                    onPress={() =>
                                                        abrirPerfilComentario(
                                                            comentario.usuarioId
                                                        )
                                                    }

                                                    activeOpacity={
                                                        0.7
                                                    }

                                                >

                                                    <Image

                                                        source={
                                                            pegarImagemPerfil(
                                                                comentario.fotoPerfil
                                                            )
                                                        }

                                                        style={
                                                            PublicacaoStyle.avatarComentario
                                                        }

                                                        resizeMode="cover"

                                                    />

                                                </TouchableOpacity>


                                                {/* =================================
                                                    CONTEÚDO
                                                ================================= */}

                                                <View
                                                    style={
                                                        PublicacaoStyle.comentarioConteudo
                                                    }
                                                >

                                                    {/* =============================
                                                        NOME DO USUÁRIO
                                                    ============================== */}

                                                    <TouchableOpacity

                                                        onPress={() =>
                                                            abrirPerfilComentario(
                                                                comentario.usuarioId
                                                            )
                                                        }

                                                        activeOpacity={
                                                            0.7
                                                        }

                                                    >

                                                        <Text
                                                            style={
                                                                PublicacaoStyle.nomeComentario
                                                            }
                                                        >

                                                            {
                                                                comentario.nome
                                                            }

                                                        </Text>

                                                    </TouchableOpacity>


                                                    {/* =============================
                                                        HORÁRIO
                                                    ============================== */}

                                                    <Text
                                                        style={
                                                            PublicacaoStyle.horarioComentario
                                                        }
                                                    >

                                                        {
                                                            comentario.horario
                                                        }

                                                    </Text>


                                                    {/* =============================
                                                        TEXTO
                                                    ============================== */}

                                                    <Text
                                                        style={
                                                            PublicacaoStyle.textoComentario
                                                        }
                                                    >

                                                        {
                                                            comentario.texto
                                                        }

                                                    </Text>

                                                </View>

                                            </View>

                                        )
                                    )
                                }

                            </ScrollView>

                        </View>

                    </View>

                </ScrollView>


                {/* =====================================================
                    CAMPO DE COMENTÁRIO
                ===================================================== */}

                <View
                    style={
                        PublicacaoStyle.comentarioFixo
                    }
                >

                    <View
                        style={
                            PublicacaoStyle.campoComentario
                        }
                    >

                        <TextInput

                            style={
                                PublicacaoStyle.inputComentario
                            }

                            placeholder="Adicione um comentário..."

                            placeholderTextColor="#888"

                            value={
                                novoComentario
                            }

                            onChangeText={
                                setNovoComentario
                            }

                            maxLength={
                                200
                            }

                            returnKeyType="send"

                            blurOnSubmit={
                                false
                            }

                            onSubmitEditing={
                                enviarComentario
                            }

                        />


                        <TouchableOpacity

                            style={
                                PublicacaoStyle.botaoEnviar
                            }

                            onPress={
                                enviarComentario
                            }

                        >

                            <Image

                                source={
                                    require(
                                        "../../../assets/AviaoCompartilhar.png"
                                    )
                                }

                                style={
                                    PublicacaoStyle.iconeEnviar
                                }

                                resizeMode="contain"

                            />

                        </TouchableOpacity>

                    </View>

                </View>

            </KeyboardAvoidingView>


            {/* =====================================================
                IMAGEM EXPANDIDA
            ===================================================== */}

            <Modal

                visible={
                    imagemExpandida
                }

                transparent={
                    true
                }

                animationType="fade"

                onRequestClose={() =>
                    setImagemExpandida(false)
                }

            >

                <View
                    style={{
                        flex: 1,
                        backgroundColor:
                            "rgba(0, 0, 0, 0.95)",
                        justifyContent:
                            "center",
                        alignItems:
                            "center",
                    }}
                >

                    {/* =================================================
                        BOTÃO FECHAR
                    ================================================= */}

                    <TouchableOpacity

                        onPress={() =>
                            setImagemExpandida(false)
                        }

                        activeOpacity={
                            0.7
                        }

                        style={{
                            position:
                                "absolute",
                            top: 45,
                            right: 20,
                            width: 42,
                            height: 42,
                            borderRadius: 21,
                            backgroundColor:
                                "rgba(255,255,255,0.15)",
                            justifyContent:
                                "center",
                            alignItems:
                                "center",
                            zIndex: 10,
                        }}

                    >

                        <Text
                            style={{
                                color:
                                    "#FFFFFF",
                                fontSize:
                                    25,
                                fontWeight:
                                    "300",
                            }}
                        >
                            ×
                        </Text>

                    </TouchableOpacity>


                    {/* =================================================
                        IMAGEM GRANDE
                    ================================================= */}

                    <TouchableOpacity

                        activeOpacity={
                            1
                        }

                        onPress={() =>
                            setImagemExpandida(false)
                        }

                        style={{
                            width:
                                "100%",
                            height:
                                "80%",
                            justifyContent:
                                "center",
                            alignItems:
                                "center",
                        }}

                    >

                        <Image

                            source={
                                pegarImagemPost(
                                    publicacao.foto
                                )
                            }

                            style={{
                                width:
                                    "100%",
                                height:
                                    "100%",
                            }}

                            resizeMode="contain"

                        />

                    </TouchableOpacity>

                </View>

            </Modal>


            {/* =====================================================
                FOOTER
            ===================================================== */}

            <Footer
                navigation={
                    navigation
                }
            />

        </SafeAreaView>

    );

};


export default Publicacao;