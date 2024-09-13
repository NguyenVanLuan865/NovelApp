import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Animated } from 'react-native';
import theme from '../styles/theme.js';
import { Ionicons, MaterialCommunityIcons, AntDesign } from 'react-native-vector-icons';
import Modal from 'react-native-modal';
import SettingChapterviewer from '../component/SettingChapterviewer.js';
import { PanGestureHandler } from 'react-native-gesture-handler';
import LoadingModal from '../component/LoadingModel.js';
import { fetchChaptersByNovelId } from '../api/API.js'


export function ListChapter({ navigation, route }) {
    const { NovelID, novelname, current_id } = route.params;
    const [loading, setLoading] = useState(true);
    const [listChapter, setListChapter] = useState(null);

    const renderChapter = ({ item }) => {
        return (
            <View style={styles.chapterItemContainer}>
                <View style={{ backgroundColor: theme.colors.optionchapviewer, height: 1, width: "100%" }} />
                <TouchableOpacity
                    onPress={() => navigation.navigate('ChapterViewer', { chapter: item.id, novelname: novelname, idnovel: NovelID })}

                    style={styles.chapterItemTouchable}>
                    <Text
                        numberOfLines={1}
                        style={{
                            width: '80%',
                            color: current_id == item.id ? theme.colors.buttonLogin : theme.colors.text,
                            fontSize: 18,

                        }}>
                        Chương {item.chapterNumber}: {item.chapterTitle}
                    </Text>
                    <Text style={{
                        width: '20%',
                        fontSize: 12,
                        color: current_id == item.id ? theme.colors.buttonLogin : theme.colors.secondarytext,
                    }}>
                        {item.updatedAt}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await fetchChaptersByNovelId(NovelID);
                setListChapter(data)
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            } catch (error) {
                console.error('Error fetching novel data:', error);
                setLoading(false);
            }
        };

        if (NovelID) {
            fetchData();
        }
    }, [NovelID]);

    return (
        loading ? (
            <View style={styles.container}>
                <LoadingModal visible={loading} />
            </View>
        ) : (
            <View style={{ backgroundColor: theme.colors.background, flex: 1, alignItems: 'center' }}>
                <Text style={{ marginTop: 40, fontSize: 20, fontWeight: 'bold', padding: 20, color: theme.colors.text }}>Danh Sách Chương</Text>
                <FlatList
                    data={listChapter.chapters}
                    renderItem={renderChapter}
                    keyExtractor={(item) => item.id}
                />
            </View>
        )
    );
}

const styles = StyleSheet.create({
    chapterItemContainer: {
        paddingLeft: 10,
        paddingRight: 10,
    },
    chapterItemTouchable: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10
    },
    chapterNumber: {
        fontWeight: 'bold',
        fontSize: 16,
        color: theme.colors.text,
    },
    chapterName: {
        fontSize: 16,
        color: theme.colors.text,
    },
});

export default ListChapter;
