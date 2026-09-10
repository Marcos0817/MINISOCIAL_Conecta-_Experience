import React, { useState } from "react";

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import EditarPerfilStyle from "./EditarPerfilStyle";


export default function TelaEditarPerfil({ navigation }) {

    const [nome, setNome] = useState("");
    const [usuario, setUsuario] = useState("");
    const [bio, setBio] = useState("");


    return (
        <View style={EditarPerfilStyle.container}>

            {/* TÍTULO */}

            <Text style={EditarPerfilStyle.titulo}>
                Editar perfil
            </Text>


            {/* FOTO DE PERFIL */}

            <View style={EditarPerfilStyle.fotoContainer}>

                <Image
                    source={require("../../../assets/Pessoa.png")}
                    style={EditarPerfilStyle.foto}
                    resizeMode="cover"
                />

                {/* ÍCONE DE EDITAR */}

                <TouchableOpacity
                    style={EditarPerfilStyle.botaoEditar}
                >
                    <Ionicons
                        name="pencil"
                        size={15}
                        color="#315F53"
                    />
                </TouchableOpacity>

            </View>


            {/* NOME */}

            <Text style={EditarPerfilStyle.label}>
                Nome
            </Text>

            <TextInput
                style={EditarPerfilStyle.input}
                placeholder="Digite seu nome"
                placeholderTextColor="#B8B3AA"
                value={nome}
                onChangeText={setNome}
            />


            {/* USUÁRIO */}

            <Text style={EditarPerfilStyle.labelUsuario}>
                Usuário
            </Text>

            <TextInput
                style={EditarPerfilStyle.input}
                placeholder="Digite o seu usuário"
                placeholderTextColor="#B8B3AA"
                value={usuario}
                onChangeText={setUsuario}
                autoCapitalize="none"
            />


            {/* BIO */}

            <Text style={EditarPerfilStyle.labelBio}>
                Bio
            </Text>

            <TextInput
                style={EditarPerfilStyle.bioInput}
                placeholder="Escreva algo..."
                placeholderTextColor="#777777"
                value={bio}
                onChangeText={setBio}
                multiline={true}
                textAlignVertical="top"
            />


            {/* BOTÃO */}

            <TouchableOpacity
                style={EditarPerfilStyle.botaoSalvar}
                activeOpacity={0.8}
                onPress={() => navigation.goBack()}
            >

                <Text style={EditarPerfilStyle.textoBotao}>
                    Salvar alterações
                </Text>

            </TouchableOpacity>

        </View>
    );
}