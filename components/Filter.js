import Checkbox from 'expo-checkbox';
import React, { useState } from 'react';
import { StyleSheet,View,Button,TextInput,Text,Alert } from 'react-native';
import { db } from "../git_ignore_files/firebase";
import {addDoc, collection,} from "firebase/firestore";
import { auth } from '../git_ignore_files/firebase';
export default function Filter(props) {

  const [wstock , setwStock] = useState("");
  const [minPrice , setminPrice] = useState("");
  const [maxPrice , setmaxPrice] = useState("");
  const [description , setDescription] = useState("");

  var minpriceToNumber = Math.floor(minPrice);
  var maxpriceToNumber = Math.floor(maxPrice);
  var stockToNumber = Math.floor(wstock);

  const NewAdvert = () =>{
    addDoc(collection(db, "Ilanlar"), {
    minPrice: minpriceToNumber,
    maxPrice:maxpriceToNumber,
    wstock: stockToNumber,
    description:description,
    email:auth.currentUser.email,
    name:auth.currentUser.displayName,
  }).then(()=>{
    createAlert()
    setDescription("");setmaxPrice("");setminPrice("");setwStock("")
  }).catch((error)=>{
    createAlert({title:{error}})
  });
  };
  const createAlert = (props) =>
    Alert.alert( "Yeni ilan eklendi" , "İlanınızı gören satıcılar sizinle en kısa sürede iletişime geçecektir." ,
    [
      { text: 'Tamam', 
        onPress: () => console.log('OK Pressed'), },
      
    ]);
  
  return (
    <View style={styles.container}>
        <Text style={styles.paragraph1}>**Aradığınız ilanı satıcıların görmesi için aşağıya istediğiniz özellikleri giriniz. Fiyat aralığı bilgisi ve adet bilgisi opsiyoneldir.</Text>
        <View style={styles.section}>
            <TextInput 
            style={[styles.input,{borderColor:"green"}]} 
            placeholder='En Düşük' 
            keyboardType="numeric"
            textAlign='center'
            value={minPrice}
            onChangeText={(minPrice)=>setminPrice(minPrice)}
            ></TextInput>
            <Text style={styles.paragraph}>Hissenin Fiyat Aralığı(TL)</Text>
            <TextInput 
            style={[styles.input,{borderColor:"red"}]} 
            placeholder='En Yüksek' 
            keyboardType="numeric"
            textAlign='center'
            value={maxPrice}
            onChangeText={(maxPrice)=>setmaxPrice(maxPrice)}
            />
        </View>
            <View style={styles.section} >
              <Text style={styles.paragraph2}>İstenen Hisse Adedi</Text>
              <TextInput 
              style={[styles.input1,{borderColor:"black"}]} 
              placeholder='Adet' 
              keyboardType="numeric"
              textAlign='center'
              value={wstock}
              onChangeText={(wstock)=>setwStock(wstock)}
              />
            </View>
            <TextInput 
              style={[styles.input2,{borderColor:"black"}]} 
              placeholder='Satıcıların sizinle iletişime geçebilmesi için 
              aradığınız ilanı bu alanda detaylandırın.' 
              textAlign='center'
              multiline={true}
              value={description}
              onChangeText={(description)=>setDescription(description)}
              />
              <Button color={"black"} title='Kaydet' onPress={()=>{NewAdvert()}}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 32,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paragraph: {
    fontSize: 15,
  },
  paragraph1: {
    fontSize: 15,
    marginBottom:10,
    color:"blue"
  },
  paragraph2:{
    marginLeft:20,
    fontSize:16,
    marginRight:16
  },
  input:{
    borderWidth:1,
    borderRadius:5,
    margin:5,
  },
  input1:{
    borderWidth:1,
    borderRadius:5,
    margin:5,
    flexBasis:'40%'
  },
  input2:{
    borderWidth:1,
    borderRadius:5,
    margin:5,
    flexBasis:'30%'
  },
  checkbox: {
    borderRadius:15,
    margin: 8,
  },
});