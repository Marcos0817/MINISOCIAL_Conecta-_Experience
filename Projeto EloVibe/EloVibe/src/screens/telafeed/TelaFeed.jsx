import React, { useEffect, useState } from "react";

import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
} from "react-native";

import api from "../../services/api";

import { SafeAreaView } from "react-native-safe-area-context";

import { TelaFeedStyle } from "./TelaFeedStyle";

import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";


export const TelaFeed = ({ navigation }) => {

    // =====================================================
    // PUBLICAÇÕES
    // =====================================================

    const [publicacoes, setPublicacoes] = useState([]);


    // =====================================================
    // CARREGAR PUBLICAÇÕES DA API
    // =====================================================

    useEffect(() => {

        const carregarPublicacoes = async () => {

            try {

                const resposta = await api.get("/publicacoes");

                const publicacoesApi = resposta.data.map((publicacao) => ({
                    ...publicacao,

                    // Começam como não curtidas
                    curtida: false,

                    // Começam como não salvas
                    salva: false,
                }));

                setPublicacoes(publicacoesApi);

            } catch (erro) {

                console.log(
                    "Erro ao carregar publicações:",
                    erro
                );

            }

        };

        carregarPublicacoes();

    }, []);


    // =====================================================
    // CURTIR PUBLICAÇÃO
    // =====================================================

    const curtirPublicacao = (id) => {

        setPublicacoes((lista) =>

            lista.map((publicacao) => {

                if (publicacao.id === id) {

                    return {
                        ...publicacao,

                        curtida: !publicacao.curtida,

                        curtidas: publicacao.curtida
                            ? publicacao.curtidas - 1
                            : publicacao.curtidas + 1,
                    };

                }

                return publicacao;

            })

        );

    };


    // =====================================================
    // SALVAR PUBLICAÇÃO
    // =====================================================

    const salvarPublicacao = (id) => {

        setPublicacoes((lista) =>

            lista.map((publicacao) => {

                if (publicacao.id === id) {

                    return {
                        ...publicacao,
                        salva: !publicacao.salva,
                    };

                }

                return publicacao;

            })

        );

    };


    // =====================================================
    // IMAGEM DA PUBLICAÇÃO
    // =====================================================

    const pegarImagem = (foto) => {

        if (foto === "images-galocego.jpg") {

            return require("../../../assets/images-galocego.jpg");

        }

        // Imagem padrão caso não encontre
        return require("../../../assets/images-galocego.jpg");

    };


    // =====================================================
    // TELA
    // =====================================================

    return (

        <SafeAreaView style={TelaFeedStyle.container}>

            {/* =====================================================
                HEADER
            ===================================================== */}

            <Header navigation={navigation} />


            {/* =====================================================
                LISTA
            ===================================================== */}

            <ScrollView
                style={TelaFeedStyle.scroll}
                contentContainerStyle={TelaFeedStyle.scrollContent}
                showsVerticalScrollIndicator={false}
            >

                {publicacoes.map((publicacao) => (

                    <TouchableOpacity
                        key={publicacao.id}
                        style={TelaFeedStyle.post}
                        activeOpacity={0.9}
                        onPress={() =>
                            navigation.navigate(
                                "Publicacao",
                                {
                                    publicacao: publicacao,
                                }
                            )
                        }
                    >

                        {/* =====================================================
                            CABEÇALHO DA PUBLICAÇÃO
                        ===================================================== */}

                        <View style={TelaFeedStyle.postHeader}>

                            <View style={TelaFeedStyle.userInfo}>

                                <Image
                                    source={pegarImagem(publicacao.foto)}
                                    style={TelaFeedStyle.avatar}
                                    resizeMode="cover"
                                />

                                <View>

                                    <Text style={TelaFeedStyle.userName}>
                                        {publicacao.nome}
                                    </Text>

                                    <Text style={TelaFeedStyle.time}>
                                        {publicacao.horario}
                                    </Text>

                                </View>

                            </View>


                            {/* TRÊS PONTOS */}

                            <TouchableOpacity
                                style={TelaFeedStyle.menuButton}
                                onPress={(event) =>
                                    event.stopPropagation()
                                }
                            >

                                <Image
                                    source={require("../../../assets/TresPontos.png")}
                                    style={TelaFeedStyle.menuIcon}
                                    resizeMode="contain"
                                />

                            </TouchableOpacity>

                        </View>


                        {/* =====================================================
                            TEXTO DA PUBLICAÇÃO
                        ===================================================== */}

                        <Text style={TelaFeedStyle.postText}>
                            {publicacao.texto}
                        </Text>


                        {/* =====================================================
                            AÇÕES
                        ===================================================== */}

                        <View style={TelaFeedStyle.actions}>

                            {/* =====================================================
                                CURTIR
                            ===================================================== */}

                            <TouchableOpacity
                                style={TelaFeedStyle.action}
                                onPress={(event) => {

                                    event.stopPropagation();

                                    curtirPublicacao(publicacao.id);

                                }}
                            >

                                <Image
                                    source={
                                        publicacao.curtida
                                            ? require("../../../assets/CoracaoVermelhoCard.png")
                                            : require("../../../assets/Coracao.png")
                                    }
                                    style={TelaFeedStyle.actionIcon}
                                    resizeMode="contain"
                                />

                                <Text style={TelaFeedStyle.actionNumber}>
                                    {publicacao.curtidas}
                                </Text>

                            </TouchableOpacity>


                            {/* =====================================================
                                COMENTÁRIOS
                            ===================================================== */}

                            <TouchableOpacity
                                style={TelaFeedStyle.action}
                                onPress={(event) => {

                                    event.stopPropagation();

                                    navigation.navigate(
                                        "Publicacao",
                                        {
                                            publicacao: publicacao,
                                        }
                                    );

                                }}
                            >

                                <Image
                                    source={require("../../../assets/Comentario.png")}
                                    style={TelaFeedStyle.actionIcon}
                                    resizeMode="contain"
                                />

                                <Text style={TelaFeedStyle.actionNumber}>
                                    {publicacao.comentarios}
                                </Text>

                            </TouchableOpacity>


                            {/* =====================================================
                                SALVAR
                            ===================================================== */}

                            <TouchableOpacity
                                style={TelaFeedStyle.saveButton}
                                onPress={(event) => {

                                    event.stopPropagation();

                                    salvarPublicacao(publicacao.id);

                                }}
                            >

                                <Image
                                    source={require("../../../assets/Salvar.png")}
                                    style={[
                                        TelaFeedStyle.saveIcon,

                                        publicacao.salva && {
                                            tintColor: "#F56333",
                                        },
                                    ]}
                                    resizeMode="contain"
                                />

                            </TouchableOpacity>

                        </View>

                    </TouchableOpacity>

                ))}

            </ScrollView>


            {/* =====================================================
                BOTÃO FLUTUANTE DE CRIAR PUBLICAÇÃO
            ===================================================== */}

            <TouchableOpacity
                style={TelaFeedStyle.botaoCriarPublicacao}
                activeOpacity={0.8}
                onPress={() => navigation.navigate("Criar")}
            >

                <Image
                    source={require("../../../assets/ImageAddPubli.png")}
                    style={TelaFeedStyle.imagemCriarPublicacao}
                    resizeMode="contain"
                />

            </TouchableOpacity>


            {/* =====================================================
                FOOTER
            ===================================================== */}

            <Footer navigation={navigation} />

        </SafeAreaView>

    );

};