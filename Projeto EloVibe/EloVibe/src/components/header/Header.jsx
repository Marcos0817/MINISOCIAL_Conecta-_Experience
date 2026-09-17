import React from "react";
import {
    View,
    Image,
    TouchableOpacity
} from "react-native";

import { HeaderStyle } from "./HeaderStyle";

export default function Header({ navigation }) {

    const handleSinoPress = () => {
        navigation.navigate("Notificacoes");
    };

    return (
        <View style={HeaderStyle.header}>

            {/* LOGO */}
            <View>
                <Image
                    source={require("../../../assets/LogoPequeno02.png")}
                    style={HeaderStyle.logo}
                    resizeMode="contain"
                />
            </View>

            {/* SINO */}
            <TouchableOpacity
                style={HeaderStyle.botaoSino}
                activeOpacity={0.7}
                onPress={handleSinoPress}
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