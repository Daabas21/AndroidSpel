import MainScreen from './screens/MainScreen';
import ScoreScreen from './screens/ScoreScreen';
import ChatScreen from './screens/ChatScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useEffect, useState } from 'react';
import { getTableInfo, initDB } from './utils/db';
import { Text, View } from 'react-native';

const Tab = createBottomTabNavigator()

export default function App() {

  const [history, setHistory] = useState([]) //

  const [dbInited, setDbInited] = useState(false)

  useEffect(() => {
    initDB()
      .then(res => {
        console.log(res)
        return getTableInfo()
      })
      .then(res => {
        console.log(res.rows._array.map(row => `${row.cid} ${row.name} ${row.type}`));
        setDbInited(true)
      })
  },[])

  if(!dbInited){
    return <View><Text>Loading</Text></View>
  }

  return (
    <NavigationContainer>
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={{
      tabBarActiveTintColor: '#e91e63',
      }}>
      <Tab.Screen
        name='Home'
        // component={MainScreen}
        children={() => <MainScreen setHistory={setHistory}/>}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }} />
      <Tab.Screen
        name='History'
        // component={ScoreScreen}
        children={() => <ScoreScreen history={history} setHistory={setHistory} />}
        options={{
          tabBarLabel: 'History',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="scoreboard" color={color} size={size} />
          ),
        }}/>
      <Tab.Screen 
        name='Chat'
        component={ChatScreen}
        options={{
          tabBarLabel:'Chat',
          tabBarIcon: ({color, size }) => (
            <MaterialCommunityIcons name='chat' color={color} size={size} />
          ),
        }}
        />
    </Tab.Navigator>
    </NavigationContainer>
  );
}