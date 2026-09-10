import { useState } from "react";
import {
    Text,
    View,
    TextInput,
    TouchableOpacity
} from "react-native";

import { CriarPubliStyle } from "./CriarPubliStyle";

export const CriarPubli = ({ navigation }) => {

    const [texto, setTexto] = useState("");

    // VOLTAR PARA O FEED
    const handleFechar = () => {
        navigation.navigate("Inicio");
    };

    return (

        <View style={CriarPubliStyle.container}>

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

                    <View style={CriarPubliStyle.opcao}>

                        <Text style={CriarPubliStyle.iconeOpcao}>
                            ▣
                        </Text>

                        <Text style={CriarPubliStyle.textoOpcao}>
                            Imagem
                        </Text>

                    </View>


                    <View style={CriarPubliStyle.opcao}>

                        <Text style={CriarPubliStyle.iconeOpcao}>
                            ♢
                        </Text>

                        <Text style={CriarPubliStyle.textoOpcao}>
                            Localização
                        </Text>

                    </View>


                    <View style={CriarPubliStyle.opcao}>

                        <Text style={CriarPubliStyle.iconeOpcao}>
                            ☺
                        </Text>

                        <Text style={CriarPubliStyle.textoOpcao}>
                            Sentimentos
                        </Text>

                    </View>

                </View>


                {/* BOTÃO */}

                <TouchableOpacity
                    style={CriarPubliStyle.botaoCriar}
                    activeOpacity={0.8}
                >

                    <Text style={CriarPubliStyle.textoBotao}>
                        Criar publicação
                    </Text>

                </TouchableOpacity>

            </View>


            {/* DECORAÇÃO INFERIOR */}

            <View style={CriarPubliStyle.decoracao}>

                <View style={CriarPubliStyle.curvaLaranja} />

                <View style={CriarPubliStyle.curvaVermelha} />

                <View style={CriarPubliStyle.curvaVerde} />

            </View>

        </View>
    );
};