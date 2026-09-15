import React from "react";

import {
    View,
    Text,
    TouchableOpacity,
    Image,
} from "react-native";

import { FooterStyle } from "./FooterStyle";


export default function Footer({ navigation }) {

    const rotaAtual = navigation.getState().routes[
        navigation.getState().index
    ].name;

    return (

        <View style={FooterStyle.footer}>

            {/* INÍCIO */}

            <TouchableOpacity
                style={FooterStyle.item}
                onPress={() => navigation.navigate("Inicio")}
            >

                <Image
                    source={require("../../../assets/Casa.png")}
                    style={[
                        FooterStyle.icone,
                        rotaAtual === "Inicio" && {
                            tintColor: "#F56333",
                        },
                    ]}
                    resizeMode="contain"
                />

                <Text
                    style={[
                        FooterStyle.texto,
                        rotaAtual === "Inicio" && {
                            color: "#F56333",
                        },
                    ]}
                >
                    Início
                </Text>

            </TouchableOpacity>


            {/* CRIAR */}

            <TouchableOpacity
                style={FooterStyle.item}
                onPress={() => navigation.navigate("Criar")}
            >

                <Image
                    source={require("../../../assets/CirculoAdd-Footer.png")}
                    style={[
                        FooterStyle.icone,
                        rotaAtual === "Criar" && {
                            tintColor: "#F56333",
                        },
                    ]}
                    resizeMode="contain"
                />

                <Text
                    style={[
                        FooterStyle.texto,
                        rotaAtual === "Criar" && {
                            color: "#F56333",
                        },
                    ]}
                >
                    Criar
                </Text>

            </TouchableOpacity>


            {/* NOTIFICAÇÕES */}

            <TouchableOpacity
                style={FooterStyle.item}
                onPress={() => navigation.navigate("Notificacoes")}
            >

                <Image
                    source={require("../../../assets/SinoNotific.png")}
                    style={[
                        FooterStyle.icone,
                        rotaAtual === "Notificacoes" && {
                            tintColor: "#F56333",
                        },
                    ]}
                    resizeMode="contain"
                />

                <Text
                    style={[
                        FooterStyle.texto,
                        rotaAtual === "Notificacoes" && {
                            color: "#F56333",
                        },
                    ]}
                >
                    Notificações
                </Text>

            </TouchableOpacity>


            {/* PERFIL */}

            <TouchableOpacity
                style={FooterStyle.item}
                onPress={() => navigation.navigate("Perfil")}
            >

                <Image
                    source={require("../../../assets/Pessoa.png")}
                    style={[
                        FooterStyle.icone,
                        rotaAtual === "Perfil" && {
                            tintColor: "#F56333",
                        },
                    ]}
                    resizeMode="contain"
                />

                <Text
                    style={[
                        FooterStyle.texto,
                        rotaAtual === "Perfil" && {
                            color: "#F56333",
                        },
                    ]}
                >
                    Perfil
                </Text>

            </TouchableOpacity>

        </View>
    );
}