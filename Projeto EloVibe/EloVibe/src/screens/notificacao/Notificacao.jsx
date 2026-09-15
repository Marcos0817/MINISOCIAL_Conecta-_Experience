import React from "react";

import {
    Image,
    ScrollView,
    Text,
    View,
} from "react-native";

import { NotificacaoStyle } from "./NotificacaoStyle";
import Footer from "../../components/footer/Footer";
import { SafeAreaView } from "react-native-safe-area-context";

export const Notificacao = ({ navigation }) => {

    const notificacoes = [
        {
            id: 1,
            nome: "Maria Oliveira",
            acao: "Curtiu sua publicação",
            horario: "Hoje às 10:30",
            imagem: require("../../../assets/CoracaoVermelhoCard.png"),
        },
        {
            id: 2,
            nome: "Maria Oliveira",
            acao: "Comentou na sua publicação",
            horario: "Hoje às 10:30",
            imagem: require("../../../assets/Comentario.png"),
        },
        {
            id: 3,
            nome: "Carlos Lima",
            acao: "Começou a seguir você.",
            horario: "Ontem",
            imagem: require("../../../assets/AddPessoa.png"),
        },
        {
            id: 4,
            nome: "Maria Oliveira",
            acao: "Curtiu sua publicação",
            horario: "Hoje às 10:30",
            imagem: require("../../../assets/CoracaoVermelhoCard.png"),
        },
        {
            id: 5,
            nome: "Maria Oliveira",
            acao: "Comentou na sua publicação",
            horario: "Hoje às 10:30",
            imagem: require("../../../assets/Comentario.png"),
        },
    ];


    return (
        <SafeAreaView style={NotificacaoStyle.container}>

            {/* HEADER */}
            <View style={NotificacaoStyle.header}>

                <Text style={NotificacaoStyle.titulo}>
                    Notificações
                </Text>

            </View>


            {/* LISTA DE NOTIFICAÇÕES */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={NotificacaoStyle.lista}
            >

                {notificacoes.map((notificacao) => (

                    <View
                        key={notificacao.id}
                        style={NotificacaoStyle.notificacaoCard}
                    >

                        {/* ÍCONE DA NOTIFICAÇÃO */}
                        <Image
                            source={notificacao.imagem}
                            style={NotificacaoStyle.iconeNotificacao}
                        />


                        {/* TEXTOS */}
                        <View style={NotificacaoStyle.textoContainer}>

                            <View style={NotificacaoStyle.linhaPrincipal}>

                                <Text style={NotificacaoStyle.nome}>
                                    {notificacao.nome}
                                </Text>

                                <Text style={NotificacaoStyle.acao}>
                                    {notificacao.acao}
                                </Text>

                            </View>


                            <Text style={NotificacaoStyle.horario}>
                                {notificacao.horario}
                            </Text>

                        </View>

                    </View>

                ))}

            </ScrollView>


            {/* FOOTER */}
            <Footer navigation={navigation} />

        </SafeAreaView>
    );
};