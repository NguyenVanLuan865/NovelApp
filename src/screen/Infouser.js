import React from 'react';
import { View, Text, Button , StyleSheet , TouchableOpacity, Image, ScrollView} from 'react-native';
import { Entypo, MaterialIcons} from 'react-native-vector-icons';
import theme from '../styles/theme.js';

export function Infouser({ route , navigation }) {
  const { item } = route.params;
  return (
    <View style={styles.container}>
        <View style={{flexDirection: 'row', width: '100%',marginTop: 20,height: theme.dimensions.height/10}}>
          <TouchableOpacity 
            onPress={() => navigation.navigate('Tài khoản')}
            style={{width: '25%', justifyContent: 'center', alignItems: 'center'}}>
            <MaterialIcons name = 'arrow-back' size={30} color={theme.colors.text}/>
          </TouchableOpacity>
          <View style={{width: '55%', justifyContent: 'center',justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 18, fontWeight: 'bold', color: theme.colors.text}}>Thông tin tài khoản</Text>
          </View>
        </View> 
        <TouchableOpacity style={styles.touhable}>
              <Text style={{fontSize: 16, color: theme.colors.text, margin: 10}}>Ảnh đại diện</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image source={{uri: item[0].avatar}} style={styles.imageAvata} />
                  <Entypo name="chevron-small-right" size={35} color={theme.colors.secondarytext} />
              </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touhable}>
              <Text style={{fontSize: 16, color: theme.colors.text, margin: 10}}>Tên hiển thị</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{fontSize: 14, color: theme.colors.secondarytext}}>{item[0].name}</Text>
                  <Entypo name="chevron-small-right" size={35} color={theme.colors.secondarytext} />
              </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touhable}>
              <Text style={{fontSize: 16, color: theme.colors.text, margin: 10}}>Email</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{fontSize: 14, color: theme.colors.secondarytext}}>{item[0].email}</Text>
                  <Entypo name="chevron-small-right" size={35} color={theme.colors.secondarytext} />
              </View>
        </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:theme.colors.background,
    alignItems: 'center',
  },
  touhable: {
    borderBottomWidth: 0.25, 
    borderColor: theme.colors.secondarytext,
    width: '90%', flexDirection: 'row', 
    height: theme.dimensions.height/12, 
    alignItems: 'center', 
    justifyContent: 'space-between',
  },  
  imageAvata: {
    width: theme.dimensions.height / 15, 
    height: theme.dimensions.height / 15, 
    borderRadius: theme.dimensions.height / 15,
  }
});

export default Infouser;