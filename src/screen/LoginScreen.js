import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { Ionicons, } from 'react-native-vector-icons';
import theme from '../styles/theme.js';
import { loginUser } from '../api/API.js'; // Đường dẫn đến file api.js
import LoadingModal from '../component/LoadingModel.js';
import { useUser } from '../context/UserContext';

export function LoginScreen({ navigation }) {
    const [isFocusedEmail, setIsFocusedEmail] = useState(false);
    const [isFocusedPass, setIsFocusedPass] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const { user, setUser} = useUser();

    const handleTask = async () => {
        setLoading(true);
        setMessage('');
    
        try {
            const response = await loginUser(email, password);

            setUser(response.user);
            console.log(response)
            setMessage('Đăng nhập thành công');
            navigation.navigate('Main');
        } catch (error) {
            console.log(error);
            setMessage('Vui lòng đăng nhập lại! ' + error.message);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    };

    return (
        <View style={styles.container}>
            <View style={{
                height: theme.dimensions.width / 3,
                width: theme.dimensions.width / 3,
                borderRadius: 20,
                overflow: 'hidden',
                marginBottom: 40,
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
            }}>
                <Image
                    source={{ uri: "https://play-lh.googleusercontent.com/QFJfpZUfeYZ3sSY7Jq2ni7JFNtXYLgmrMcj2H5IfA6yuS17Tut5706q0_QMpn3Ixzg=w240-h480-rw" }}
                    style={{
                        height: "100%",
                        width: "100%",
                        resizeMode: 'cover'
                    }}
                />
            </View>

            <View style={[styles.viewTextInput, isFocusedEmail && styles.focusedBorder]}>
                <View style={[styles.tilte, { opacity: isFocusedEmail ? 1 : 0, width: 50 }]}>
                    <Text style={{ color: "red", }}> Email </Text>
                </View>
                <TextInput
                    style={styles.textinput}
                    placeholder={isFocusedEmail ? '' : 'Email'}
                    placeholderTextColor="#999"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    onFocus={() => setIsFocusedEmail(true)}
                    onBlur={() => setIsFocusedEmail(false)}
                />
            </View>

            <View style={[styles.viewTextInput, isFocusedPass && styles.focusedBorder, { flexDirection: 'row', }]}>
                <View style={[styles.tilte, { opacity: isFocusedPass ? 1 : 0, width: 80 }]}>
                    <Text style={{ color: "red", }}> Mật Khẩu </Text>
                </View>
                <TextInput
                    style={[styles.textinput, { width: theme.dimensions.width * 0.65 }]}
                    placeholder={isFocusedPass ? '' : 'Mật khẩu'}
                    placeholderTextColor="#999"
                    value={password}
                    onChangeText={setPassword}
                    keyboardType="email-address"
                    onFocus={() => setIsFocusedPass(true)}
                    onBlur={() => setIsFocusedPass(false)}
                />

                <TouchableOpacity
                    style={{
                        height: theme.dimensions.width * 0.15,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: theme.dimensions.width * 0.06,
                    }}
                >
                    <Ionicons
                        name="eye"
                        color={theme.colors.text}
                        size={24}
                    />

                </TouchableOpacity>

            </View>

            <View style={{ width: theme.dimensions.width, marginTop: 5 }}>
                <TouchableOpacity style={{ marginLeft: theme.dimensions.width * 0.1 / 2 }}>
                    <Text
                        style={{ color: theme.colors.thirdtext, fontWeight: 'bold', fontSize: 15 }}
                    >Quên mật khẩu</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={styles.buttonLogin}
                onPress={handleTask}
            >

                <Text
                    style={{ fontSize: 15, fontWeight: '700', color: theme.colors.text }}
                >Đăng nhập</Text>

            </TouchableOpacity>
            <LoadingModal visible={loading} message={message} />
            <View style={{ width: theme.dimensions.width * 0.9, height: theme.dimensions.width / 5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ backgroundColor: theme.colors.text, flex: 2, height: 1 }} />
                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                    <Text style={{ color: theme.colors.text, fontSize: 14 }}> hoặc </Text>
                </View>
                <View style={{ backgroundColor: theme.colors.text, flex: 2, height: 1 }} />
            </View>
            <View style={styles.viewicon}>
                <TouchableOpacity style={styles.iconLoginFB_GG}>
                    <Image
                        source={require('../icon/icon_facebook.png')}
                        style={{ resizeMode: 'cover' }}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconLoginFB_GG}>
                    <Image
                        source={require('../icon/icon_google.png')}
                        style={{ resizeMode: 'cover', }}
                    />
                </TouchableOpacity>
            </View>
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                <Text style={{ color: theme.colors.text, fontWeight: '600', fontSize: 15 }}>Bạn chưa có tài khoản? </Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Register')}
                    style={{}}>
                    <Text style={{ color: theme.colors.thirdtext, fontWeight: 'bold', fontSize: 15 }}>
                        Đăng ký ngay
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        alignItems: 'center',
        justifyContent: 'center'
    },
    viewTextInput: {
        width: theme.dimensions.width * 0.9,
        borderWidth: 1,
        borderColor: theme.colors.text,
        borderRadius: theme.dimensions.width * 0.18,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    textinput: {
        width: theme.dimensions.width * 0.7,
        height: theme.dimensions.width * 0.15,
        fontSize: 20,
        color: theme.colors.text,
    },
    buttonLogin: {
        width: theme.dimensions.width * 0.9,
        height: theme.dimensions.height / 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.buttonLogin,
        borderRadius: 10,
        marginTop: 40,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    viewicon: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    iconLoginFB_GG: {
        backgroundColor: theme.colors.text,
        borderRadius: 100,
        marginRight: 10,
        overflow: 'hidden',
    },
    focusedBorder: {
        borderColor: 'red',
    },
    tilte: {
        backgroundColor: theme.colors.background,
        position: "absolute",
        left: 20,
        right: 0,
        top: -10,
        borderColor: 'red',
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',

    }
});

export default LoginScreen;