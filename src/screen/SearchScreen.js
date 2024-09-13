import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Image } from 'react-native';
import { Ionicons, Feather } from 'react-native-vector-icons';
import axios from 'axios';
import theme from '../styles/theme';
import LoadingModal from '../component/LoadingModel';
import { searchNovels } from '../api/API.js'


function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

export function SearchScreen({ navigation }) {
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const debouncedQuery = useDebounce(query, 500);

    useEffect(() => {
        if (debouncedQuery) {
            handleSearch(debouncedQuery);
        } else {
            setSearchResults([]);
        }
    }, [debouncedQuery]);

    const handleSearch = async (searchQuery) => {
        setLoading(true);
        setError(null);

        try {
            const novels = await searchNovels(searchQuery);
            setSearchResults(novels);
        } catch (err) {
            setError('Không có kết quả tìm kiếm.');
        } finally {
            setLoading(false);
        }
    };

    const highlightText = (text, highlight) => {
        if (typeof text !== 'string' || typeof highlight !== 'string') {
            return <Text>{text}</Text>;
        }

        const regex = new RegExp(`(${highlight})`, 'gi');
        const parts = text.split(regex);

        return (
            <Text>
                {parts.map((part, index) =>
                    regex.test(part) ? (
                        <Text key={index} style={{ color: 'red' }}>
                            {part}
                        </Text>
                    ) : (
                        <Text key={index}>{part}</Text>
                    )
                )}
            </Text>
        );
    };


    const handleCriss = () =>{
        setQuery(null) ;
        setSearchResults([]);
    }

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                <TouchableOpacity
                    style={[styles.searchIcon, { marginTop: 20, flex: 1 }]}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons
                        name="arrow-back"
                        color={theme.colors.text}
                        size={28}
                    />
                </TouchableOpacity>
                <View style={[styles.viewTextInput, { flexDirection: 'row', width: theme.dimensions.width * 0.7 }]}>
                    <TouchableOpacity
                        style={{}}
                        onPress={() => handleSearch(query)}
                    >
                        <Ionicons
                            name="search"
                            color={"#999"}
                            size={24}

                        />
                    </TouchableOpacity>
                    <TextInput
                        style={[styles.textinput,]}
                        placeholder={'Nhập từ khóa'}
                        placeholderTextColor="#999"
                        value={query}
                        onChangeText={setQuery}
                    />

                </View>
                {searchResults.length != 0 ? (
                    <TouchableOpacity
                        style={[styles.searchIcon, { marginTop: 20, marginRight: 10 }]}
                        onPress={handleCriss}
                    >
                        <Feather
                            name="x-circle"
                            color={theme.colors.secondary}
                            size={28}
                        />
                    </TouchableOpacity>
                ) : (
                    <View
                        style={[styles.searchIcon, { marginTop: 20, marginRight: 10 }]}/>
                )}

            </View>

            {error && <Text style={[styles.errorText, { color: theme.colors.buttonIcon }]}>{error}</Text>}

            {searchResults.length == 0 ? (
                <View style={styles.container}>
                    <LoadingModal visible={loading} />
                </View>
            )
                : (
                    <View>
                        <View style={{ flexDirection: 'row', margin: 10 }}>
                            <Text style={{ color: theme.colors.secondarytext }}>Kết quả tìm kiếm  </Text>
                            <Text style={{ fontWeight: '900', color: theme.colors.buttonIcon }}>"{query}"</Text>
                        </View>
                        <FlatList
                            data={searchResults}
                            keyExtractor={(item) => item.novelId.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.resultItem}
                                    onPress={() => navigation.navigate('NovelDetail', { novelId: item.novelId })}
                                >
                                    <View style={[styles.image, { borderRadius: 5, overflow: 'hidden', }]}>
                                        <Image
                                            source={{ uri: `data:image/jpeg;base64,${item.imageNovel}` }}
                                            style={styles.image}
                                        />
                                    </View>
                                    <View style={{ marginLeft: 10, justifyContent: 'center', width: theme.dimensions.width * 0.6 }}>
                                        <Text style={styles.resultText}>
                                            {highlightText(item.novelName || '', query)}
                                        </Text>
                                        <Text style={styles.authorText}>
                                            {highlightText(item.authorName || '', query)}
                                        </Text>
                                    </View>

                                </TouchableOpacity>
                            )}
                        />
                    </View>
                )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        alignItems: 'center',
    },
    viewTextInput: {
        marginRight: 20,
        backgroundColor: theme.colors.Usercolor,
        borderRadius: theme.dimensions.width * 0.18,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    textinput: {
        width: theme.dimensions.width * 0.5,
        height: theme.dimensions.width * 0.15,
        fontSize: 16,
        color: theme.colors.text,
        marginLeft: 10
    },
    searchIcon: {
        width: theme.dimensions.width * 0.1,
        height: theme.dimensions.width * 0.15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        marginTop: 20,
    },
    resultItem: {
        padding: 5,
        flexDirection: 'row',
        width: theme.dimensions.width * 0.9,
    },
    resultText: {
        fontSize: 18,
        color: theme.colors.text,
        fontWeight: '900'
    },
    authorText: {
        fontSize: 14,
        color: theme.colors.secondarytext,
    },
    image: {
        width: theme.dimensions.width / 5,
        height: theme.dimensions.height / 8,
        resizeMode: 'cover',
    },
});

export default SearchScreen;
