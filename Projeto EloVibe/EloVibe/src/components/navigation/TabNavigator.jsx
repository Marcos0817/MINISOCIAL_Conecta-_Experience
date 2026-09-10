import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { TelaFeed } from "../screens/telafeed/TelaFeed";
import { CriarPubli } from "../screens/criarpublicacao/CriarPubli";
import { Notificacao } from "../screens/notificacao/Notificacao";
import TelaPerfil from "../screens/perfil/Perfil";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarActiveTintColor: "#315F53",
        tabBarInactiveTintColor: "#315F53",

        tabBarStyle: {
          height: 68,
          backgroundColor: "#FBF6EE",
          borderTopWidth: 1,
          borderTopColor: "#D9D4C9",
        },

        tabBarLabelStyle: {
          fontSize: 9,
          marginBottom: 5,
        },

        tabBarIcon: ({ focused, color }) => {
          let nomeIcone;

          if (route.name === "Início") {
            nomeIcone = focused
              ? "home"
              : "home-outline";
          }

          if (route.name === "Criar") {
            nomeIcone = focused
              ? "add-circle"
              : "add-circle-outline";
          }

          if (route.name === "Notificações") {
            nomeIcone = focused
              ? "notifications"
              : "notifications-outline";
          }

          if (route.name === "Perfil") {
            nomeIcone = focused
              ? "person"
              : "person-outline";
          }

          return (
            <Ionicons
              name={nomeIcone}
              size={23}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="Início"
        component={TelaFeed}
      />

      <Tab.Screen
        name="Criar"
        component={CriarPubli}
      />

      <Tab.Screen
        name="Notificações"
        component={Notificacao}
      />

      <Tab.Screen
        name="Perfil"
        component={TelaPerfil}
      />
    </Tab.Navigator>
  );
}