import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { TelaCadastroStyle } from "./TelaCadastroStyle";
import api from "../../services/api";

export default function CriarContaScreen({ navigation }) {

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [mostrarSenha, setMostrarSenha] = useState(false);

    const criarConta = async () => {

        // Verifica se os campos estão preenchidos
        if (!nome.trim() || !email.trim() || !senha.trim()) {
            Alert.alert(
                "Atenção",
                "Preencha todos os campos."
            );
            return;
        }

        try {

            // Verifica se já existe um usuário com esse e-mail
            const resposta = await api.get("/usuarios");

            const usuarioExistente = resposta.data.find(
                (usuario) =>
                    usuario.email.toLowerCase() === email.trim().toLowerCase()
            );

            if (usuarioExistente) {
                Alert.alert(
                    "E-mail já cadastrado",
                    "Já existe uma conta utilizando esse e-mail."
                );
                return;
            }

            // Cadastra o novo usuário
            await api.post("/usuarios", {
                nome: nome.trim(),
                email: email.trim(),
                senha: senha,
                foto: "images-galocego.jpg",
            });

            Alert.alert(
                "Cadastro realizado!",
                "Sua conta foi criada com sucesso.",
                [
                    {
                        text: "OK",
                        onPress: () => navigation.navigate("Login"),
                    },
                ]
            );

        } catch (erro) {

            console.log("Erro ao cadastrar usuário:", erro);

            Alert.alert(
                "Erro",
                "Não foi possível realizar o cadastro. Verifique se a API está funcionando."
            );
        }
    };

    return (
        <View style={TelaCadastroStyle.container}>

            {/* HEADER */}
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

            {/* NOME */}
            <Text style={TelaCadastroStyle.label}>
                Nome completo
            </Text>

            <TextInput
                style={TelaCadastroStyle.input}
                placeholder="Digite seu nome"
                placeholderTextColor="#999"
                value={nome}
                onChangeText={setNome}
            />

            {/* E-MAIL */}
            <Text style={TelaCadastroStyle.label}>
                E-mail
            </Text>

            <TextInput
                style={TelaCadastroStyle.input}
                placeholder="Digite seu e-mail"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            />

            {/* SENHA */}
            <Text style={TelaCadastroStyle.label}>
                Senha
            </Text>

            <View style={TelaCadastroStyle.passwordContainer}>

                <TextInput
                    style={TelaCadastroStyle.passwordInput}
                    placeholder="Crie uma senha"
                    placeholderTextColor="#999"
                    value={senha}
                    onChangeText={setSenha}
                    secureTextEntry={!mostrarSenha}
                />

                <TouchableOpacity
                    style={TelaCadastroStyle.eyeButton}
                    onPress={() => setMostrarSenha(!mostrarSenha)}
                >
                    <Ionicons
                        name={
                            mostrarSenha
                                ? "eye-off-outline"
                                : "eye-outline"
                        }
                        size={23}
                        color="#356B5B"
                    />
                </TouchableOpacity>

            </View>

            {/* BOTÃO CADASTRAR */}
            <TouchableOpacity
                style={TelaCadastroStyle.button}
                onPress={criarConta}
            >
                <Text style={TelaCadastroStyle.buttonText}>
                    Criar conta
                </Text>
            </TouchableOpacity>

            {/* LINK PARA LOGIN */}
            <TouchableOpacity
                onPress={() => navigation.navigate("Login")}
            >
                <Text style={TelaCadastroStyle.loginText}>
                    Já possui uma conta?{" "}
                    <Text style={TelaCadastroStyle.loginLink}>
                        Entrar
                    </Text>
                </Text>
            </TouchableOpacity>

        </View>
    );
}