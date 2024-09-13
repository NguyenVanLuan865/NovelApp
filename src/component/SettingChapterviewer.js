import React, { useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import theme from '../styles/theme';
import Slider from '@react-native-community/slider';
import { Dropdown } from 'react-native-element-dropdown';
import { useTopic } from '../context/TopicContext';

const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
];

const SettingChapterviewer = () => {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const chapterData = Object.values(theme.Chapterviewe);

    const { topic, setTopic, fontSize, setFontSize , name} = useTopic();

    const handleTopic = (value) => {
        setTopic(value);
        console.log(value)
    };

    const renderLabel = () => {
        if (value || isFocus) {
            return (
                <Text style={[styles.label, isFocus && { color: 'blue' }]}>
                    Dropdown label
                </Text>
            );
        }
        return null;
    };

    return (
        <View style={styles.container}>
            <Text style={{ color: theme.colors.text, fontSize: 20, fontWeight: '800', marginTop: 20 }}>⚙️ Tùy chỉnh</Text>
            <View style={styles.option}>
                <Text style={{ left: 20, color: theme.colors.text, fontSize: 18, fontWeight: '800', marginTop: 10 }}>Cỡ chữ</Text>
                <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', }}>
                    <Slider
                        style={{ width: '90%', height: 40 }}
                        minimumValue={16}
                        maximumValue={30}
                        minimumTrackTintColor={theme.colors.buttonIcon}
                        maximumTrackTintColor={theme.colors.secondarytext}
                        thumbTintColor={theme.colors.buttonIcon}
                        step={1}
                        value={fontSize} 
                        onValueChange={(value) => setFontSize(value)} 
                    />
                </View>
            </View>
            <View style={[styles.option, { flexDirection: 'row', alignItems: 'center' }]}>
                <Text style={{ left: 20, color: theme.colors.text, fontSize: 18, fontWeight: '800' }}>Font chữ</Text>
                <Dropdown
                    style={[styles.dropdown, isFocus]}
                    activeColor={theme.colors.background}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    data={data}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Select item' : '...'}
                    value={value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setValue(item.value);
                        setIsFocus(false);
                    }}
                    dropdownStyle={styles.dropdownList}
                    itemContainerStyle={styles.dropdownList}
                    containerStyle={{ borderColor: 'transparent', borderWidth: 0 }}
                    maxHeight={500}
                    autoScroll={true}
                    dropdownPosition='auto'
                />
            </View>
            <View style={[styles.option, { height: theme.dimensions.height / 4 }]}>
                <Text style={{ left: 20, color: theme.colors.text, fontSize: 18, fontWeight: '800', marginTop: 20 }}>Chủ đề</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                    {chapterData.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => handleTopic(index)}
                            style={{
                                backgroundColor: item.background,
                                height: theme.dimensions.width / 5.5,
                                width: theme.dimensions.width / 5.5,
                                margin: 5,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 10,
                                borderWidth: index === topic ? 2 : 0,
                                borderColor: theme.colors.buttonIcon 
                            }}
                        >
                            <Text style={{ color: item.fontcolor, fontSize: 25, fontWeight: '900' }}>aA</Text>
                            <Text style={[styles.text, { color: item.fontcolor }]}>{item.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.backgroundSetting,
        alignItems: 'center',
    },
    option: {
        width: '90%',
        height: theme.dimensions.height / 10,
        backgroundColor: theme.colors.optionSetting,
        borderRadius: 10,
        marginTop: 20
    },
    dropdown: {
        height: '60%',
        width: '50%',
        borderColor: 'gray',
        borderBottomWidth: 0.5,
        paddingHorizontal: 8,
        left: theme.dimensions.width / 5
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    selectedTextStyle: {
        fontSize: 16,
        color: theme.colors.text,
        fontWeight: '600',
    },
    dropdownList: {
        backgroundColor: theme.colors.background,
    },
});

export default SettingChapterviewer;
