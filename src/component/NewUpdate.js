// ChildComponent.js
import React from 'react';
import { View, Text, Dimensions, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import theme from '../styles/theme';
const numColumns = 4;
const size = Dimensions.get('window').width / (numColumns + 0.5) - 5;

const NewUpdate = ({ navigation , data}) => {
 
  const novel = data;
  console.log("id nivel",data[0].novelId )
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', padding: 10 }}>
        <Text style={{ width: "70%", color: theme.colors.text, fontSize: 21, fontWeight: 700 }}>Mới Cập Nhật</Text>
        <TouchableOpacity>
          <Text style={{ color: theme.colors.thirdtext, fontWeight: 'bold', fontSize: 15 }}>Xem thêm</Text>
        </TouchableOpacity>
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <FlatList
          data={novel}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('NovelDetail', { novelId: item._id })}
              style={styles.item}
            >
              <View style={styles.innerBorder}>
                <Image
                  source={{ uri: `data:image/jpeg;base64,${item.imageNovel}` }}
                  style={styles.image}
                />
              </View>
              <Text numberOfLines={2} style={{ height: "30%", color: theme.colors.text }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
          numColumns={numColumns}
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
  item: {
    width: size,
    height: theme.dimensions.height / 5.5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  innerBorder: {
    height: "70%",
    width: "99%",
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
});

export default NewUpdate;
