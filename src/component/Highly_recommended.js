// ChildComponent.js
import React from 'react';
import { View, Text, Dimensions, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import theme from '../styles/theme';


const data = [
  {
    id: 1,
    uri: 'https://i.pinimg.com/originals/1b/ff/66/1bff6602e132af1eeee4c9d0314244e2.jpg',
    name: "Cái Này Đệ Tử Ngoại Môn, Thực Lực Mạnh Có Chút Không Hợp Thói Thường",
    introducer: "Nhân vật chính gối mỹ nhân đầu, luyện tốt phi kiếm, nuôi cổ trùng, luyện pháp bảo, tu thần thông suốt, vẽ phù lục, dò xét cấm địa, ngự thiên ma..."
  },
  {
    id: 2,
    uri: 'https://i.pinimg.com/originals/1b/ff/66/1bff6602e132af1eeee4c9d0314244e2.jpg',
    name: "Thiên Đạo Vô Thượng, Luyện Khí Thành Thần",
    introducer: "Nhân vật chính bước lên con đường tu luyện từ một người bình thường, trở thành thần thánh."
  },
  {
    id: 3,
    uri: 'https://i.pinimg.com/originals/1b/ff/66/1bff6602e132af1eeee4c9d0314244e2.jpg',
    name: "Bất Diệt Truyền Thuyết, Nhất Kiếm Định Càn Khôn",
    introducer: "Một thanh kiếm, một truyền thuyết không bao giờ tàn lụi, chinh phục cả thiên hạ."
  },
  {
    id: 4,
    uri: 'https://i.pinimg.com/originals/1b/ff/66/1bff6602e132af1eeee4c9d0314244e2.jpg',
    name: "Ngạo Thị Thiên Hạ, Vạn Cổ Trường Sinh Giới",
    introducer: "Cuộc hành trình tìm kiếm sự trường sinh trong một thế giới đầy rẫy nguy hiểm."
  },
  {
    id: 5,
    uri: 'https://i.pinimg.com/originals/1b/ff/66/1bff6602e132af1eeee4c9d0314244e2.jpg',
    name: "Vô Thượng Kiếm Đạo, Thiên Địa Bất Tử",
    introducer: "Kiếm đạo vô thượng, bất tử thiên địa, chinh phục mọi đối thủ trên con đường tu luyện."
  },
  {
    id: 6,
    uri: 'https://i.pinimg.com/originals/1b/ff/66/1bff6602e132af1eeee4c9d0314244e2.jpg',
    name: "Ma Vương Hàng Lâm, Thần Ma Tranh Bá",
    introducer: "Ma vương tái sinh, cuộc chiến giữa thần và ma bùng nổ, ai sẽ là người chiến thắng?"
  },
  {
    id: 7,
    uri: 'https://i.pinimg.com/originals/1b/ff/66/1bff6602e132af1eeee4c9d0314244e2.jpg',
    name: "Đệ Nhất Võ Thần, Phong Vân Tái Khởi",
    introducer: "Võ thần đệ nhất, phong vân tái khởi, một cuộc hành trình đầy kỳ bí và hấp dẫn."
  },
  {
    id: 8,
    uri: 'https://i.pinimg.com/originals/1b/ff/66/1bff6602e132af1eeee4c9d0314244e2.jpg',
    name: "Thần Hỏa Liên Thiên, Vô Cực Đại Đạo",
    introducer: "Thần hỏa thiêu đốt cả thiên địa, vô cực đại đạo mở ra những bí mật vũ trụ."
  },
  {
    id: 9,
    uri: 'https://i.pinimg.com/originals/1b/ff/66/1bff6602e132af1eeee4c9d0314244e2.jpg',
    name: "Tiên Giới Chi Lộ, Nhất Kiếm Định Thiên",
    introducer: "Con đường tiên giới đầy gian nan, nhất kiếm định thiên, chinh phục mọi thử thách."
  },
  {
    id: 10,
    uri: 'https://i.pinimg.com/originals/1b/ff/66/1bff6602e132af1eeee4c9d0314244e2.jpg',
    name: "Thiên Tôn Trở Lại, Bá Đạo Vô Song",
    introducer: "Thiên tôn trở lại, bá đạo vô song, một hành trình báo thù và tìm kiếm công lý."
  },
  {
    id: 11,
    uri: 'https://i.pinimg.com/originals/1b/ff/66/1bff6602e132af1eeee4c9d0314244e2.jpg',
    name: "Cửu Thiên Đế Chủ, Bất Diệt Chi Tôn",
    introducer: "Cửu thiên đế chủ, bất diệt chi tôn, vượt qua mọi khó khăn để trở thành vị thần tối cao."
  },
  {
    id: 12,
    uri: 'https://i.pinimg.com/originals/1b/ff/66/1bff6602e132af1eeee4c9d0314244e2.jpg',
    name: "Kiếm Đạo Chí Tôn, Thiên Địa Độc Tôn",
    introducer: "Kiếm đạo chí tôn, thiên địa độc tôn, một hành trình tìm kiếm sự thật và công lý."
  },
  {
    id: 13,
    uri: 'https://i.pinimg.com/originals/1b/ff/66/1bff6602e132af1eeee4c9d0314244e2.jpg',
    name: "Huyền Thiên Chi Đạo, Vạn Giới Độc Tôn",
    introducer: "Huyền thiên chi đạo, vạn giới độc tôn, một hành trình chinh phục vũ trụ và ngoài vũ trụ."
  }
];

const firstItem = data[0];
const RestOfData = data.slice(1)
const Highly_recommended = () => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', padding: 10, }}>
        <Text style={{ width: "70%", color: theme.colors.text, fontSize: 21, fontWeight: 700 }}>Đánh giá cao</Text>
        <TouchableOpacity>
          <Text style={{ color: theme.colors.thirdtext, fontWeight: 'bold', fontSize: 15 }}>Xem thêm</Text>
        </TouchableOpacity>
      </View>
      <View style={{ height: theme.dimensions.height / 4.5, width: '100%', flexDirection: 'row', }}>
        <TouchableOpacity style={styles.item}>
          <View style={styles.innerBorder}>
            <Image
              source={{ uri: firstItem.uri }}
              style={styles.image}
            />
          </View>
        </TouchableOpacity>
        <View style={{ width: "50%", marginTop: 20, }}>
          <Text numberOfLines={2} style={styles.textName}>{firstItem.name}</Text>
          <Text numberOfLines={5} style={styles.textIntro}>{firstItem.introducer}</Text>
        </View>
      </View>
      <View style={{ height: theme.dimensions.height / 4.5, marginLeft: 20 }}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={RestOfData}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.itemmini}>
              <View style={styles.innerBodermini}>
                <Image source={{ uri: item.uri }} style={{ height: "100%", width: "100%" }} />
              </View>
              <Text numberOfLines={2} style={{ fontSize: 12, color: theme.colors.text }}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textName: {
    fontSize: 16,
    color: theme.colors.text,
    lineHeight: 20,
  },
  textIntro: {
    fontSize: 13,
    color: theme.colors.secondarytext,
    marginTop: 10,
    lineHeight: 20,
  },
  item: {
    width: '35%',
    height: '100%',
    margin: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  innerBorder: {
    height: "90%",
    width: "100%",
    borderRadius: 5,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  itemmini: {
    width: theme.dimensions.width / 4,
    marginTop: 20,
    marginRight: 10,
  },
  innerBodermini: {
    height: theme.dimensions.height / 7.5,
    width: "100%", borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
});

export default Highly_recommended;
