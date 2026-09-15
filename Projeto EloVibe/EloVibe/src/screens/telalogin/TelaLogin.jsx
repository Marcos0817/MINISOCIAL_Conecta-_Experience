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

import { LoginStyle } from "./TelaLoginStyle";


export default function Login({ navigation }) {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [mostrarSenha, setMostrarSenha] = useState(false);

    // Controle de foco dos campos
    const [emailFocado, setEmailFocado] = useState(false);
    const [senhaFocada, setSenhaFocada] = useState(false);


    // =====================================================
    // ENTRAR
    // =====================================================

    const handleEntrar = () => {

        // Verifica se os campos estão preenchidos
        if (email.trim() === "" || senha.trim() === "") {

            Alert.alert(
                "Campos obrigatórios",
                "Preencha todos os campos para entrar."
            );

            return;
        }

        // Mantendo a navegação original
        navigation.navigate("Inicio");
    };


    // =====================================================
    // ESQUECEU A SENHA
    // =====================================================

    const handleEsqueceuSenha = () => {

        Alert.alert(
            "Esqueceu a senha?",
            "A recuperação de senha será disponibilizada em breve."
        );

    };


    // =====================================================
    // LOGIN COM GOOGLE
    // =====================================================

    const handleLoginGoogle = () => {

        Alert.alert(
            "Google",
            "Login com Google será disponibilizado em breve."
        );

    };


    // =====================================================
    // CRIAR CONTA
    // =====================================================

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

                    {/* TÍTULO */}

                    <Text style={LoginStyle.title}>
                        Login
                    </Text>


                    {/* E-MAIL */}

                    <Text style={LoginStyle.label}>
                        E-mail
                    </Text>

                    <TextInput
                        style={[
                            LoginStyle.input,
                            emailFocado && LoginStyle.inputFocado,
                        ]}
                        placeholder="Digite seu e-mail"
                        placeholderTextColor="#999"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        onFocus={() => setEmailFocado(true)}
                        onBlur={() => setEmailFocado(false)}
                        returnKeyType="next"
                    />


                    {/* SENHA */}

                    <Text style={LoginStyle.label}>
                        Senha
                    </Text>

                    <View
                        style={[
                            LoginStyle.passwordContainer,
                            senhaFocada && LoginStyle.passwordFocado,
                        ]}
                    >

                        <TextInput
                            style={LoginStyle.passwordInput}
                            placeholder="Digite sua senha"
                            placeholderTextColor="#999"
                            value={senha}
                            onChangeText={setSenha}
                            secureTextEntry={!mostrarSenha}
                            onFocus={() => setSenhaFocada(true)}
                            onBlur={() => setSenhaFocada(false)}
                            returnKeyType="done"
                        />


                        {/* MOSTRAR / OCULTAR SENHA */}

                        <TouchableOpacity
                            style={LoginStyle.eyeButton}
                            onPress={() =>
                                setMostrarSenha(!mostrarSenha)
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


                    {/* ESQUECEU A SENHA */}

                    <TouchableOpacity
                        onPress={handleEsqueceuSenha}
                    >

                        <Text style={LoginStyle.forgotPassword}>
                            Esqueceu a senha?
                        </Text>

                    </TouchableOpacity>


                    {/* BOTÃO ENTRAR */}

                    <TouchableOpacity
                        style={LoginStyle.button}
                        onPress={handleEntrar}
                        activeOpacity={0.8}
                    >

                        <Text style={LoginStyle.buttonText}>
                            Entrar
                        </Text>

                    </TouchableOpacity>


                    {/* OU */}

                    <Text style={LoginStyle.orText}>
                        ou
                    </Text>


                    {/* GOOGLE */}

                    <TouchableOpacity
                        style={LoginStyle.googleButton}
                        onPress={handleLoginGoogle}
                    >

                        <Image
                            source={require("../../../assets/image 5.png")}
                            style={LoginStyle.googleIcon}
                            resizeMode="contain"
                        />

                        <Text style={LoginStyle.googleText}>
                            Continuar com Google
                        </Text>

                    </TouchableOpacity>


                    {/* CRIAR CONTA */}

                    <Text style={LoginStyle.registerText}>

                        Não tem uma conta?{" "}

                        <Text
                            style={LoginStyle.registerLink}
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