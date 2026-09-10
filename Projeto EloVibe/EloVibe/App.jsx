import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import  Login  from "./src/screens/telalogin/TelaLogin";
import CriarContaScreen from "./src/screens/telacadastro/TelaCadastro";

import { TelaFeed } from "./src/screens/telafeed/TelaFeed";
import { CriarPubli } from "./src/screens/criarpublicacao/CriarPubli";
import { Notificacao } from "./src/screens/notificacao/Notificacao";

import TelaPerfil from "./src/screens/perfil/Perfil";
import TelaEditarPerfil from "./src/screens/editarperfil/EditarPefil";
import TelaPublicacao from "./src/screens/detalhepublicacao/DetalhePubli";

import TelaBoasVindas from "./src/screens/telaboasvindas/TelaBoasVindas";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >

        {/* TELA DE LOGIN */}
        <Stack.Screen
          name="Login"
          component={Login}
        />

        {/* TELA DE CADASTRO */}
        <Stack.Screen
          name="CriarConta"
          component={CriarContaScreen}
        />

        {/* TELA DE BOAS-VINDAS */}
        <Stack.Screen
          name="BoasVindas"
          component={TelaBoasVindas}
        />

        {/* FEED */}
        <Stack.Screen
          name="Inicio"
          component={TelaFeed}
        />

        {/* CRIAR PUBLICAÇÃO */}
        <Stack.Screen
          name="Criar"
          component={CriarPubli}
        />

        {/* NOTIFICAÇÕES */}
        <Stack.Screen
          name="Notificacoes"
          component={Notificacao}
        />

        {/* PERFIL */}
        <Stack.Screen
          name="Perfil"
          component={TelaPerfil}
        />

        {/* EDITAR PERFIL */}
        <Stack.Screen
          name="EditarPerfil"
          component={TelaEditarPerfil}
        />

        {/* DETALHE DA PUBLICAÇÃO */}
        <Stack.Screen
          name="Publicacao"
          component={TelaPublicacao}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}