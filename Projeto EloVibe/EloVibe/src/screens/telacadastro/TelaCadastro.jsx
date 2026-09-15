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
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { TelaCadastroStyle } from "./TelaCadastroStyle";

export default function CriarContaScreen({ navigation }) {

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [mostrarSenha, setMostrarSenha] = useState(false);

    // Estados para saber qual input está selecionado
    const [nomeFocado, setNomeFocado] = useState(false);
    const [emailFocado, setEmailFocado] = useState(false);
    const [senhaFocada, setSenhaFocada] = useState(false);


    // =====================================================
    // CRIAR CONTA
    // =====================================================

    const handleCriarConta = () => {

        // Verifica se todos os campos foram preenchidos
        if (
            nome.trim() === "" ||
            email.trim() === "" ||
            senha.trim() === ""
        ) {

            Alert.alert(
                "Campos obrigatórios",
                "Preencha todos os campos para criar sua conta."
            );

            return;
        }

        // Se todos os campos estiverem preenchidos
        console.log("Criando conta:", nome, email, senha);

        // Mantendo a navegação original
        navigation.navigate("Login");
    };


    return (
        <SafeAreaView style={TelaCadastroStyle.safeArea}>

            <KeyboardAvoidingView
                style={{ flex: 1 }}
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
                    contentContainerStyle={TelaCadastroStyle.scrollContent}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >

                    <View style={TelaCadastroStyle.container}>

                        {/* ==========================================
                            HEADER
                        ========================================== */}

                        <View style={TelaCadastroStyle.header}>

                            <TouchableOpacity
                                onPress={() => navigation.goBack()}
                            >
                                <Ionicons
                                    name="chevron-back"
                                    size={26}
                                    color="#1E3A34"
                                />
                            </TouchableOpacity>

                            <Text style={TelaCadastroStyle.headerTitle}>
                                Criar conta
                            </Text>

                            <View style={{ width: 26 }} />

                        </View>


                        {/* ==========================================
                            NOME
                        ========================================== */}

                        <Text style={TelaCadastroStyle.label}>
                            Nome
                        </Text>

                        <TextInput
                            style={[
                                TelaCadastroStyle.input,
                                nomeFocado &&
                                TelaCadastroStyle.inputFocado
                            ]}
                            placeholder="Digite seu nome"
                            placeholderTextColor="#999"
                            value={nome}
                            onChangeText={setNome}
                            onFocus={() => setNomeFocado(true)}
                            onBlur={() => setNomeFocado(false)}
                            returnKeyType="next"
                        />


                        {/* ==========================================
                            E-MAIL
                        ========================================== */}

                        <Text style={TelaCadastroStyle.label}>
                            E-mail
                        </Text>

                        <TextInput
                            style={[
                                TelaCadastroStyle.input,
                                emailFocado &&
                                TelaCadastroStyle.inputFocado
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


                        {/* ==========================================
                            SENHA
                        ========================================== */}

                        <Text style={TelaCadastroStyle.label}>
                            Senha
                        </Text>

                        <View
                            style={[
                                TelaCadastroStyle.passwordContainer,
                                senhaFocada &&
                                TelaCadastroStyle.inputFocado
                            ]}
                        >

                            <TextInput
                                style={TelaCadastroStyle.passwordInput}
                                placeholder="Digite sua senha"
                                placeholderTextColor="#999"
                                value={senha}
                                onChangeText={setSenha}
                                secureTextEntry={!mostrarSenha}
                                onFocus={() => setSenhaFocada(true)}
                                onBlur={() => setSenhaFocada(false)}
                                returnKeyType="done"
                            />

                            <TouchableOpacity
                                style={TelaCadastroStyle.eyeButton}
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
                                    color="#1E3A34"
                                />

                            </TouchableOpacity>

                        </View>


                        {/* ==========================================
                            BOTÃO
                        ========================================== */}

                        <TouchableOpacity
                            style={TelaCadastroStyle.button}
                            onPress={handleCriarConta}
                            activeOpacity={0.8}
                        >

                            <Text style={TelaCadastroStyle.buttonText}>
                                Criar conta
                            </Text>

                        </TouchableOpacity>


                        {/* ==========================================
                            LOGIN
                        ========================================== */}

                        <Text style={TelaCadastroStyle.loginText}>

                            Já tem uma conta?{" "}

                            <Text
                                style={TelaCadastroStyle.loginLink}
                                onPress={() =>
                                    navigation.navigate("Login")
                                }
                            >
                                Entrar
                            </Text>

                        </Text>

                    </View>

                </ScrollView>

            </KeyboardAvoidingView>

        </SafeAreaView>
    );
}