import React,{useState} from "react";
import { View,StyleSheet,ScrollView, KeyboardAvoidingView,Alert, Keyboard, TouchableOpacity  } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SheepPic from "../assets/seep.jpg"
import {  Text,TextInput,Button } from "@react-native-material/core";
import { useNavigation, useRoute } from "@react-navigation/native";
import "firebase/firestore";
import {addDoc, collection, updateDoc, doc } from "firebase/firestore";
import { auth, db ,musteriListener} from "../git_ignore_files/firebase"
import Checkbox from "expo-checkbox";
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

const HisseAlim = (props)=>{
    const navigation = useNavigation()
    const route = useRoute()
    const { datahid , itemId } = route.params;

    const [name , setname] = useState("");
    const [telNumber , settelNumber] = useState("");
    const [adress , setadress] = useState("");
    const [hisseAciklama , sethisseAciklama] = useState("");
    const [isChecked1, setChecked1] = useState(false);
    const userID = auth.currentUser.uid
    var sliceId = itemId.slice(3,23);
async function updateHisse(hisse1) {
console.log(itemId)
    // To update age and favorite color:
    await updateDoc(doc(db, "Items" , sliceId ), {
        [`hisseler.hisse${datahid}`]: true
    });
}    

const createAlert = (props) =>
    Alert.alert((props.title) , (props.description), 
    [
      { text: 'Tamam', 
        onPress: () => console.log('OK Pressed'), },
      
    ]);
const NewOrder = () =>{

    updateHisse(true);
    addDoc(collection(db, "musteriler"), {
        name: name,
        userID:userID,
        telNumber: telNumber,
        adress: adress,
        hisseRef:itemId,
        hisseIndex: datahid,
        hisseAciklama: hisseAciklama,
    }).then(()=>{
        createAlert({title :"Başarılı"}, {description : "Hisse Kaydınız yapıldı"});
        navigation.goBack();
    }).catch((error)=>{
        createAlert({title:{error}})
    });
    };
    
    return(
    <View style={styles.container}>
        <ScrollView>
          <View padding={20}>
                <Text color="purple">{datahid}. Hisseye Kayıt Olacak Kişinin;</Text>
                <TextInput style={styles.textInputs} 
                label="Adı - Soyadı"
                value={name}
                onChangeText={(name) => {setname(name)}}/>
                
                <TextInput style={styles.textInputs} 
                label="Telefon numarası" 
                keyboardType="numeric"
                value={telNumber} 
                onChangeText={(telNumber) => {settelNumber(telNumber)}} />

                <TextInput style={styles.textInputs} 
                label="Adresi" 
                keyboardType="default"
                multiline={true}
                value={adress} 
                onChangeText={(adress) => {setadress(adress)}}/>
                <Text color="#C70000">Not: Altta bulunan açıklamalar kısmında hisseniz adak amaçlı alındıysa belirtiniz. Ayrıca kesim sonrası nakil işlemleri için belirtmek istediğiniz özel bir not var ise bu alana ekleyiniz..  </Text>
                
                <TouchableOpacity style={{ flexDirection:"row" }} onPress={()=>{
                    setChecked1(!isChecked1)
                    }}>
                    <View style={styles.section}>
                        <Checkbox 
                        style={styles.checkbox} 
                        value={isChecked1}
                        onValueChange={setChecked1}
                        color={isChecked1 ? 'green' : undefined}
                        />
                        <Text style={styles.paragraph}> Okudum, onaylıyorum.</Text>
                    </View>
                    </TouchableOpacity>
                
                
                <TextInput style={styles.textInputs} 
                label="Açıklamalar" 
                keyboardType="default"
                editable={isChecked1}
                multiline={true}
                value={hisseAciklama} 
                onChangeText={(hisseAciklama) => {sethisseAciklama(hisseAciklama)}}/>
                <Button 
                    disabled={!isChecked1}
                    title="Hisseye Kaydol"
                    titleStyle={{ color:isChecked1?"black":"#C70000" }}
                    color={isChecked1 ? "#3878B7" :"#030303"}
                    onPress={()=>{
                        NewOrder();
                        updateHisse();
                    }} />
          </View>
          </ScrollView>
    </View>
    )
}


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
        margin:5
    },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:8
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
export default HisseAlim;