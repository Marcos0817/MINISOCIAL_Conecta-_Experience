import { useState } from "react";

import {
    Text,
    View,
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

import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";


export const CriarPubli = ({ navigation }) => {

    const [texto, setTexto] = useState("");
    const [imagem, setImagem] = useState(null);
    const [localizacao, setLocalizacao] = useState("");
    const [sentimento, setSentimento] = useState("");

    // Controla se a lista de sentimentos aparece
    const [mostrarSentimentos, setMostrarSentimentos] = useState(false);


    // =====================================================
    // VOLTAR PARA O FEED
    // =====================================================

    const handleFechar = () => {
        navigation.navigate("Inicio");
    };


    // =====================================================
    // CRIAR PUBLICAÇÃO
    // =====================================================

    const handleCriarPublicacao = async () => {

        if (
            texto.trim() === "" &&
            !imagem &&
            localizacao === "" &&
            sentimento === ""
        ) {
            Alert.alert(
                "Publicação vazia",
                "Escreva algo ou adicione uma imagem, localização ou sentimento."
            );

            return;
        }

        try {

            const novaPublicacao = {
                usuarioId: "1",
                nome: "Usuário",
                horario: "Agora",
                texto: texto.trim(),
                foto: imagem || "",
                localizacao: localizacao,
                sentimento: sentimento,
                curtidas: 0,
                comentarios: 0
            };


            await api.post("/publicacoes", novaPublicacao);


            Alert.alert(
                "Publicação criada!",
                "Sua publicação foi criada com sucesso.",
                [
                    {
                        text: "OK",
                        onPress: () => {
                            navigation.navigate("Inicio");
                        }
                    }
                ]
            );

        } catch (erro) {

            console.log(
                "Erro ao criar publicação:",
                erro
            );

            Alert.alert(
                "Erro",
                "Não foi possível criar a publicação. Verifique se a API está funcionando."
            );
        }
    };


    // =====================================================
    // GALERIA
    // =====================================================

    const handleGaleria = async () => {

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

                    aspect: [4, 3],

                    quality: 1,

                });


            if (!resultado.canceled) {

                const imagemSelecionada =
                    resultado.assets[0].uri;

                setImagem(imagemSelecionada);
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
    // LOCALIZAÇÃO
    // =====================================================

    const handleLocalizacao = async () => {

        try {

            const permissao =
                await Location.requestForegroundPermissionsAsync();


            if (permissao.status !== "granted") {

                Alert.alert(
                    "Permissão necessária",
                    "Precisamos de acesso à localização para encontrar o local."
                );

                return;
            }


            const local =
                await Location.getCurrentPositionAsync({});


            const latitude =
                local.coords.latitude;

            const longitude =
                local.coords.longitude;


            const endereco =
                await Location.reverseGeocodeAsync({
                    latitude,
                    longitude,
                });


            if (endereco.length > 0) {

                const lugar = endereco[0];

                const nomeLocal =
                    lugar.city ||
                    lugar.subregion ||
                    lugar.region ||
                    "Localização atual";


                setLocalizacao(nomeLocal);

                Alert.alert(
                    "Localização",
                    `Localização encontrada:\n\n${nomeLocal}`
                );

            } else {

                setLocalizacao("Localização atual");

                Alert.alert(
                    "Localização",
                    "Sua localização foi encontrada."
                );
            }

        } catch (erro) {

            console.log(
                "Erro ao obter localização:",
                erro
            );

            Alert.alert(
                "Erro",
                "Não foi possível obter sua localização."
            );
        }
    };


    // =====================================================
    // SENTIMENTOS
    // =====================================================

    const handleSentimento = () => {

        setMostrarSentimentos(!mostrarSentimentos);

    };


    // =====================================================
    // SELECIONAR SENTIMENTO
    // =====================================================

    const selecionarSentimento = (emoji) => {

        setSentimento(emoji);

        setMostrarSentimentos(false);

    };


    // =====================================================
    // TELA
    // =====================================================

    return (

        <SafeAreaView style={CriarPubliStyle.container}>

            {/* =====================================================
                IMAGEM DECORATIVA FIXA - FUNDO
            ===================================================== */}

            <Image
                source={require("../../../assets/ChatGPT Image 8_09_2026, 13_58_53 2.png")}
                style={[
                    CriarPubliStyle.decoracao,
                    {
                        position: "absolute",
                        zIndex: 0,
                    },
                ]}
                resizeMode="contain"
                pointerEvents="none"
            />


            {/* =====================================================
                HEADER
            ===================================================== */}

            <View
                style={[
                    CriarPubliStyle.header,
                    {
                        zIndex: 2,
                    },
                ]}
            >

                <TouchableOpacity
                    onPress={handleFechar}
                    activeOpacity={0.6}
                    style={CriarPubliStyle.closeButton}
                >

                    <Text style={CriarPubliStyle.fechar}>
                        X
                    </Text>

                </TouchableOpacity>


                <Text style={CriarPubliStyle.titulo}>
                    Nova Publicação
                </Text>

            </View>


            {/* =====================================================
                TECLADO + SCROLL
            ===================================================== */}

            <KeyboardAvoidingView
                style={{
                    flex: 1,
                    zIndex: 1,
                }}
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
                    style={{
                        flex: 1,
                    }}
                    contentContainerStyle={{
                        paddingBottom: 150,
                    }}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >

                    <View
                        style={[
                            CriarPubliStyle.conteudo,
                            {
                                zIndex: 2,
                            },
                        ]}
                    >

                        {/* =====================================================
                            PERGUNTA
                        ===================================================== */}

                        <Text style={CriarPubliStyle.pergunta}>
                            O que você está pensando?
                        </Text>


                        {/* =====================================================
                            CAMPO DE TEXTO
                        ===================================================== */}

                        <TextInput
                            style={CriarPubliStyle.textoArea}
                            placeholder="Escreva algo..."
                            placeholderTextColor="#999999"
                            value={texto}
                            onChangeText={setTexto}
                            maxLength={280}
                            multiline
                            textAlignVertical="top"
                        />


                        {/* =====================================================
                            CONTADOR
                        ===================================================== */}

                        <Text style={CriarPubliStyle.contador}>
                            {texto.length}/280
                        </Text>


                        {/* =====================================================
                            OPÇÕES
                        ===================================================== */}

                        <View style={CriarPubliStyle.opcoes}>

                            {/* IMAGEM */}

                            <TouchableOpacity
                                style={CriarPubliStyle.opcao}
                                onPress={handleGaleria}
                                activeOpacity={0.7}
                            >

                                <Image
                                    source={require("../../../assets/GaleriaImagem.png")}
                                    style={CriarPubliStyle.iconeOpcao}
                                    resizeMode="contain"
                                />

                                <Text style={CriarPubliStyle.textoOpcao}>
                                    Imagem
                                </Text>

                            </TouchableOpacity>


                            {/* LOCALIZAÇÃO */}

                            <TouchableOpacity
                                style={CriarPubliStyle.opcao}
                                onPress={handleLocalizacao}
                                activeOpacity={0.7}
                            >

                                <Image
                                    source={require("../../../assets/Localizacao.png")}
                                    style={CriarPubliStyle.iconeOpcao}
                                    resizeMode="contain"
                                />

                                <Text style={CriarPubliStyle.textoOpcao}>
                                    Localização
                                </Text>

                            </TouchableOpacity>


                            {/* SENTIMENTOS */}

                            <TouchableOpacity
                                style={CriarPubliStyle.opcao}
                                onPress={handleSentimento}
                                activeOpacity={0.7}
                            >

                                <Image
                                    source={require("../../../assets/Emocoes.png")}
                                    style={CriarPubliStyle.iconeOpcao}
                                    resizeMode="contain"
                                />

                                <Text style={CriarPubliStyle.textoOpcao}>
                                    Sentimentos
                                </Text>

                            </TouchableOpacity>

                        </View>


                        {/* =====================================================
                            ESCOLHA DE SENTIMENTOS
                        ===================================================== */}

                        {mostrarSentimentos && (

                            <View
                                style={{
                                    marginTop: 15,
                                    padding: 15,
                                    backgroundColor: "#FBF6EE",
                                    borderRadius: 12,
                                    borderWidth: 1,
                                    borderColor: "#E3DED1",
                                }}
                            >

                                <Text
                                    style={{
                                        fontSize: 15,
                                        fontWeight: "bold",
                                        color: "#315F53",
                                        marginBottom: 12,
                                    }}
                                >
                                    Como você está se sentindo?
                                </Text>


                                <View
                                    style={{
                                        flexDirection: "row",
                                        flexWrap: "wrap",
                                        justifyContent: "space-between",
                                    }}
                                >

                                    {/* FELIZ */}

                                    <TouchableOpacity
                                        onPress={() => selecionarSentimento("😀")}
                                        style={{
                                            width: "25%",
                                            alignItems: "center",
                                            paddingVertical: 8,
                                        }}
                                    >
                                        <Text style={{ fontSize: 30 }}>
                                            😀
                                        </Text>
                                    </TouchableOpacity>


                                    {/* APAIXONADO */}

                                    <TouchableOpacity
                                        onPress={() => selecionarSentimento("😍")}
                                        style={{
                                            width: "25%",
                                            alignItems: "center",
                                            paddingVertical: 8,
                                        }}
                                    >
                                        <Text style={{ fontSize: 30 }}>
                                            😍
                                        </Text>
                                    </TouchableOpacity>


                                    {/* ENGRAÇADO */}

                                    <TouchableOpacity
                                        onPress={() => selecionarSentimento("😂")}
                                        style={{
                                            width: "25%",
                                            alignItems: "center",
                                            paddingVertical: 8,
                                        }}
                                    >
                                        <Text style={{ fontSize: 30 }}>
                                            😂
                                        </Text>
                                    </TouchableOpacity>


                                    {/* CONFIANTE */}

                                    <TouchableOpacity
                                        onPress={() => selecionarSentimento("😎")}
                                        style={{
                                            width: "25%",
                                            alignItems: "center",
                                            paddingVertical: 8,
                                        }}
                                    >
                                        <Text style={{ fontSize: 30 }}>
                                            😎
                                        </Text>
                                    </TouchableOpacity>


                                    {/* TRISTE */}

                                    <TouchableOpacity
                                        onPress={() => selecionarSentimento("😢")}
                                        style={{
                                            width: "25%",
                                            alignItems: "center",
                                            paddingVertical: 8,
                                        }}
                                    >
                                        <Text style={{ fontSize: 30 }}>
                                            😢
                                        </Text>
                                    </TouchableOpacity>


                                    {/* IRRITADO */}

                                    <TouchableOpacity
                                        onPress={() => selecionarSentimento("😡")}
                                        style={{
                                            width: "25%",
                                            alignItems: "center",
                                            paddingVertical: 8,
                                        }}
                                    >
                                        <Text style={{ fontSize: 30 }}>
                                            😡
                                        </Text>
                                    </TouchableOpacity>


                                    {/* ANIMADO */}

                                    <TouchableOpacity
                                        onPress={() => selecionarSentimento("🥳")}
                                        style={{
                                            width: "25%",
                                            alignItems: "center",
                                            paddingVertical: 8,
                                        }}
                                    >
                                        <Text style={{ fontSize: 30 }}>
                                            🥳
                                        </Text>
                                    </TouchableOpacity>


                                    {/* CHORANDO */}

                                    <TouchableOpacity
                                        onPress={() => selecionarSentimento("😭")}
                                        style={{
                                            width: "25%",
                                            alignItems: "center",
                                            paddingVertical: 8,
                                        }}
                                    >
                                        <Text style={{ fontSize: 30 }}>
                                            😭
                                        </Text>
                                    </TouchableOpacity>


                                    {/* CANSADO */}

                                    <TouchableOpacity
                                        onPress={() => selecionarSentimento("😴")}
                                        style={{
                                            width: "25%",
                                            alignItems: "center",
                                            paddingVertical: 8,
                                        }}
                                    >
                                        <Text style={{ fontSize: 30 }}>
                                            😴
                                        </Text>
                                    </TouchableOpacity>


                                    {/* PENSATIVO */}

                                    <TouchableOpacity
                                        onPress={() => selecionarSentimento("🤔")}
                                        style={{
                                            width: "25%",
                                            alignItems: "center",
                                            paddingVertical: 8,
                                        }}
                                    >
                                        <Text style={{ fontSize: 30 }}>
                                            🤔
                                        </Text>
                                    </TouchableOpacity>


                                    {/* AMOR */}

                                    <TouchableOpacity
                                        onPress={() => selecionarSentimento("🥰")}
                                        style={{
                                            width: "25%",
                                            alignItems: "center",
                                            paddingVertical: 8,
                                        }}
                                    >
                                        <Text style={{ fontSize: 30 }}>
                                            🥰
                                        </Text>
                                    </TouchableOpacity>


                                    {/* TRISTEZA */}

                                    <TouchableOpacity
                                        onPress={() => selecionarSentimento("😔")}
                                        style={{
                                            width: "25%",
                                            alignItems: "center",
                                            paddingVertical: 8,
                                        }}
                                    >
                                        <Text style={{ fontSize: 30 }}>
                                            😔
                                        </Text>
                                    </TouchableOpacity>

                                </View>

                            </View>

                        )}


                        {/* =====================================================
                            IMAGEM SELECIONADA
                        ===================================================== */}

                        {imagem && (

                            <View
                                style={{
                                    marginTop: 15,
                                }}
                            >

                                <Image
                                    source={{
                                        uri: imagem,
                                    }}
                                    style={{
                                        width: "100%",
                                        height: 180,
                                        borderRadius: 10,
                                    }}
                                    resizeMode="cover"
                                />

                            </View>

                        )}


                        {/* =====================================================
                            LOCALIZAÇÃO
                        ===================================================== */}

                        {localizacao !== "" && (

                            <Text
                                style={{
                                    marginTop: 10,
                                    color: "#315F53",
                                    fontSize: 13,
                                }}
                            >
                                📍 {localizacao}
                            </Text>

                        )}


                        {/* =====================================================
                            SENTIMENTO SELECIONADO
                        ===================================================== */}

                        {sentimento !== "" && (

                            <Text
                                style={{
                                    marginTop: 10,
                                    fontSize: 25,
                                }}
                            >
                                {sentimento}
                            </Text>

                        )}


                        {/* =====================================================
                            BOTÃO CRIAR
                        ===================================================== */}

                        <TouchableOpacity
                            onPress={handleCriarPublicacao}
                            style={CriarPubliStyle.botaoCriar}
                            activeOpacity={0.8}
                        >

                            <Text style={CriarPubliStyle.textoBotao}>
                                Criar publicação
                            </Text>

                        </TouchableOpacity>

                    </View>

                </ScrollView>

            </KeyboardAvoidingView>

        </SafeAreaView>

    );
};