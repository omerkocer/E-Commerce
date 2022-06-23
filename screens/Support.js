import React,{useState} from "react";
import { View,StyleSheet,ScrollView, KeyboardAvoidingView,Alert, Keyboard, TouchableOpacity  } from "react-native";
import {  Text,TextInput,Button } from "@react-native-material/core";
import { useNavigation, useRoute } from "@react-navigation/native";
import "firebase/firestore";
import {addDoc, collection, updateDoc, doc } from "firebase/firestore";
import { auth, db } from "../git_ignore_files/firebase"
import { Feather } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
const sayi = (true)



/*


    const db = getDatabase();
    set(ref(db, 'Items/KNvZtAPA8I0bP2BCDw6O'), {
        hisse1: hisse1,
    })
    .then(() => {
      alert("Data saved successfully!")
    })
    .catch((error) => {
      alert("The write failed...")
    });





/*
  // A post entry.
  const postData = {
    hisse1: hisse1,
  };

  // Get a key for a new Post.
  const newItems = push(child(ref(db), 'Items')).key;

  console.log("newItems",newItems);
  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {};
  updates['/posts/KNvZtAPA8I0bP2BCDw6O'] = postData;

  //return update(ref(db), updates);*/

const Support = (props)=>{
    const navigation = useNavigation()

    const [name , setName] = useState()
    const [telNumber , settelNumber] = useState()
    const [email , setemail] = useState()
    const [message , setmessage] = useState()

    const createAlert = (props) =>
    Alert.alert("Gönderildi" , "Mesajınız iletilmiştir.", 
    [
      { text: 'Tamam', 
        onPress: () => console.log('OK Pressed'), },
      
    ]);
    const NewMessage = () =>{
        addDoc(collection(db, "Messages"), {
        name: name || null,
        telNumber: telNumber || null,
        email: email || null,
        message: message || null,
        auth_email: auth.currentUser.email
      }).then(()=>{
        createAlert({title :"Başarılı"}, {description : "Yeni Hayvan Eklendi"})
        navigation.navigate('Home');
      }).catch((error)=>{
        createAlert({title:{error}})
      });
      };
    return(
    <View style={styles.container}>
        <ScrollView>
          <View padding={20}>
                <Text color="blue"> Aşağıdaki bilgileri doldurup geri bildiriminizi yazınız. İlgili birimimiz en kısa sürede sizinle iletişime geçecektir.</Text>
                <TextInput style={styles.textInputs} 
                label="Ad - Soyad"
                value={name}
                onChangeText={(name) => {setName(name)}}/>
                
                <TextInput style={styles.textInputs} 
                label="Tel No" 
                keyboardType="numeric"
                value={telNumber} 
                onChangeText={(telNumber) => {settelNumber(telNumber)}} />

                <TextInput style={styles.textInputs} 
                label="Mail Adresi" 
                keyboardType="default"
                multiline={true}
                value={email} 
                onChangeText={(email) => {setemail(email)}}/>
                <TextInput style={styles.textInputs} 
                label="Mesajınız..." 
                keyboardType="default"
                multiline={true}
                value={message} 
                onChangeText={(message) => {setmessage(message)}}/>
                
                <Button 
                    title="Gönder"
                    color="#3878B7"
                    onPress={()=>{
                        NewMessage()

                    }} />
                <View style={{ flexDirection:"row", alignItems:"center",margin:20, marginTop:'20%'  }}>
                    <Text style={{ marginRight:15,}} color="black">Web sitemizden yardım almak için, yandaki etikete tıklayın.</Text>
                    <TouchableOpacity onPress={()=>{
                       Linking.openURL('https://ee.medeniyet.edu.tr/tr');
                    }}>
                        <Feather name="link" size={30} color="blue" />
                    </TouchableOpacity>
                </View>
          </View>
          </ScrollView>
    </View>
    )}


const styles = StyleSheet.create({
    screen:{
        flexDirection:"column"
    },
    container:{
        borderWidth:0.1,
        flex:1
    },
    textInputs:{
        marginBottom:7,
        margin:15
    },
    picture:{
        height:100,
        width:110,
        borderWidth:25,
        borderTopLeftRadius:15,
        borderTopRightRadius:15
    },
    borderDisable:{
        borderRadius:25,
        borderWidth:8,
        borderColor:"red"
    },
    borderEnable:{
        borderWidth:8,
        borderRadius:25,
        borderColor:"green"
    },
    info:{
        backgroundColor:"yellow"
    },
    textE:{
        backgroundColor:"green",
    },
    back: {
        backgroundColor:"red",
        padding:20,
        borderRadius:20,
    }
})
export default Support;