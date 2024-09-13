import React, { createContext, useContext, useState } from 'react';

const TopicContext = createContext();

export const TopicProvider = ({ children }) => {
    const [topic, setTopic] = useState(1);
    const [fontSize, setFontSize] = useState(16);

    let backgroundColor, fontColor, name;

    switch (topic) {
        case 0:
            backgroundColor = "#333333";
            fontColor = "#ffffff";
            name = "Mặc định";
            break;
        case 1:
            backgroundColor = "#ededed";
            fontColor = "#5e5d5b";
            name = "Giấy";
            break;
        case 2:
            backgroundColor = "#eee2ca";
            fontColor = "#342c24";
            name = "Êm dịu";
            break;
        case 3:
            backgroundColor = "#fffcf5";
            fontColor = "#161405";
            name = "Tập trung";
            break;
        default:
            backgroundColor = "#333333";
            fontColor = "#ffffff";
            name = "Mặc định";
            break;
    }

    return (
        <TopicContext.Provider value={{ topic, setTopic, backgroundColor, fontColor, fontSize, setFontSize, name }}>
            {children}
        </TopicContext.Provider>
    );
};

export const useTopic = () => useContext(TopicContext);
