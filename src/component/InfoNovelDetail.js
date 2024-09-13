import React, { useState, useRef, useEffect } from "react";
import { Alert, Animated, TouchableOpacity, Easing, View, Text, FlatList, StyleSheet, ScrollView, Image } from "react-native";
import theme from '../styles/theme';
import { AntDesign, MaterialIcons, FontAwesome, Entypo, SimpleLineIcons } from 'react-native-vector-icons';
import ComponentCategory from "./_ComponentCategory";
import { useNavigation } from '@react-navigation/native';
import { transformGenres, transformProgress } from "../utils/transformData.js"
const comments = [
  {
    id: '1',
    avata: 'https://chiemtaimobile.vn/images/companies/1/%E1%BA%A2nh%20Blog/avatar-facebook-dep/Anh-avatar-hoat-hinh-de-thuong-xinh-xan.jpg?1704788263223',
    name: 'Nguyễn Văn A',
    comment: 'Đây là một bình luận mẫu để minh họa cách định nghĩa dữ liệu trong JavaScript.',
    chapter: '21',
    time: '24/07/2024',
    likes: 120,
    replies: 5,
  },
  {
    id: '2',
    avata: 'https://chiemtaimobile.vn/images/companies/1/%E1%BA%A2nh%20Blog/avatar-facebook-dep/Anh-avatar-hoat-hinh-de-thuong-xinh-xan.jpg?1704788263223',
    name: 'Trần Thị B',
    comment: 'Bình luận thứ hai, có thể chứa các thông tin khác nhau và số lượng khác.',
    chapter: '21',
    time: '23/07/2024',
    likes: 45,
    replies: 2,
  },
  {
    id: '3',
    avata: 'https://chiemtaimobile.vn/images/companies/1/%E1%BA%A2nh%20Blog/avatar-facebook-dep/Anh-avatar-hoat-hinh-de-thuong-xinh-xan.jpg?1704788263223',
    name: 'Lê Văn C',
    comment: 'Bình luận thứ ba có nội dung tương tự như bình luận đầu tiên nhưng với thông tin khác.',
    chapter: '21',
    time: '22/07/2024',
    likes: 75,
    replies: 8,
  },
  {
    id: '4',
    avata: 'https://chiemtaimobile.vn/images/companies/1/%E1%BA%A2nh%20Blog/avatar-facebook-dep/Anh-avatar-hoat-hinh-de-thuong-xinh-xan.jpg?1704788263223',
    name: 'Phạm Thị D',
    comment: 'Bình luận thứ tư với nội dung và số lượng like/reply khác nhau.',
    chapter: '21',
    time: '21/07/2024',
    likes: 60,
    replies: 3,
  },
];

