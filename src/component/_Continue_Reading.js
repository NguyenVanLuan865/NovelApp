import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ListFooterComponent, FlatList } from 'react-native';
import theme from '../styles/theme';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const data = [
  { id: 1, uri: 'https://i.pinimg.com/originals/1b/ff/66/1bff6602e132af1eeee4c9d0314244e2.jpg', name: "Cái Này Đệ Tử Ngoại Môn, Thực Lực Mạnh Có Chút Không Hợp Thói Thường", chapter: "4" },
];

const ContinueReading = () => {
  return (
    <View style={styles.container}>
      <Text style={{ width: "70%", color: theme.colors.text, fontSize: 21, fontWeight: 700, padding: 10, marginLeft: 20 }}>Đọc Tiếp</Text>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.touchable}>
            <Image source={{ uri: item.uri }} style={styles.image} />
            <LinearGradient
              colors={['transparent', 'black']}
              style={{ height: '50%', width: '100%', marginTop: -60 }}
            />
            <Text numberOfLines={1} style={styles.chapter}>Chương {item.chapter}</Text>
            <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
          </TouchableOpacity>
        )}
        ListFooterComponent={
          <TouchableOpacity style={styles.footer}>
            <Icon name='play-circle-outline' color='white' size={40} />
            <Text style={styles.footerText}>Xem thêm</Text>
          </TouchableOpacity>
        }
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Textheader: {
    fontSize: 21,
    fontWeight: 'bold',
    color: theme.colors.text,
    padding: 10
  },
  touchable: {
    width: theme.dimensions.width / 2.2,
    height: theme.dimensions.height / 7,
    marginLeft: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: 'cover',
    borderRadius: 10,
    resizeMode: 'cover',
  },
  chapter: {
    marginTop: -50,
    fontSize: 13,
    color: 'black',
    marginLeft: 8,
    color: theme.colors.text,
  },
  name: {
    marginTop: 5,
    padding: 8,
    fontSize: 15,
    color: theme.colors.text,
    textAlign: 'center',
    backgroundColor: theme.colors.forth,
    alignSelf: 'stretch',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  footer: {
    width: theme.dimensions.width / 2.8,
    height: theme.dimensions.height / 7,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  footerText: {
    marginTop: 10,
    fontSize: 14,
    color: 'white',
  },
});

export default ContinueReading;
