import React, { useCallback, useState } from "react";

import {
    Image,
    ScrollView,
    Text,
    View,
} from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { NotificacaoStyle } from "./NotificacaoStyle";

import Footer from "../../components/footer/Footer";

import { SafeAreaView } from "react-native-safe-area-context";

import api from "../../services/api";


export const Notificacao = ({ navigation }) => {

    const [notificacoes, setNotificacoes] = useState([]);


    // =====================================================
    // FORMATAR DATA E HORA
    // =====================================================

    const formatarDataHora = (data) => {

        // -------------------------------------------------
        // Se não existir uma data
        // -------------------------------------------------

        if (!data) {
            return "Agora";
        }


        // -------------------------------------------------
        // Ignorar valores como "Agora"
        // -------------------------------------------------

        if (
            typeof data === "string" &&
            data.toLowerCase() === "agora"
        ) {
            return "Agora";
        }


        // -------------------------------------------------
        // Criar objeto de data
        // -------------------------------------------------

        const dataNotificacao = new Date(data);


        // -------------------------------------------------
        // Verificar se a data é válida
        // -------------------------------------------------

        if (isNaN(dataNotificacao.getTime())) {
            return "Agora";
        }


        const agora = new Date();


        // =================================================
        // DATA DE HOJE
        // =================================================

        const hoje = new Date(
            agora.getFullYear(),
            agora.getMonth(),
            agora.getDate()
        );


        // =================================================
        // DATA DA NOTIFICAÇÃO
        // =================================================

        const diaNotificacao = new Date(
            dataNotificacao.getFullYear(),
            dataNotificacao.getMonth(),
            dataNotificacao.getDate()
        );


        // =================================================
        // DIFERENÇA EM DIAS
        // =================================================

        const diferencaDias = Math.floor(
            (
                hoje.getTime() -
                diaNotificacao.getTime()
            ) /
            (
                1000 *
                60 *
                60 *
                24
            )
        );


        // =================================================
        // HORA
        // =================================================

        const horas = String(
            dataNotificacao.getHours()
        ).padStart(2, "0");


        // =================================================
        // MINUTOS
        // =================================================

        const minutos = String(
            dataNotificacao.getMinutes()
        ).padStart(2, "0");


        // =================================================
        // HOJE
        // =================================================

        if (diferencaDias === 0) {

            return `Hoje às ${horas}:${minutos}`;

        }


        // =================================================
        // ONTEM
        // =================================================

        if (diferencaDias === 1) {

            return `Ontem às ${horas}:${minutos}`;

        }


        // =================================================
        // OUTRAS DATAS
        // =================================================

        const dia = String(
            dataNotificacao.getDate()
        ).padStart(2, "0");


        const mes = String(
            dataNotificacao.getMonth() + 1
        ).padStart(2, "0");


        const ano = dataNotificacao.getFullYear();


        return `${dia}/${mes}/${ano} às ${horas}:${minutos}`;

    };


    // =====================================================
    // PEGAR DATA REAL DA AÇÃO
    // =====================================================

    const pegarDataAcao = (item) => {

        // Prioridade:
        // 1. dataHora
        // 2. dataCriacao
        // 3. horario

        if (item?.dataHora) {
            return item.dataHora;
        }

        if (item?.dataCriacao) {
            return item.dataCriacao;
        }

        // "Agora" não é uma data válida.
        // Nesse caso não inventamos uma data.
        if (
            item?.horario &&
            item.horario !== "Agora"
        ) {
            return item.horario;
        }

        return null;
    };


    // =====================================================
    // CARREGAR NOTIFICAÇÕES
    // =====================================================

    const carregarNotificacoes = async () => {

        try {

            // =================================================
            // PEGAR USUÁRIO LOGADO
            // =================================================

            const usuarioLogadoId =
                await AsyncStorage.getItem("idUsuario");


            if (!usuarioLogadoId) {

                console.log(
                    "Usuário logado não encontrado."
                );

                return;

            }


            // =================================================
            // BUSCAR PUBLICAÇÕES
            // =================================================

            const respostaPublicacoes =
                await api.get("/publicacoes");


            // =================================================
            // BUSCAR CURTIDAS
            // =================================================

            const respostaCurtidas =
                await api.get("/curtidas");


            // =================================================
            // BUSCAR COMENTÁRIOS
            // =================================================

            const respostaComentarios =
                await api.get("/comentarios");


            // =================================================
            // BUSCAR USUÁRIOS
            // =================================================

            const respostaUsuarios =
                await api.get("/usuarios");


            const publicacoes =
                respostaPublicacoes.data;


            const curtidas =
                respostaCurtidas.data;


            const comentarios =
                respostaComentarios.data;


            const usuarios =
                respostaUsuarios.data;


            // =================================================
            // PUBLICAÇÕES DO USUÁRIO LOGADO
            // =================================================

            const minhasPublicacoes =
                publicacoes.filter(
                    (publicacao) =>
                        String(publicacao.usuarioId) ===
                        String(usuarioLogadoId)
                );


            // =================================================
            // ARRAY DE NOTIFICAÇÕES
            // =================================================

            let novasNotificacoes = [];


            // =================================================
            // NOTIFICAÇÕES DE CURTIDAS
            // =================================================

            curtidas.forEach((curtida) => {

                // -------------------------------------------------
                // Procurar publicação
                // -------------------------------------------------

                const publicacao =
                    minhasPublicacoes.find(
                        (pub) =>
                            String(pub.id) ===
                            String(curtida.publicacaoId)
                    );


                if (!publicacao) {
                    return;
                }


                // -------------------------------------------------
                // Não notificar a própria curtida
                // -------------------------------------------------

                if (
                    String(curtida.usuarioId) ===
                    String(usuarioLogadoId)
                ) {
                    return;
                }


                // -------------------------------------------------
                // Procurar usuário
                // -------------------------------------------------

                const usuario =
                    usuarios.find(
                        (user) =>
                            String(user.id) ===
                            String(curtida.usuarioId)
                    );


                if (!usuario) {
                    return;
                }


                // -------------------------------------------------
                // Pegar data real da curtida
                // -------------------------------------------------

                const dataAcao =
                    pegarDataAcao(curtida);


                // -------------------------------------------------
                // Converter para ordenação
                // -------------------------------------------------

                const dataOrdenacao =
                    dataAcao
                        ? new Date(dataAcao).getTime()
                        : 0;


                // -------------------------------------------------
                // Adicionar notificação
                // -------------------------------------------------

                novasNotificacoes.push({

                    id:
                        `curtida-${curtida.id}`,

                    nome:
                        usuario.nome,

                    acao:
                        "curtiu sua publicação",

                    horario:
                        formatarDataHora(dataAcao),

                    imagem:
                        require(
                            "../../../assets/CoracaoVermelhoCard.png"
                        ),

                    dataOrdenacao:
                        isNaN(dataOrdenacao)
                            ? 0
                            : dataOrdenacao,

                });

            });


            // =====================================================
            // NOTIFICAÇÕES DE COMENTÁRIOS
            // =====================================================

            comentarios.forEach((comentario) => {

                // -------------------------------------------------
                // Procurar publicação
                // -------------------------------------------------

                const publicacao =
                    minhasPublicacoes.find(
                        (pub) =>
                            String(pub.id) ===
                            String(comentario.publicacaoId)
                    );


                if (!publicacao) {
                    return;
                }


                // -------------------------------------------------
                // Não notificar o próprio comentário
                // -------------------------------------------------

                if (
                    String(comentario.usuarioId) ===
                    String(usuarioLogadoId)
                ) {
                    return;
                }


                // -------------------------------------------------
                // Procurar usuário
                // -------------------------------------------------

                const usuario =
                    usuarios.find(
                        (user) =>
                            String(user.id) ===
                            String(comentario.usuarioId)
                    );


                if (!usuario) {
                    return;
                }


                // -------------------------------------------------
                // Pegar data real do comentário
                // -------------------------------------------------

                const dataAcao =
                    pegarDataAcao(comentario);


                // -------------------------------------------------
                // Converter para ordenação
                // -------------------------------------------------

                const dataOrdenacao =
                    dataAcao
                        ? new Date(dataAcao).getTime()
                        : 0;


                // -------------------------------------------------
                // Adicionar notificação
                // -------------------------------------------------

                novasNotificacoes.push({

                    id:
                        `comentario-${comentario.id}`,

                    nome:
                        usuario.nome,

                    acao:
                        "comentou na sua publicação",

                    horario:
                        formatarDataHora(dataAcao),

                    imagem:
                        require(
                            "../../../assets/Comentario.png"
                        ),

                    dataOrdenacao:
                        isNaN(dataOrdenacao)
                            ? 0
                            : dataOrdenacao,

                });

            });


            // =====================================================
            // ORDENAR
            // MAIS NOVA → MAIS ANTIGA
            // =====================================================

            novasNotificacoes.sort(
                (a, b) =>
                    b.dataOrdenacao -
                    a.dataOrdenacao
            );


            // =====================================================
            // SALVAR NO ESTADO
            // =====================================================

            setNotificacoes(
                novasNotificacoes
            );


        } catch (erro) {

            console.log(
                "Erro ao carregar notificações:",
                erro
            );

        }

    };


    // =====================================================
    // ATUALIZAR AO ABRIR A TELA
    // =====================================================

    useFocusEffect(

        useCallback(() => {

            carregarNotificacoes();

        }, [])

    );


    // =====================================================
    // TELA
    // =====================================================

    return (

        <SafeAreaView
            style={
                NotificacaoStyle.container
            }
        >

            {/* =====================================================
                HEADER
            ===================================================== */}

            <View
                style={
                    NotificacaoStyle.header
                }
            >

                <Text
                    style={
                        NotificacaoStyle.titulo
                    }
                >
                    Notificações
                </Text>

            </View>


            {/* =====================================================
                LISTA
            ===================================================== */}

            <ScrollView

                showsVerticalScrollIndicator={false}

                contentContainerStyle={
                    NotificacaoStyle.lista
                }

            >

                {
                    notificacoes.length > 0 ? (

                        notificacoes.map(
                            (notificacao) => (

                                <View

                                    key={
                                        notificacao.id
                                    }

                                    style={
                                        NotificacaoStyle.notificacaoCard
                                    }

                                >

                                    {/* =================================================
                                        ÍCONE
                                    ================================================= */}

                                    <Image

                                        source={
                                            notificacao.imagem
                                        }

                                        style={
                                            NotificacaoStyle.iconeNotificacao
                                        }

                                        resizeMode="contain"

                                    />


                                    {/* =================================================
                                        TEXTOS
                                    ================================================= */}

                                    <View
                                        style={
                                            NotificacaoStyle.textoContainer
                                        }
                                    >

                                        <View
                                            style={
                                                NotificacaoStyle.linhaPrincipal
                                            }
                                        >

                                            <Text
                                                style={
                                                    NotificacaoStyle.nome
                                                }
                                            >
                                                {
                                                    notificacao.nome
                                                }
                                            </Text>


                                            <Text
                                                style={
                                                    NotificacaoStyle.acao
                                                }
                                            >
                                                {" "}
                                                {
                                                    notificacao.acao
                                                }
                                            </Text>

                                        </View>


                                        <Text
                                            style={
                                                NotificacaoStyle.horario
                                            }
                                        >
                                            {
                                                notificacao.horario
                                            }
                                        </Text>

                                    </View>

                                </View>

                            )
                        )

                    ) : (

                        <View
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                                paddingTop: 80,
                                paddingHorizontal: 30,
                            }}
                        >

                            <Text
                                style={{
                                    fontSize: 16,
                                    color: "#777777",
                                    textAlign: "center",
                                }}
                            >
                                Você ainda não possui notificações.
                            </Text>

                        </View>

                    )
                }

            </ScrollView>


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