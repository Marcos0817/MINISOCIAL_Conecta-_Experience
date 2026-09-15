import { useState } from "react";
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image
} from "react-native";

import { CriarPubliStyle } from "./CriarPubliStyle";
import { SafeAreaView } from "react-native-safe-area-context";

export const CriarPubli = ({ navigation }) => {

    const [texto, setTexto] = useState("");

    // VOLTAR PARA O FEED
    const handleFechar = () => {
        navigation.navigate("Inicio");
    };

    return (

        <SafeAreaView style={CriarPubliStyle.container}>

            {/* HEADER */}

            <View style={CriarPubliStyle.header}>

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


            {/* CONTEÚDO */}

            <View style={CriarPubliStyle.conteudo}>

                <Text style={CriarPubliStyle.pergunta}>
                    O que você está pensando?
                </Text>


                {/* CAMPO DE TEXTO */}

                <TextInput
                    style={CriarPubliStyle.textoArea}
                    placeholder="Escreva algo..."
                    placeholderTextColor="#999999"
                    value={texto}
                    onChangeText={setTexto}
                    maxLength={280}
                    multiline
                />


                {/* CONTADOR */}

                <Text style={CriarPubliStyle.contador}>
                    {texto.length}/280
                </Text>


                {/* OPÇÕES */}

                <View style={CriarPubliStyle.opcoes}>

                    {/* IMAGEM */}

                    <View style={CriarPubliStyle.opcao}>

                        <Image
                            source={require("../../../assets/GaleriaImagem.png")}
                            style={CriarPubliStyle.iconeOpcao}
                            resizeMode="contain"
                        />

                        <Text style={CriarPubliStyle.textoOpcao}>
                            Imagem
                        </Text>

                    </View>


                    {/* LOCALIZAÇÃO */}

                    <View style={CriarPubliStyle.opcao}>

                        <Image
                            source={require("../../../assets/Localizacao.png")}
                            style={CriarPubliStyle.iconeOpcao}
                            resizeMode="contain"
                        />

                        <Text style={CriarPubliStyle.textoOpcao}>
                            Localização
                        </Text>

                    </View>


                    {/* SENTIMENTOS */}

                    <View style={CriarPubliStyle.opcao}>

                        <Image
                            source={require("../../../assets/Emocoes.png")}
                            style={CriarPubliStyle.iconeOpcao}
                            resizeMode="contain"
                        />

                        <Text style={CriarPubliStyle.textoOpcao}>
                            Sentimentos
                        </Text>

                    </View>

                </View>


                {/* BOTÃO */}

                <TouchableOpacity
                    onPress={handleFechar}
                    style={CriarPubliStyle.botaoCriar}
                    activeOpacity={0.8}
                >

                    <Text style={CriarPubliStyle.textoBotao}>
                        Criar publicação
                    </Text>

                </TouchableOpacity>

            </View>


            {/* IMAGEM DECORATIVA - CANTO INFERIOR ESQUERDO */}

            <Image
                source={require("../../../assets/ChatGPT Image 8_09_2026, 13_58_53 2.png")}
                style={CriarPubliStyle.decoracao}
                resizeMode="contain"
                pointerEvents="none"
            />

        </SafeAreaView>
    );
};