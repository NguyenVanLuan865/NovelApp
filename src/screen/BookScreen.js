import React from 'react';
import { View, Text, Button , StyleSheet , TouchableOpacity , Dimensions, useWindowDimensions ,Image, ScrollView} from 'react-native';
import theme from '../styles/theme.js';
import { TabView , SceneMap, TabBar} from 'react-native-tab-view';
import Reading from '../component/Reading.js';

const SecondRoute = () => (
  <View style={{ width: theme.dimensions.width, height: theme.dimensions.height,backgroundColor: theme.colors.background  }} />
);

const renderScene = SceneMap({
  first: Reading,
  second: SecondRoute,
});

export function BookScreen({ navigation }) {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Đang đọc' },
    { key: 'second', title: 'Đã thích' },
  ]);


  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ 
        backgroundColor: theme.colors.buttonIcon, 
        width: theme.dimensions.width/4, 
        height: 5, 
        borderRadius: 5, 
        alignSelf: 'center',
        marginLeft: theme.dimensions.width/8, 
      }}
      style={{backgroundColor: theme.colors.background, justifyContent: 'center', borderBottomWidth: 0.5, borderBottomColor: theme.colors.secondarytext }}
      renderLabel={({ route, focused, color }) => (
        <Text style={{ margin: 8 ,fontSize: 15, color: focused ? theme.colors.buttonIcon : theme.colors.text}}>
          {route.title}
        </Text>
      )}
    />
  );
  return (
    <View style={styles.container}>
      <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 40}}>
        <Text style={styles.textHeader}>Tủ Sách</Text>
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:theme.colors.background,
    justifyContent: 'center',
  },
  textHeader: {
    fontSize: 20,
    color: theme.colors.text,
    fontWeight: 'bold',
  }
});

export default BookScreen;