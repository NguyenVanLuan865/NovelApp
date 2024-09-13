import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import theme from '../styles/theme';

const ComponentCategory = ({ navigation, data1, data2 }) => {
  const novels = data2;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{data1}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SeeMore', { category: title })}>
          <Text style={styles.seeMore}>Xem thêm</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        horizontal
        data={novels}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('NovelDetail', { novelId: item.novelId})}>
            <View style={styles.innerBorder}>
              <Image
                source={{ uri: `data:image/jpeg;base64,${item.imageNovel}` }}
                style={styles.image}
              />
            </View>
            <Text numberOfLines={1} style={styles.novelName}>
              {item.name}
            </Text>
            <Text numberOfLines={2} style={styles.novelDescription}>
              {item.description}
            </Text>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 20,
    marginLeft: 10,
  },
  header: {
    flexDirection: 'row',
    padding: 10,
    width: '100%',
    justifyContent: 'space-between',
  },
  title: {
    color: theme.colors.text,
    fontSize: 21,
    fontWeight: '700',
  },
  seeMore: {
    color: theme.colors.thirdtext,
    fontWeight: 'bold',
    fontSize: 15,
  },
  item: {
    width: theme.dimensions.width / 2.8,
    height: theme.dimensions.height / 3,
    justifyContent: 'center',
    margin: 5,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  innerBorder: {
    height: '70%',
    width: '99%',
    borderRadius: 5,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  novelName: {
    color: theme.colors.text,
    fontWeight: 'bold',
  },
  novelDescription: {
    padding: 5,
    color: theme.colors.secondarytext,
    fontSize: 12,
  },
});

export default ComponentCategory;
