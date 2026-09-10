import React from "react";

import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import PerfilStyle from "./PerfilStyle";

import Footer from "../../components/footer/Footer";


export default function TelaPerfil({ navigation }) {

    const publicacoes = [
        require("../../../assets/Salvar.png"),
        require("../../../assets/Salvar.png"),
        require("../../../assets/Salvar.png"),
        require("../../../assets/Salvar.png"),
        require("../../../assets/Salvar.png"),
        require("../../../assets/Salvar.png"),
    ];


    return (
        <View style={PerfilStyle.container}>

            {/* CONTEÚDO DO PERFIL */}

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={PerfilStyle.scrollContent}
            >

                {/* CONFIGURAÇÕES */}

                <TouchableOpacity
                    style={PerfilStyle.configuracao}
                    onPress={() => navigation.navigate("Configuracao")}
                >
                    <Ionicons
                        name="settings-outline"
                        size={25}
                        color="#315F53"
                    />
                </TouchableOpacity>


                {/* TÍTULO */}

                <Text style={PerfilStyle.titulo}>
                    Perfil
                </Text>


                {/* FOTO */}

                <View style={PerfilStyle.fotoContainer}>

                    <Image
                        source={require("../../../assets/Pessoa.png")}
                        style={PerfilStyle.foto}
                        resizeMode="cover"
                    />

                </View>


                {/* NOME */}

                <Text style={PerfilStyle.nome}>
                    Galo Cego
                </Text>


                {/* E-MAIL */}

                <Text style={PerfilStyle.email}>
                    GaloCego124@gmail.com
                </Text>


                {/* ESTATÍSTICAS */}

                <View style={PerfilStyle.estatisticas}>

                    <View style={PerfilStyle.estatistica}>

                        <Text style={PerfilStyle.numero}>
                            12
                        </Text>

                        <Text style={PerfilStyle.label}>
                            Publicações
                        </Text>

                    </View>


                    <View style={PerfilStyle.estatistica}>

                        <Text style={PerfilStyle.numero}>
                            150
                        </Text>

                        <Text style={PerfilStyle.label}>
                            Seguidores
                        </Text>

                    </View>


                    <View style={PerfilStyle.estatistica}>

                        <Text style={PerfilStyle.numero}>
                            80
                        </Text>

                        <Text style={PerfilStyle.label}>
                            Seguindo
                        </Text>

                    </View>

                </View>


                {/* BIO */}

                <Text style={PerfilStyle.bio}>
                    Desenvolvedor Sênior e entusiasta de tecnologia,
                    {"\n"}
                    apaixonado em compartilhar conhecimentos
                    {"\n"}
                    vindos de Pernambuco !
                </Text>


                {/* ABAS */}

                <View style={PerfilStyle.abas}>

                    <TouchableOpacity style={PerfilStyle.aba}>

                        <Ionicons
                            name="grid"
                            size={23}
                            color="#315F53"
                        />

                    </TouchableOpacity>


                    <TouchableOpacity style={PerfilStyle.aba}>

                        <Ionicons
                            name="bookmark-outline"
                            size={25}
                            color="#315F53"
                        />

                    </TouchableOpacity>

                </View>


                {/* LINHA DAS ABAS */}

                <View style={PerfilStyle.linhaAbas}>

                    <View style={PerfilStyle.linhaAtiva} />

                </View>


                {/* PUBLICAÇÕES */}

                <View style={PerfilStyle.grade}>

                    {publicacoes.map((imagem, index) => (

                        <TouchableOpacity
                            key={index}
                            style={PerfilStyle.publicacao}
                        >

                            <Image
                                source={imagem}
                                style={PerfilStyle.imagemPublicacao}
                                resizeMode="cover"
                            />

                        </TouchableOpacity>

                    ))}

                </View>

            </ScrollView>


            {/* FOOTER FIXO */}

            <Footer navigation={navigation} />

        </View>
    );
}