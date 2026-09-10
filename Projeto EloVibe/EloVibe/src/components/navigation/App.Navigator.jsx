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

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="BoasVindas"
          component={TelaBoasVindas}
        />

        <Stack.Screen
          name="Login"
          component={Login}
        />

        <Stack.Screen
          name="CriarConta"
          component={CriarConta}
        />

        <Stack.Screen
          name="Principal"
          component={TabNavigator}
        />

        <Stack.Screen
          name="Configuracao"
          component={Configuracao}
        />

        <Stack.Screen
          name="EditarPerfil"
          component={EditarPerfil}
        />

        <Stack.Screen
          name="DetalhePubli"
          component={DetalhePubli}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}