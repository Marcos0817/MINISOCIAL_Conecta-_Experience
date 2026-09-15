import React, { useState } from "react";

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import EditarPerfilStyle from "./EditarPerfilStyle";
import { SafeAreaView } from "react-native-safe-area-context";


export default function TelaEditarPerfil({ navigation }) {

    const [nome, setNome] = useState("");
    const [usuario, setUsuario] = useState("");
    const [bio, setBio] = useState("");


    return (
        <SafeAreaView style={EditarPerfilStyle.container}>

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
            >

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
                >

                    {/* TÍTULO */}

                    <Text style={EditarPerfilStyle.titulo}>
                        Editar perfil
                    </Text>


                    {/* FOTO DE PERFIL */}

                    <View style={EditarPerfilStyle.fotoContainer}>

                        <Image
                            source={require("../../../assets/images-galocego.jpg")}
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

                </ScrollView>

            </KeyboardAvoidingView>

        </SafeAreaView>
    );
}