import React, { useState } from "react";

import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { TelaFeedStyle } from "./TelaFeedStyle";

import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

export const TelaFeed = ({ navigation }) => {

    const [publicacoes, setPublicacoes] = useState([
        {
            id: 1,
            nome: "Galo Cego",
            horario: "Hoje às 10:30",
            texto: "Aprendendo React Native e Expo Router!",
            foto: require("../../../assets/images-galocego.jpg"),
            curtidas: 25,
            comentarios: 4,
            curtida: false,
            salva: false,
        },

        {
            id: 2,
            nome: "Maria Oliveira",
            horario: "Hoje às 10:30",
            texto: "Meu primeiro projeto mobile ficou pronto!!",
            foto: require("../../../assets/images-galocego.jpg"),
            curtidas: 32,
            comentarios: 8,
            curtida: false,
            salva: false,
        },

        {
            id: 3,
            nome: "João natalicio",
            horario: "Hoje às 12:99",
            texto: "Amo progamar",
            foto: require("../../../assets/images-galocego.jpg"),
            curtidas: 32,
            comentarios: 8,
            curtida: false,
            salva: false,
        },

        {
            id: 4,
            nome: "Isis Ribeiro",
            horario: "Hoje às 12:99",
            foto: require("../../../assets/images-galocego.jpg"),
            texto: "Amo progamar",
            curtidas: 32,
            comentarios: 8,
            curtida: false,
            salva: false,
        },

        {
            id: 5,
            nome: "Marcos Vinicius",
            horario: "Hoje às 12:99",
            foto: require("../../../assets/images-galocego.jpg"),
            texto: "Amo progamar",
            curtidas: 32,
            comentarios: 8,
            curtida: false,
            salva: false,
        },
    ]);


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
                                    source={publicacao.foto}
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

                                <Ionicons
                                    name={
                                        publicacao.salva
                                            ? "bookmark"
                                            : "bookmark-outline"
                                    }
                                    size={27}
                                    color={
                                        publicacao.salva
                                            ? "#F56333"
                                            : "#315F53"
                                    }
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