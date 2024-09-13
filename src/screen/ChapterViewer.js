import React, { useState, useRef, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, TouchableWithoutFeedback, TouchableOpacity, ScrollView } from 'react-native';
import theme from '../styles/theme.js';
import { Ionicons, MaterialCommunityIcons, AntDesign } from 'react-native-vector-icons';
import Modal from 'react-native-modal';
import SettingChapterviewer from '../component/SettingChapterviewer.js';
import { PanGestureHandler } from 'react-native-gesture-handler';
import LoadingModal from '../component/LoadingModel.js';
import { fetchChapterById, updateReadingProgress } from '../api/API.js'
import { useTopic } from '../context/TopicContext';
import { useFocusEffect } from '@react-navigation/native';
import { useUser } from '../context/UserContext';


export function ChapterViewer({ navigation, route, }) {
    const [isVisible, setIsVisible] = useState(false);
    const animationValue = useRef(new Animated.Value(300)).current;
    const { chapter, novelname, idnovel } = route.params;
    const [isBottomModalVisible, setBottomModalVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [chapterData, setChapterData] = useState(null);
    const scrollViewRef = useRef(null);
    const { backgroundColor, fontColor, fontSize, name } = useTopic();
    const { user } = useUser();
    const [position, setPosition] = useState(0);
    const positionRef = useRef(position);

    const handleScroll = useCallback((event) => {
        const newPosition = event.nativeEvent.contentOffset.y;
        setPosition(newPosition);
        positionRef.current = newPosition;
    }, []);

    useFocusEffect(
        useCallback(() => {
            return () => {
                const currentPosition = positionRef.current;
                updateReadingProgress(user.id, idnovel, chapter, currentPosition);
            };
        }, [user.id, idnovel, chapter])
    );

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await fetchChapterById(chapter);
                setChapterData(data)
                setTimeout(() => {
                    setLoading(false);

                }, 1000);
                if (scrollViewRef.current) {
                    scrollViewRef.current.scrollTo({ y: 0, animated: true });
                    setIsVisible(false)
                }
            } catch (error) {
                console.error('Error fetching novel data:', error);
                setLoading(false);
            }
        };

        if (chapter) {
            fetchData();
        }
    }, [chapter]);

    const toggleBottomModal = useCallback(() => {
        setBottomModalVisible(prevState => !prevState);
    }, []);

    const showAnimation = useCallback(() => {
        setIsVisible(true);
        Animated.sequence([
            Animated.timing(animationValue, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(animationValue, {
                toValue: 20,
                duration: 50,
                useNativeDriver: true,
            }),
        ]).start();
    }, [animationValue]);

    const hideAnimation = useCallback(() => {
        Animated.timing(animationValue, {
            toValue: 300,
            duration: 500,
            useNativeDriver: true,
        }).start(() => setIsVisible(false));
    }, [animationValue]);

    const handlePress = useCallback(() => {
        if (isVisible) {
            hideAnimation();
        } else {
            showAnimation();
        }
    }, [isVisible, hideAnimation, showAnimation]);

    const handleGesture = useCallback((event) => {
        if (event.nativeEvent.translationY > 100) {
            toggleBottomModal();
        }
    }, [toggleBottomModal]);



    console.log("id: ",user.id)
    return (
        chapterData == null ? (
            <View style={styles.container}>
                <LoadingModal visible={loading} />
            </View>
        ) : (
            <View style={[styles.container, { backgroundColor: backgroundColor }]}>
                {isVisible && (
                    <Animated.View
                        style={{
                            position: 'absolute',
                            left: 20,
                            top: 40,
                            backgroundColor: hexToRGBA(theme.colors.secondarytext, 1),
                            padding: 10,
                            borderRadius: 40,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.7,
                            shadowRadius: 10,
                            elevation: 5,
                        }}
                    >
                        <TouchableOpacity >
                            <AntDesign name="left" size={30} color={theme.colors.text} />
                        </TouchableOpacity>
                    </Animated.View>
                )}
                <ScrollView
                    ref={scrollViewRef}
                    showsVerticalScrollIndicator={false}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                >
                    <TouchableWithoutFeedback style={{ width: '100%' }} onPress={handlePress} >
                        <View style={[styles.touchableArea]}>
                            <Text style={{ fontSize: 24, fontWeight: '900', color: fontColor, marginTop: 60, marginBottom: 40 }}>Chương {chapterData.number}: {chapterData.title}</Text>
                            <Text style={{ fontSize: fontSize, color: fontColor, textAlign: 'justify' }}>{chapterData.content}</Text>
                            <View style={{ height: 50 }} />
                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>

                {isVisible && (
                    <Animated.View
                        style={[
                            styles.sheetContent,
                            { transform: [{ translateY: animationValue }] },
                        ]}
                    >
                        <View style={{ height: '90%', width: '90%', backgroundColor: hexToRGBA(theme.colors.optionchapviewer, 0.98), borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Text numberOfLines={1} style={{ fontSize: 16, color: theme.colors.text, marginBottom: 20, maxWidth: '90%' }}>{novelname}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('ChapterViewer', { chapter: chapterData.previousChapter.id, novelname: novelname, idnovel: idnovel })}
                                    style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }}>
                                    <AntDesign name="left" size={30} color={theme.colors.text} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('Comment', { novelId: idnovel, chapterId: chapter})}
                                    style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }}>
                                    <MaterialCommunityIcons name="comment-text-outline" size={30} color={theme.colors.text} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('ListView', { NovelID: idnovel, novelname: novelname, current_id: chapter })}
                                    style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }}>
                                    <Ionicons name="list-sharp" size={30} color={theme.colors.text} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={toggleBottomModal}
                                    style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }}>
                                    <Ionicons name="settings-sharp" size={30} color={theme.colors.text} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('ChapterViewer', { chapter: chapterData.nextChapter.id, novelname: novelname, idnovel: idnovel })}
                                    style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }}>
                                    <AntDesign name="right" size={30} color={theme.colors.text} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Animated.View>
                )}
                <Modal
                    isVisible={isBottomModalVisible}
                    style={styles.modalBottom}
                    onBackdropPress={toggleBottomModal}
                    animationIn="slideInUp"
                    animationInTiming={200}
                    onSwipeComplete={toggleBottomModal}
                    swipeDirection="down"
                    animationOut="slideOutDown"
                    animationOutTiming={200}
                    backdropOpacity={0.5}
                >
                    <PanGestureHandler onGestureEvent={handleGesture}>
                        <View style={styles.sheetContentBottom}>
                            <SettingChapterviewer />
                        </View>
                    </PanGestureHandler>
                </Modal>
            </View>
        )
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    touchableArea: {
        width: '95%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        marginLeft: 10,
    },
    sheetContent: {
        position: 'absolute',
        bottom: 60,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        height: theme.dimensions.height / 8,
    },
    closeButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: 'gray',
        borderRadius: 5,
    },
    modalTop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        margin: 0,
        justifyContent: 'flex-start',
    },
    sheetContentTop: {
        backgroundColor: 'white',
        padding: 20,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        minHeight: 200,
        maxHeight: 300,
    },
    modalBottom: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        margin: 0,
        justifyContent: 'flex-end',
    },
    sheetContentBottom: {
        backgroundColor: theme.colors.backgroundSetting,
        height: theme.dimensions.height * 0.6,
    },
});

const hexToRGBA = (hex, alpha) => {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export default ChapterViewer;