const ExpandableText = ({ text }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 16, color: theme.colors.secondarytext, fontWeight: '400', lineHeight: 25, textAlign: 'justify', width: '95%' }} numberOfLines={expanded ? undefined : 3}>
        {text}
      </Text>
      <TouchableOpacity onPress={() => setExpanded(!expanded)}>
        <Text style={{ fontSize: 16, color: theme.colors.thirdtext, fontWeight: '6 00' }}>
          {expanded ? 'Rút gọn' : 'Xem thêm'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const renderChapter = ({ item }) => {
  return (
    <View style={styles.chapterItemContainer}>
      <TouchableOpacity style={styles.chapterItemTouchable}>
        <Text numberOfLines={1} style={styles.chapterNumber}>Chương {item.chapterNumber}</Text>
        <Text numberOfLines={1} style={styles.chapterName}>
          {item.chapterTitle}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const renderComment = ({ item }) => {
  return (
    <TouchableOpacity style={{ height: theme.dimensions.height / 4, width: theme.dimensions.width * 0.8, borderRadius: 20, backgroundColor: theme.colors.forth, margin: 20, marginRight: -10, borderWidth: 1.5, borderColor: hexToRGBA(theme.colors.text, 0.3), padding: 20, }}>
      <View style={{ alignItems: 'center', flexDirection: 'row' }}>
        <Image
          source={{ uri: item.avata }}
          style={{ height: 40, width: 40, borderRadius: 20 }}
        />
        <Text style={{ marginLeft: 10, fontSize: 16, color: theme.colors.text, fontWeight: '400' }}>{item.name}</Text>
      </View>
      <Text numberOfLines={2} style={{ width: '90%', marginTop: 10, color: theme.colors.text }}>{item.comment}</Text>
      <Text numberOfLines={2} style={{ width: '90%', marginTop: 10, color: theme.colors.secondarytext }}>Chương {item.chapter}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 35 }}>
        <Text style={{ color: theme.colors.secondarytext, width: '60%' }}>{item.time}</Text>
        <Entypo name="dots-three-vertical" size={10} color={theme.colors.secondarytext} />
        <AntDesign name="like2" size={15} color={theme.colors.secondarytext} marginLeft={10} />
        <Text style={{ color: theme.colors.secondarytext, marginLeft: 5 }}>{item.likes}</Text>
        <FontAwesome name="comment-o" size={15} color={theme.colors.secondarytext} marginLeft={20} />
        <Text style={{ color: theme.colors.secondarytext, marginLeft: 5 }}>{item.replies}</Text>
      </View>
    </TouchableOpacity>
  )
}


const InfoNovelDetail = ({ novelData }) => {
  const translateY = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  if (!novelData) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }
  
  const transformedGenres = transformGenres(novelData.genres);
  const transformedProcess = transformProgress(novelData.progress);
  
  useEffect(() => {
    // Hàm để tạo hiệu ứng chuyển động lên xuống
    const moveUpDown = () => {
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: -40, 
          duration: 800, 
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        // Hạ xuống
        Animated.timing(translateY, {
          toValue: 0,
          duration: 800, 
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
        // Nảy lên lần 1
        Animated.timing(translateY, {
          toValue: -20, 
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
          toValue: -8, 
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
      ]).start(() => moveUpDown()); 
    };

    moveUpDown();
  }, [translateY]);
  return (
    <View>
      <View style={{ width: theme.dimensions.width, backgroundColor: theme.colors.background, }}>
        <View style={{ flexDirection: 'row', height: theme.dimensions.height / 12, justifyContent: 'space-evenly', alignItems: 'center' }}>
          <TouchableOpacity style={styles.touchable}>
            <View style={styles.icon}>
              <AntDesign name='eyeo' size={20} color={theme.colors.secondarytext} />
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: theme.colors.secondarytext, fontSize: 14, fontWeight: '700' }}>Đã đọc</Text>
              <Text style={{ color: theme.colors.text, fontSize: 16, fontWeight: '800', marginTop: 2 }}>21K</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchable}>
            <View style={styles.icon}>
              <AntDesign name='like2' size={20} color={theme.colors.secondarytext} />
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: theme.colors.secondarytext, fontSize: 14, fontWeight: '700' }}>Đánh giá</Text>
              <Text style={{ color: theme.colors.text, fontSize: 16, fontWeight: '800', marginTop: 2 }}>⭐{novelData.rating}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity 
          style={styles.touchable}>
            <View style={styles.icon}>
              <AntDesign name='profile' size={20} color={theme.colors.secondarytext} />
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: theme.colors.secondarytext, fontSize: 14, fontWeight: '700' }}>Chương</Text>
              <Text style={{ color: theme.colors.text, fontSize: 16, fontWeight: '800', marginTop: 2 }}>{novelData.totalChapters}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ width: '100%', alignItems: 'center', }}>
          <View style={{ height: 30, width: '80%', borderBottomWidth: 0.25, borderColor: theme.colors.secondarytext }}></View>
        </View>
        <TouchableOpacity style={{ flexDirection: 'row', height: theme.dimensions.height / 15, alignItems: 'center', marginLeft: theme.dimensions.width / 18 }}>
          <MaterialIcons name="person-outline" size={35} color={theme.colors.InfordetailIcon} />
          <Text numberOfLines={1} style={{ fontSize: 16, fontWeight: 'bold', color: theme.colors.text, paddingLeft: 20 }}>{novelData.author.authorName}</Text>
        </TouchableOpacity>
        <View style={{ width: '100%', alignItems: 'center', }}>
          <View style={{ height: 10, width: '80%', borderBottomWidth: 0.25, borderColor: theme.colors.secondarytext }}></View>
        </View>
        <View style={{ height: theme.dimensions.height / 12, marginLeft: theme.dimensions.width / 18, marginTop: 20 }}>
          <Text style={{ fontSize: 16, color: theme.colors.text, fontWeight: '900',}}>Thể loại</Text>
          <ScrollView
          showsHorizontalScrollIndicator={false}
            horizontal={true}
            style={{ flexDirection: 'row', }}>
            <TouchableOpacity>
              <Text style={[styles.category, { backgroundColor: theme.colors.buttonCategory1, color: theme.colors.tilteCategory1 }]}>{transformedProcess}</Text>
            </TouchableOpacity>
            {transformedGenres.map(genre => (
                    <TouchableOpacity>
                    <Text style={[styles.category, { backgroundColor: theme.colors.buttonLogout, color: theme.colors.tilteCategory2 }]}>{genre.title}</Text>
                  </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View style={{ width: '100%', alignItems: 'center', }}>
          <View style={{ height: 30, width: '80%', borderBottomWidth: 0.25, borderColor: theme.colors.secondarytext }}></View>
        </View>
        <View style={{ marginLeft: theme.dimensions.width / 18, marginTop: 20 }}>
          <Text style={{ fontSize: 16, color: theme.colors.text, fontWeight: '900', }}>Nội dung</Text>
          <ExpandableText text={novelData.description} />
        </View>
        <View style={{ width: '100%', alignItems: 'center', }}>
          <View style={{ height: 30, width: '80%', borderBottomWidth: 0.25, borderColor: theme.colors.secondarytext }}></View>
        </View>
        <View style={{ width: '100%', alignItems: 'center', }}>
          <View style={{ height: 30, width: '80%', borderBottomWidth: 0.25, borderColor: theme.colors.secondarytext }}></View>
        </View>
        <View>
          <Text style={{ fontSize: 16, color: theme.colors.text, fontWeight: '900', marginLeft: theme.dimensions.width / 18, }}>Bình luận</Text>
          <FlatList
            data={comments}
            renderItem={renderComment}
            keyExtractor={(item) => item.id}
            horizontal
          />
        </View>
        <View style={{ width: theme.dimensions.width, }}>
          <ComponentCategory data1={"Cùng tác giả"} data2={novelData.author.novels}/>
        </View>
        <View style={{ width: '100%', alignItems: 'center', }}>
          <View style={{ height: 50, width: '80%', borderBottomWidth: 0.25, borderColor: theme.colors.secondarytext }}></View>
        </View>
      </View>
    </View>

  )
}
const hexToRGBA = (hex, alpha) => {
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};


const styles = StyleSheet.create({
  scene: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchable: {
    width: theme.dimensions.width / 3.5,
    flexDirection: 'row',
    height: theme.dimensions.height / 18,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  icon: {
    height: theme.dimensions.height / 20,
    width: theme.dimensions.height / 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: hexToRGBA('#656565', 0.4),
    borderRadius: theme.dimensions.height / 20
  },
  category: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
    borderRadius: 10,
  },
  chapterItemContainer: {
    height: theme.dimensions.height / 16,
    borderBottomWidth: 0.25,
    borderColor: theme.colors.secondaryText,
    justifyContent: 'center',
    alignItems: 'center',
    width: theme.dimensions.width,
  },
  chapterItemTouchable: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chapterName: {
    fontSize: 15,
    color: theme.colors.text,
    width: '55%',
  },
  chapterNumber: {
    fontSize: 15,
    color: theme.colors.text,
    width: '25%',
  },
});
export default InfoNovelDetail;