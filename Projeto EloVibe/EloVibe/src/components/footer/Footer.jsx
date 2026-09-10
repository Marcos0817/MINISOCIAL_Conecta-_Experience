import React from "react";

import {
    View,
    Text,
    TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { FooterStyle } from "./FooterStyle";


export default function Footer({ navigation }) {

    return (

        <View style={FooterStyle.footer}>

            {/* INÍCIO */}

            <TouchableOpacity
                style={FooterStyle.item}
                onPress={() => navigation.navigate("Inicio")}
            >

                <Ionicons
                    name="home-outline"
                    size={23}
                    color="#315F53"
                />

                <Text style={FooterStyle.texto}>
                    Início
                </Text>

            </TouchableOpacity>


            {/* CRIAR */}

            <TouchableOpacity
                style={FooterStyle.item}
                onPress={() => navigation.navigate("Criar")}
            >

                <Ionicons
                    name="add-circle-outline"
                    size={24}   
                    color="#315F53"
                />

                <Text style={FooterStyle.texto}>
                    Criar
                </Text>

            </TouchableOpacity>


            {/* NOTIFICAÇÕES */}

            <TouchableOpacity
                style={FooterStyle.item}
                onPress={() => navigation.navigate("Notificacoes")}
            >

                <Ionicons
                    name="notifications-outline"
                    size={23}
                    color="#315F53"
                />

                <Text style={FooterStyle.texto}>
                    Notificações
                </Text>

            </TouchableOpacity>


            {/* PERFIL */}

            <TouchableOpacity
                style={FooterStyle.item}
                onPress={() => navigation.navigate("Perfil")}
            >

                <Ionicons
                    name="person-outline"
                    size={23}
                    color="#315F53"
                />

                <Text style={FooterStyle.texto}>
                    Perfil
                </Text>

            </TouchableOpacity>

        </View>
    );
}