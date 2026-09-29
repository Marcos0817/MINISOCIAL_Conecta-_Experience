import React, { useEffect, useState } from "react";

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    Alert,
    ActivityIndicator,
} from "react-native";

import EditarPerfilStyle from "./EditarPerfilStyle";

import { SafeAreaView } from "react-native-safe-area-context";

import * as ImagePicker from "expo-image-picker";

import AsyncStorage from "@react-native-async-storage/async-storage";

import api from "../../services/api";


export default function TelaEditarPerfil({ navigation }) {

    const [nome, setNome] = useState("");
    const [usuario, setUsuario] = useState("");
    const [bio, setBio] = useState("");
    const [foto, setFoto] = useState(null);

    // ID do usuário que está logado
    const [usuarioId, setUsuarioId] = useState(null);

    const [carregando, setCarregando] = useState(true);
    const [salvando, setSalvando] = useState(false);


    // =====================================================
    // CARREGAR DADOS DO USUÁRIO LOGADO
    // =====================================================

    useEffect(() => {

        const carregarPerfil = async () => {

            try {

                const id = await AsyncStorage.getItem("idUsuario");

                console.log("=================================");
                console.log("ID DO USUÁRIO LOGADO:", id);
                console.log("=================================");


                if (!id) {

                    Alert.alert(
                        "Erro",
                        "Não foi possível identificar o usuário logado."
                    );

                    setCarregando(false);

                    return;
                }


                setUsuarioId(id);


                console.log(
                    "Buscando usuário:",
                    `/usuarios/${id}`
                );


                const resposta = await api.get(
                    `/usuarios/${id}`
                );


                const dados = resposta.data;


                console.log(
                    "Dados do usuário:",
                    dados
                );


                setNome(dados.nome || "");
                setUsuario(dados.usuario || "");
                setBio(dados.bio || "");
                setFoto(dados.foto || null);


            } catch (erro) {

                console.log(
                    "================================="
                );

                console.log(
                    "ERRO AO CARREGAR PERFIL"
                );

                console.log(
                    "================================="
                );

                console.log(
                    "Mensagem:",
                    erro.message
                );

                console.log(
                    "Status:",
                    erro.response?.status
                );

                console.log(
                    "Resposta da API:",
                    erro.response?.data
                );

                console.log(
                    "URL:",
                    erro.config?.url
                );


                Alert.alert(
                    "Erro",
                    "Não foi possível carregar os dados do perfil."
                );

            } finally {

                setCarregando(false);

            }
        };


        carregarPerfil();

    }, []);


    // =====================================================
    // ESCOLHER FOTO DE PERFIL
    // =====================================================

    const handleEditarFoto = () => {

        Alert.alert(
            "Alterar foto de perfil",

            "De onde você deseja pegar a imagem?",

            [

                {
                    text: "Galeria",
                    onPress: abrirGaleria,
                },

                {
                    text: "Câmera",
                    onPress: abrirCamera,
                },

                {
                    text: "Cancelar",
                    style: "cancel",
                }

            ]
        );
    };


    // =====================================================
    // ABRIR GALERIA
    // =====================================================

    const abrirGaleria = async () => {

        try {

            const permissao =
                await ImagePicker.requestMediaLibraryPermissionsAsync();


            if (!permissao.granted) {

                Alert.alert(
                    "Permissão necessária",
                    "Precisamos de acesso à galeria para escolher uma imagem."
                );

                return;
            }


            const resultado =
                await ImagePicker.launchImageLibraryAsync({

                    mediaTypes: ["images"],

                    allowsEditing: true,

                    aspect: [1, 1],

                    quality: 0.7,

                });


            if (!resultado.canceled) {

                setFoto(
                    resultado.assets[0].uri
                );

            }

        } catch (erro) {

            console.log(
                "Erro ao abrir galeria:",
                erro
            );

            Alert.alert(
                "Erro",
                "Não foi possível abrir a galeria."
            );

        }
    };


    // =====================================================
    // ABRIR CÂMERA
    // =====================================================

    const abrirCamera = async () => {

        try {

            const permissao =
                await ImagePicker.requestCameraPermissionsAsync();


            if (!permissao.granted) {

                Alert.alert(
                    "Permissão necessária",
                    "Precisamos de acesso à câmera para tirar uma foto."
                );

                return;
            }


            const resultado =
                await ImagePicker.launchCameraAsync({

                    mediaTypes: ["images"],

                    allowsEditing: true,

                    aspect: [1, 1],

                    quality: 0.7,

                });


            if (!resultado.canceled) {

                setFoto(
                    resultado.assets[0].uri
                );

            }

        } catch (erro) {

            console.log(
                "Erro ao abrir câmera:",
                erro
            );

            Alert.alert(
                "Erro",
                "Não foi possível abrir a câmera."
            );

        }
    };


    // =====================================================
    // SALVAR ALTERAÇÕES
    // =====================================================

    const handleSalvarAlteracoes = async () => {

        if (!usuarioId) {

            Alert.alert(
                "Erro",
                "Usuário não identificado."
            );

            return;
        }


        if (
            nome.trim() === "" &&
            usuario.trim() === ""
        ) {

            Alert.alert(
                "Preencha os campos",
                "Informe ao menos o nome ou o usuário antes de salvar."
            );

            return;
        }


        setSalvando(true);


        try {

            const perfilAtualizado = {

                nome: nome.trim(),

                usuario: usuario.trim(),

                bio: bio.trim(),

                foto: foto || "",

            };


            console.log(
                "================================="
            );

            console.log(
                "ATUALIZANDO USUÁRIO"
            );

            console.log(
                "================================="
            );

            console.log(
                "ID:",
                usuarioId
            );

            console.log(
                "URL:",
                `/usuarios/${usuarioId}`
            );

            console.log(
                "Dados:",
                perfilAtualizado
            );


            await api.patch(
                `/usuarios/${usuarioId}`,
                perfilAtualizado
            );


            console.log(
                "Usuário atualizado com sucesso!"
            );


            await AsyncStorage.setItem(
                "nomeUsuario",
                nome.trim()
            );


            Alert.alert(
                "Perfil atualizado!",
                "Suas alterações foram salvas com sucesso.",

                [

                    {
                        text: "OK",

                        onPress: () => {
                            navigation.goBack();
                        },

                    }

                ]
            );


        } catch (erro) {

            console.log(
                "================================="
            );

            console.log(
                "ERRO AO SALVAR PERFIL"
            );

            console.log(
                "================================="
            );

            console.log(
                "Mensagem:",
                erro.message
            );

            console.log(
                "Status:",
                erro.response?.status
            );

            console.log(
                "Resposta da API:",
                erro.response?.data
            );

            console.log(
                "URL:",
                erro.config?.url
            );


            Alert.alert(
                "Erro ao salvar",

                `Não foi possível salvar as alterações.\n\n` +
                `Status: ${erro.response?.status ||
                "Sem resposta"
                }\n\n` +
                `${erro.message}`

            );


        } finally {

            setSalvando(false);

        }
    };


    // =====================================================
    // CARREGANDO
    // =====================================================

    if (carregando) {

        return (

            <SafeAreaView
                style={EditarPerfilStyle.container}
            >

                <View
                    style={EditarPerfilStyle.loadingContainer}
                >

                    <ActivityIndicator
                        size="large"
                        color="#315F53"
                    />

                    <Text
                        style={EditarPerfilStyle.loadingText}
                    >
                        Carregando perfil...
                    </Text>

                </View>

            </SafeAreaView>

        );
    }


    // =====================================================
    // TELA
    // =====================================================

    return (

        <SafeAreaView
            style={EditarPerfilStyle.container}
        >

            <KeyboardAvoidingView

                style={EditarPerfilStyle.keyboardContainer}

                behavior={
                    Platform.OS === "ios"
                        ? "padding"
                        : "height"
                }

                keyboardVerticalOffset={
                    Platform.OS === "ios"
                        ? 0
                        : 20
                }

            >

                <ScrollView

                    showsVerticalScrollIndicator={false}

                    keyboardShouldPersistTaps="handled"

                    contentContainerStyle={
                        EditarPerfilStyle.scrollContent
                    }

                >

                    {/* TÍTULO */}

                    <Text
                        style={EditarPerfilStyle.titulo}
                    >
                        Editar perfil
                    </Text>


                    {/* FOTO DE PERFIL */}

                    <View
                        style={
                            EditarPerfilStyle.fotoContainer
                        }
                    >

                        <Image

                            source={
                                foto
                                    ? {
                                        uri: foto
                                    }
                                    : require(
                                        "../../../assets/images-galocego.jpg"
                                    )
                            }

                            style={
                                EditarPerfilStyle.foto
                            }

                            resizeMode="cover"

                        />


                        {/* BOTÃO DE EDITAR FOTO */}

                        <TouchableOpacity

                            style={
                                EditarPerfilStyle.botaoEditar
                            }

                            onPress={
                                handleEditarFoto
                            }

                            activeOpacity={0.7}

                        >

                            <Image
                                source={
                                    require(
                                        "../../../assets/QuadradoEditar.png"
                                    )
                                }

                                style={
                                    EditarPerfilStyle.iconeEditar
                                }

                                resizeMode="contain"
                            />

                        </TouchableOpacity>

                    </View>


                    {/* NOME */}

                    <Text
                        style={EditarPerfilStyle.label}
                    >
                        Nome
                    </Text>


                    <TextInput

                        style={
                            EditarPerfilStyle.input
                        }

                        placeholder="Digite seu nome"

                        placeholderTextColor="#B8B3AA"

                        value={nome}

                        onChangeText={setNome}

                    />


                    {/* USUÁRIO */}

                    <Text
                        style={
                            EditarPerfilStyle.labelUsuario
                        }
                    >
                        Usuário
                    </Text>


                    <TextInput

                        style={
                            EditarPerfilStyle.input
                        }

                        placeholder="Digite o seu usuário"

                        placeholderTextColor="#B8B3AA"

                        value={usuario}

                        onChangeText={setUsuario}

                        autoCapitalize="none"

                    />


                    {/* BIO */}

                    <Text
                        style={
                            EditarPerfilStyle.labelBio
                        }
                    >
                        Bio
                    </Text>


                    <TextInput

                        style={
                            EditarPerfilStyle.bioInput
                        }

                        placeholder="Escreva algo..."

                        placeholderTextColor="#777777"

                        value={bio}

                        onChangeText={setBio}

                        multiline={true}

                        textAlignVertical="top"

                    />


                    {/* BOTÃO SALVAR */}

                    <TouchableOpacity

                        style={[

                            EditarPerfilStyle.botaoSalvar,

                            salvando && {
                                opacity: 0.7,
                            },

                        ]}

                        activeOpacity={0.8}

                        onPress={
                            handleSalvarAlteracoes
                        }

                        disabled={
                            salvando ||
                            carregando
                        }

                    >

                        {salvando ? (

                            <ActivityIndicator
                                color="#FFFFFF"
                            />

                        ) : (

                            <Text
                                style={
                                    EditarPerfilStyle.textoBotao
                                }
                            >
                                Salvar alterações
                            </Text>

                        )}

                    </TouchableOpacity>


                </ScrollView>

            </KeyboardAvoidingView>

        </SafeAreaView>

    );
}