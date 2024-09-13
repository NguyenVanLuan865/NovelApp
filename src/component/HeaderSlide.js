// ChildComponent.js
import React from 'react';
import { View, Text, Dimensions,  StyleSheet , ImageBackground, Image, TouchableOpacity } from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import theme from '../styles/theme';
const { width } = Dimensions.get('window');
const data = [
  { id: 1, uri: 'https://i.pinimg.com/originals/1b/ff/66/1bff6602e132af1eeee4c9d0314244e2.jpg' },
  { id: 2, uri: 'https://cdn.popsww.com/blog/sites/2/2023/07/top-truyen-tien-hiep-hay-nhat.jpg' },
  { id: 3, uri: 'https://bloggame.net/upload-file/Riven_PrestigeValiantSwordSkin5d8045ff5cac5.jpg' },
  { id: 4, uri: 'https://img.webtruyen.com/public/images/reviews_img/20191220/review-truyen-tien-hiep-1.jpg' },
  { id: 5, uri: 'https://bapcai.vn/wp-content/uploads/2021/05/truyen-tien-hiep.jpg' },
  { id: 6, uri: 'https://img.dtruyen.com/public/images/reviews_img/20210812/nhat-niem-vinh-hang.jpg' },
  
];
const HeaderSlide = () => {
  return (
    <View style={styles.container}>
    <SwiperFlatList 
      autoplay 
      autoplayDelay={3} 
      autoplayLoop 
      autoplayLoopKeepAnimation	 
      index={4} 
      showPagination 
      paginationStyleItem={{marginTop:45, height: 8, width: 8, marginHorizontal: 4,}} 
      paginationStyleItemActive={{backgroundColor: theme.colors.third, width: 20, }} 
      data={data}
      renderItem={({item})=> (
        <View style={styles.child}>
        <TouchableOpacity style={styles.touchable}>
          <View style={styles.innerBorder}>
            <Image
              source={{ uri: item.uri }}
              style={styles.innerImage}
            />
          </View>
        </TouchableOpacity>
        </View>
      )}
    />
  </View>
  );
}

const styles = StyleSheet.create({
  container: { height: '65%', alignItems:'center', justifyContent: 'center' },
  child: { width, justifyContent: 'center' , alignItems:'center', justifyContent: 'center' },
  text: { fontSize: width * 0.5, textAlign: 'center' },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchable: {
    height: "100%",
    width: "90%",
    borderRadius: 10,
    overflow: 'hidden',
  },
  backgroundImage: {
    height: "100%",
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    borderRadius: 10,
  },
  innerBorder: {
    height: "99%",
    width: "99%",
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2, 
    borderColor: 'rgba(255, 255, 255, 0.5)', 
  },
  innerImage: {
    height: "100%",
    width: "100%",
    borderRadius: 8, 
  },
});

export default HeaderSlide;
