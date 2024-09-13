import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { Ionicons, } from 'react-native-vector-icons';
import theme from '../styles/theme.js';

export function Register({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={{ color: theme.colors.text, fontSize: 20, fontWeight: '700' }}>Đăng ký tài khoản</Text>
            <View style={styles.viewTextInput}>
                <TextInput
                    style={styles.textinput}
                    placeholder="Tên đăng nhập"
                    placeholderTextColor={theme.colors.text}
                    keyboardType="email-address"
                />
            </View>
            <View style={styles.viewTextInput}>
                <TextInput
                    style={styles.textinput}
                    placeholder="Email"
                    placeholderTextColor={theme.colors.text}
                    keyboardType="email-address"
                />
            </View>
            <View style={[styles.viewTextInput, { flexDirection: 'row' }]}>
                <TextInput
                    style={[styles.textinput,{width: theme.dimensions.width*0.65}]}
                    placeholder="Mật khẩu"
                    placeholderTextColor={theme.colors.text}
                    keyboardType="email-address"
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
            <View style={[styles.viewTextInput, { flexDirection: 'row' }]}>
                <TextInput
                    style={[styles.textinput,{width: theme.dimensions.width*0.65}]}
                    placeholder="Nhập lại mật khẩu *"
                    placeholderTextColor={theme.colors.text}
                    keyboardType="email-address"
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
            <TouchableOpacity style={styles.buttonRegister}>
                <Text
                    style={{ fontSize: 15, fontWeight: '700', color: theme.colors.secondarytext }}
                >Đăng ký</Text>
            </TouchableOpacity>
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
    buttonRegister: {
        marginTop: 40,
        width: theme.dimensions.width * 0.9,
        height: theme.dimensions.height / 18,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.Usercolor,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
});

export default Register;