import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    TextInput,
    Alert,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import api from "../../services/api";

import PublicacaoStyle from "./DetalhePubliStyle";

import Footer from "../../components/footer/Footer";

const Publicacao = ({ route, navigation }) => {
    const { publicacaoId } = route.params;

    const [publicacao, setPublicacao] = useState(null);
    const [comentarios, setComentarios] = useState([]);
    const [novoComentario, setNovoComentario] = useState("");

    useEffect(() => {
        carregarPublicacao();
        carregarComentarios();
    }, []);

    const carregarPublicacao = async () => {
        try {
            const resposta = await api.get(
                `/publicacoes/${publicacaoId}`
            );

            const usuario = await api.get(
                `/usuarios/${resposta.data.usuarioId}`
            );

            // Mantém separadas:
            // foto = foto do POST
            // fotoPerfil = foto do USUÁRIO
            setPublicacao({
                ...resposta.data,
                nome: usuario.data.nome,
                fotoPerfil: usuario.data.foto,
            });

        } catch (erro) {
            console.log("Erro ao carregar publicação:", erro);

            Alert.alert(
                "Erro",
                "Não foi possível carregar a publicação."
            );
        }
    };

    const carregarComentarios = async () => {
        try {
            const resposta = await api.get(
                `/comentarios?publicacaoId=${publicacaoId}`
            );

            setComentarios(resposta.data);
        } catch (erro) {
            console.log("Erro ao carregar comentários:", erro);
        }
    };

    const enviarComentario = async () => {
        if (novoComentario.trim() === "") {
            return;
        }

        try {
            const comentario = {
                publicacaoId: publicacaoId,
                usuarioId: "1",
                nome: "Usuário",
                texto: novoComentario.trim(),
                horario: "Agora",
            };

            await api.post("/comentarios", comentario);

            setNovoComentario("");

            carregarComentarios();
        } catch (erro) {
            console.log("Erro ao enviar comentário:", erro);

            Alert.alert(
                "Erro",
                "Não foi possível enviar o comentário."
            );
        }
    };

    // FOTO DE PERFIL DO USUÁRIO
    const pegarImagemPerfil = (foto) => {

        if (!foto || foto === "") {
            return require("../../../assets/images-galocego.jpg");
        }

        if (foto === "images-galocego.jpg") {
            return require("../../../assets/images-galocego.jpg");
        }

        return { uri: foto };
    };

    // FOTO DA PUBLICAÇÃO
    const pegarImagemPost = (foto) => {

        if (!foto || foto === "") {
            return null;
        }

        if (foto === "images-galocego.jpg") {
            return require("../../../assets/images-galocego.jpg");
        }

        return { uri: foto };
    };

    if (!publicacao) {
        return (
            <SafeAreaView style={PublicacaoStyle.container}>
                <Text>Carregando...</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={PublicacaoStyle.container}>

            {/* CONTEÚDO PRINCIPAL */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={PublicacaoStyle.scrollContent}
            >

                {/* TÍTULO */}
                <Text style={PublicacaoStyle.titulo}>
                    Publicação
                </Text>

                {/* CARD DA PUBLICAÇÃO */}
                <View style={PublicacaoStyle.post}>

                    {/* CABEÇALHO */}
                    <View style={PublicacaoStyle.postHeader}>

                        <View style={PublicacaoStyle.usuario}>

                            {/* FOTO DE PERFIL */}
                            <Image
                                source={pegarImagemPerfil(
                                    publicacao.fotoPerfil
                                )}
                                style={PublicacaoStyle.avatar}
                                resizeMode="cover"
                            />

                            <View>

                                <Text style={PublicacaoStyle.nome}>
                                    {publicacao.nome}
                                </Text>

                                <Text style={PublicacaoStyle.horario}>
                                    {publicacao.horario}
                                </Text>

                            </View>

                        </View>

                        {/* 3 PONTOS DENTRO DO CARD */}
                        <TouchableOpacity
                            style={PublicacaoStyle.compartilhar}
                            onPress={() => {
                                Alert.alert(
                                    "Opções",
                                    "Funcionalidade de opções."
                                );
                            }}
                        >
                            <Text style={PublicacaoStyle.pontos}>
                                •••
                            </Text>
                        </TouchableOpacity>

                    </View>

                    {/* TEXTO DA PUBLICAÇÃO */}
                    <Text style={PublicacaoStyle.textoPublicacao}>
                        {publicacao.texto}
                    </Text>

                    {/* SENTIMENTO */}
                    {publicacao.sentimento !== "" &&
                        publicacao.sentimento != null && (
                            <Text style={PublicacaoStyle.sentimento}>
                                {publicacao.sentimento}
                            </Text>
                        )}

                    {/* LOCALIZAÇÃO */}
                    {publicacao.localizacao !== "" &&
                        publicacao.localizacao != null && (
                            <Text
                                style={{
                                    fontSize: 9,
                                    color: "#315F53",
                                    marginTop: 4,
                                    marginBottom: 6,
                                }}
                            >
                                📍 {publicacao.localizacao}
                            </Text>
                        )}

                    {/* FOTO DO POST */}
                    {publicacao.foto &&
                        publicacao.foto !== "" && (
                            <Image
                                source={pegarImagemPost(
                                    publicacao.foto
                                )}
                                style={PublicacaoStyle.imagem}
                                resizeMode="cover"
                            />
                        )}

                    {/* AÇÕES */}
                    <View style={PublicacaoStyle.acoes}>

                        {/* CURTIDA */}
                        <TouchableOpacity
                            style={PublicacaoStyle.acao}
                        >
                            <Image
                                source={require("../../../assets/Coracao.png")}
                                style={{
                                    width: 22,
                                    height: 22,
                                }}
                                resizeMode="contain"
                            />

                            <Text style={PublicacaoStyle.numero}>
                                {publicacao.curtidas || 0}
                            </Text>
                        </TouchableOpacity>

                        {/* COMENTÁRIOS */}
                        <TouchableOpacity
                            style={PublicacaoStyle.acao}
                        >
                            <Image
                                source={require("../../../assets/Comentario.png")}
                                style={{
                                    width: 22,
                                    height: 22,
                                }}
                                resizeMode="contain"
                            />

                            <Text style={PublicacaoStyle.numero}>
                                {comentarios.length}
                            </Text>
                        </TouchableOpacity>

                        {/* SALVAR */}
                        <TouchableOpacity
                            style={PublicacaoStyle.iconeSalvar}
                        >
                            <Image
                                source={require("../../../assets/Salvar.png")}
                                style={{
                                    width: 23,
                                    height: 23,
                                }}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>

                    </View>

                    {/* TÍTULO DOS COMENTÁRIOS */}
                    <Text style={PublicacaoStyle.comentariosTitulo}>
                        Comentários
                    </Text>

                    {/* ÁREA DOS COMENTÁRIOS */}
                    <View style={PublicacaoStyle.areaComentarios}>

                        <ScrollView
                            showsVerticalScrollIndicator={true}
                            nestedScrollEnabled={true}
                            contentContainerStyle={
                                PublicacaoStyle.scrollComentarios
                            }
                        >

                            {comentarios.map((comentario) => (
                                <View
                                    key={comentario.id}
                                    style={PublicacaoStyle.comentario}
                                >

                                    <Image
                                        source={require("../../../assets/images-galocego.jpg")}
                                        style={PublicacaoStyle.avatarComentario}
                                        resizeMode="cover"
                                    />

                                    <View
                                        style={
                                            PublicacaoStyle.comentarioConteudo
                                        }
                                    >

                                        <Text
                                            style={
                                                PublicacaoStyle.nomeComentario
                                            }
                                        >
                                            {comentario.nome}
                                        </Text>

                                        <Text
                                            style={
                                                PublicacaoStyle.horarioComentario
                                            }
                                        >
                                            {comentario.horario}
                                        </Text>

                                        <Text
                                            style={
                                                PublicacaoStyle.textoComentario
                                            }
                                        >
                                            {comentario.texto}
                                        </Text>

                                    </View>

                                </View>
                            ))}

                        </ScrollView>

                    </View>

                </View>

            </ScrollView>

            {/* CAMPO DE COMENTÁRIO FIXO */}
            <View style={PublicacaoStyle.comentarioFixo}>

                <View style={PublicacaoStyle.campoComentario}>

                    <TextInput
                        style={PublicacaoStyle.inputComentario}
                        placeholder="Adicione um comentário..."
                        placeholderTextColor="#888"
                        value={novoComentario}
                        onChangeText={setNovoComentario}
                        maxLength={200}
                    />

                    <TouchableOpacity
                        style={PublicacaoStyle.botaoEnviar}
                        onPress={enviarComentario}
                    >
                        <Image
                            source={require("../../../assets/AviaoCompartilhar.png")}
                            style={PublicacaoStyle.iconeEnviar}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>

                </View>

            </View>

            {/* FOOTER */}
            <Footer navigation={navigation} />

        </SafeAreaView>
    );
};

export default Publicacao;