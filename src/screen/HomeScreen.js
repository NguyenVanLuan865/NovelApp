import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Octicons } from 'react-native-vector-icons';
import theme from '../styles/theme.js';
import HeaderSlide from '../component/HeaderSlide.js';
import Nominations from '../component/Nominations.js';
import NewUpdate from '../component/NewUpdate.js';
import Category from '../component/_ Category.js';
import ContinueReading from '../component/_Continue_Reading.js';
import ComponentCategory from '../component/_ComponentCategory.js';
import Highly_recommended from '../component/Highly_recommended.js';
import LoadingModal from '../component/LoadingModel.js';
import { fetchNovelForHome } from '../api/API.js'
import { API_URL } from '@env';
import axios from 'axios';
import { useUser } from '../context/UserContext';
import { setCache, getCache } from '../utils/cache';


export function HomeScreen({ navigation }) {
  const data1 = "Huyền Huyễn";
  const data2 = "Tiên Hiệp";
  const data3 = "Hệ Thống";
  const data4 = "Dị Giới";
  const data5 = "Khác";

  const [newUpdateData, setNewUpdateData] = useState(null);
  const [categoryData1, setCategoryData1] = useState(null);
  const [categoryData2, setCategoryData2] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newdata, setNewdata] = useState(null);
  const [huyenhuyendata, setHuyenhuyendata] = useState(null);
  const [tienhiepdata, setTienhiepdata] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
          const data = await fetchNovelForHome();
        setNewUpdateData(data);
        if (data) {
          setNewdata(data.latestNovels);
          setHuyenhuyendata(data.huyenHuyenNovels);
          setTienhiepdata(data.tienHiepNovels);
        }
        setLoading(false);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  return (
    loading ? (
      <View style={styles.container}>
        <LoadingModal visible={loading} />
      </View>
    ) : (
      <ScrollView>
        <View style={{ flex: 1, alignItems: 'center', backgroundColor: theme.colors.background }}>
          <LinearGradient
            colors={[theme.colors.secondary, theme.colors.background]}
            style={styles.Header}>
            <View style={{ height: '34%', flexDirection: 'row' }}>
              <View style={{ width: '70%', padding: 20, marginTop: 10 }}>
                {user ? (
                  <>
                    <Text style={[styles.text, { color: theme.colors.secondarytext }]}>Xin chào</Text>
                    <Text style={[styles.text, { color: theme.colors.text }]}>{user.username}</Text>
                  </>
                ) : (
                  <Text style={[styles.text, { color: theme.colors.secondarytext }]}>Chưa có thông tin người dùng</Text>
                )}
              </View>
              <TouchableOpacity
                onPress={() => { navigation.navigate('Search') }}
                style={{ width: '15%', alignItems: 'center', justifyContent: 'center' }}>
                <Octicons name="search" size={20} color={theme.colors.text} marginTop={20} />
              </TouchableOpacity>
              <TouchableOpacity style={{ width: '15%', alignItems: 'center', justifyContent: 'center' }}>
                <Octicons name="bell-fill" size={20} color={theme.colors.text} marginTop={20} />
              </TouchableOpacity>
            </View>
            <HeaderSlide />
          </LinearGradient>

          {user && (
            <>
              <View style={{ marginTop: 50, width: theme.dimensions.width, height: theme.dimensions.height / 4.5 }}>
                <ContinueReading />
              </View>
            </>
          )}

          <View style={{ marginTop: 10, height: theme.dimensions.height / 2.4, width: theme.dimensions.width }}>
            <Nominations />
          </View>
          <View style={{ marginTop: 20, width: theme.dimensions.width, }}>
            <NewUpdate navigation={navigation} data={newdata} />
          </View>
          <View style={{ width: theme.dimensions.width, }}>
            <Category />
          </View>
          <View style={{ width: theme.dimensions.width, }}>
            <Highly_recommended />
          </View>
          {/* <View style={{ width: theme.dimensions.width, }}>
            <ComponentCategory data1={data1} navigation={navigation} data2={huyenhuyendata} />
          </View>
          <View style={{ width: theme.dimensions.width, }}>
            <ComponentCategory data1={data2} navigation={navigation} data2={tienhiepdata} />
          </View>
          <View style={{ width: theme.dimensions.width, }}>
            <ComponentCategory data={data3} />
          </View>
          <View style={{ width: theme.dimensions.width, }}>
            <ComponentCategory data={data4} />
          </View>
          <View style={{ width: theme.dimensions.width, }}>
            <ComponentCategory data={data5} />
          </View> */}
        </View >
      </ScrollView >
    )
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
  },
  Header: {
    height: theme.dimensions.height / 2.5,
    width: theme.dimensions.width,
    borderColor: "red"
  },
  text: {
    fontSize: 18,
    fontWeight: 800,
  }
});

export default HomeScreen;