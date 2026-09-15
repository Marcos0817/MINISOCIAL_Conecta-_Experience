import React, { useState } from "react";

import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import PublicacaoStyle from "./DetalhePubliStyle";

import Footer from "../../components/footer/Footer";

export default function TelaPublicacao({ navigation }) {

    const [curtido, setCurtido] = useState(true);
    const [curtidas, setCurtidas] = useState(32);
    const [comentario, setComentario] = useState("");


    const curtir = () => {

        if (curtido) {
            setCurtidas(curtidas - 1);
        } else {
            setCurtidas(curtidas + 1);
        }

        setCurtido(!curtido);
    };


    return (
        <SafeAreaView style={PublicacaoStyle.container}>

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
            >

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={[
                        PublicacaoStyle.scrollContent,
                        {
                            flexGrow: 1,
                            paddingBottom: 40,
                        },
                    ]}
                    keyboardShouldPersistTaps="handled"
                >

                    {/* TÍTULO */}

                    <Text style={PublicacaoStyle.titulo}>
                        Publicação
                    </Text>


                    {/* COMPARTILHAR */}

                    <TouchableOpacity
                        style={PublicacaoStyle.compartilhar}
                    >
                        <Ionicons
                            name="share-social-outline"
                            size={25}
                            color="#315F53"
                        />
                    </TouchableOpacity>


                    {/* CARD DA PUBLICAÇÃO */}

                    <View style={PublicacaoStyle.post}>

                        {/* CABEÇALHO */}

                        <View style={PublicacaoStyle.postHeader}>

                            <View style={PublicacaoStyle.usuario}>

                                <Image
                                    source={require("../../../assets/images-galocego.jpg")}
                                    style={PublicacaoStyle.avatar}
                                    resizeMode="cover"
                                />

                                <View>

                                    <Text style={PublicacaoStyle.nome}>
                                        Galo Cego
                                    </Text>

                                    <Text style={PublicacaoStyle.horario}>
                                        Hoje às 10:30
                                    </Text>

                                </View>

                            </View>


                            {/* TRÊS PONTOS */}

                            <TouchableOpacity>
                                <Text style={PublicacaoStyle.pontos}>
                                    •••
                                </Text>
                            </TouchableOpacity>

                        </View>


                        {/* TEXTO */}

                        <Text style={PublicacaoStyle.textoPublicacao}>
                            Meu primeiro projeto mobile ficou prontooo!!
                        </Text>


                        {/* IMAGEM */}

                        <Image
                            source={require("../../../assets/Salvar.png")}
                            style={PublicacaoStyle.imagem}
                            resizeMode="cover"
                        />


                        {/* AÇÕES */}

                        <View style={PublicacaoStyle.acoes}>

                            {/* CURTIDA */}

                            <TouchableOpacity
                                style={PublicacaoStyle.acao}
                                onPress={curtir}
                            >

                                <Ionicons
                                    name={curtido ? "heart" : "heart-outline"}
                                    size={27}
                                    color={curtido ? "#F16A3B" : "#315F53"}
                                />

                                <Text style={PublicacaoStyle.numero}>
                                    {curtidas}
                                </Text>

                            </TouchableOpacity>


                            {/* COMENTÁRIOS */}

                            <TouchableOpacity
                                style={PublicacaoStyle.acao}
                            >

                                <Ionicons
                                    name="chatbubble-outline"
                                    size={26}
                                    color="#315F53"
                                />

                                <Text style={PublicacaoStyle.numero}>
                                    8
                                </Text>

                            </TouchableOpacity>


                            {/* SALVAR */}

                            <TouchableOpacity
                                style={PublicacaoStyle.salvar}
                            >

                                <Ionicons
                                    name="bookmark-outline"
                                    size={28}
                                    color="#315F53"
                                />

                            </TouchableOpacity>

                        </View>


                        {/* COMENTÁRIOS */}

                        <Text style={PublicacaoStyle.comentariosTitulo}>
                            Comentarios
                        </Text>


                        {/* COMENTÁRIO 1 */}

                        <View style={PublicacaoStyle.comentario}>

                            <View style={PublicacaoStyle.avatarComentario} />

                            <View style={PublicacaoStyle.comentarioConteudo}>

                                <Text style={PublicacaoStyle.nomeComentario}>
                                    Maria Oliveira
                                </Text>

                                <Text style={PublicacaoStyle.horarioComentario}>
                                    Hoje às 10:30
                                </Text>

                                <Text style={PublicacaoStyle.textoComentario}>
                                    Muito bom! Continue Assim!
                                </Text>

                            </View>

                        </View>


                        {/* CAMPO DE COMENTÁRIO */}

                        <View style={PublicacaoStyle.campoComentario}>

                            <TextInput
                                style={PublicacaoStyle.inputComentario}
                                placeholder="Escreva um comentário..."
                                placeholderTextColor="#777777"
                                value={comentario}
                                onChangeText={setComentario}
                                underlineColorAndroid="transparent"
                                returnKeyType="send"
                                multiline={false}
                            />

                            <TouchableOpacity
                                style={PublicacaoStyle.botaoEnviar}
                                activeOpacity={0.7}
                                onPress={() => {
                                    console.log(
                                        "Enviar comentário:",
                                        comentario
                                    );
                                }}
                            >

                                <Image
                                    source={require("../../../assets/AviaoCompartilhar.png")}
                                    style={PublicacaoStyle.iconeEnviar}
                                    resizeMode="contain"
                                />

                            </TouchableOpacity>

                        </View>

                    </View>

                </ScrollView>

            </KeyboardAvoidingView>


            {/* FOOTER */}

            <Footer navigation={navigation} />

        </SafeAreaView>
    );
}