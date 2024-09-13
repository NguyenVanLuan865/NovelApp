// ChildComponent.js
import React from 'react';
import { View, Text, StyleSheet , Image, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import theme from '../styles/theme';

const Trending = [
    {id: 1, trending: "⚡Mới cập nhật",colorfont: 'black', color: "#80c682" },
    {id: 2, trending: "✌️Mới đăng",colorfont: 'black', color: "#fff175"  },
    {id: 3, trending: "🔥Thịnh hành",colorfont: 'white', color: "#7a4cfa" } ,
]

const data = [
  {id: 1, category : "Huyền huyễn",},
  {id: 2, category : "Đô thị",},
  {id: 3, category : "Xuyên Không",},
  {id: 4, category : "Cổ đại",},
  {id: 5, category : "Hệ thống",},
  {id: 6, category : "Khác",},
  {id: 7, category : "Tiên hiệp",},
  {id: 8, category : "Trọng sinh",},
  {id: 9, category : "Hài hước",},
  {id: 10, category : "HE",},
  {id: 11, category : "Dị giới",},
  {id: 12, category : "Đoản văn",},
  {id: 13, category : "Huyền Ảo",},
  {id: 14, category : "Linh dị",},
  {id: 15, category : "Nữ cường",},
  {id: 16, category : "+ Xem thêm",},
];
const Category = () => {
  return (
    <View style={styles.container}>
        <View style={{flexDirection:'row'}}>
        {
            Trending.map(item=>(
                <View style={{}}>
                    <TouchableOpacity style={[styles.touchable, {backgroundColor: item.color, width: theme.dimensions.width/3.3, height:  theme.dimensions.height/25, flexDirection:'row', margin: 2}]}>
                       
                        <Text style={{fontSize: 15, color: item.colorfont}}>{item.trending}</Text>
                    </TouchableOpacity>
                </View>
            ))
        }
        </View>
        <FlatList
        style={{width:theme.dimensions.width*0.95}}
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity style={[styles.touchable, { backgroundColor: theme.colors.forth }]}>
            <Text style={[styles.text, { color: theme.colors.secondarytext }]}>
              {item.category}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
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
      list: {
        flexDirection: 'row',
        flexWrap: 'wrap',
      },
      touchable: {
        margin: 5,
        padding: 5,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: (Dimensions.get('window').width / 5) - 10,
        maxWidth: (Dimensions.get('window').width) - 10,
      },
      text: {
        fontSize: 16,
      },
      
});

export default Category;
