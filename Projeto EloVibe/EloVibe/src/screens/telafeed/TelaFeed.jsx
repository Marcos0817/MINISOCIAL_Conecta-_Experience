import React, { useCallback, useState } from "react";

import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    Alert,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { useFocusEffect } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import api from "../../services/api";

import { TelaFeedStyle } from "./TelaFeedStyle";

import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";


export const TelaFeed = ({ navigation }) => {

    const [publicacoes, setPublicacoes] =
        useState([]);


    // =====================================================
    // CARREGAR PUBLICAÇÕES
    // =====================================================

    const carregarPublicacoes = async () => {

        try {

            // =================================================
            // ID DO USUÁRIO LOGADO
            // =================================================

            const usuarioLogadoId =
                await AsyncStorage.getItem(
                    "idUsuario"
                );


            // =================================================
            // BUSCAR PUBLICAÇÕES
            // =================================================

            const respostaPublicacoes =
                await api.get(
                    "/publicacoes"
                );


            // =================================================
            // BUSCAR CURTIDAS
            // =================================================

            const respostaCurtidas =
                await api.get(
                    "/curtidas"
                );


            // =================================================
            // BUSCAR COMENTÁRIOS
            // =================================================

            const respostaComentarios =
                await api.get(
                    "/comentarios"
                );


            // =================================================
            // BUSCAR PUBLICAÇÕES SALVAS
            // =================================================

            let publicacoesSalvas = [];


            if (usuarioLogadoId) {

                const salvasSalvas =
                    await AsyncStorage.getItem(
                        `publicacoesSalvas_${usuarioLogadoId}`
                    );


                if (salvasSalvas) {

                    publicacoesSalvas =
                        JSON.parse(
                            salvasSalvas
                        );

                }

            }


            // =================================================
            // BUSCAR USUÁRIO DE CADA PUBLICAÇÃO
            // =================================================

            const publicacoesComUsuario =
                await Promise.all(

                    respostaPublicacoes.data.map(
                        async (publicacao) => {

                            try {

                                const respostaUsuario =
                                    await api.get(
                                        `/usuarios/${publicacao.usuarioId}`
                                    );


                                // =========================================
                                // CURTIDAS DESTA PUBLICAÇÃO
                                // =========================================

                                const curtidasDaPublicacao =
                                    respostaCurtidas.data.filter(
                                        (curtida) =>
                                            String(
                                                curtida.publicacaoId
                                            ) ===
                                            String(
                                                publicacao.id
                                            )
                                    );


                                // =========================================
                                // COMENTÁRIOS DESTA PUBLICAÇÃO
                                // =========================================

                                const comentariosDaPublicacao =
                                    respostaComentarios.data.filter(
                                        (comentario) =>
                                            String(
                                                comentario.publicacaoId
                                            ) ===
                                            String(
                                                publicacao.id
                                            )
                                    );


                                // =========================================
                                // VERIFICAR SE O USUÁRIO JÁ CURTIU
                                // =========================================

                                const usuarioCurtiu =
                                    curtidasDaPublicacao.some(
                                        (curtida) =>
                                            String(
                                                curtida.usuarioId
                                            ) ===
                                            String(
                                                usuarioLogadoId
                                            )
                                    );


                                // =========================================
                                // VERIFICAR SE O USUÁRIO SALVOU
                                // =========================================

                                const usuarioSalvou =
                                    publicacoesSalvas.some(
                                        (id) =>
                                            String(id) ===
                                            String(
                                                publicacao.id
                                            )
                                    );


                                return {

                                    ...publicacao,

                                    fotoPerfil:
                                        respostaUsuario.data.foto,

                                    nome:
                                        respostaUsuario.data.nome,

                                    curtidas:
                                        curtidasDaPublicacao.length,

                                    comentarios:
                                        comentariosDaPublicacao.length,

                                    curtida:
                                        usuarioCurtiu,

                                    salva:
                                        usuarioSalvou,

                                };

                            } catch (erro) {

                                console.log(
                                    "Erro ao buscar usuário:",
                                    erro
                                );


                                return {

                                    ...publicacao,

                                    fotoPerfil:
                                        "",

                                    curtidas:
                                        respostaCurtidas.data.filter(
                                            (curtida) =>
                                                String(
                                                    curtida.publicacaoId
                                                ) ===
                                                String(
                                                    publicacao.id
                                                )
                                        ).length,

                                    comentarios:
                                        respostaComentarios.data.filter(
                                            (comentario) =>
                                                String(
                                                    comentario.publicacaoId
                                                ) ===
                                                String(
                                                    publicacao.id
                                                )
                                        ).length,

                                    curtida:
                                        respostaCurtidas.data.some(
                                            (curtida) =>
                                                String(
                                                    curtida.publicacaoId
                                                ) ===
                                                String(
                                                    publicacao.id
                                                ) &&
                                                String(
                                                    curtida.usuarioId
                                                ) ===
                                                String(
                                                    usuarioLogadoId
                                                )
                                        ),

                                    salva:
                                        publicacoesSalvas.some(
                                            (id) =>
                                                String(id) ===
                                                String(
                                                    publicacao.id
                                                )
                                        ),

                                };

                            }

                        }
                    )

                );


            setPublicacoes(
                publicacoesComUsuario
            );


        } catch (erro) {

            console.log(
                "Erro ao carregar publicações:",
                erro
            );


            Alert.alert(
                "Erro",
                "Não foi possível carregar as publicações."
            );

        }

    };


    // =====================================================
    // RECARREGAR QUANDO VOLTAR PARA A FEED
    // =====================================================

    useFocusEffect(

        useCallback(() => {

            carregarPublicacoes();

        }, [])

    );


    // =====================================================
    // ABRIR PERFIL DO USUÁRIO
    // =====================================================

    const abrirPerfil = (usuarioId) => {

        if (!usuarioId) {

            return;

        }


        navigation.navigate(
            "Perfil",
            {
                usuarioId:
                    String(usuarioId)
            }
        );

    };


    // =====================================================
    // CURTIR / DESCURTIR
    // =====================================================

    const curtirPublicacao = async (publicacao) => {

        try {

            // =================================================
            // ID DO USUÁRIO LOGADO
            // =================================================

            const usuarioId =
                await AsyncStorage.getItem(
                    "idUsuario"
                );


            if (!usuarioId) {

                Alert.alert(
                    "Atenção",
                    "Você precisa estar logado para curtir."
                );

                return;

            }


            // =================================================
            // VERIFICAR SE JÁ EXISTE CURTIDA
            // =================================================

            const resposta =
                await api.get(
                    `/curtidas?usuarioId=${usuarioId}&publicacaoId=${publicacao.id}`
                );


            // =================================================
            // JÁ CURTIU → REMOVER
            // =================================================

            if (
                resposta.data.length > 0
            ) {

                const curtida =
                    resposta.data[0];


                await api.delete(
                    `/curtidas/${curtida.id}`
                );

            }


            // =================================================
            // NÃO CURTIU → ADICIONAR
            // =================================================

            else {

                await api.post(
                    "/curtidas",
                    {

                        usuarioId:
                            String(usuarioId),

                        publicacaoId:
                            String(publicacao.id),

                        dataHora:
                            new Date().toISOString(),

                    }
                );

            }


            // =================================================
            // ATUALIZAR FEED
            // =================================================

            await carregarPublicacoes();


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
    // SALVAR / REMOVER PUBLICAÇÃO
    // =====================================================

    const salvarPublicacao = async (publicacao) => {

        try {

            // =================================================
            // ID DO USUÁRIO LOGADO
            // =================================================

            const usuarioId =
                await AsyncStorage.getItem(
                    "idUsuario"
                );


            if (!usuarioId) {

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
                    `publicacoesSalvas_${usuarioId}`
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
                        String(publicacao.id)
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

            }


            // =================================================
            // NÃO ESTÁ SALVA → ADICIONAR
            // =================================================

            else {

                publicacoesSalvas.push(
                    String(
                        publicacao.id
                    )
                );

            }


            // =================================================
            // SALVAR NOVAMENTE
            // =================================================

            await AsyncStorage.setItem(

                `publicacoesSalvas_${usuarioId}`,

                JSON.stringify(
                    publicacoesSalvas
                )

            );


            // =================================================
            // ATUALIZAR CARD
            // =================================================

            setPublicacoes(
                (lista) =>
                    lista.map(
                        (item) =>

                            String(item.id) ===
                                String(publicacao.id)

                                ? {
                                    ...item,
                                    salva:
                                        index === -1
                                }

                                : item

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
    // EXCLUIR PUBLICAÇÃO
    // =====================================================

    const excluirPublicacao = (id) => {

        Alert.alert(

            "Excluir publicação",

            "Tem certeza que deseja excluir esta publicação?",

            [

                {
                    text: "Cancelar",
                    style: "cancel",
                },

                {

                    text: "Excluir",

                    style: "destructive",

                    onPress: async () => {

                        try {

                            await api.delete(
                                `/publicacoes/${id}`
                            );


                            setPublicacoes(
                                (lista) =>
                                    lista.filter(
                                        (publicacao) =>
                                            publicacao.id !== id
                                    )
                            );


                            Alert.alert(
                                "Sucesso",
                                "Publicação excluída."
                            );


                        } catch (erro) {

                            console.log(
                                "Erro ao excluir publicação:",
                                erro
                            );


                            Alert.alert(
                                "Erro",
                                "Não foi possível excluir a publicação."
                            );

                        }

                    },

                },

            ]

        );

    };


    // =====================================================
    // FOTO DE PERFIL
    // =====================================================

    const pegarImagemPerfil = (foto) => {

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
    // FORMATAR DATA
    // =====================================================

    const formatarData = (data) => {

        if (!data) {

            return "";

        }


        try {

            const dataObjeto =
                new Date(data);


            return dataObjeto.toLocaleDateString(
                "pt-BR"
            );


        } catch (erro) {

            return data;

        }

    };


    // =====================================================
    // TELA
    // =====================================================

    return (

        <SafeAreaView
            style={
                TelaFeedStyle.container
            }
        >

            {/* =====================================================
                HEADER
            ===================================================== */}

            <Header
                navigation={
                    navigation
                }
            />


            {/* =====================================================
                FEED
            ===================================================== */}

            <ScrollView

                style={
                    TelaFeedStyle.scroll
                }

                contentContainerStyle={
                    TelaFeedStyle.scrollContent
                }

                showsVerticalScrollIndicator={
                    false
                }

            >

                {
                    publicacoes.map(
                        (publicacao) => (

                            <TouchableOpacity

                                key={
                                    publicacao.id
                                }

                                style={
                                    TelaFeedStyle.post
                                }

                                activeOpacity={
                                    0.9
                                }

                                onPress={() =>
                                    navigation.navigate(
                                        "Publicacao",
                                        {
                                            publicacaoId:
                                                publicacao.id,
                                        }
                                    )
                                }

                            >

                                {/* ================================= */}
                                {/* CABEÇALHO */}
                                {/* ================================= */}

                                <View
                                    style={
                                        TelaFeedStyle.postHeader
                                    }
                                >

                                    <View
                                        style={
                                            TelaFeedStyle.userInfo
                                        }
                                    >

                                        {/* =================================
                                            FOTO DE PERFIL
                                        ================================= */}

                                        <TouchableOpacity

                                            onPress={(event) => {

                                                event.stopPropagation();

                                                abrirPerfil(
                                                    publicacao.usuarioId
                                                );

                                            }}

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
                                                    TelaFeedStyle.avatar
                                                }

                                            />

                                        </TouchableOpacity>


                                        {/* =================================
                                            NOME E HORÁRIO
                                        ================================= */}

                                        <TouchableOpacity

                                            onPress={(event) => {

                                                event.stopPropagation();

                                                abrirPerfil(
                                                    publicacao.usuarioId
                                                );

                                            }}

                                            activeOpacity={
                                                0.7
                                            }

                                        >

                                            <View>

                                                <Text
                                                    style={
                                                        TelaFeedStyle.userName
                                                    }
                                                >

                                                    {
                                                        publicacao.nome ||
                                                        "Usuário"
                                                    }

                                                </Text>


                                                <Text
                                                    style={
                                                        TelaFeedStyle.time
                                                    }
                                                >

                                                    {
                                                        publicacao.horario
                                                            ? formatarData(
                                                                publicacao.horario
                                                            )
                                                            : ""
                                                    }

                                                </Text>

                                            </View>

                                        </TouchableOpacity>

                                    </View>


                                    {/* =================================
                                        TRÊS PONTOS
                                    ================================= */}

                                    <TouchableOpacity

                                        style={
                                            TelaFeedStyle.menuButton
                                        }

                                        onPress={() =>
                                            Alert.alert(
                                                "Publicação",
                                                "O que deseja fazer?",
                                                [

                                                    {
                                                        text: "Cancelar",
                                                        style: "cancel",
                                                    },

                                                    {
                                                        text: "Excluir",
                                                        style: "destructive",

                                                        onPress: () =>
                                                            excluirPublicacao(
                                                                publicacao.id
                                                            ),

                                                    },

                                                ]
                                            )
                                        }

                                    >

                                        <Image

                                            source={
                                                require(
                                                    "../../../assets/TresPontos.png"
                                                )
                                            }

                                            style={
                                                TelaFeedStyle.menuIcon
                                            }

                                        />

                                    </TouchableOpacity>

                                </View>


                                {/* =================================
                                    TEXTO
                                ================================= */}

                                <Text
                                    style={
                                        TelaFeedStyle.postText
                                    }
                                >

                                    {
                                        publicacao.texto
                                    }

                                </Text>


                                {/* =================================
                                    FOTO
                                ================================= */}

                                {
                                    publicacao.foto ? (

                                        <Image

                                            source={{
                                                uri:
                                                    publicacao.foto
                                            }}

                                            style={
                                                TelaFeedStyle.postImage
                                            }

                                            resizeMode="cover"

                                        />

                                    ) : null
                                }


                                {/* =================================
                                    LOCALIZAÇÃO
                                ================================= */}

                                {
                                    publicacao.localizacao ? (

                                        <Text
                                            style={
                                                TelaFeedStyle.location
                                            }
                                        >

                                            📍 {
                                                publicacao.localizacao
                                            }

                                        </Text>

                                    ) : null
                                }


                                {/* =================================
                                    SENTIMENTO
                                ================================= */}

                                {
                                    publicacao.sentimento ? (

                                        <Text
                                            style={
                                                TelaFeedStyle.sentiment
                                            }
                                        >

                                            {
                                                publicacao.sentimento
                                            }

                                        </Text>

                                    ) : null
                                }


                                {/* =================================
                                    AÇÕES
                                ================================= */}

                                <View
                                    style={
                                        TelaFeedStyle.actions
                                    }
                                >

                                    {/* =================================
                                        CURTIR
                                    ================================= */}

                                    <TouchableOpacity

                                        style={
                                            TelaFeedStyle.action
                                        }

                                        onPress={(event) => {

                                            event.stopPropagation();

                                            curtirPublicacao(
                                                publicacao
                                            );

                                        }}

                                    >

                                        <Image

                                            source={

                                                publicacao.curtida

                                                    ? require(
                                                        "../../../assets/CoracaoVermelhoCard.png"
                                                    )

                                                    : require(
                                                        "../../../assets/Coracao.png"
                                                    )

                                            }

                                            style={
                                                TelaFeedStyle.actionIcon
                                            }

                                            resizeMode="contain"

                                        />


                                        <Text
                                            style={
                                                TelaFeedStyle.actionNumber
                                            }
                                        >

                                            {
                                                publicacao.curtidas ||
                                                0
                                            }

                                        </Text>

                                    </TouchableOpacity>


                                    {/* =================================
                                        COMENTÁRIOS
                                    ================================= */}

                                    <TouchableOpacity

                                        style={
                                            TelaFeedStyle.action
                                        }

                                        onPress={(event) => {

                                            event.stopPropagation();

                                            navigation.navigate(
                                                "Publicacao",
                                                {
                                                    publicacaoId:
                                                        publicacao.id,
                                                }
                                            );

                                        }}

                                    >

                                        <Image

                                            source={
                                                require(
                                                    "../../../assets/Comentario.png"
                                                )
                                            }

                                            style={
                                                TelaFeedStyle.actionIcon
                                            }

                                            resizeMode="contain"

                                        />


                                        <Text
                                            style={
                                                TelaFeedStyle.actionNumber
                                            }
                                        >

                                            {
                                                publicacao.comentarios ||
                                                0
                                            }

                                        </Text>

                                    </TouchableOpacity>


                                    {/* =================================
                                        SALVAR
                                    ================================= */}

                                    <TouchableOpacity

                                        style={
                                            TelaFeedStyle.saveButton
                                        }

                                        onPress={(event) => {

                                            event.stopPropagation();

                                            salvarPublicacao(
                                                publicacao
                                            );

                                        }}

                                    >

                                        <Image

                                            source={
                                                require(
                                                    "../../../assets/Salvar.png"
                                                )
                                            }

                                            style={[

                                                TelaFeedStyle.saveIcon,

                                                {
                                                    tintColor:
                                                        publicacao.salva
                                                            ? "#FF6B00"
                                                            : "#315F53",
                                                }

                                            ]}

                                            resizeMode="contain"

                                        />

                                    </TouchableOpacity>

                                </View>

                            </TouchableOpacity>

                        )
                    )
                }

            </ScrollView>


            {/* =====================================================
                BOTÃO CRIAR PUBLICAÇÃO
            ===================================================== */}

            <TouchableOpacity

                style={
                    TelaFeedStyle.botaoCriarPublicacao
                }

                onPress={() =>
                    navigation.navigate(
                        "Criar"
                    )
                }

            >

                <Image

                    source={
                        require(
                            "../../../assets/ImageAddPubli.png"
                        )
                    }

                    style={
                        TelaFeedStyle.imagemCriarPublicacao
                    }

                />

            </TouchableOpacity>






            <Footer
                navigation={
                    navigation
                }
            />

        </SafeAreaView>

    );

};