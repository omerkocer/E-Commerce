import React, { useRef, useState } from "react";
import { Text, View , StyleSheet,TouchableOpacity , Image} from "react-native";
import { Button } from "@react-native-material/core";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../git_ignore_files/firebase";
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import profilePic from "../assets/profile.jpg"
import { updateProfile } from "firebase/auth";
import { Feather } from '@expo/vector-icons';
import { TextInput } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from "@expo/vector-icons";
export default  Profile = () => {
    const navigation = useNavigation()
    const user = auth.currentUser
    const Information = () =>{
        if (user.displayName != null) {
        return (user.displayName)
    }else {
        return <Text>Ad bilgisi ekleyin.</Text>
    }}
const [name , setName] = useState("")
const [input, setInput] = useState(false)
const UpdateProfile = () =>{
    updateProfile(auth.currentUser, {
        displayName: name
      }).then(() => {
        // Profile updated!
        // ...
      }).catch((error) => {
        // An error occurred
        // ...
      });
}
    const inputRef = useRef();
    return (
        <SafeAreaView style={styles.container}>
            <Image source={profilePic} resizeMethod="scale"  resizeMode="stretch"  style={styles.profilePic}/>
            <Text style={styles.mailText}>Ad - Soyad: <Information/></Text>
            <View style={styles.logout}>
                <TextInput 
                style={styles.input} 
                ref={inputRef} 
                placeholder="Adınızı Değiştirin"
                value={name}
                onChangeText={setName} />
                <TouchableOpacity onPress={()=>{
                    setInput(true);
                    inputRef.current.focus();
                    }}>
                <Feather style={{ alignSelf:"center", marginTop:10 }} name="edit" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <Text style={{ fontSize:15,alignSelf:"center" ,color:"#3878B7",margin:5 }}>Butonu aktif etmek için yandaki ikona tıklayın. </Text>
            <Button 
            disabled={!input} 
            color="orange"
            title="Kaydet" 
            onPress={()=>{
                UpdateProfile()
                navigation.goBack();
            }}/>
            <Button 
                  style={{ marginTop:'10%' }}
                  color="orange"
                  title="Siparişlerim" 
                  trailing={props => <MaterialCommunityIcons name="truck-cargo-container" size={26} color="black" /> }
                  onPress={()=>{
                    navigation.navigate('MyOrder')
                  }} /> 
            <Text style={styles.mailText}>Mail Adresi: {user.email} </Text>
            
            <Button 
                  style={{ marginTop:'10%' }}
                  color="orange"
                  title="Destek Hattı" 
                  trailing={props => <AntDesign  name="message1" size={24} color="black" /> }
                  onPress={()=>{
                    navigation.navigate('Support')
                  }} />      
            <View style={styles.logout}>
                <Text style={styles.logoutText}>Çıkış Yap</Text>
                <TouchableOpacity>
                    <Entypo 
                    name="log-out"
                    size={28}
                    color="#B80000"
                    onPress={() => {
                        navigation.navigate("LoadingScreen")
                        auth.signOut()
                        }}/>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        margin:10,
        textAlign:"center",
        flex:5
    },
    profilePic:{
        alignSelf:"center",
        marginTop:16,
        width:100,
        height:100,
    },
    input: {
        borderColor: "gray",
        width: "90%",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
    },
    direction:{
        flexDirection:"row",
        justifyContent:"space-evenly"
    },
    mailText:{
        textAlign:"center",
        margin:20,
        fontSize:18,
        color:"#3878B7",
    },
    logout:{
        flexDirection:"row",
        justifyContent:"space-between",
        padding:15,
        margin:10,
    },
    logoutText:{
        fontSize:16
    }
})