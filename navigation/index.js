/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { Pressable, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import Login from '../screens/Login';
import Home from '../screens/Home';
import ItemsPage from '../screens/ItemsPage';
import TabTwoScreen from '../screens/TabTwoScreen';
import { auth } from "../git_ignore_files/firebase";
import {  Avatar, Icon } from 'react-native-paper';
import Items from './../components/Items';
import Profile from './../screens/Profile';
import { useNavigation } from '@react-navigation/native';
import SignUpScreen from '../screens/SignUpScreen';
import LoadingScreen from './../screens/LoadingScreen';
import HisseAlim from '../screens/HisseAlim';
import Support from '../screens/Support';
import MyOrder from './../screens/MyOrder';
export default function Navigation({ colorScheme, drawerCntx }) {
    return (<NavigationContainer>     
      <RootNavigator drawerCntx={drawerCntx}/>
    </NavigationContainer>);
}
/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stacks = createNativeStackNavigator();
export const listenDisplayName = (name) => {
    user = name;
};
function RootNavigator({ drawerCntx }) {
    const navigation = useNavigation();
    return (<Stacks.Navigator>
        <Stacks.Screen name='LoadingScreen' component={LoadingScreen} options={{ headerShown: false,headerStyle: { backgroundColor: "orange" } }}/>
        <Stacks.Screen name="Login" component={Login} options={{ headerShown: false,headerStyle: { backgroundColor: "orange" } }}/>
        <Stacks.Screen name='SignUpScreen' component={SignUpScreen} options={{ headerShown: false ,headerStyle: { backgroundColor: "orange" }}}/>
        <Stacks.Screen name="Home" component={Home} options={{
            title: 'çiftliğim',
            headerTitleAlign: 'center',
            headerBackVisible: false,
            headerStyle: { backgroundColor: "orange" },
            headerLeft: () => (<TouchableOpacity onPress={() => drawerCntx.current.drawerOpen()}>
              <Ionicons name='reorder-four-outline' size={36}/>
            </TouchableOpacity>),
            headerRight: () => (
              <TouchableOpacity onPress={() => { navigation.navigate('Profile'); }}>
                <Avatar.Icon size={36} icon="account" color='orange' style={{ backgroundColor:"black"}} ></Avatar.Icon>
              </TouchableOpacity>)
        }}/>
        <Stacks.Screen name='MyOrder' component={MyOrder} options={{ headerShown: true, title: 'Siparişlerim', headerStyle: { backgroundColor: 'orange' } }}/>
        <Stacks.Screen name='Support' component={Support} options={{ headerShown: true, title: 'Destek Hattı', headerStyle: { backgroundColor: 'orange' } }}/>
        <Stacks.Screen name="Items" component={Items} options={{ headerShown: false }}/>
        <Stacks.Screen name="ItemsPage" component={ItemsPage} options={{ headerShown: true, title: 'Hayvan Hakkında', headerStyle: { backgroundColor: 'orange' } }}/>
        <Stacks.Screen name="HisseAlim" component={HisseAlim} options={{ headerShown: true, title: 'Hisse Alımı', headerStyle: { backgroundColor: 'orange' } }}/>
        <Stacks.Screen name="Profile" component={Profile} options={{ headerShown: true, title: 'Profil Ekranı', headerStyle: { backgroundColor: 'orange' } }}/>
      </Stacks.Navigator>);
}
//const Drawer = createDrawerNavigator();
/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator();
function BottomTabNavigator() {
    const colorScheme = useColorScheme();
    return (<BottomTab.Navigator initialRouteName="Login" screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme].tint,
        }}>
      <BottomTab.Screen name="Login" component={Login} options={({ navigation }) => ({
            title: 'Giriş Yap',
            tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color}/>,
            headerRight: () => (<Pressable onPress={() => navigation.navigate('Modal')} style={({ pressed }) => ({
                    opacity: pressed ? 0.5 : 1,
                })}>
              <FontAwesome name="info-circle" size={25} color={Colors[colorScheme].text} style={{ marginRight: 15 }}/>
            </Pressable>),
        })}/>
      <BottomTab.Screen name="TabTwo" component={TabTwoScreen} options={{
            title: 'Tab Two',
            tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color}/>,
        }}/>
    </BottomTab.Navigator>);
}
/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props) {
    return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props}/>;
}
