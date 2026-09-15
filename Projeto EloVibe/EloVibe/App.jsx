import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./src/screens/telalogin/TelaLogin";
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
                initialRouteName="BoasVindas"
                screenOptions={{
                    headerShown: false,
                }}
            >

                <Stack.Screen
                    name="Login"
                    component={Login}
                />

                <Stack.Screen
                    name="CriarConta"
                    component={CriarContaScreen}
                />

                <Stack.Screen
                    name="BoasVindas"
                    component={TelaBoasVindas}
                />

                <Stack.Screen
                    name="Inicio"
                    component={TelaFeed}
                />

                <Stack.Screen
                    name="Criar"
                    component={CriarPubli}
                />

                <Stack.Screen
                    name="Notificacoes"
                    component={Notificacao}
                />

                <Stack.Screen
                    name="Perfil"
                    component={TelaPerfil}
                />

                <Stack.Screen
                    name="EditarPerfil"
                    component={TelaEditarPerfil}
                />

                <Stack.Screen
                    name="Publicacao"
                    component={TelaPublicacao}
                />

            </Stack.Navigator>
        </NavigationContainer>
    );
}