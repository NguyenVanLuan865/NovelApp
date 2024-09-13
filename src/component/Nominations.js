// ChildComponent.js
import React from 'react';
import { View, Text, Dimensions,  StyleSheet ,FlatList, Image, TouchableOpacity } from 'react-native';;
import theme from '../styles/theme';
const { width } = Dimensions.get('window');
const data = [
  { id: 1, uri: 'https://i.pinimg.com/originals/1b/ff/66/1bff6602e132af1eeee4c9d0314244e2.jpg', name: "Cái Này Đệ Tử Ngoại Môn, Thực Lực Mạnh Có Chút Không Hợp Thói Thường" ,category: "Điền văn"},
  { id: 2, uri: 'https://cdn.popsww.com/blog/sites/2/2023/07/top-truyen-tien-hiep-hay-nhat.jpg', name: "Huyền Ảnh Thiên Đường",category: "Dị giới" },
  { id: 3, uri: 'https://bloggame.net/upload-file/Riven_PrestigeValiantSwordSkin5d8045ff5cac5.jpg', name: "Ta Tại Tân Thủ Thôn Lặng Lẽ Cẩu Thành Đại Boss",category: "Đồng nhân" },
  { id: 4, uri: 'https://img.webtruyen.com/public/images/reviews_img/20191220/review-truyen-tien-hiep-1.jpg', name: "Nguyệt Hoa Phượng Vũ",category: " Xuyên không" },
  { id: 5, uri: 'https://bapcai.vn/wp-content/uploads/2021/05/truyen-tien-hiep.jpg' , name: "Bạch Xà Truyền Kỳ",category: "Huyền huyễn"},
  { id: 6, uri: 'https://img.dtruyen.com/public/images/reviews_img/20210812/nhat-niem-vinh-hang.jpg', name: "Ngũ Độc Môn Phái",category: "Nhân thú" },
  { id: 7, uri: 'https://i.pinimg.com/originals/1b/ff/66/1bff6602e132af1eeee4c9d0314244e2.jpg', name: "Cái Này Đệ Tử Ngoại Môn, Thực Lực Mạnh Có Chút Không Hợp Thói Thường" ,category: "Điền văn"},
  { id: 8, uri: 'https://cdn.popsww.com/blog/sites/2/2023/07/top-truyen-tien-hiep-hay-nhat.jpg', name: "Huyền Ảnh Thiên Đường",category: "Dị giới" },
  { id: 9, uri: 'https://bloggame.net/upload-file/Riven_PrestigeValiantSwordSkin5d8045ff5cac5.jpg', name: "Ta Tại Tân Thủ Thôn Lặng Lẽ Cẩu Thành Đại Boss",category: "Đồng nhân" },
  { id: 10, uri: 'https://img.webtruyen.com/public/images/reviews_img/20191220/review-truyen-tien-hiep-1.jpg', name: "Nguyệt Hoa Phượng Vũ",category: " Xuyên không" },
  { id: 11, uri: 'https://bapcai.vn/wp-content/uploads/2021/05/truyen-tien-hiep.jpg' , name: "Bạch Xà Truyền Kỳ",category: "Huyền huyễn"},
  { id: 12, uri: 'https://img.dtruyen.com/public/images/reviews_img/20210812/nhat-niem-vinh-hang.jpg', name: "Ngũ Độc Môn Phái",category: "Nhân thú" },
  { id: 13, uri: 'https://i.pinimg.com/originals/1b/ff/66/1bff6602e132af1eeee4c9d0314244e2.jpg', name: "Cái Này Đệ Tử Ngoại Môn, Thực Lực Mạnh Có Chút Không Hợp Thói Thường" ,category: "Điền văn"},
  { id: 14, uri: 'https://cdn.popsww.com/blog/sites/2/2023/07/top-truyen-tien-hiep-hay-nhat.jpg', name: "Huyền Ảnh Thiên Đường",category: "Dị giới" },
  { id: 15, uri: 'https://bloggame.net/upload-file/Riven_PrestigeValiantSwordSkin5d8045ff5cac5.jpg', name: "Ta Tại Tân Thủ Thôn Lặng Lẽ Cẩu Thành Đại Boss",category: "Đồng nhân" },
  { id: 16, uri: 'https://img.webtruyen.com/public/images/reviews_img/20191220/review-truyen-tien-hiep-1.jpg', name: "Nguyệt Hoa Phượng Vũ",category: " Xuyên không" },
  { id: 17, uri: 'https://bapcai.vn/wp-content/uploads/2021/05/truyen-tien-hiep.jpg' , name: "Bạch Xà Truyền Kỳ",category: "Huyền huyễn"},
  { id: 18, uri: 'https://img.dtruyen.com/public/images/reviews_img/20210812/nhat-niem-vinh-hang.jpg', name: "Ngũ Độc Môn Phái",category: "Nhân thú" },
];
const Nominations = () => {
  return (
    <View style={styles.container}>
        <View style={{flexDirection:'row', padding: 10}}>
            <Text style={{width: "70%", color: theme.colors.text, fontSize: 21, fontWeight:700}}>BTV Đề cử</Text>
            <TouchableOpacity>
                <Text style={{color: theme.colors.thirdtext, fontWeight: 'bold', fontSize: 15}}>Xem thêm</Text>
            </TouchableOpacity>
        </View>
        <FlatList
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            horizontal
            data={data}
            renderItem={({ item }) => (
                <View style={styles.child}>
                  <TouchableOpacity style={styles.touchable}>
                      <Image
                          source={{ uri: item.uri }}
                          style={styles.innerImage}
                      />
                  </TouchableOpacity>
                  <Text style={styles.textname} numberOfLines={2} >{item.name}</Text>
                  <TouchableOpacity style={styles.buttoncategory}>
                      <Text style={styles.textcategory}>{item.category}</Text>
                  </TouchableOpacity>
                </View>
            )}
            keyExtractor={(item) => item.id.toString()}
            />
     </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      child: {
        width: theme.dimensions.width/3,
        height: "100%",
      },
      touchable: {
        height: '60%',
      },
      innerImage: {
        width: '95%',
        height: '100%',
      },
      textname: {
        color: theme.colors.text,
        fontSize : 16,
        fontWeight: 'bold',
        margin: 5,
      },
      buttoncategory: {
        backgroundColor:theme.colors.forth, 
        alignSelf: 'flex-start', 
        borderRadius: 5, 
        margin: 5,
      },

      textcategory: {
        color: theme.colors.secondarytext, 
        padding: 5
      },
});

export default Nominations;
