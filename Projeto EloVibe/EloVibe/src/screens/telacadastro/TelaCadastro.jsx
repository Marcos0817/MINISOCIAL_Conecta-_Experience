import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { TelaCadastroStyle } from "./TelaCadastroStyle";

export default function CriarContaScreen({ navigation }) {

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [mostrarSenha, setMostrarSenha] = useState(false);


  // =====================================================
  // CRIAR CONTA
  // =====================================================

  const handleCriarConta = () => {

    // Verifica se o nome foi preenchido
    if (!nome.trim()) {
      return;
    }

    // Verifica se o e-mail foi preenchido
    if (!email.trim()) {
      return;
    }

    // Verifica se a senha foi preenchida
    if (!senha.trim()) {
      return;
    }


    console.log(
      "Criando conta:",
      nome,
      email,
      senha
    );


    // Depois de criar a conta,
    // volta para a tela de Login
    navigation.navigate("Login");

  };


  return (

    <View style={TelaCadastroStyle.container}>

      {/* =====================================================
          CABEÇALHO
      ===================================================== */}

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


      {/* =====================================================
          NOME
      ===================================================== */}

      <Text style={TelaCadastroStyle.label}>
        Nome
      </Text>

      <TextInput
        style={TelaCadastroStyle.input}
        placeholder="Digite seu nome"
        placeholderTextColor="#999"
        value={nome}
        onChangeText={setNome}
      />


      {/* =====================================================
          E-MAIL
      ===================================================== */}

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
      />


      {/* =====================================================
          SENHA
      ===================================================== */}

      <Text style={TelaCadastroStyle.label}>
        Senha
      </Text>

      <View style={TelaCadastroStyle.passwordContainer}>

        <TextInput
          style={TelaCadastroStyle.passwordInput}
          placeholder="Digite sua senha"
          placeholderTextColor="#999"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry={!mostrarSenha}
        />


        <TouchableOpacity
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


      {/* =====================================================
          BOTÃO CRIAR CONTA
      ===================================================== */}

      <TouchableOpacity
        style={TelaCadastroStyle.button}
        onPress={handleCriarConta}
      >

        <Text style={TelaCadastroStyle.buttonText}>
          Criar conta
        </Text>

      </TouchableOpacity>


      {/* =====================================================
          VOLTAR PARA LOGIN
      ===================================================== */}

      <Text style={TelaCadastroStyle.loginText}>

        Já tem uma conta?{" "}

        <Text
          style={TelaCadastroStyle.loginLink}
          onPress={() => navigation.navigate("Login")}
        >
          Entrar
        </Text>

      </Text>

    </View>

  );
}