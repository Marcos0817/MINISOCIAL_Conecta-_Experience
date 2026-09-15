import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TabNavigator from "./TabNavigator";

import TelaBoasVindas from "../screens/telaboasvindas/TelaBoasVindas";
import Login from "../screens/login/Login";
import CriarConta from "../screens/telacadastro/TelaCadastro";
import Configuracao from "../screens/configuracao/Configuracao";
import EditarPerfil from "../screens/editarperfil/EditarPerfil";
import DetalhePubli from "../screens/detalhepublicacao/DetalhePubli";
import { Notificacao } from "../screens/notificacao/Notificacao";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >

                {/* TELA DE BOAS-VINDAS */}
                <Stack.Screen
                    name="BoasVindas"
                    component={TelaBoasVindas}
                />

                {/* LOGIN */}
                <Stack.Screen
                    name="Login"
                    component={Login}
                />

                {/* CRIAR CONTA */}
                <Stack.Screen
                    name="CriarConta"
                    component={CriarConta}
                />

                {/* NAVEGAÇÃO PRINCIPAL */}
                <Stack.Screen
                    name="Principal"
                    component={TabNavigator}
                />

                {/* NOTIFICAÇÕES */}
                <Stack.Screen
                    name="Notificacoes"
                    component={Notificacao}
                />

                {/* CONFIGURAÇÕES */}
                <Stack.Screen
                    name="Configuracao"
                    component={Configuracao}
                />

                {/* EDITAR PERFIL */}
                <Stack.Screen
                    name="EditarPerfil"
                    component={EditarPerfil}
                />

                {/* DETALHE DA PUBLICAÇÃO */}
                <Stack.Screen
                    name="DetalhePubli"
                    component={DetalhePubli}
                />

            </Stack.Navigator>
        </NavigationContainer>
    );
}