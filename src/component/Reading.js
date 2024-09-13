// ChildComponent.js
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ListFooterComponent, FlatList } from 'react-native';
import theme from '../styles/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useUser } from '../context/UserContext';
import { fetchReadingProgress } from '../api/API.js'
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import LoadingModal from './LoadingModel.js';

const ContinueReading = ({ navigate }) => {
    const [IndexSort, setIndexSort] = useState(0);
    const hanleSort = () => {
        setIndexSort(IndexSort == 0 ? 1 : 0)
    }
    const [dataReading, setDataReading] = useState();
    const { user } = useUser();
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                setLoading(true);
                try {
                    const data = await fetchReadingProgress(user.id);
                    setDataReading(data);
                } catch (error) {
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }, [user.id])
    );



    return (
        loading ? (
            <View style={styles.container}>
                <LoadingModal visible={loading} />
            </View>
        ) : (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', width: "90%" }}>
                    <TouchableOpacity
                        onPress={hanleSort}
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 10
                        }}
                    >
                        <Icon name='sort' size={30} color={theme.colors.text} />
                        <Text style={{ fontSize: 14, color: theme.colors.text }}>{IndexSort == 0 ? 'Mới đọc' : 'Mới cập nhật'}</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    data={dataReading}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('ChapterViewer', { chapter: item.idchapter, novelname: item.novelName, idnovel: item.idnovel })}
                            style={styles.touchable}>
                            <Image source={{ uri: `data:image/jpeg;base64,${item.imageNovel}` }} style={styles.image} />
                            <View style={{ marginLeft: 10 }}>
                                <Text numberOfLines={2} style={styles.name}>{item.novelName}</Text>
                                <View style={{ flexDirection: 'row', padding: 10, justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Text style={styles.chapter}>Chương {item.number + 1}/{item.totalNumber}</Text>
                                    <TouchableOpacity>
                                        <Icon name='delete' size={30} color={theme.colors.secondarytext} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                    inverted
                />
            </View>
        )
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    touchable: {
        flexDirection: 'row',
        width: '95%',
        height: theme.dimensions.height / 6,
        margin: 10,
        borderRadius: 20,

    },
    image: {
        width: '25%',
        height: '100%',
        borderRadius: 5,
    },
    name: {
        width: theme.dimensions.width / 1.8,
        fontSize: 20,
        color: theme.colors.text,
        margin: 10,
        lineHeight: 25,
        fontWeight: '900'
    },
    chapter: {
        backgroundColor: theme.colors.buttonbackgroud,
        color: theme.colors.buttonIcon,
        fontSize: 14,
        padding: 10,
        borderRadius: 20,
    }
});

export default ContinueReading;