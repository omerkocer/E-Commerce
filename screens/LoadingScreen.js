import React, {useEffect} from "react";
import { View,StyleSheet} from "react-native";
import { auth } from "../git_ignore_files/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from "react-native-safe-area-context";

const LoadingScreen = () =>{
    const navigation = useNavigation()
    useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      navigation.navigate("Home")
    //  console.warn(uid);
      // ...
    } else {
     navigation.navigate("Login")
    }
  })
},[])
return (
    <SafeAreaView style={{ flex:1, alignContent:"center" }}>
        <ActivityIndicator style={{ flex:1 ,alignSelf:"center" }} size={50} animating={true}></ActivityIndicator>
    </SafeAreaView>
)
}

export default LoadingScreen;

const styles = StyleSheet.create({
  indicator:{
    justifyContent:"center",
    flex:1
  }
})