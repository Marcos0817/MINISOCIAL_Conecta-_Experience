import React, { useState } from "react";

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    Alert,
    Image,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { LoginStyle } from "./TelaLoginStyle";

import api from "../../services/api";

export default function Login({ navigation }) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [emailFocado, setEmailFocado] = useState(false);
    const [senhaFocada, setSenhaFocada] = useState(false);

    const handleEntrar = async () => {

        if (email.trim() === "" || senha.trim() === "") {
            Alert.alert(
                "Campos obrigatórios",
                "Preencha todos os campos para entrar."
            );
            return;
        }

        try {

            const resposta = await api.get("/usuarios");

            const usuarioEncontrado = resposta.data.find(
                (usuario) =>
                    usuario.email?.toLowerCase() ===
                        email.trim().toLowerCase() &&
                    usuario.senha === senha
            );

            if (usuarioEncontrado) {

                // SALVA O ID DO USUÁRIO LOGADO
                await AsyncStorage.setItem(
                    "idUsuario",
                    String(usuarioEncontrado.id)
                );

                console.log(
                    "ID DO USUÁRIO SALVO:",
                    usuarioEncontrado.id
                );

                Alert.alert(
                    "Login realizado!",
                    `Bem-vindo, ${usuarioEncontrado.nome}!`,
                    [
                        {
                            text: "Entrar",
                            onPress: () => {
                                navigation.navigate("Inicio");
                            },
                        },
                    ]
                );

                return;
            }

            Alert.alert(
                "Login inválido",
                "E-mail ou senha incorretos."
            );

        } catch (erro) {

            console.log(
                "Erro ao realizar login:",
                erro
            );

            Alert.alert(
                "Erro",
                "Não foi possível realizar o login. Verifique se a API está funcionando."
            );
        }
    };

    const handleEsqueceuSenha = () => {
        Alert.alert(
            "Esqueceu a senha?",
            "A recuperação de senha será disponibilizada em breve."
        );
    };

    const handleLoginGoogle = () => {
        Alert.alert(
            "Google",
            "Login com Google será disponibilizado em breve."
        );
    };

    const handleCriarConta = () => {
        navigation.navigate("CriarConta");
    };

    return (
        <KeyboardAvoidingView
            style={LoginStyle.keyboardContainer}
            behavior={
                Platform.OS === "ios"
                    ? "padding"
                    : "height"
            }
            keyboardVerticalOffset={
                Platform.OS === "ios"
                    ? 0
                    : 20
            }
        >

            <ScrollView
                style={LoginStyle.scroll}
                contentContainerStyle={[
                    LoginStyle.scrollContent,
                    {
                        flexGrow: 1,
                        paddingBottom: 40,
                    },
                ]}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >

                <View style={LoginStyle.container}>

                    <Text style={LoginStyle.title}>
                        Login
                    </Text>

                    <Text style={LoginStyle.label}>
                        E-mail
                    </Text>

                    <TextInput
                        style={[
                            LoginStyle.input,
                            emailFocado &&
                                LoginStyle.inputFocado,
                        ]}
                        placeholder="Digite seu e-mail"
                        placeholderTextColor="#999"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        onFocus={() =>
                            setEmailFocado(true)
                        }
                        onBlur={() =>
                            setEmailFocado(false)
                        }
                        returnKeyType="next"
                    />

                    <Text style={LoginStyle.label}>
                        Senha
                    </Text>

                    <View
                        style={[
                            LoginStyle.passwordContainer,
                            senhaFocada &&
                                LoginStyle.passwordFocado,
                        ]}
                    >

                        <TextInput
                            style={LoginStyle.passwordInput}
                            placeholder="Digite sua senha"
                            placeholderTextColor="#999"
                            value={senha}
                            onChangeText={setSenha}
                            secureTextEntry={!mostrarSenha}
                            onFocus={() =>
                                setSenhaFocada(true)
                            }
                            onBlur={() =>
                                setSenhaFocada(false)
                            }
                            returnKeyType="done"
                        />

                        <TouchableOpacity
                            style={LoginStyle.eyeButton}
                            onPress={() =>
                                setMostrarSenha(
                                    !mostrarSenha
                                )
                            }
                        >

                            <Ionicons
                                name={
                                    mostrarSenha
                                        ? "eye-off-outline"
                                        : "eye-outline"
                                }
                                size={24}
                                color="#315F53"
                            />

                        </TouchableOpacity>

                    </View>

                    <TouchableOpacity
                        onPress={handleEsqueceuSenha}
                    >
                        <Text
                            style={
                                LoginStyle.forgotPassword
                            }
                        >
                            Esqueceu a senha?
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={LoginStyle.button}
                        onPress={handleEntrar}
                        activeOpacity={0.8}
                    >
                        <Text
                            style={LoginStyle.buttonText}
                        >
                            Entrar
                        </Text>
                    </TouchableOpacity>

                    <Text style={LoginStyle.orText}>
                        ou
                    </Text>

                    <TouchableOpacity
                        style={LoginStyle.googleButton}
                        onPress={handleLoginGoogle}
                    >

                        <Image
                            source={require(
                                "../../../assets/image 5.png"
                            )}
                            style={LoginStyle.googleIcon}
                            resizeMode="contain"
                        />

                        <Text
                            style={LoginStyle.googleText}
                        >
                            Continuar com Google
                        </Text>

                    </TouchableOpacity>

                    <Text
                        style={LoginStyle.registerText}
                    >
                        Não tem uma conta?{" "}

                        <Text
                            style={
                                LoginStyle.registerLink
                            }
                            onPress={handleCriarConta}
                        >
                            Criar conta
                        </Text>

                    </Text>

                </View>

            </ScrollView>

        </KeyboardAvoidingView>
    );
}