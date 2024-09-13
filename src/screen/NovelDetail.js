import React, { useRef, useEffect, useState } from 'react';
import {
  Animated,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Easing,
} from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import theme from '../styles/theme';
import { Ionicons, FontAwesome } from 'react-native-vector-icons';
import InfoNovelDetail from '../component/InfoNovelDetail';
import LoadingModal from '../component/LoadingModel.js';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { ThemedButton } from 'react-native-really-awesome-button';
import { fetchNovelById } from '../api/API.js'


const Header_Max_Height = theme.dimensions.height / 4;
const Header_Min_Height = theme.dimensions.height / 10;
const Scroll_Distance = (Header_Max_Height - Header_Min_Height) * 1.3;

const DynamicHeader = ({ value, novelImage, novelName }) => {
  const animatedHeaderHeight = value.interpolate({
    inputRange: [0, Scroll_Distance],
    outputRange: [Header_Max_Height, Header_Min_Height],
    extrapolate: 'clamp',
  });

  const animatedHeaderColor = value.interpolate({
    inputRange: [0, Scroll_Distance],
    outputRange: ['#181D31', '#678983'],
    extrapolate: 'clamp',
  });

  const animatedTranslateY = value.interpolate({
    inputRange: [0, Scroll_Distance],
    outputRange: [0, -theme.dimensions.height * 0.35 / 3],
    extrapolate: 'clamp',
  });

  const animatedScale = value.interpolate({
    inputRange: [0, Scroll_Distance],
    outputRange: [1, 0.3],
    extrapolate: 'clamp',
  });

  const opacityImageNovel = value.interpolate({
    inputRange: [0, Scroll_Distance / 2, Scroll_Distance / 1.5],
    outputRange: [1, 0.5, 0],
    extrapolate: 'clamp',
  });

  const TitelanimationX = value.interpolate({
    inputRange: [0, Scroll_Distance],
    outputRange: [0, theme.dimensions.width / 18],
    extrapolate: 'clamp',
  });

  const TitelNumberOfLine = value.interpolate({
    inputRange: [0, Scroll_Distance * 0.3, Scroll_Distance * 0.6],
    outputRange: [2, 2, 1],
    extrapolate: 'clamp',
  });

  const Titelwidth = value.interpolate({
    inputRange: [0, Scroll_Distance * 0.3, Scroll_Distance * 0.6],
    outputRange: [theme.dimensions.width, theme.dimensions.width, theme.dimensions.width * 0.8],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={[
        styles.header,
        {
          height: animatedHeaderHeight,
          backgroundColor: theme.colors.headerBackground,
        },
      ]}
    >
      <Animated.Image
        source={{ uri: `data:image/jpeg;base64,${novelImage}` }}
        style={[
          StyleSheet.absoluteFillObject, // This makes the image cover the entire header
          {
            opacity: opacityImageNovel,
          },
        ]}
        resizeMode="cover"
      />
      <Animated.View
        style={[
          styles.textContainer,
          {
            width: Titelwidth,
            transform: [{ translateX: TitelanimationX }],
          },
        ]}
      >
        <Animated.Text numberOfLines={TitelNumberOfLine} style={styles.title}>{novelName}</Animated.Text>
      </Animated.View>
    </Animated.View>
  );
};



export function NovelDetail({ navigation, route, }, { value }: any) {
  const [novelData, setNovelData] = useState(null);
  const { novelId } = route.params;
  const [loading, setLoading] = useState(true);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [refreshing, setRefreshing] = useState(false);
  const [numberOfLines, setNumberOfLines] = useState(2);
  const translateY = useRef(new Animated.Value(0)).current;
  const [idChapter, setIdChapter] = useState(null);


  const [novelName, setNovelName] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchNovelById(novelId); 
        setNovelData(data);
        setIdChapter(data.chapters[0].id)
        setNovelName(data.novel.novelName)
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching novel data:', error);
        setLoading(false);
      }
    };

    if (novelId) {
      fetchData();
    }
  }, [novelId]);

  const InfoNovelDetailScene = () => <InfoNovelDetail novelData={novelData} />;
  const DynamicHeaderScene = () => <DynamicHeader value={scrollOffsetY} novelImage={novelData.imageNovel} novelName={novelData.novel.novelName} />
  const scrollOffsetY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Hàm để tạo hiệu ứng chuyển động lên xuống
    const moveUpDown = () => {
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: -40, // Di chuyển lên trên 40 đơn vị
          duration: 800, // Thời gian di chuyển lên
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        // Hạ xuống
        Animated.timing(translateY, {
          toValue: 0,
          duration: 800, // Thời gian di chuyển xuống
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
        // Nảy lên lần 1
        Animated.timing(translateY, {
          toValue: -20, // Nảy lên 20 đơn vị
          duration: 600,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        // Hạ xuống
        Animated.timing(translateY, {
          toValue: 0,
          duration: 600,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
        // Nảy lên lần 2
        Animated.timing(translateY, {
          toValue: -8, // Nảy lên 10 đơn vị
          duration: 400,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        // Hạ xuống
        Animated.timing(translateY, {
          toValue: 0,
          duration: 400,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.delay(500),
      ]).start(() => moveUpDown()); // Lặp lại hiệu ứng
    };

    moveUpDown(); // Gọi hàm hiệu ứng
  }, [translateY]);
  return (
    loading ? (
      <View style={styles.container}>
        <LoadingModal visible={loading} />
      </View>
    ) : (
      <View style={{ backgroundColor: theme.colors.background }}>
        <DynamicHeaderScene />
        <ScrollView
          style={{ marginTop: 20 }}
          scrollEventThrottle={5}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
            {
              useNativeDriver: false,
            },
          )}
        >
          <InfoNovelDetailScene />
          <View style={{height: 150}}/>
        </ScrollView>
        <View style={[styles.fixedButtonContainer, { right: 50 }]}>
          <TouchableOpacity style={styles.fixedButton}>
            <Ionicons name='chevron-back' size={20} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
        <Animated.View style={{
          position: 'absolute',
          right: theme.dimensions.width * 0.1,
          top: theme.dimensions.height - 180,
          height: 60,
          width: 60,
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 6,
          elevation: 5,
          transform: [{ translateY }]
        }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ListView', { NovelID: novelId, novelname: novelData.novel.novelName, current_id: novelData.chapters.id })}
            style={{
              height: '100%',
              width: '100%',
              backgroundColor: theme.colors.tilteCategory2,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 20,
            }}>
            <FontAwesome
              name="th-list"
              size={30}
              color={theme.colors.text}
            />
          </TouchableOpacity>
        </Animated.View>
        <View style={{
          height: theme.dimensions.width / 8,
          width: theme.dimensions.width,
          position: 'absolute',
          right: 0,
          left: 0,
          justifyContent: 'center',
          alignItems: 'center',
          top: theme.dimensions.height - 100,
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 6,
          elevation: 5,
        }}>
          <ThemedButton
            onPress={() => navigation.navigate('ChapterViewer', { chapter: idChapter, novelname: novelName, idnovel: novelId })}
            name="rick"
            type="primary"
            backgroundColor={theme.colors.tilteCategory2}
            backgroundDarker={theme.colors.buttonLogin}
            textColor={theme.colors.text}
            width={theme.dimensions.width * 0.8}
          >
            ĐỌC TRUYỆN
          </ThemedButton>
        </View>

      </View>
    )
  );
};

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  textContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    paddingHorizontal: 10,
  },
  title: {
    color: '#ffff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  card: {
    height: 100,
    backgroundColor: '#E6DDC4',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  subtitle: {
    color: '#181D31',
    fontWeight: 'bold',
  },
  fixedButtonReading: {
    height: 45,
    width: 45,
    position: 'absolute',
    bottom: 20,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fixedButtonContainer: {
    height: 45,
    width: 45,
    position: 'absolute',
    left: 10,
    top: 30,
  },
  fixedButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 10,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
});