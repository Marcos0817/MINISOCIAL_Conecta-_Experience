import React, { useState } from "react";

import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
} from "react-native";

import { TelaFeedStyle } from "./TelaFeedStyle";

import Header from "../../components/header/Header";

import Footer from "../../components/footer/Footer";


export const TelaFeed = ({navigation}) => {

    const [publicacoes, setPublicacoes] = useState([
        {
            id: 1,
            nome: "Galo Cego",
            horario: "Hoje às 10:30",
            texto: "Aprendendo React Native e Expo Router!",
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
            curtidas: 32,
            comentarios: 8,
            curtida: false,
            salva: false,
        },
    ]);

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
        <View style={TelaFeedStyle.container}>

            <Header navigation={navigation} />

            <Text style={TelaFeedStyle.titulo}>
                
            </Text>

            <Text style={TelaFeedStyle.subtitulo}>
             
            </Text>

            <ScrollView
                style={TelaFeedStyle.scroll}
                contentContainerStyle={TelaFeedStyle.scrollContent}
                showsVerticalScrollIndicator={false}
            >

                {publicacoes.map((publicacao) => (

                    <View
                        key={publicacao.id}
                        style={TelaFeedStyle.post}
                    >

                        {/* CABEÇALHO DA PUBLICAÇÃO */}

                        <View style={TelaFeedStyle.postHeader}>

                            <View style={TelaFeedStyle.userInfo}>

                                <View style={TelaFeedStyle.avatar}>
                                    <Text style={TelaFeedStyle.avatarText}>
                                        {publicacao.nome.charAt(0)}
                                    </Text>
                                </View>

                                <View>

                                    <Text style={TelaFeedStyle.userName}>
                                        {publicacao.nome}
                                    </Text>

                                    <Text style={TelaFeedStyle.time}>
                                        {publicacao.horario}
                                    </Text>

                                </View>

                            </View>

                            <TouchableOpacity
                                style={TelaFeedStyle.menuButton}
                            >

                                <Image
                                    source={require("../../../assets/TresPontos.png")}
                                    style={TelaFeedStyle.menuIcon}
                                    resizeMode="contain"
                                />

                            </TouchableOpacity>

                        </View>

                        {/* TEXTO DA PUBLICAÇÃO */}

                        <Text style={TelaFeedStyle.postText}>
                            {publicacao.texto}
                        </Text>

                        {/* AÇÕES */}

                        <View style={TelaFeedStyle.actions}>

                            {/* CURTIR */}

                            <TouchableOpacity
                                style={TelaFeedStyle.action}
                                onPress={() =>
                                    curtirPublicacao(publicacao.id)
                                }
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

                            {/* COMENTÁRIOS */}

                            <TouchableOpacity
                                style={TelaFeedStyle.action}
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

                            {/* SALVAR */}

                            <TouchableOpacity
                                style={TelaFeedStyle.saveButton}
                                onPress={() =>
                                    salvarPublicacao(publicacao.id)
                                }
                            >

                                <Image
                                    source={require("../../../assets/Salvar.png")}
                                    style={TelaFeedStyle.saveIcon}
                                    resizeMode="contain"
                                />

                            </TouchableOpacity>

                        </View>

                    </View>

                ))}

            </ScrollView>
                
                   
           <Footer navigation={navigation}/>
        </View>
    );
};