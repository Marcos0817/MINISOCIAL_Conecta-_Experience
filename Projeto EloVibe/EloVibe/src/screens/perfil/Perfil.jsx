import React, { useCallback, useState } from "react";

import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import PerfilStyle from "./PerfilStyle";

import Footer from "../../components/footer/Footer";
import api from "../../services/api";


const TelaPerfil = ({ navigation }) => {

    const [usuario, setUsuario] = useState({
        id: "",
        nome: "",
        email: "",
        usuario: "",
        bio: "",
        foto: "",
    });

    const [publicacoes, setPublicacoes] = useState([]);


    // =====================================================
    // CARREGAR USUÁRIO E PUBLICAÇÕES
    // =====================================================

    const carregarUsuario = async () => {

        try {

            const usuarioId =
                await AsyncStorage.getItem("usuarioId");

            console.log(
                "ID DO USUÁRIO LOGADO:",
                usuarioId
            );


            if (!usuarioId) {

                console.log(
                    "ID do usuário não encontrado."
                );

                return;
            }


            // =================================================
            // BUSCAR USUÁRIO
            // =================================================

            const respostaUsuario =
                await api.get(
                    `/usuarios/${usuarioId}`
                );

            console.log(
                "USUÁRIO:",
                respostaUsuario.data
            );


            setUsuario(
                respostaUsuario.data
            );


            // =================================================
            // BUSCAR PUBLICAÇÕES
            // =================================================

            const respostaPublicacoes =
                await api.get(
                    "/publicacoes"
                );


            console.log(
                "TODAS AS PUBLICAÇÕES:",
                respostaPublicacoes.data
            );


            // =================================================
            // FILTRAR PUBLICAÇÕES DO USUÁRIO
            // =================================================

            const minhasPublicacoes =
                respostaPublicacoes.data.filter(
                    (publicacao) => {

                        return (
                            String(
                                publicacao.usuarioId
                            ) ===
                            String(usuarioId)
                        );

                    }
                );


            console.log(
                "MINHAS PUBLICAÇÕES:",
                minhasPublicacoes
            );


            // =================================================
            // SALVAR PUBLICAÇÕES
            // =================================================

            setPublicacoes(
                minhasPublicacoes
            );

        } catch (erro) {

            console.log(
                "ERRO AO CARREGAR PERFIL:",
                erro.response?.data ||
                erro.message
            );

        }

    };


    // =====================================================
    // ATUALIZAR AO VOLTAR PARA O PERFIL
    // =====================================================

    useFocusEffect(

        useCallback(() => {

            carregarUsuario();

        }, [])

    );


    // =====================================================
    // LOGOUT
    // =====================================================

    const handleLogout = async () => {

        try {

            await AsyncStorage.removeItem(
                "usuarioId"
            );

            await AsyncStorage.removeItem(
                "nomeUsuario"
            );

            await AsyncStorage.removeItem(
                "emailUsuario"
            );


            navigation.reset({
                index: 0,
                routes: [
                    {
                        name: "BoasVindas"
                    }
                ],
            });

        } catch (erro) {

            console.log(
                "Erro ao fazer logout:",
                erro
            );

        }

    };


    // =====================================================
    // ABRIR PUBLICAÇÃO
    // =====================================================

    const abrirPublicacao = (id) => {

        navigation.navigate(
            "Publicacao",
            {
                publicacaoId: id
            }
        );

    };


    // =====================================================
    // PEGAR IMAGEM
    // =====================================================

    const pegarImagem = (foto) => {

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


    return (

        <SafeAreaView
            style={PerfilStyle.container}
        >

            <ScrollView
                contentContainerStyle={
                    PerfilStyle.scrollContent
                }
                showsVerticalScrollIndicator={false}
            >

                {/* =====================================================
                    BOTÃO SAIR
                ===================================================== */}

                <TouchableOpacity
                    style={PerfilStyle.sair}
                    onPress={handleLogout}
                >

                    <Ionicons
                        name="log-out-outline"
                        size={27}
                        color="#FF6B00"
                    />

                </TouchableOpacity>


                {/* =====================================================
                    CONFIGURAÇÕES
                ===================================================== */}

                <TouchableOpacity
                    style={
                        PerfilStyle.configuracao
                    }
                >

                    <Ionicons
                        name="settings-outline"
                        size={25}
                        color="#315F53"
                    />

                </TouchableOpacity>


                {/* =====================================================
                    TÍTULO
                ===================================================== */}

                <Text
                    style={PerfilStyle.titulo}
                >
                    Meu Perfil
                </Text>


                {/* =====================================================
                    FOTO DE PERFIL
                ===================================================== */}

                <View
                    style={
                        PerfilStyle.fotoContainer
                    }
                >

                    <Image
                        source={
                            usuario.foto
                                ? {
                                    uri: usuario.foto
                                }
                                : require(
                                    "../../../assets/images-galocego.jpg"
                                )
                        }
                        style={
                            PerfilStyle.foto
                        }
                        resizeMode="cover"
                    />


                    <TouchableOpacity
                        style={
                            PerfilStyle.botaoEditar
                        }
                        onPress={() =>
                            navigation.navigate(
                                "EditarPerfil"
                            )
                        }
                    >

                        <Ionicons
                            name="create-outline"
                            size={18}
                            color="#315F53"
                        />

                    </TouchableOpacity>

                </View>


                {/* =====================================================
                    NOME
                ===================================================== */}

                <Text
                    style={PerfilStyle.nome}
                >
                    {
                        usuario.nome ||
                        "Nome do usuário"
                    }
                </Text>


                {/* =====================================================
                    EMAIL
                ===================================================== */}

                <Text
                    style={PerfilStyle.email}
                >
                    {
                        usuario.email ||
                        "E-mail não informado"
                    }
                </Text>


                {/* =====================================================
                    ESTATÍSTICAS
                ===================================================== */}

                <View
                    style={
                        PerfilStyle.estatisticas
                    }
                >

                    <View
                        style={
                            PerfilStyle.estatistica
                        }
                    >

                        <Text
                            style={
                                PerfilStyle.numero
                            }
                        >
                            {publicacoes.length}
                        </Text>

                        <Text
                            style={
                                PerfilStyle.label
                            }
                        >
                            Publicações
                        </Text>

                    </View>


                    <View
                        style={
                            PerfilStyle.estatistica
                        }
                    >

                        <Text
                            style={
                                PerfilStyle.numero
                            }
                        >
                            1900
                        </Text>

                        <Text
                            style={
                                PerfilStyle.label
                            }
                        >
                            Seguidores
                        </Text>

                    </View>


                    <View
                        style={
                            PerfilStyle.estatistica
                        }
                    >

                        <Text
                            style={
                                PerfilStyle.numero
                            }
                        >
                            6767
                        </Text>

                        <Text
                            style={
                                PerfilStyle.label
                            }
                        >
                            Seguindo
                        </Text>

                    </View>

                </View>


                {/* =====================================================
                    BIO
                ===================================================== */}

                <Text
                    style={PerfilStyle.bio}
                >
                    {
                        usuario.bio
                            ? usuario.bio
                            : "Nenhuma biografia adicionada."
                    }
                </Text>


                {/* =====================================================
                    ABAS
                ===================================================== */}

                <View
                    style={PerfilStyle.abas}
                >

                    <View
                        style={PerfilStyle.aba}
                    >

                        <Ionicons
                            name="grid-outline"
                            size={22}
                            color="#315F53"
                        />

                    </View>


                    <View
                        style={PerfilStyle.aba}
                    >

                        <Ionicons
                            name="bookmark-outline"
                            size={22}
                            color="#777777"
                        />

                    </View>

                </View>


                {/* =====================================================
                    LINHA DAS ABAS
                ===================================================== */}

                <View
                    style={
                        PerfilStyle.linhaAbas
                    }
                />

                <View
                    style={
                        PerfilStyle.linhaAtiva
                    }
                />


                {/* =====================================================
                    PUBLICAÇÕES
                ===================================================== */}

                <View
                    style={
                        PerfilStyle.gradePublicacoes
                    }
                >

                    {publicacoes.map(
                        (publicacao) => (

                        <TouchableOpacity
                            key={publicacao.id}
                            style={
                                PerfilStyle.cardPublicacao
                            }
                            activeOpacity={0.8}
                            onPress={() =>
                                abrirPublicacao(
                                    publicacao.id
                                )
                            }
                        >

                            {publicacao.foto ? (

                                <Image
                                    source={
                                        pegarImagem(
                                            publicacao.foto
                                        )
                                    }
                                    style={
                                        PerfilStyle.imagemPublicacao
                                    }
                                    resizeMode="cover"
                                />

                            ) : (

                                <View
                                    style={
                                        PerfilStyle.publicacaoSemImagem
                                    }
                                >

                                    <Ionicons
                                        name="image-outline"
                                        size={30}
                                        color="#999999"
                                    />

                                </View>

                            )}

                        </TouchableOpacity>

                    ))}

                </View>


            </ScrollView>


            {/* =====================================================
                FOOTER
            ===================================================== */}

            <Footer
                navigation={navigation}
            />

        </SafeAreaView>
    );
};


export default TelaPerfil;