import { NavigationContainer, useNavigation } from "@react-navigation/native";
import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import {  
  DrawerLayoutAndroid,   
  StyleSheet, 
  View, Alert,Text
 } from "react-native";
//import {  Text,VStack, HStack,TextInput,Button } from "@react-native-material/core";
import { SafeAreaView } from "react-native-safe-area-context";
import "firebase/firestore";
import {addDoc, collection, doc, documentId, updateDoc } from "firebase/firestore";
import { db } from "../git_ignore_files/firebase";
import { TextInput , Button} from 'react-native-paper';
import { AntDesign } from "@expo/vector-icons";
const genuses = ["Koyun","Keçi","Sığır","Manda"]

const Seperator = () => (
  <View style={styles.seperator}/>
);
const createAlert = (props) =>
    Alert.alert("Başarılı" , "Yeni hayvan eklendi", 
    [
      { text: 'Tamam', 
        onPress: () => console.log('OK Pressed'), },
      
    ]);

export default Drawer = forwardRef((props, ref) => {
  
  const [stock , setStock] = useState("");
  const [price , setPrice] = useState("");
  const [owner , setOwner] = useState("");
  const [age , setAge] = useState("");
  const [genus , setGenus] = useState("");
  const [kilos, setKilos] = useState();

  const ageToNumber = Math.floor(age);
  const priceToNumber = Math.floor(price);
  const stockToNumber = Math.floor(stock);
  const kilosToNumber = Math.floor(kilos)
  //const navigation = useNavigation()

  async function updateHisse(Iid) {
    // To update age and favorite color:
    for (let i = 1; i < (stockToNumber+1); i++) {
    await updateDoc(doc(db, "Items" , Iid ), {
        [`hisseler.hisse${i}`]: false,
    });
}}

  const NewItems = () =>{
    addDoc(collection(db, "Items"), {
    owner: owner,
    price: priceToNumber,
    stock: stockToNumber,
    age  : ageToNumber,
    genus: genus,
    kilos: kilosToNumber,
  }).then((docRef)=>{
    var Iid =docRef.id
    updateHisse(Iid);
    createAlert()
  }).catch((error)=>{
    createAlert({title:{error}})
  });
  };

  var drawer = useRef(null);

  const navigationView = () => (
    <SafeAreaView>
      <View style={[styles.container, styles.navigationContainer]}>
          <View padding={5}>
              <Seperator/>
                <Text style={styles.title}> Hayvan ekleme arayüzü</Text>
                <TextInput style={styles.textInputs} 
                label="Toplam Hisse Adedi" 
                keyboardType="numeric"
                value={stock}
                maxLength={1} 
                onChangeText={(stock) => {setStock(stock)}}/>
                
                <TextInput style={styles.textInputs} 
                label="Hisse Bedeli (TL)" 
                keyboardType="numeric"
                value={price} 
                onChangeText={(price) => {setPrice(price)}} />

                <TextInput style={styles.textInputs} 
                label="Hayvan Sahibi" 
                keyboardType="default"
                value={owner} 
                onChangeText={(owner) => {setOwner(owner)}}/>
                <TextInput style={styles.textInputs} 
                label="Hayvan Kilosu (kg)" 
                keyboardType="numeric"
                value={kilos} 
                onChangeText={(kilos) => {setKilos(kilos)}} />
                <TextInput style={styles.textInputs} 
                label="Hayvan Yaşı" 
                keyboardType="numeric"
                value={age} 
                onChangeText={(age) => {setAge(age)}} />
                <TextInput style={styles.textInputs} 
                label="Hayvan Cinsi" 
                keyboardType="default"
                value={genus} 
                onChangeText={(genus) => {setGenus(genus)}} />

                <Button 
                  color="orange"
                  icon="plus"
                  mode="contained" 
                  onPress={()=>{
                    NewItems();
                  }} > Kaydet</Button>
              
          </View>
      </View>
    </SafeAreaView>
  );

  useImperativeHandle(ref, () => ({
    drawerOpen() {
        drawer.current.openDrawer();
    }
  }));
  return (
      <DrawerLayoutAndroid
        ref={drawer}
        drawerWidth={300}
        renderNavigationView={navigationView}
        drawerPosition='left'>
          {props.children}
      </DrawerLayoutAndroid>
  );
});

const styles = StyleSheet.create({
  seperator:{ 
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth},
  container: {
    flexDirection:'column',
    alignContent: "flex-start",
    justifyContent: "space-between",
    
  },
  navigationContainer: {
    backgroundColor: "#ecf0f1"
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: "center"
  },
  textInputs: {
    margin:5,
    color:"orange"
  },
  title: {
    color:"black",
    fontSize:17,
    margin:10
  },
  HStack: {
    flex:3,
    justifyContent:"space-between"
  }
});