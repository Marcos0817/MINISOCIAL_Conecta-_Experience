import React, {
    useCallback,
    useState,
} from "react";

import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    Modal,
} from "react-native";

import {
    Ionicons,
} from "@expo/vector-icons";

import {
    SafeAreaView,
} from "react-native-safe-area-context";

import {
    useFocusEffect,
} from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import PerfilStyle from "./PerfilStyle";

import Footer from "../../components/footer/Footer";

import api from "../../services/api";


const TelaPerfil = ({
    navigation,
    route,
}) => {

    // =====================================================
    // ID DO PERFIL QUE FOI CLICADO
    // =====================================================

    const usuarioIdPerfil =
        route?.params?.usuarioId;


    // =====================================================
    // USUÁRIO LOGADO
    // =====================================================

    const [
        usuarioLogadoId,
        setUsuarioLogadoId,
    ] = useState("");


    // =====================================================
    // USUÁRIO DO PERFIL
    // =====================================================

    const [
        usuario,
        setUsuario,
    ] = useState({

        id: "",
        nome: "",
        email: "",
        usuario: "",
        bio: "",
        foto: "",

    });


    // =====================================================
    // PUBLICAÇÕES DO USUÁRIO
    // =====================================================

    const [
        publicacoes,
        setPublicacoes,
    ] = useState([]);


    // =====================================================
    // PUBLICAÇÕES SALVAS
    // =====================================================

    const [
        publicacoesSalvas,
        setPublicacoesSalvas,
    ] = useState([]);


    // =====================================================
    // ABA SELECIONADA
    // =====================================================

    const [
        abaSelecionada,
        setAbaSelecionada,
    ] = useState(
        "publicacoes"
    );


    // =====================================================
    // IMAGEM DO PERFIL EXPANDIDA
    // =====================================================

    const [
        imagemExpandida,
        setImagemExpandida,
    ] = useState(false);


    // =====================================================
    // VERIFICAR SE É O MEU PERFIL
    // =====================================================

    const ehMeuPerfil =
        String(usuario?.id) ===
        String(usuarioLogadoId);


    // =====================================================
    // CARREGAR USUÁRIO
    // =====================================================

    const carregarUsuario = async () => {

        try {

            // =================================================
            // PEGAR ID DO USUÁRIO LOGADO
            // =================================================

            const idLogado =
                await AsyncStorage.getItem(
                    "idUsuario"
                );


            setUsuarioLogadoId(
                idLogado || ""
            );


            if (!idLogado) {

                console.log(
                    "ID do usuário logado não encontrado."
                );

                return;

            }


            // =================================================
            // DEFINIR QUAL PERFIL SERÁ ABERTO
            // =================================================

            const idDoPerfil =
                usuarioIdPerfil ||
                idLogado;


            console.log(
                "===================================="
            );

            console.log(
                "ID LOGADO:",
                idLogado
            );

            console.log(
                "ID DO PERFIL:",
                idDoPerfil
            );

            console.log(
                "===================================="
            );


            // =================================================
            // BUSCAR O USUÁRIO
            // =================================================

            const respostaUsuario =
                await api.get(
                    `/usuarios/${idDoPerfil}`
                );


            console.log(
                "USUÁRIO ENCONTRADO:",
                respostaUsuario.data
            );


            setUsuario(
                respostaUsuario.data
            );


            // =================================================
            // BUSCAR TODAS AS PUBLICAÇÕES
            // =================================================

            const respostaPublicacoes =
                await api.get(
                    "/publicacoes"
                );


            // =================================================
            // FILTRAR PUBLICAÇÕES DO PERFIL
            // =================================================

            const minhasPublicacoes =
                respostaPublicacoes.data.filter(
                    (publicacao) =>

                        String(
                            publicacao.usuarioId
                        ) ===
                        String(
                            idDoPerfil
                        )
                );


            console.log(
                "PUBLICAÇÕES DO PERFIL:",
                minhasPublicacoes
            );


            setPublicacoes(
                minhasPublicacoes
            );


            // =================================================
            // PUBLICAÇÕES SALVAS
            // =================================================

            if (
                String(idDoPerfil) ===
                String(idLogado)
            ) {

                const salvasStorage =
                    await AsyncStorage.getItem(
                        `publicacoesSalvas_${idLogado}`
                    );


                let idsSalvos = [];


                if (salvasStorage) {

                    idsSalvos =
                        JSON.parse(
                            salvasStorage
                        );

                }


                const minhasPublicacoesSalvas =
                    respostaPublicacoes.data.filter(
                        (publicacao) =>

                            idsSalvos.some(
                                (id) =>

                                    String(id) ===
                                    String(
                                        publicacao.id
                                    )
                            )
                    );


                setPublicacoesSalvas(
                    minhasPublicacoesSalvas
                );


            } else {

                // =================================================
                // OUTRO USUÁRIO
                // =================================================

                setPublicacoesSalvas(
                    []
                );

            }


            // =================================================
            // SEMPRE COMEÇAR EM PUBLICAÇÕES
            // =================================================

            setAbaSelecionada(
                "publicacoes"
            );


        } catch (erro) {

            console.log(
                "Erro ao carregar perfil:",
                erro
            );

        }

    };


    // =====================================================
    // RECARREGAR AO ENTRAR NA TELA
    // =====================================================

    useFocusEffect(

        useCallback(() => {

            carregarUsuario();

        }, [
            usuarioIdPerfil
        ])

    );


    // =====================================================
    // LOGOUT
    // =====================================================

    const handleLogout = async () => {

        try {

            await AsyncStorage.removeItem(
                "idUsuario"
            );

            await AsyncStorage.removeItem(
                "nomeUsuario"
            );

            await AsyncStorage.removeItem(
                "emailUsuario"
            );


            navigation.reset({

                index: 0,

                routes: [
                    {
                        name: "BoasVindas",
                    },
                ],

            });


        } catch (erro) {

            console.log(
                "Erro ao fazer logout:",
                erro
            );

        }

    };


    // =====================================================
    // ABRIR PUBLICAÇÃO
    // =====================================================

    const abrirPublicacao = (
        id
    ) => {

        navigation.navigate(
            "Publicacao",
            {
                publicacaoId: id,
            }
        );

    };


    // =====================================================
    // PEGAR FOTO DO PERFIL
    // =====================================================

    const pegarImagem = (
        foto
    ) => {

        if (
            !foto ||
            foto === ""
        ) {

            return require(
                "../../../assets/perfilIcone.png"
            );

        }


        if (
            foto ===
            "images-galocego.jpg"
        ) {

            return require(
                "../../../assets/perfilIcone.png"
            );

        }


        if (
            foto ===
            "perfilIcone.png"
        ) {

            return require(
                "../../../assets/perfilIcone.png"
            );

        }


        return {
            uri: foto,
        };

    };


    // =====================================================
    // DEFINIR PUBLICAÇÕES EXIBIDAS
    // =====================================================

    const publicacoesExibidas =

        abaSelecionada ===
            "publicacoes"

            ? publicacoes

            : publicacoesSalvas;


    // =====================================================
    // TELA
    // =====================================================

    return (

        <SafeAreaView
            style={
                PerfilStyle.container
            }
        >

            <ScrollView

                showsVerticalScrollIndicator={
                    false
                }

                contentContainerStyle={
                    PerfilStyle.scrollContent
                }

            >

                {/* =====================================================
                    BOTÃO SAIR
                ===================================================== */}

                {
                    ehMeuPerfil && (

                        <TouchableOpacity

                            style={
                                PerfilStyle.sair
                            }

                            onPress={
                                handleLogout
                            }

                        >

                            <Ionicons
                                name="log-out-outline"
                                size={25}
                                color="#315F53"
                            />

                        </TouchableOpacity>

                    )
                }


                {/* =====================================================
                    CONFIGURAÇÕES
                ===================================================== */}

                {
                    ehMeuPerfil && (

                        <TouchableOpacity

                            style={
                                PerfilStyle.configuracao
                            }

                            onPress={() =>
                                navigation.navigate(
                                    "Configuracao"
                                )
                            }

                        >

                            <Ionicons
                                name="settings-outline"
                                size={24}
                                color="#315F53"
                            />

                        </TouchableOpacity>

                    )
                }


                {/* =====================================================
                    TÍTULO
                ===================================================== */}

                <Text
                    style={
                        PerfilStyle.titulo
                    }
                >

                    {
                        ehMeuPerfil
                            ? "Meu Perfil"
                            : "Perfil"
                    }

                </Text>


                {/* =====================================================
                    FOTO DO PERFIL
                ===================================================== */}

                <View
                    style={
                        PerfilStyle.fotoContainer
                    }
                >

                    <TouchableOpacity

                        activeOpacity={0.9}

                        onPress={() =>
                            setImagemExpandida(true)
                        }

                    >

                        <Image

                            source={
                                pegarImagem(
                                    usuario.foto
                                )
                            }

                            style={
                                PerfilStyle.foto
                            }

                            resizeMode="cover"

                        />

                    </TouchableOpacity>


                    {/* =================================================
                        EDITAR FOTO
                    ================================================= */}

                    {
                        ehMeuPerfil && (

                            <TouchableOpacity

                                style={
                                    PerfilStyle.botaoEditar
                                }

                                onPress={() =>
                                    navigation.navigate(
                                        "EditarPerfil"
                                    )
                                }

                            >

                                <Image

                                    source={
                                        require(
                                            "../../../assets/EditarPerfil.png"
                                        )
                                    }

                                    style={
                                        PerfilStyle.botaoEditar
                                    }

                                    resizeMode="contain"

                                />

                            </TouchableOpacity>

                        )
                    }

                </View>


                {/* =====================================================
                    NOME
                ===================================================== */}

                <Text
                    style={
                        PerfilStyle.nome
                    }
                >

                    {
                        usuario.nome ||
                        "Usuário"
                    }

                </Text>


                {/* =====================================================
                    EMAIL
                ===================================================== */}

                <Text
                    style={
                        PerfilStyle.email
                    }
                >

                    {
                        usuario.email ||
                        ""
                    }

                </Text>


                {/* =====================================================
                    ESTATÍSTICAS
                ===================================================== */}

                <View
                    style={
                        PerfilStyle.estatisticas
                    }
                >

                    <View
                        style={
                            PerfilStyle.estatistica
                        }
                    >

                        <Text
                            style={
                                PerfilStyle.numero
                            }
                        >

                            {
                                publicacoes.length
                            }

                        </Text>

                        <Text
                            style={
                                PerfilStyle.label
                            }
                        >
                            Publicações
                        </Text>

                    </View>


                    <View
                        style={
                            PerfilStyle.estatistica
                        }
                    >

                        <Text
                            style={
                                PerfilStyle.numero
                            }
                        >
                            2794
                        </Text>

                        <Text
                            style={
                                PerfilStyle.label
                            }
                        >
                            Seguidores
                        </Text>

                    </View>


                    <View
                        style={
                            PerfilStyle.estatistica
                        }
                    >

                        <Text
                            style={
                                PerfilStyle.numero
                            }
                        >
                            6767
                        </Text>

                        <Text
                            style={
                                PerfilStyle.label
                            }
                        >
                            Seguindo
                        </Text>

                    </View>

                </View>


                {/* =====================================================
                    BIO
                ===================================================== */}

                {
                    usuario.bio ? (

                        <Text
                            style={
                                PerfilStyle.bio
                            }
                        >

                            {
                                usuario.bio
                            }

                        </Text>

                    ) : null
                }


                {/* =====================================================
                    ABAS
                ===================================================== */}

                <View
                    style={[
                        PerfilStyle.abas,

                        !ehMeuPerfil && {
                            justifyContent:
                                "center",
                        },

                    ]}
                >

                    {/* =================================================
                        PUBLICAÇÕES
                    ================================================= */}

                    <TouchableOpacity

                        style={[
                            PerfilStyle.aba,

                            !ehMeuPerfil && {
                                width: "100%",
                                alignItems: "center",
                            },

                        ]}

                        onPress={() =>
                            setAbaSelecionada(
                                "publicacoes"
                            )
                        }

                    >

                        <Image

                            source={
                                require(
                                    "../../../assets/posts.png"
                                )
                            }

                            style={{

                                width: 24,
                                height: 24,

                                opacity:
                                    abaSelecionada ===
                                        "publicacoes"
                                        ? 1
                                        : 0.5,

                            }}

                            resizeMode="contain"

                        />

                    </TouchableOpacity>


                    {/* =================================================
                        SALVOS
                        
                        SÓ APARECE NO MEU PERFIL
                    ================================================= */}

                    {
                        ehMeuPerfil && (

                            <TouchableOpacity

                                style={
                                    PerfilStyle.aba
                                }

                                onPress={() =>
                                    setAbaSelecionada(
                                        "salvos"
                                    )
                                }

                            >

                                <Image

                                    source={
                                        require(
                                            "../../../assets/Salvar.png"
                                        )
                                    }

                                    style={{

                                        width: 24,
                                        height: 24,

                                        opacity:
                                            abaSelecionada ===
                                                "salvos"
                                                ? 1
                                                : 0.5,

                                    }}

                                    resizeMode="contain"

                                />

                            </TouchableOpacity>

                        )
                    }

                </View>


                {/* =====================================================
                    LINHA DAS ABAS
                ===================================================== */}

                <View
                    style={
                        PerfilStyle.linhaAbas
                    }
                />


                {/* =====================================================
                    LINHA VERDE ATIVA
                ===================================================== */}

                <View
                    style={[

                        PerfilStyle.linhaAtiva,

                        // =============================================
                        // MEU PERFIL + SALVOS
                        // =============================================

                        ehMeuPerfil &&
                        abaSelecionada === "salvos"

                            ? PerfilStyle.linhaAtivaSalvos

                            : null,

                        // =============================================
                        // OUTRO PERFIL
                        //
                        // CENTRALIZA A LINHA ABAIXO DE PUBLICAÇÕES
                        // =============================================

                        !ehMeuPerfil && {

                            left: "23%",
                            width: "30%",

                        },

                    ]}
                />


                {/* =====================================================
                    GRADE DE PUBLICAÇÕES
                ===================================================== */}

                <View
                    style={
                        PerfilStyle.gradePublicacoes
                    }
                >

                    {
                        publicacoesExibidas.map(
                            (publicacao) => (

                                <TouchableOpacity

                                    key={
                                        publicacao.id
                                    }

                                    style={
                                        PerfilStyle.cardPublicacao
                                    }

                                    onPress={() =>
                                        abrirPublicacao(
                                            publicacao.id
                                        )
                                    }

                                    activeOpacity={0.8}

                                >

                                    {
                                        publicacao.foto ? (

                                            <Image

                                                source={{
                                                    uri:
                                                        publicacao.foto
                                                }}

                                                style={
                                                    PerfilStyle.imagemPublicacao
                                                }

                                                resizeMode="cover"

                                            />

                                        ) : (

                                            <View
                                                style={
                                                    PerfilStyle.publicacaoSemImagem
                                                }
                                            >

                                                <Text>
                                                    Sem imagem
                                                </Text>

                                            </View>

                                        )
                                    }

                                </TouchableOpacity>

                            )
                        )
                    }

                </View>


                {/* =====================================================
                    NENHUMA PUBLICAÇÃO
                ===================================================== */}

                {
                    publicacoesExibidas.length ===
                    0 && (

                        <View
                            style={{

                                width: "100%",

                                alignItems:
                                    "center",

                                marginTop:
                                    30,

                                paddingHorizontal:
                                    20,

                            }}
                        >

                            <Text
                                style={{

                                    color:
                                        "#777",

                                    fontSize:
                                        14,

                                    textAlign:
                                        "center",

                                }}
                            >

                                {
                                    abaSelecionada ===
                                        "salvos"

                                        ? "Você ainda não salvou nenhuma publicação."

                                        : "Este usuário ainda não possui publicações."
                                }

                            </Text>

                        </View>

                    )
                }

            </ScrollView>


            {/* =====================================================
                MODAL DA FOTO DE PERFIL
            ===================================================== */}

            <Modal

                visible={
                    imagemExpandida
                }

                transparent={true}

                animationType="fade"

                onRequestClose={() =>
                    setImagemExpandida(
                        false
                    )
                }

            >

                <View
                    style={
                        PerfilStyle.modalContainer
                    }
                >

                    {/* =================================================
                        BOTÃO FECHAR
                    ================================================= */}

                    <TouchableOpacity

                        onPress={() =>
                            setImagemExpandida(
                                false
                            )
                        }

                        activeOpacity={0.7}

                        style={
                            PerfilStyle.botaoFecharModal
                        }

                    >

                        <Text
                            style={
                                PerfilStyle.textoFecharModal
                            }
                        >
                            ×
                        </Text>

                    </TouchableOpacity>


                    {/* =================================================
                        IMAGEM GRANDE
                    ================================================= */}

                    <TouchableOpacity

                        activeOpacity={1}

                        onPress={() =>
                            setImagemExpandida(
                                false
                            )
                        }

                        style={
                            PerfilStyle.areaImagemModal
                        }

                    >

                        <Image

                            source={
                                pegarImagem(
                                    usuario.foto
                                )
                            }

                            style={
                                PerfilStyle.imagemModal
                            }

                            resizeMode="contain"

                        />

                    </TouchableOpacity>

                </View>

            </Modal>


            {/* =====================================================
                FOOTER
            ===================================================== */}

            <Footer
                navigation={
                    navigation
                }
            />

        </SafeAreaView>

    );

};


export default TelaPerfil;