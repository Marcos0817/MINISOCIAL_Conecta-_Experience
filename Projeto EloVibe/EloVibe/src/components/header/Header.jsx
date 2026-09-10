import React from "react";
import {
    View,
    Image,
    TouchableOpacity
} from "react-native";

import { HeaderStyle } from "./HeaderStyle";

export default function Header({ navigation }) {

    // IR PARA A TELA DE BOAS-VINDAS
    const handleLogoPress = () => {
        navigation.navigate("BoasVindas");
    };

    return (
        <View style={HeaderStyle.header}>

            {/* LOGO */}
            <TouchableOpacity onPress={handleLogoPress} activeOpacity={0.7}>
                <Image
                    source={require("../../../assets/LogoPequeno.png")}
                    style={HeaderStyle.logo}
                    resizeMode="contain"
                />
            </TouchableOpacity>

            {/* SINO */}
            <TouchableOpacity
                style={HeaderStyle.botaoSino}
            >
                <Image
                    source={require("../../../assets/SinoNotific.png")}
                    style={HeaderStyle.sino}
                    resizeMode="contain"
                />
            </TouchableOpacity>

        </View>
    );
}