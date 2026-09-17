import React, { useEffect, useState } from "react";

import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    Alert,
} from "react-native";

import api from "../../services/api";

import { SafeAreaView } from "react-native-safe-area-context";

import { TelaFeedStyle } from "./TelaFeedStyle";

import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";


export const TelaFeed = ({ navigation }) => {

    const [publicacoes, setPublicacoes] = useState([]);


    // =====================================================
    // CARREGAR PUBLICAÇÕES
    // =====================================================

    useEffect(() => {

        const carregarPublicacoes = async () => {

            try {

                const resposta =
                    await api.get("/publicacoes");


                // =================================================
                // BUSCA A FOTO DE PERFIL DE CADA USUÁRIO
                // =================================================

                const publicacoesComUsuario =
                    await Promise.all(

                        resposta.data.map(
                            async (publicacao) => {

                                try {

                                    const respostaUsuario =
                                        await api.get(
                                            `/usuarios/${publicacao.usuarioId}`
                                        );


                                    return {

                                        ...publicacao,

                                        // Foto de perfil do usuário
                                        fotoPerfil:
                                            respostaUsuario.data.foto,

                                        // Nome atualizado do usuário
                                        nome:
                                            respostaUsuario.data.nome,

                                        curtida: false,

                                        salva: false,

                                    };

                                } catch (erro) {

                                    console.log(
                                        "Erro ao buscar usuário:",
                                        erro
                                    );


                                    return {

                                        ...publicacao,

                                        fotoPerfil: "",

                                        curtida: false,

                                        salva: false,

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

            }

        };


        carregarPublicacoes();

    }, []);


    // =====================================================
    // CURTIR
    // =====================================================

    const curtirPublicacao = (id) => {

        setPublicacoes((lista) =>

            lista.map((publicacao) => {

                if (publicacao.id === id) {

                    return {

                        ...publicacao,

                        curtida:
                            !publicacao.curtida,

                        curtidas:
                            publicacao.curtida
                                ? publicacao.curtidas - 1
                                : publicacao.curtidas + 1,

                    };

                }

                return publicacao;

            })

        );

    };


    // =====================================================
    // SALVAR
    // =====================================================

    const salvarPublicacao = (id) => {

        setPublicacoes((lista) =>

            lista.map((publicacao) => {

                if (publicacao.id === id) {

                    return {

                        ...publicacao,

                        salva:
                            !publicacao.salva,

                    };

                }

                return publicacao;

            })

        );

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

        if (!foto || foto === "") {

            return require(
                "../../../assets/images-galocego.jpg"
            );

        }


        return {
            uri: foto
        };

    };


    return (

        <SafeAreaView
            style={TelaFeedStyle.container}
        >

            <Header
                navigation={navigation}
            />


            <ScrollView

                style={TelaFeedStyle.scroll}

                contentContainerStyle={
                    TelaFeedStyle.scrollContent
                }

                showsVerticalScrollIndicator={false}

            >

                {publicacoes.map(
                    (publicacao) => (

                    <TouchableOpacity

                        key={publicacao.id}

                        style={
                            TelaFeedStyle.post
                        }

                        activeOpacity={0.9}

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


                        {/* =====================================================
                            CABEÇALHO
                        ===================================================== */}

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

                                {/* FOTO DE PERFIL */}

                                <Image

                                    source={
                                        pegarImagemPerfil(
                                            publicacao.fotoPerfil
                                        )
                                    }

                                    style={
                                        TelaFeedStyle.avatar
                                    }

                                    resizeMode="cover"

                                />


                                <View>

                                    <Text
                                        style={
                                            TelaFeedStyle.userName
                                        }
                                    >
                                        {publicacao.nome}
                                    </Text>


                                    <Text
                                        style={
                                            TelaFeedStyle.time
                                        }
                                    >
                                        {publicacao.horario}
                                    </Text>

                                </View>

                            </View>


                            {/* =====================================================
                                TRÊS PONTOS
                            ===================================================== */}

                            <TouchableOpacity

                                style={
                                    TelaFeedStyle.menuButton
                                }

                                onPress={(event) => {

                                    event.stopPropagation();

                                    excluirPublicacao(
                                        publicacao.id
                                    );

                                }}

                            >

                                <Image

                                    source={require(
                                        "../../../assets/TresPontos.png"
                                    )}

                                    style={
                                        TelaFeedStyle.menuIcon
                                    }

                                    resizeMode="contain"

                                />

                            </TouchableOpacity>

                        </View>


                        {/* =====================================================
                            TEXTO
                        ===================================================== */}

                        <Text
                            style={
                                TelaFeedStyle.postText
                            }
                        >
                            {publicacao.texto}
                        </Text>


                        {/* =====================================================
                            FOTO DA PUBLICAÇÃO
                        ===================================================== */}

                        {publicacao.foto &&
                            publicacao.foto !== "" &&
                            publicacao.foto !== "images-galocego.jpg" && (

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

                        )}


                        {/* =====================================================
                            LOCALIZAÇÃO
                        ===================================================== */}

                        {publicacao.localizacao &&
                            publicacao.localizacao !== "" && (

                            <Text
                                style={
                                    TelaFeedStyle.location
                                }
                            >
                                📍 {publicacao.localizacao}
                            </Text>

                        )}


                        {/* =====================================================
                            SENTIMENTO
                        ===================================================== */}

                        {publicacao.sentimento &&
                            publicacao.sentimento !== "" && (

                            <Text
                                style={
                                    TelaFeedStyle.sentiment
                                }
                            >
                                {publicacao.sentimento}
                            </Text>

                        )}


                        {/* =====================================================
                            AÇÕES
                        ===================================================== */}

                        <View
                            style={
                                TelaFeedStyle.actions
                            }
                        >


                            {/* CURTIR */}

                            <TouchableOpacity

                                style={
                                    TelaFeedStyle.action
                                }

                                onPress={(event) => {

                                    event.stopPropagation();

                                    curtirPublicacao(
                                        publicacao.id
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
                                    {publicacao.curtidas || 0}
                                </Text>

                            </TouchableOpacity>


                            {/* COMENTÁRIOS */}

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

                                    source={require(
                                        "../../../assets/Comentario.png"
                                    )}

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
                                    {publicacao.comentarios || 0}
                                </Text>

                            </TouchableOpacity>


                            {/* SALVAR */}

                            <TouchableOpacity

                                style={
                                    TelaFeedStyle.saveButton
                                }

                                onPress={(event) => {

                                    event.stopPropagation();

                                    salvarPublicacao(
                                        publicacao.id
                                    );

                                }}

                            >

                                <Image

                                    source={require(
                                        "../../../assets/Salvar.png"
                                    )}

                                    style={[

                                        TelaFeedStyle.saveIcon,

                                        publicacao.salva && {
                                            tintColor:
                                                "#F56333",
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
                BOTÃO CRIAR PUBLICAÇÃO
            ===================================================== */}

            <TouchableOpacity

                style={
                    TelaFeedStyle.botaoCriarPublicacao
                }

                activeOpacity={0.8}

                onPress={() =>
                    navigation.navigate("Criar")
                }

            >

                <Image

                    source={require(
                        "../../../assets/ImageAddPubli.png"
                    )}

                    style={
                        TelaFeedStyle.imagemCriarPublicacao
                    }

                    resizeMode="contain"

                />

            </TouchableOpacity>


            {/* =====================================================
                FOOTER
            ===================================================== */}

            <Footer
                navigation={navigation}
            />

        </SafeAreaView>

    );

};