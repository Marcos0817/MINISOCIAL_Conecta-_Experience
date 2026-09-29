import React, { useState } from "react";

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from "react-native";

import api from "../../services/api";
import { CriarPubliStyle } from "./CriarPubliStyle";
import { SafeAreaView } from "react-native-safe-area-context";

import AsyncStorage from "@react-native-async-storage/async-storage";

import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";

export default function CriarPubli({ navigation }) {

    const [texto, setTexto] = useState("");
    const [imagem, setImagem] = useState("");
    const [localizacao, setLocalizacao] = useState("");
    const [sentimento, setSentimento] = useState("");
    const [mostrarSentimentos, setMostrarSentimentos] = useState(false);


    // =====================================================
    // FECHAR
    // =====================================================

    const handleFechar = () => {
        navigation.navigate("Inicio");
    };


    // =====================================================
    // ESCOLHER IMAGEM
    // =====================================================

    const selecionarImagem = async () => {

        const permissao =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissao.granted) {

            Alert.alert(
                "Permissão necessária",
                "Precisamos de acesso à galeria para escolher uma foto."
            );

            return;
        }

        const resultado =
            await ImagePicker.launchImageLibraryAsync({

                mediaTypes: ["images"],

                allowsEditing: true,

                aspect: [4, 3],

                quality: 1,

            });

        if (!resultado.canceled) {

            setImagem(
                resultado.assets[0].uri
            );

        }
    };


    // =====================================================
    // TIRAR FOTO
    // =====================================================

    const tirarFoto = async () => {

        const permissao =
            await ImagePicker.requestCameraPermissionsAsync();

        if (!permissao.granted) {

            Alert.alert(
                "Permissão necessária",
                "Precisamos de acesso à câmera."
            );

            return;
        }

        const resultado =
            await ImagePicker.launchCameraAsync({

                allowsEditing: true,

                aspect: [4, 3],

                quality: 1,

            });

        if (!resultado.canceled) {

            setImagem(
                resultado.assets[0].uri
            );

        }
    };


    // =====================================================
    // ESCOLHER FOTO
    // =====================================================

    const escolherFoto = () => {

        Alert.alert(
            "Adicionar foto",
            "Escolha uma opção",

            [
                {
                    text: "Galeria",
                    onPress: selecionarImagem,
                },

                {
                    text: "Câmera",
                    onPress: tirarFoto,
                },

                {
                    text: "Cancelar",
                    style: "cancel",
                },
            ]
        );
    };


    // =====================================================
    // LOCALIZAÇÃO
    // =====================================================

    const pegarLocalizacao = async () => {

        try {

            // -------------------------------------------------
            // PEDIR PERMISSÃO
            // -------------------------------------------------

            const { status } =
                await Location.requestForegroundPermissionsAsync();

            if (status !== "granted") {

                Alert.alert(
                    "Permissão necessária",
                    "Precisamos da sua localização para mostrar onde você está."
                );

                return;
            }


            // -------------------------------------------------
            // PEGAR LOCALIZAÇÃO ATUAL
            // -------------------------------------------------

            const location =
                await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.High,
                });


            const {
                latitude,
                longitude
            } = location.coords;


            console.log(
                "Latitude:",
                latitude
            );

            console.log(
                "Longitude:",
                longitude
            );


            // -------------------------------------------------
            // TRANSFORMAR COORDENADAS EM ENDEREÇO
            // -------------------------------------------------

            const endereco =
                await Location.reverseGeocodeAsync({

                    latitude,
                    longitude,

                });


            console.log(
                "Endereço encontrado:",
                endereco
            );


            // -------------------------------------------------
            // VERIFICAR SE ENCONTROU ENDEREÇO
            // -------------------------------------------------

            if (endereco.length > 0) {

                const lugar = endereco[0];


                // -------------------------------------------------
                // ESTABELECIMENTO
                // -------------------------------------------------

                const estabelecimento =
                    lugar.name &&
                    lugar.name !== lugar.street
                        ? lugar.name
                        : "";


                // -------------------------------------------------
                // RUA
                // -------------------------------------------------

                const rua =
                    lugar.street ||
                    lugar.name ||
                    "";


                // -------------------------------------------------
                // CIDADE
                // -------------------------------------------------

                const cidade =
                    lugar.city ||
                    lugar.subregion ||
                    lugar.district ||
                    "";


                // -------------------------------------------------
                // PAÍS
                // -------------------------------------------------

                const pais =
                    lugar.country ||
                    "";


                // -------------------------------------------------
                // MOSTRAR NO CONSOLE
                // -------------------------------------------------

                console.log(
                    "Estabelecimento:",
                    estabelecimento
                );

                console.log(
                    "Rua:",
                    rua
                );

                console.log(
                    "Cidade:",
                    cidade
                );

                console.log(
                    "País:",
                    pais
                );


                // -------------------------------------------------
                // MONTAR ENDEREÇO COMPLETO
                // -------------------------------------------------

                let enderecoCompleto = "";


                // ESTABELECIMENTO + RUA + CIDADE + PAÍS

                if (
                    estabelecimento &&
                    rua &&
                    cidade &&
                    pais
                ) {

                    enderecoCompleto =
                        `${estabelecimento}, ${rua}, ${cidade} - ${pais}`;

                }


                // RUA + CIDADE + PAÍS

                else if (
                    rua &&
                    cidade &&
                    pais
                ) {

                    enderecoCompleto =
                        `${rua}, ${cidade} - ${pais}`;

                }


                // CIDADE + PAÍS

                else if (
                    cidade &&
                    pais
                ) {

                    enderecoCompleto =
                        `${cidade} - ${pais}`;

                }


                // SOMENTE CIDADE

                else if (cidade) {

                    enderecoCompleto =
                        cidade;

                }


                // SOMENTE PAÍS

                else if (pais) {

                    enderecoCompleto =
                        pais;

                }


                // NENHUM ENDEREÇO ENCONTRADO

                else {

                    enderecoCompleto =
                        `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;

                }


                // -------------------------------------------------
                // MOSTRAR RESULTADO
                // -------------------------------------------------

                console.log(
                    "Localização formatada:",
                    enderecoCompleto
                );


                setLocalizacao(
                    enderecoCompleto
                );

            }

            else {

                // -------------------------------------------------
                // CASO NÃO ENCONTRE ENDEREÇO
                // -------------------------------------------------

                setLocalizacao(
                    `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
                );

            }

        }

        catch (error) {

            console.log(
                "Erro ao obter localização:",
                error
            );

            Alert.alert(
                "Erro",
                "Não foi possível obter sua localização."
            );

        }
    };


    // =====================================================
    // SENTIMENTO
    // =====================================================

    const selecionarSentimento = (valor) => {

        setSentimento(valor);

        setMostrarSentimentos(false);

    };


    // =====================================================
    // CRIAR PUBLICAÇÃO
    // =====================================================

    const handleCriarPublicacao = async () => {

        if (!texto.trim()) {

            Alert.alert(
                "Atenção",
                "Digite alguma coisa antes de publicar."
            );

            return;
        }

        try {

            // -------------------------------------------------
            // PEGAR ID DO USUÁRIO LOGADO
            // -------------------------------------------------

            const usuarioId =
                await AsyncStorage.getItem("idUsuario");


            // -------------------------------------------------
            // VERIFICAR USUÁRIO
            // -------------------------------------------------

            if (!usuarioId) {

                Alert.alert(
                    "Erro",
                    "Não foi possível identificar o usuário logado."
                );

                return;
            }


            // -------------------------------------------------
            // DATA
            // -------------------------------------------------

            const dataCriacao =
                new Date().toISOString();


            // -------------------------------------------------
            // CRIAR OBJETO DA PUBLICAÇÃO
            // -------------------------------------------------

            const novaPublicacao = {

                usuarioId: usuarioId,

                nome: "Usuário",

                dataCriacao: dataCriacao,

                horario: dataCriacao,

                texto: texto.trim(),

                foto: imagem || "",

                localizacao: localizacao,

                sentimento: sentimento,

                curtidas: 0,

                comentarios: 0,

            };


            // -------------------------------------------------
            // LOGS
            // -------------------------------------------------

            console.log(
                "ID DO USUÁRIO LOGADO:",
                usuarioId
            );

            console.log(
                "ID SALVO NA PUBLICAÇÃO:",
                novaPublicacao.usuarioId
            );

            console.log(
                "LOCALIZAÇÃO:",
                novaPublicacao.localizacao
            );


            // -------------------------------------------------
            // ENVIAR PARA API
            // -------------------------------------------------

            await api.post(
                "/publicacoes",
                novaPublicacao
            );


            // -------------------------------------------------
            // LIMPAR CAMPOS
            // -------------------------------------------------

            setTexto("");

            setImagem("");

            setLocalizacao("");

            setSentimento("");


            // -------------------------------------------------
            // AVISO
            // -------------------------------------------------

            Alert.alert(
                "Publicação criada!",
                "Sua publicação foi publicada com sucesso."
            );


            // -------------------------------------------------
            // VOLTAR PARA INÍCIO
            // -------------------------------------------------

            navigation.navigate("Inicio");

        }

        catch (error) {

            console.log(
                "Erro ao criar publicação:",
                error
            );

            Alert.alert(
                "Erro",
                "Não foi possível criar a publicação."
            );

        }
    };


    // =====================================================
    // TELA
    // =====================================================

    return (

        <SafeAreaView
            style={CriarPubliStyle.container}
        >

            <KeyboardAvoidingView

                style={{ flex: 1 }}

                behavior={
                    Platform.OS === "ios"
                        ? "padding"
                        : undefined
                }

            >

                <ScrollView

                    contentContainerStyle={
                        CriarPubliStyle.scrollContent
                    }

                    keyboardShouldPersistTaps="handled"

                    showsVerticalScrollIndicator={false}

                >

                    {/* =================================================
                        CABEÇALHO
                    ================================================= */}

                    <View
                        style={CriarPubliStyle.header}
                    >

                        <Text
                            style={CriarPubliStyle.title}
                        >
                            Criar publicação
                        </Text>


                        <TouchableOpacity

                            onPress={handleFechar}

                            style={
                                CriarPubliStyle.closeButton
                            }

                        >

                            <Text
                                style={
                                    CriarPubliStyle.closeText
                                }
                            >
                                ✕
                            </Text>

                        </TouchableOpacity>

                    </View>


                    {/* =================================================
                        PERGUNTA
                    ================================================= */}

                    <Text
                        style={
                            CriarPubliStyle.question
                        }
                    >
                        O que você está pensando?
                    </Text>


                    {/* =================================================
                        TEXTO
                    ================================================= */}

                    <TextInput

                        style={
                            CriarPubliStyle.textInput
                        }

                        placeholder="Compartilhe algo..."

                        placeholderTextColor="#999"

                        multiline

                        maxLength={500}

                        value={texto}

                        onChangeText={setTexto}

                    />


                    {/* =================================================
                        CONTADOR
                    ================================================= */}

                    <Text
                        style={
                            CriarPubliStyle.counter
                        }
                    >
                        {texto.length}/500
                    </Text>


                    {/* =================================================
                        OPÇÕES
                    ================================================= */}

                    <View
                        style={
                            CriarPubliStyle.options
                        }
                    >

                        {/* FOTO */}

                        <TouchableOpacity

                            style={
                                CriarPubliStyle.option
                            }

                            onPress={
                                escolherFoto
                            }

                        >

                            <Image

                                source={
                                    require(
                                        "../../../assets/GaleriaImagem.png"
                                    )
                                }

                                style={
                                    CriarPubliStyle.optionIcon
                                }

                                resizeMode="contain"

                            />

                            <Text
                                style={
                                    CriarPubliStyle.optionText
                                }
                            >
                                Foto
                            </Text>

                        </TouchableOpacity>


                        {/* LOCALIZAÇÃO */}

                        <TouchableOpacity

                            style={
                                CriarPubliStyle.option
                            }

                            onPress={
                                pegarLocalizacao
                            }

                        >

                            <Image

                                source={
                                    require(
                                        "../../../assets/Localizacao.png"
                                    )
                                }

                                style={
                                    CriarPubliStyle.optionIcon
                                }

                                resizeMode="contain"

                            />

                            <Text
                                style={
                                    CriarPubliStyle.optionText
                                }
                            >
                                Localização
                            </Text>

                        </TouchableOpacity>


                        {/* SENTIMENTO */}

                        <TouchableOpacity

                            style={
                                CriarPubliStyle.option
                            }

                            onPress={() =>
                                setMostrarSentimentos(
                                    !mostrarSentimentos
                                )
                            }

                        >

                            <Image

                                source={
                                    require(
                                        "../../../assets/Emocoes.png"
                                    )
                                }

                                style={
                                    CriarPubliStyle.optionIcon
                                }

                                resizeMode="contain"

                            />

                            <Text
                                style={
                                    CriarPubliStyle.optionText
                                }
                            >
                                Sentimento
                            </Text>

                        </TouchableOpacity>

                    </View>


                    {/* =================================================
                        SENTIMENTOS
                    ================================================= */}

                    {mostrarSentimentos && (

                        <View
                            style={
                                CriarPubliStyle.sentimentosContainer
                            }
                        >

                            {[
                                "😊 Feliz",
                                "😂 Divertido",
                                "😍 Apaixonado",
                                "😢 Triste",
                                "😡 Irritado",
                                "😎 Confiante",
                                "🥰 Grato",
                                "🤔 Pensativo",
                            ].map((item) => (

                                <TouchableOpacity

                                    key={item}

                                    onPress={() =>
                                        selecionarSentimento(
                                            item
                                        )
                                    }

                                    style={
                                        CriarPubliStyle.sentimentoButton
                                    }

                                >

                                    <Text>
                                        {item}
                                    </Text>

                                </TouchableOpacity>

                            ))}

                        </View>

                    )}


                    {/* =================================================
                        FOTO SELECIONADA
                    ================================================= */}

                    {imagem !== "" && (

                        <View
                            style={
                                CriarPubliStyle.previewContainer
                            }
                        >

                            <Image

                                source={{
                                    uri: imagem
                                }}

                                style={
                                    CriarPubliStyle.previewImage
                                }

                                resizeMode="cover"

                            />


                            <TouchableOpacity

                                onPress={() =>
                                    setImagem("")
                                }

                            >

                                <Text
                                    style={
                                        CriarPubliStyle.removeText
                                    }
                                >
                                    Remover foto
                                </Text>

                            </TouchableOpacity>

                        </View>

                    )}


                    {/* =================================================
                        LOCALIZAÇÃO SELECIONADA
                    ================================================= */}

                    {localizacao !== "" && (

                        <View
                            style={
                                CriarPubliStyle.selectedInfo
                            }
                        >

                            <Text>
                                📍 {localizacao}
                            </Text>

                        </View>

                    )}


                    {/* =================================================
                        SENTIMENTO SELECIONADO
                    ================================================= */}

                    {sentimento !== "" && (

                        <View
                            style={
                                CriarPubliStyle.selectedInfo
                            }
                        >

                            <Text>
                                {sentimento}
                            </Text>

                        </View>

                    )}


                    {/* =================================================
                        BOTÃO PUBLICAR
                    ================================================= */}

                    <TouchableOpacity

                        style={
                            CriarPubliStyle.createButton
                        }

                        onPress={
                            handleCriarPublicacao
                        }

                    >

                        <Text
                            style={
                                CriarPubliStyle.createButtonText
                            }
                        >
                            Publicar
                        </Text>

                    </TouchableOpacity>

                </ScrollView>

            </KeyboardAvoidingView>

        </SafeAreaView>

    );

}