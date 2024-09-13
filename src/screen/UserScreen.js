import React from 'react';
import { View, Text, Button , StyleSheet , TouchableOpacity, Image, ScrollView} from 'react-native';
import { Entypo, MaterialCommunityIcons , Ionicons, FontAwesome} from 'react-native-vector-icons';
import { useNavigation } from '@react-navigation/native';
import theme from '../styles/theme.js';


export function UserScreen({ navigation ,}) {
  const data = [
    {
      id: 1,
      name: 'Vanluan865',
      avatar:  "https://i.pinimg.com/736x/4a/4c/29/4a4c29807499a1a8085e9bde536a570a.jpg",
      email: "nguyenvanluan865@gmail.com"
    }
  ]
  console.log(data.name)
  return (

    <View style={styles.container}>
        <TouchableOpacity 
          onPress={() => navigation.navigate('Info', { item : data})}
          style={styles.info}>
            <Image 
              source={{uri: data[0].avatar}}
              style={{
                height: theme.dimensions.width/5, 
                width: theme.dimensions.width/5,
                borderRadius: theme.dimensions.width/10,
                marginLeft: theme.dimensions.width/10,
              }}  
            />
            <View style={{marginLeft: 10, width: '45%'}}>
              <Text style={{fontSize: 18, color: theme.colors.text, fontWeight: 'bold'}}>{data[0].name}</Text>
              <Text style={{fontSize: 13, color: theme.colors.secondarytext,}} numberOfLines={1}>{data[0].email}</Text>
            </View>
            <Entypo name="chevron-small-right" size={40}  color={theme.colors.secondarytext}/>
        </TouchableOpacity>
        <View style={styles.option}>
              <TouchableOpacity 
                  style={[styles.button, { borderBottomWidth: 0.25, borderBottomColor:  theme.colors.secondarytext}]}
                >
                <MaterialCommunityIcons name="bell-outline" size= {30} color={theme.colors.text} margin ={20}/>
                <Text style={{width: '65%', fontSize: 16, color: theme.colors.text}}>Thông báo</Text>
                <Entypo name="chevron-small-right" size={35}  color={theme.colors.secondarytext} />
              </TouchableOpacity>
              <TouchableOpacity 
                  style={[styles.button, { borderBottomWidth: 0.25, borderBottomColor:  theme.colors.secondarytext}]}
              >
                <Ionicons name="share-social-outline" size= {30} color={theme.colors.text} margin ={20}/>
                <Text style={{width: '65%', fontSize: 16, color: theme.colors.text}}>Giới thiệu bạn bè</Text>
                <Entypo name="chevron-small-right" size={35}  color={theme.colors.secondarytext} />
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.button, { borderBottomWidth: 0.25, borderBottomColor:  theme.colors.secondarytext}]}
              >
                <FontAwesome name="star" size= {30} color={theme.colors.text} margin ={20}/>
                <Text style={{width: '65%', fontSize: 16, color: theme.colors.text}}>Đánh giá ứng dụng</Text>
                <Entypo name="chevron-small-right" size={35}  color={theme.colors.secondarytext} />
              </TouchableOpacity>
              <TouchableOpacity 
                  onPress={() => navigation.navigate('Setting')}
                  style={styles.button}
              >
                <Ionicons name="settings-sharp" size= {30} color={theme.colors.text} margin ={20}/>
                <Text style={{width: '65%', fontSize: 16, color: theme.colors.text}}>Cài đặt</Text>
                <Entypo name="chevron-small-right" size={35}  color={theme.colors.secondarytext} />
              </TouchableOpacity>
        </View>
        <TouchableOpacity 
        style={styles.buttonLogout}
        onPress={() => navigation.navigate('Login')}
        >
          <Text style={{fontSize: 16, color: theme.colors.buttonIcon}}>Đăng Xuất</Text>
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
  info : {
    marginTop: theme.dimensions.height/10,
    height: theme.dimensions.height/6,
    width: '90%',
    backgroundColor: theme.colors.Usercolor,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems:'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  option: {
    marginTop: theme.dimensions.height/20,
    height: theme.dimensions.height/2.5,
    width: '85%',
    backgroundColor: theme.colors.Usercolor,
    borderRadius: 20,
    alignItems:'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonLogout: {
    width: '80%', 
    height: theme.dimensions.height/15, 
    marginTop: theme.dimensions.height/10, 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius: 30,
    backgroundColor: theme.colors.buttonLogout,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    flexDirection:'row', 
    alignItems: 'center', 
    height: '25%',
    width: '90%', 
  }
});

export default UserScreen;