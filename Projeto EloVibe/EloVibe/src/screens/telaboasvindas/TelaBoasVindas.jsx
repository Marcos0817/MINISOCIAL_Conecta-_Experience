import React from "react";

import {
    View,
    Text,
    TouchableOpacity,
    Image,
} from "react-native";

import { TelaBoasVindasStyle } from "./TelaBoasVindasStyle";


export default function TelaBoasVindas({ navigation }) {

    return (

        <View style={TelaBoasVindasStyle.container}>

            {/* FUNDO DOS QUATRO CANTOS */}

            <Image
                source={require("../../../assets/FotodeFundoQuatroCantos.png")}
                style={TelaBoasVindasStyle.fundo}
                resizeMode="stretch"
            />


            {/* CONTEÚDO */}

            <View style={TelaBoasVindasStyle.content}>

                {/* LOGO */}

                <Image
                    source={require("../../../assets/LogoGrande.png")}
                    style={TelaBoasVindasStyle.logo}
                    resizeMode="contain"
                />


                {/* TEXTO */}

                <Text style={TelaBoasVindasStyle.description}>
                    Conecte-se com pessoas e{"\n"}
                    compartilhe momentos
                </Text>


                {/* BOTÕES */}

                <View style={TelaBoasVindasStyle.buttons}>

                    <TouchableOpacity
                        style={TelaBoasVindasStyle.buttonLogin}
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate("Login")}
                    >
                        <Text style={TelaBoasVindasStyle.buttonLoginText}>
                            Entrar
                        </Text>
                    </TouchableOpacity>


                    <TouchableOpacity
                        style={TelaBoasVindasStyle.buttonCreate}
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate("CriarConta")}
                    >
                        <Text style={TelaBoasVindasStyle.buttonCreateText}>
                            Criar Conta
                        </Text>
                    </TouchableOpacity>

                </View>

            </View>

        </View>
    );
}